from http.client import responses


def test_get_all_chapters(client):
    response = client.get("/chapters/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    first_chapter = data[0]
    assert "id" in first_chapter
    assert "title" in first_chapter

def test_get_chapter_by_id(client):
    response = client.get("/chapters/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "title" in data

def test_get_chapter_not_found(client):
    response = client.get("/chapters/99999")
    assert response.status_code == 404

def test_get_problems_for_chapter(client):
    response = client.get("/chapters/1/problems")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
