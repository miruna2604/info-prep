from app.models.judge0 import (
    Judge0SubmissionRequest,
    Judge0SubmissionResponse,
)
from fastapi import HTTPException
from pydantic import ValidationError

import httpx
import os
import base64

LANGUAGE_ID = int(os.getenv("LANGUAGE_ID", "54"))
JUDGE0_URL = os.getenv("JUDGE0_URL", "http://localhost:2358")
REQUEST_TIMEOUT_SECONDS = 10.0

def encode_for_judge0(value: str | None) -> str | None:
    if value is None:
        return None
    return base64.b64encode(value.encode("utf-8")).decode("ascii")

def decode_from_judge0(value: str | None) -> str | None:
    if value is None:
        return None
    return base64.b64decode(value).decode("utf-8", errors="replace")

def execute_submission(source_code: str, stdin: str | None = None,) -> Judge0SubmissionResponse:
    submission = Judge0SubmissionRequest(
        language_id=LANGUAGE_ID,
        source_code=source_code,
        stdin=stdin,
    )

    payload = Judge0SubmissionRequest(
        language_id=submission.language_id,
        source_code=encode_for_judge0(submission.source_code),
        stdin=encode_for_judge0(submission.stdin),
    )

    try:
        with httpx.Client(timeout=REQUEST_TIMEOUT_SECONDS) as client:
            response = client.post(
                f"{JUDGE0_URL}/submissions",
                params={"base64_encoded": "true", "wait": "true"},
                json=payload.model_dump(exclude_none=True)
            )
            response.raise_for_status()
            judge0_result = Judge0SubmissionResponse.model_validate(response.json())
            decoded_result = judge0_result.model_copy(
                update={
                    "stdout": decode_from_judge0(judge0_result.stdout),
                    "stderr": decode_from_judge0(judge0_result.stderr),
                    "compile_output": decode_from_judge0(
                        judge0_result.compile_output
                    ),
                    "message": decode_from_judge0(judge0_result.message),
                }
            )
            return decoded_result
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Judge0 did not respond in time.")
    except httpx.ConnectError:
        raise HTTPException(status_code=502, detail="Cannot connect to Judge0")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"Judge0 returned {e.response.status_code}.")
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="Unexpected communication error with Judge0.")
    except ValidationError:
        raise HTTPException(status_code=502, detail="Judge0 returned an unexpected response.")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error.")