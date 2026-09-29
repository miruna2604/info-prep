from types import SimpleNamespace
from app.services import judge0_service
from app.database.schemas import UserSubmission


def test_submit_requires_authentication(client):
    response = client.post("/submission/problems/1/submit", json={"source_code": "int main() { return 0; }"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"

def test_submit_for_nonexistent_problem(authenticated_client):
    submission_data = {
        "source_code": "int main() { return 0; }"
    }
    response = authenticated_client.post("/submission/problems/99999/submit", json=submission_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "Problem not found"


def test_submit_without_source_code(authenticated_client):
    response = authenticated_client.post("/submission/problems/1/submit", json={})
    assert response.status_code == 422


def test_correct_answer(authenticated_client, monkeypatch):
    def fake_correct_answer(source_code, stdin):
        expected_outputs = {
            "2 3": "5",
            "10 20": "30",
            "-5 8": "3",
            "100 200": "300",
            "0 0": "0",
        }
        return SimpleNamespace(
            status=SimpleNamespace(description="Accepted"),
            stdout=expected_outputs[stdin]
        )

    monkeypatch.setattr(
        judge0_service,
        "execute_submission",
        fake_correct_answer
    )

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json={"source_code": "cod corect"}
    )

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["verdict"] == "Accepted"
    assert response_data["passed_tests"] == 5
    assert response_data["total_tests"] == 5
    assert len(response_data["tests"]) == 5
    assert [test["status"] for test in response_data["tests"]] == ["passed"] * 5
    assert response_data["tests"][0] == {
        "number": 1,
        "is_hidden": False,
        "status": "passed",
        "verdict": "Accepted",
        "input": "2 3",
        "expected_output": "5",
        "actual_output": "5",
    }
    assert response_data["tests"][1]["is_hidden"] is True
    assert response_data["tests"][1]["input"] is None
    assert response_data["tests"][1]["expected_output"] is None
    assert response_data["tests"][1]["actual_output"] is None


def test_submit_wrong_answer(authenticated_client, monkeypatch):
    def fake_wrong_answer(source_code, stdin):
        return SimpleNamespace(
            status=SimpleNamespace(description="Accepted"),
            stdout="raspuns gresit"
        )

    monkeypatch.setattr(
        judge0_service,
        "execute_submission",
        fake_wrong_answer
    )

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json={"source_code": "cod gresit"}
    )

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["verdict"] == "Wrong Answer"
    assert response_data["passed_tests"] == 0
    assert response_data["total_tests"] == 5
    assert [test["status"] for test in response_data["tests"]] == ["failed"] * 5
    assert response_data["tests"][0]["actual_output"] == "raspuns gresit"
    assert response_data["tests"][1]["actual_output"] is None


def test_submit_compilation_error(authenticated_client, monkeypatch):
    def fake_compilation_error(source_code, stdin):
        return SimpleNamespace(
            status=SimpleNamespace(description="Compilation Error"),
            stdout=None
        )

    monkeypatch.setattr(
        judge0_service,
        "execute_submission",
        fake_compilation_error
    )

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json={"source_code": "int main({"}
    )

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["verdict"] == "Compilation Error"
    assert response_data["passed_tests"] == 0
    assert response_data["total_tests"] == 5
    assert [test["status"] for test in response_data["tests"]] == [
        "failed", "not_run", "not_run", "not_run", "not_run"
    ]


def test_submit_reports_mixed_results_without_revealing_hidden_data(
    authenticated_client, monkeypatch
):
    outputs = {
        "2 3": "5",
        "10 20": "30",
        "-5 8": "0",
        "100 200": "300",
        "0 0": "1",
    }

    def fake_mixed_answer(source_code, stdin):
        return SimpleNamespace(
            status=SimpleNamespace(description="Accepted"),
            stdout=outputs[stdin],
        )

    monkeypatch.setattr(judge0_service, "execute_submission", fake_mixed_answer)

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json={"source_code": "cod parțial corect"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["verdict"] == "Wrong Answer"
    assert data["passed_tests"] == 3
    assert data["total_tests"] == 5
    assert [test["status"] for test in data["tests"]] == [
        "passed", "passed", "failed", "passed", "failed"
    ]
    for hidden_test in data["tests"][1:]:
        assert hidden_test["is_hidden"] is True
        assert hidden_test["input"] is None
        assert hidden_test["expected_output"] is None
        assert hidden_test["actual_output"] is None


def test_submission_is_saved_in_database(authenticated_client, db_session, monkeypatch):
    def fake_correct_answer(source_code, stdin):
        expected_outputs = {
            "2 3": "5",
            "10 20": "30",
            "-5 8": "3",
            "100 200": "300",
            "0 0": "0",
        }
        return SimpleNamespace(
            status=SimpleNamespace(description="Accepted"),
            stdout=expected_outputs[stdin]
        )

    monkeypatch.setattr(
        judge0_service,
        "execute_submission",
        fake_correct_answer
    )

    source_code = "cod pentru testarea salvarii"

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json={"source_code": source_code}
    )

    assert response.status_code == 200

    saved_submission = (
        db_session.query(UserSubmission)
        .filter(
            UserSubmission.user_id == 1,
            UserSubmission.problem_id == 1,
            UserSubmission.source_code == source_code
        )
        .order_by(UserSubmission.id.desc())
        .first()
    )
    assert saved_submission is not None
    assert saved_submission.user_id == 1
    assert saved_submission.problem_id == 1
    assert saved_submission.source_code == source_code
    assert saved_submission.verdict == "Accepted"
    assert saved_submission.passed_tests == 5
    assert saved_submission.total_tests == 5

def test_submit_rejects_client_provided_user_id(authenticated_client):
    response = authenticated_client.post("/submission/problems/1/submit", json={"source_code": "cod", "user_id": 999999})
    assert response.status_code == 422

#integrare reala

def test_real_judge0_integration(authenticated_client):
    source_code = """
    #include <iostream>
    using namespace std;

    int main() {
        int a, b;
        cin >> a >> b;
        cout << a + b;
        return 0;
    }
    """

    submission_data = {
        "source_code": source_code
    }

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Accepted"
    assert data["passed_tests"] == 5
    assert data["total_tests"] == 5

def test_real_judge0_compilation_error(authenticated_client):
    source_code = """
    int main() {
        int a = 5
        cout << a;
    }
    """

    submission_data = {
        "source_code": source_code
    }

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Compilation Error"
    assert data["passed_tests"] == 0
    assert data["total_tests"] == 5


def test_real_judge0_runtime_error(authenticated_client):
    source_code = """
    #include <iostream>
    using namespace std;

    int main() {
        int x = 0;
        cout << 10 / x;
        return 0;
    }
    """

    submission_data = {
        "source_code": source_code
    }

    response = authenticated_client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Runtime Error"
    assert data["passed_tests"] == 0
    assert data["total_tests"] == 5
