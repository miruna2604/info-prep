from app.models.enums import Verdict


def map_judge0_status(status: str) -> Verdict:

    if status == "Accepted":
        return Verdict.ACCEPTED

    if status.startswith("Wrong Answer"):
        return Verdict.WRONG_ANSWER

    if status.startswith("Compilation Error"):
        return Verdict.COMPILATION_ERROR

    if status.startswith("Runtime Error"):
        return Verdict.RUNTIME_ERROR

    if status.startswith("Time Limit Exceeded"):
        return Verdict.TIME_LIMIT_EXCEEDED

    raise ValueError(f"Unsupported Judge0 status: {status}")