def test_get_lessons_by_id(client):
    response = client.get("/lessons/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["chapter_id"] == 1
    assert data["title"] == "Prima lecție"
    assert data["video_url"] == "https://example.com/video"
    assert data["pdf_url"] == "https://example.com/lesson.pdf"
    assert data["display_order"] == 1

def test_get_lesson_not_found(client):
    response = client.get("/lessons/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Lesson not found"