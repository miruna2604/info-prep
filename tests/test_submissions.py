from types import SimpleNamespace

from app.database.database import SessionLocal
from app.services import judge0_service
from app.database.schemas import UserSubmission



def test_submit_for_nonexistent_problem(client):
    submission_data = {
        "user_id": 1,
        "source_code": "int main() { return 0; }"
    }

    response = client.post("/submission/problems/99999/submit", json=submission_data)

    assert response.status_code == 404

    assert response.json()["detail"] == "Problem not found"


def test_submit_without_source_code(client):
    submission_data = {
        "user_id": 1
    }

    response = client.post("/submission/problems/1/submit", json=submission_data)

    assert response.status_code == 422


def test_correct_answer(client, monkeypatch):
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

    submission_data = {
        "user_id": 1,
        "source_code": "cod corect"
    }

    response = client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Accepted"
    assert data["passed_tests"] == 5
    assert data["total_tests"] == 5


def test_submit_wrong_answer(client, monkeypatch):
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

    submission_data = {
        "user_id": 1,
        "source_code": "cod gresit"
    }

    response = client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Wrong Answer"
    assert data["passed_tests"] == 0
    assert data["total_tests"] == 5


def test_submit_compilation_error(client, monkeypatch):
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

    submission_data = {
        "user_id": 1,
        "source_code": "int main( {"
    }

    response = client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Compilation Error"
    assert data["passed_tests"] == 0
    assert data["total_tests"] == 5


def test_submission_is_saved_in_database(client, monkeypatch):
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

    submission_data = {
        "user_id": 1,
        "source_code": "cod pentru testarea salvarii"
    }

    response = client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    with SessionLocal() as db:
        saved_submission = (
            db.query(UserSubmission)
            .filter(UserSubmission.user_id == 1, UserSubmission.problem_id == 1, UserSubmission.source_code == submission_data["source_code"])
            .order_by(UserSubmission.id.desc()).first()
        )

    assert saved_submission is not None
    assert saved_submission.user_id == 1
    assert saved_submission.problem_id == 1
    assert saved_submission.source_code == submission_data["source_code"]
    assert saved_submission.verdict == "Accepted"
    assert saved_submission.passed_tests == 5
    assert saved_submission.total_tests == 5

#integrare reala

def test_real_judge0_integration(client):
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
        "user_id": 1,
        "source_code": source_code
    }

    response = client.post(
        "submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Accepted"
    assert data["passed_tests"] == 5
    assert data["total_tests"] == 5

def test_real_judge0_compilation_error(client):
    source_code = """
    int main() {
        int a = 5
        cout << a;
    }
    """

    submission_data = {
        "user_id": 1,
        "source_code": source_code
    }

    response = client.post(
        "submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Compilation Error"
    assert data["passed_tests"] == 0
    assert data["total_tests"] == 5


def test_real_judge0_runtime_error(client):
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
        "user_id": 1,
        "source_code": source_code
    }

    response = client.post(
        "/submission/problems/1/submit",
        json=submission_data
    )

    assert response.status_code == 200

    data = response.json()

    assert data["verdict"] == "Runtime Error"
    assert data["passed_tests"] == 0
    assert data["total_tests"] == 5