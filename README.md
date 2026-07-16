# Infooo Prep

FastAPI backend for a programming-learning application. It sends C++ code to
Judge0, which compiles and runs it in an isolated environment.

## Start locally

1. Install Docker Desktop.
2. Create the local Judge0 configuration:

   ```bash
   cp judge0/judge0.conf.example judge0/judge0.conf
   ```

3. Set your local passwords in `judge0/judge0.conf`.
4. Start all services:

   ```bash
   docker compose up --build
   ```

5. Open the API documentation at http://localhost:8000/docs.

## Services

- FastAPI application: port 8000
- Judge0 code-execution API: port 2358
- Redis: Judge0 job queue
- PostgreSQL: Judge0 data

`judge0/judge0.conf` is deliberately ignored by Git. Commit only
`judge0/judge0.conf.example`.
