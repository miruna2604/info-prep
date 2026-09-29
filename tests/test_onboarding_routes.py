from fastapi import status
import pytest

from app.database.schemas.user_profile import UserProfile


VALID_ONBOARDING = {
    "grade": "GRADE_12",
    "study_profile": "MATH_INFO",
    "self_assessment": "BASIC_WITH_GAPS",
}


def test_authenticated_user_can_save_onboarding(authenticated_client, db_session):
    response = authenticated_client.put("/onboarding", json=VALID_ONBOARDING)

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": response.json()["id"],
        **VALID_ONBOARDING,
        "onboarding_completed": True,
        "assessment_status": "NOT_STARTED",
    }

    profile = db_session.query(UserProfile).one()
    assert profile.user_id == 1
    assert profile.onboarding_completed is True


@pytest.mark.parametrize("grade", ["GRADE_9", "GRADE_10", "GRADE_11", "GRADE_12"])
def test_each_school_grade_can_be_saved(authenticated_client, grade):
    response = authenticated_client.put(
        "/onboarding", json={**VALID_ONBOARDING, "grade": grade}
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["grade"] == grade


@pytest.mark.parametrize("study_profile", ["MATH_INFO", "NATURAL_SCIENCES", "MILITARY"])
def test_study_profile_can_be_saved(authenticated_client, db_session, study_profile):
    response = authenticated_client.put(
        "/onboarding", json={**VALID_ONBOARDING, "study_profile": study_profile}
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["study_profile"] == study_profile
    assert db_session.query(UserProfile).one().study_profile == study_profile


def test_unauthenticated_user_cannot_save_onboarding(client):
    response = client.put("/onboarding", json=VALID_ONBOARDING)

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_invalid_onboarding_values_are_rejected(authenticated_client):
    for field in ("grade", "study_profile", "self_assessment"):
        invalid_data = {**VALID_ONBOARDING, field: "NOT_A_VALID_VALUE"}

        response = authenticated_client.put("/onboarding", json=invalid_data)

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT


@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("grade", "GRADUATED"),
        ("study_profile", "OTHER"),
        ("study_profile", "MATH_INFO_INTENSIVE"),
    ],
)
def test_removed_options_cannot_be_submitted(authenticated_client, field, value):
    response = authenticated_client.put(
        "/onboarding", json={**VALID_ONBOARDING, field: value}
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT


@pytest.mark.parametrize(
    ("grade", "study_profile"),
    [("GRADUATED", "OTHER"), ("GRADE_12", "MATH_INFO_INTENSIVE")],
)
def test_existing_legacy_profile_remains_readable(
    authenticated_client, db_session, grade, study_profile
):
    db_session.add(
        UserProfile(
            user_id=1,
            grade=grade,
            study_profile=study_profile,
            self_assessment="BEGINNER",
            onboarding_completed=True,
        )
    )
    db_session.commit()

    response = authenticated_client.get("/onboarding/me")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["profile"]["grade"] == grade
    assert response.json()["profile"]["study_profile"] == study_profile


def test_onboarding_status_is_false_without_a_profile(authenticated_client):
    response = authenticated_client.get("/onboarding/me")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "onboarding_completed": False,
        "assessment_status": "NOT_STARTED",
        "profile": None,
    }


def test_saving_existing_profile_updates_instead_of_creating_duplicate(
    authenticated_client,
    db_session,
):
    first_response = authenticated_client.put("/onboarding", json=VALID_ONBOARDING)
    updated_response = authenticated_client.put(
        "/onboarding",
        json={
            "grade": "GRADE_11",
            "study_profile": "MILITARY",
            "self_assessment": "ADVANCED",
        },
    )

    assert first_response.status_code == status.HTTP_200_OK
    assert updated_response.status_code == status.HTTP_200_OK
    assert db_session.query(UserProfile).count() == 1

    profile = db_session.query(UserProfile).one()
    assert profile.grade == "GRADE_11"
    assert profile.study_profile == "MILITARY"
    assert profile.self_assessment == "ADVANCED"
    assert profile.onboarding_completed is True


def test_authenticated_user_can_defer_initial_assessment(
    authenticated_client,
    db_session,
):
    authenticated_client.put("/onboarding", json=VALID_ONBOARDING)

    response = authenticated_client.post("/onboarding/assessment/defer")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"assessment_status": "DEFERRED"}

    profile = db_session.query(UserProfile).one()
    assert profile.user_id == 1
    assert profile.onboarding_completed is True
    assert profile.assessment_status == "DEFERRED"


def test_unauthenticated_user_cannot_defer_initial_assessment(client):
    response = client.post("/onboarding/assessment/defer")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_deferring_assessment_does_not_create_a_second_profile(
    authenticated_client,
    db_session,
):
    authenticated_client.put("/onboarding", json=VALID_ONBOARDING)
    authenticated_client.post("/onboarding/assessment/defer")

    assert db_session.query(UserProfile).count() == 1


def test_assessment_cannot_be_deferred_before_onboarding(authenticated_client):
    response = authenticated_client.post("/onboarding/assessment/defer")

    assert response.status_code == status.HTTP_409_CONFLICT
