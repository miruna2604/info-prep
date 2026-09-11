def test_get_all_problems(client):
    response = client.get("/problems/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
    first_problem = data[0]
    assert first_problem == {
        "id": 1,
        "slug": "suma-a-doua-numere",
        "title": "Suma a doua numere",
        "subject": "Sub I",
    }

def test_get_problem_by_slug(client):
    response = client.get(
        "/problems/suma-a-doua-numere"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == 1
    assert data["slug"] == "suma-a-doua-numere"
    assert data["title"] == "Suma a doua numere"
    assert data["subject"] == "Sub I"
    assert data["statement"] == "Calculeaza suma."
    assert data["input_description"] == "Doua numere intregi."
    assert data["output_description"] == "Suma numerelor."
    assert data["constraints"] == [
        "-2.000.000.000 ≤ a, b ≤ 2.000.000.000"
    ]
    assert data["starter_code"]
    assert data["examples"] == [
        {
            "input": "2 3",
            "output": "5",
            "explanation": None,
        }
    ]

def test_problem_detail_does_not_expose_hidden_data(client):
    response = client.get(
        "/problems/suma-a-doua-numere"
    )

    assert response.status_code == 200

    data = response.json()

    assert "tests" not in data
    assert "submissions" not in data
    assert "sample_input" not in data
    assert "sample_output" not in data

def test_get_problem_not_found(client):
    response = client.get(
        "/problems/problema-inexistenta"
    )

    assert response.status_code == 404
    assert response.json() == {
        "detail": "Problem not found"
    }