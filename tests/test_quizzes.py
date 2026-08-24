def test_get_chapter_quizzes(client):
    response = client.get("/quizzes/chapters/test-chapter")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["lesson_slug"] == "prima-lectie"
    assert data[0]["question_count"] == 1


def test_get_quiz_does_not_expose_correct_answer(client):
    response = client.get(
        "/quizzes/chapters/test-chapter/lessons/prima-lectie"
    )
    assert response.status_code == 200
    data = response.json()
    assert data["lesson_title"] == "Prima lecție"
    assert len(data["questions"][0]["options"]) == 3
    assert "is_correct" not in data["questions"][0]["options"][0]


def test_submit_quiz(client):
    response = client.post(
        "/quizzes/chapters/test-chapter/lessons/prima-lectie/submit",
        json={"answers": [{"question_id": 1, "option_id": 1}]},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["correct_answers"] == 1
    assert data["total_questions"] == 1
    assert data["questions"][0]["is_correct"] is True


def test_submit_rejects_option_from_another_question(client):
    response = client.post(
        "/quizzes/chapters/test-chapter/lessons/prima-lectie/submit",
        json={"answers": [{"question_id": 1, "option_id": 999}]},
    )
    assert response.status_code == 422
