def test_get_all_problems(client):
    response = client.get("/problems/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    first_problem = data[0]
    assert "id" in first_problem
    assert "title" in first_problem
    assert "statement" in first_problem
    assert "input_description" in first_problem
    assert "output_description" in first_problem
    assert "sample_input" in first_problem
    assert "sample_output" in first_problem

def test_get_problem_by_id(client):
    response = client.get("/problems/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "title" in data
    assert "statement" in data
    assert "input_description" in data
    assert "output_description" in data

def test_get_problem_not_found(client):
    response = client.get("/problems/99999")
    assert response.status_code == 404
