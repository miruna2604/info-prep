# CLAUDE.md — InfoPrep

Also read `AGENTS.md`. It contains standing rules that apply here too:
- Marketing, social, campaign or launch copy → read `MARKETING.md` first.
- Romanian text: the articulated form is always „bacul” or „BACUL”, never mixed capitalization.

---

## 1. Project overview

**Purpose:** a learning platform for Romanian high-school students preparing for the Computer Science Baccalaureate. It offers C++ lessons, practice problems judged in the browser, onboarding, and an initial assessment that produces a personalized study plan. UI copy and content are in Romanian.

**Stack**
- Frontend: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, react-markdown + remark-gfm + rehype-highlight. Remotion is a dev dependency, used only for the marketing videos in `frontend/video/`.
- Backend: Python 3.11, FastAPI, Pydantic 2, SQLAlchemy 2, psycopg2, httpx, PyJWT, pwdlib[argon2], python-dotenv.
- Data: PostgreSQL 16.
- Code execution: self-hosted Judge0 1.13.1 (server + worker + Redis + its own Postgres).
- Infrastructure: Docker Compose.

**High-level architecture**
```
Next.js (localhost:3000)
  │ fetch, credentials:"include", JSON, httpOnly cookie `access_token`
  ▼
FastAPI (localhost:8000) ──SQLAlchemy──► api_database (Postgres, host port 5433)
  │ httpx, synchronous, base64, wait=true
  ▼
Judge0 server (:2358) → Redis → Judge0 worker (isolate sandbox); Judge0 uses its own Postgres `db`
```
Application data and Judge0 data are kept in separate databases on purpose.

---

## 2. Repository structure

| Path | Responsibility |
|---|---|
| `app/main.py` | Creates the FastAPI app, sets CORS (localhost:3000 / 127.0.0.1:3000), imports all ORM classes, runs `Base.metadata.create_all`, and includes the routers |
| `app/config.py` | Auth settings. Raises at import if `AUTH_SECRET_KEY` is missing or shorter than 32 characters |
| `app/database/database.py` | Engine, `SessionLocal`, `Base` (DeclarativeBase), `get_db` dependency |
| `app/database/schemas/` | **SQLAlchemy ORM entities** (not Pydantic) |
| `app/models/` | **Pydantic request/response contracts** and enums |
| `app/routers/` | Thin FastAPI routers |
| `app/services/` | Business logic, queries, Judge0 integration, assessment grading and planning |
| `app/dependencies/auth.py` | `get_current_user` (cookie → JWT → `User`) |
| `app/seed.py` | Idempotent dev seed (chapters, lessons, problems + tests, demo users, initial assessment) |
| `content/lessons/<chapter-slug>/<lesson-slug>.md` | Lesson Markdown, loaded into `lessons.content` by the seed |
| `content/assessments/initial.json` | Source for the initial assessment's questions, private grading config and concept catalog, imported by `app/services/assessment_seed.py` |
| `migrations/NNN_*.sql` | Hand-written SQL migrations, applied manually |
| `tests/` | Backend pytest suite |
| `judge0/judge0.conf.example` | Template for the git-ignored `judge0/judge0.conf` |
| `frontend/app/` | App Router pages, organized in route groups |
| `frontend/components/` | UI grouped by domain: `layout`, `chapter`, `lesson`, `problem`, `editor`, `assessment`, `curriculum`, `common` |
| `frontend/services/` | API client (`api.ts`) and one service per domain |
| `frontend/types/` | Frontend domain types (camelCase) |
| `frontend/lib/` | Static curriculum tree (`bacCurriculum.ts`) and step generators for the lesson visualizers |
| `frontend/video/` | Remotion marketing reels that reuse the `lib/` step generators |

Git-ignored, personal files: `notes.md`, `db_notes.md`, `swagger_testing.txt`, `frontend.zip`. The root `README.md` is partly outdated (for example, it says auth is not implemented). Trust the code over the README.

---

## 3. Backend architecture

### FastAPI structure
- Request flow: router → service module → ORM. Routers stay thin; services own the queries.
- Services are modules of functions, imported as `from app.services import chapter_service`.
- Dependencies are injected as `db: Session = Depends(get_db)` and `current_user: User = Depends(get_current_user)`.
- New routers must be registered in `app/main.py`, and new ORM classes must be imported there so `create_all` sees them.

### Routes (current)
| Router (prefix) | Endpoints | Auth |
|---|---|---|
| `/chapters` | `GET /`, `/{chapter_slug}`, `/{chapter_slug}/lessons`, `/{chapter_slug}/problems`, `/{chapter_slug}/lessons/{lesson_slug}` | public; returns ORM objects with **no `response_model`** |
| `/lessons` | `GET /{lesson_id}` | public |
| `/problems` | `GET /` (`ProblemSummaryResponse[]`), `GET /{problem_slug}` (`ProblemDetailResponse`) | public; never exposes the `problem_tests` rows |
| `/submission` | `POST /run` (`RunRequest` → `RunResponse`) | public |
| | `POST /problems/{problem_id}/submit` (`SubmissionRequest` → `SubmissionResponse`); uses the numeric id | required |
| `/auth` | `POST /register` (201), `POST /login`, `GET /me`, `POST /logout` (204) | `/me` required |
| `/onboarding` | `GET /me`, `PUT ""`, `POST /assessment/defer` | required |
| `/assessments` | `GET /initial`, `POST /initial/attempts`, `PUT /attempts/{attempt_id}/answers/{question_id}`, `POST /attempts/{attempt_id}/submit`, `GET /initial/result`, `GET /attempts/{attempt_id}/result` | required |

### Pydantic contracts (`app/models/`)
- `auth.py`: `RegisterRequest` (username 3–50 chars, stripped; `EmailStr`; `SecretStr` password 8–128), `LoginRequest`, `UserResponse` (`from_attributes`, includes `onboarding_completed`).
- `problems.py`: summary/detail/example responses. The detail's `examples` list is built from the single `sample_input`/`sample_output`.
- `submissions.py`:
  - `SubmissionRequest` uses `extra="forbid"`, so a client-supplied `user_id` is rejected.
  - Per-test results use `status: "passed" | "failed" | "not_run"`.
  - `RunRequest`/`RunResponse`.
- `enums.py`: `Verdict` (the string values are part of the API contract).
- `judge0.py`: Judge0 request/response shapes.
- `onboarding.py`: `Grade`, `StudyProfile`, `SelfAssessment`, `AssessmentStatus` enums. The response types also accept the legacy values `GRADUATED`, `MATH_INFO_INTENSIVE` and `OTHER`, so older profiles stay readable.
- `assessments.py`:
  - `AssessmentQuestionResponse.only_public_configuration` is an **explicit whitelist** (`options[id,text]`, `input_hint`). It keeps grading data out of responses and must be preserved.
  - `AssessmentAnswerInput` validates `state` against `answer_data`.

### Services
| Service | Role |
|---|---|
| `chapter_service`, `lesson_service`, `problem_service` | Content queries; published-only filtering for chapters and lessons |
| `submission_service` | Judged submissions and `run_code` |
| `judge0_service` | The only HTTP client for Judge0 |
| `verdict_mapare` | Judge0 status description → `Verdict` |
| `user_submission_service` | Saves a `UserSubmission` |
| `auth_service` | Password hashing, JWT create/decode, register, authenticate |
| `onboarding_service` | Profile upsert and assessment defer |
| `assessment_service` | Attempts, answers, atomic submit, results |
| `assessment_grading` | Deterministic grading (choice / output / Judge0 harness); a token-based restriction checker validates code fragments |
| `assessment_planning` | Concept evidence and prerequisite-ordered `PersonalizedPlan` |
| `assessment_seed` | Idempotent import of `initial.json` |

### Database patterns
- Services commit themselves (`db.add` → `db.commit()` → `db.refresh(obj)`).
- Row locks (`with_for_update()`) serialize assessment starts, answers and submits.
- Published content is filtered with `.is_published.is_(True)` and ordered by `display_order`.
- Enum-like values are stored as strings. Python `str` Enums validate them at the API edge.

### Authentication
- Passwords are hashed with argon2 through `pwdlib` `PasswordHash.recommended()`. An unknown hash format counts as a failed verification.
- The token is an HS256 JWT with the claims `sub` (user id as a string), `iat` and `exp`, all required when decoding. Lifetime is `AUTH_TOKEN_EXPIRE_MINUTES` (default 30). There is no refresh token.
- The token lives in an httpOnly cookie `access_token` with `samesite="lax"`, `secure=False` and `path="/"`. Register and login set it; logout deletes it.
- `get_current_user` returns 401 `"Not authenticated"` when the cookie is missing, the token is invalid, or the user is unknown.
- Emails are lowercased on register and on login.

### Judge0 integration (`app/services/judge0_service.py`)
- `execute_submission(source_code, stdin=None, *, limits=None)` sends `POST {JUDGE0_URL}/submissions?base64_encoded=true&wait=true` with a 10 s timeout. The output fields come back base64-decoded.
- Env: `JUDGE0_URL` (default `http://localhost:2358`) and `LANGUAGE_ID` (default `54`). Docker Compose sets `http://server:2358`.
- Transport errors become `HTTPException`: 504 on timeout, 502 on connection, HTTP-status or validation errors, and 500 on anything else.
- **Problem submissions** (`submission_service.submit_solution`):
  - Runs the tests in `id` order, one Judge0 call each, without explicit limits.
  - Maps statuses by **description** through `map_judge0_status`, which raises `ValueError` for any status it doesn't map.
  - Output comparison is `strip()` equality. An Accepted run with a different output becomes Wrong Answer.
  - Stops after the first verdict other than Accepted or Wrong Answer; the remaining tests become `not_run`.
  - Hidden tests return no input, expected output or actual output. Compilation errors return no actual output.
  - Persists one `UserSubmission`.
- **Assessment grading:**
  - Injects the fragment into a harness at `{{CODE}}` and passes explicit limits (network disabled).
  - Maps statuses by **id**.
  - A Judge0 failure becomes 503, and the attempt stays editable.
  - Never returns Judge0 output or the harness to the client.

### Error handling
- Services raise `fastapi.HTTPException` directly.
- 404 for missing or unpublished resources; 409 for conflicts (duplicate email or username, onboarding not done, attempt already submitted); 401 for auth; 422 for validation.
- Existing messages are English in auth, content and submissions, and Romanian in onboarding and assessments. Follow the language of the module you are editing.

---

## 4. Frontend architecture

### Framework and routing (`frontend/app/`)
| Route group | Layout | Pages |
|---|---|---|
| `(public)` | `PublicHeader` | `/` (landing), `/login`, `/register` |
| `(platform)` | `AppShell` = `Sidebar` + `Topbar` | `/dashboard`, `/chapters`, `/chapters/[chapterSlug]`, `/chapters/[chapterSlug]/lessons/[lessonSlug]`, `/problems`, `/problems/[problemId]` (**the param holds a slug**), `/compiler`, `/harta-materiei`, `/profile` (placeholder) |
| `(onboarding)` | none | `/onboarding` |
| `(assessment)` | none | `/assessment/start`, `/assessment/initial`, `/assessment/result` |

There is no Next middleware. Access control happens client-side per page: the dashboard and onboarding pages redirect themselves, and the assessment pages use `components/assessment/AssessmentRouteGuard.tsx`. A 401 redirects to `/login`; incomplete onboarding redirects to `/onboarding`.

### API communication
- `services/api.ts` `apiFetch<T>(path, options)`:
  - prefixes `NEXT_PUBLIC_API_URL` and throws at import if it is missing;
  - always sends `credentials: "include"` and a JSON content type;
  - turns a non-2xx response into `ApiError(status, message)`, taking the message from FastAPI's `detail` (string, or the first validation `msg`);
  - returns `undefined` for 204.
- One service per domain: `authService`, `chapterService`, `lessonService`, `problemService`, `submissionService`, `onboardingService`, `assessmentService`. Each declares snake_case `*ApiResponse` types and maps them to camelCase types.
  - Exception: `getAssessmentResult` returns the raw snake_case `AssessmentResult` from `types/assessment.ts`.
- Call the backend only through these services, never with raw `fetch` in components.

### Data fetching and state
- Content pages (chapters, chapter, lesson, problems, problem) are **async Server Components** that call services directly and turn `ApiError` 404 into `notFound()`.
  - The browser's auth cookie is **not** forwarded from Server Components, so per-user data needs a client component.
- Interactive and authenticated UI is `"use client"` with `useState`/`useEffect`: `Topbar`, `ProblemWorkspace`, `CompilerWorkspace`, dashboard, onboarding and assessment pages.
  - Async effects use the cancellation guard `let isCurrent = true; … return () => { isCurrent = false; }`.
- `Topbar` loads `/auth/me` again on each pathname change.
- There is no global state library and no React context for auth.
- `sessionStorage` holds assessment answer drafts only (`assessment-drafts-<attemptId>`).

### Components
- Editor pieces (`components/editor/`): `CodeEditor`, `StandardInput`, `Console`, `RunButtons`. They are shared by `CompilerWorkspace` and `ProblemWorkspace`.
- Problem pieces (`components/problem/`): `ProblemStatement`, `ProblemExamples`, `Constraints`, `ProblemTable`, `SubmitResult`.
- Chapter pieces (`components/chapter/`): `ChapterCard`, `LessonItem`, `ElementaryAlgorithmSections`, `ProgressBar`.
- Lesson rendering: `components/lesson/LessonContent.tsx` renders Markdown and gives h1–h3 headings ids slugified from their text (diacritics removed).
  - The lesson page chooses interactive `*Visualizer` components by exact chapter/lesson slug.
  - For some lessons it splits the Markdown at exact `## …` heading strings.
- Curriculum map: `lib/bacCurriculum.ts` is a hand-maintained tree of labels and hrefs, including `#heading-anchor`s, rendered by `components/curriculum/CurriculumMap.tsx`.

### Styling
- Tailwind utility classes inline. The dark palette uses the `#06101d` / `#050d18` background, slate text, emerald accents and `rounded-xl` bordered cards (`border-slate-800 bg-slate-900/60`).
- There is one CSS module (`CurriculumMap.module.css`) plus `app/globals.css`. Fonts are Geist and Geist Mono.
- UI copy is in Romanian.
- Imports are **relative** (`../../services/...`). The `@/*` alias is configured but unused.

### Lessons, chapters, problems, progress (current state)
- Chapters and lessons come from the API and are identified by slug. The UI maps slug → `id` in `types/chapter.ts`.
- `chapterService.getChapterLessons` re-orders 4 intro lessons for `bazele-programarii-in-cpp` on the client.
- Empty lesson `content` renders a "în curs de pregătire" message.
- Problems are listed with `/problems/` and opened by slug. Submission uses `problem.id`.
- **Progress is not implemented.**
  - The chapter pages hardcode `completed: false`.
  - `/profile` is a placeholder.
  - The only per-user learning data is `user_submissions` (write-only today) and the assessment result and plan.

---

## 5. Database

### Models and relationships
- `Chapter` 1–N `Lesson` (unique `(chapter_id, slug)`); `Chapter` 1–N `Problem`.
- `Problem` 1–N `ProblemTest` (`is_hidden`); `Problem` 1–N `UserSubmission`.
- `User` 1–N `UserSubmission`; `User` 1–1 `UserProfile` (`user_id` unique).
- `Assessment` 1–N `AssessmentQuestion` (unique `(assessment_id, display_order)`); `Assessment` 1–N `AssessmentAttempt`.
- `AssessmentAttempt` 1–N `AssessmentAnswer` (unique `(attempt_id, question_id)`).
- `AssessmentConcept` has a string key as primary key. It links to content through `chapter_slug`/`lesson_slug`, **not foreign keys**.
- `PersonalizedPlan` 1–1 `AssessmentAttempt`; `items` and `context` are JSON snapshots.
- No ORM cascades are configured.

### Schema management (two paths; keep them in sync)
1. `Base.metadata.create_all()` runs when `app.main` is imported. It creates missing tables but **never alters existing ones**. Tests rely only on this path.
2. `migrations/NNN_description.sql` are hand-written, idempotent where possible (`IF NOT EXISTS`, wrapped in `BEGIN/COMMIT`), and applied manually. For example:
   ```sh
   docker compose exec -T api_database sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < migrations/0NN_name.sql
   ```
   There is no Alembic and no applied-migrations table. Numbers 002 and 004 are no longer present.

Any schema change needs **both** an ORM change and a new numbered SQL migration, and requires explicit approval first. Some constraints exist only in SQL (the `user_profiles` CHECK constraints and the `ix_assessment_attempts_user` index). Keep them when writing migrations.

### Conventions to preserve
- Slugs are the stable public identifiers. The same slugs are repeated by hand in:
  - `app/seed.py`
  - `content/lessons/**` filenames
  - `frontend/lib/bacCurriculum.ts` (including heading anchors)
  - the lesson page's visualizer switches and heading-split strings
  - `chapterService`'s intro order list
  - `frontend/lib/elementaryAlgorithmCategories.ts`
  - `content/assessments/initial.json`

  Changing a slug or a lesson heading means searching and updating all of them.
- The seed matches rows by slug and never deletes. Retired lessons are unpublished (`is_published=False`), not removed.
- Seeded `ProblemTest` rows are inserted only when the problem is first created.
- Assessment attempts store a private `question_snapshot` (including `grading_config`), so later content changes don't affect started attempts.
- Private grading data (answers, hidden tests, harness) must never reach any API response.
- Status and state strings (`IN_PROGRESS`/`SUBMITTED`, `answered`/`not_learned`/`unanswered`, `NOT_STARTED`/`DEFERRED`/`IN_PROGRESS`/`COMPLETED`) are enforced by CHECK constraints. Don't invent new values without a migration.

---

## 6. Testing and validation

### Docker / running the stack
Run these from the repo root. They need the root `.env` and `judge0/judge0.conf`. Never print or commit either file.
```sh
docker compose up --build                                   # api, Judge0 server/worker, redis, db, api_database
docker compose exec api python -m app.seed                  # full idempotent seed
docker compose exec api python -m app.seed --learning-content-only
docker compose exec api python -m app.seed --assessment-only
docker compose --profile test up -d test_database           # isolated test DB on host port 5434 (tmpfs)
```

### Backend tests (pytest; no pytest.ini or pyproject)
```sh
pytest                                  # from repo root
pytest tests/test_submissions.py -v     # single file
```
- `tests/conftest.py` sets `DATABASE_URL` from `TEST_DATABASE_URL`, which defaults to `postgresql+psycopg2://test_user:test_password@localhost:5434/app_database_test`. It does this **before** importing the app.
- It refuses to run unless the database name ends in `_test`.
- Each test drops and recreates all tables, then seeds fixed rows with explicit IDs (user `test@example.com` / `test-password`, chapter 1, lesson 1, problem 1 with 5 tests).
- Fixtures: `db_session`, `client` (overrides `get_db`), `authenticated_client` (logs in through `/auth/login`).
- Judge0 is replaced with `monkeypatch.setattr(judge0_service, "execute_submission", fake)`. The fakes take `(source_code, stdin)`.
- The `test_real_judge0_*` tests in `tests/test_submissions.py` call a real Judge0 and aren't skipped automatically.
- Unverified: whether pytest is meant to run from the host venv or inside the `api` container. The default test URL uses `localhost:5434`, which works from the host.

### Frontend (`frontend/package.json`)
```sh
cd frontend
npm run dev       # next dev
npm run build     # next build
npm run lint      # eslint (next core-web-vitals + typescript configs)
npm run start
npm run video:studio / npm run video:render   # Remotion, marketing only
```
- There are **no frontend tests** and **no dedicated type-check script**. `tsconfig` is `strict` with `noEmit`, and `next build` performs type checking.
- There is no CI configuration in the repo.

---

## 7. Engineering rules (mandatory)

- Treat this repository as an existing application. The repository is the source of truth.
- Understand existing code before modifying it. Search for existing implementations before creating new ones.
- Follow existing architectural and naming patterns (for example, ORM classes in `app/database/schemas/`, Pydantic in `app/models/`, logic in `app/services/`, API calls in `frontend/services/` with snake→camel mapping).
- Prefer extending existing functionality over replacing it. Reuse existing components, schemas, services and utilities when appropriate.
- Keep changes strictly scoped to the requested task. Do not perform unrelated refactoring, even of known inconsistencies.
- Before modifying shared code (`apiFetch`, `judge0_service`, `get_current_user`, `conftest.py` fixtures, `LessonContent`, slugs), search for all usages and understand the impact.
- Preserve existing API contracts (paths, field names, status codes, `Verdict` strings, response shapes) unless a change is explicitly required.
- Do not change database schemas casually. See §5 for the required ORM + SQL-migration pair and approval.
- Do not introduce dependencies when the existing stack can reasonably solve the problem.
- Never invent project behavior, models, endpoints, fields or components. Inspect them.
- Prefer the smallest clean implementation that solves the problem. Maintain backward compatibility whenever practical, including legacy enum values and existing DB rows.
- Follow existing UI/UX patterns (dark Tailwind palette, Romanian copy, the loading, error and redirect patterns above) rather than creating inconsistent interfaces.
- When implementing functionality in an existing page or component, preserve the current visual design, layout, spacing, navigation and UX unless the task explicitly requests a redesign.
- Do not redesign existing pages as a side effect of implementing functionality.
- Never expose secrets or commit `.env`, `frontend/.env.local` or `judge0/judge0.conf` values. Don't echo `DATABASE_URL` or `AUTH_SECRET_KEY` in output.
- Respect `AGENTS.md` (the „bacul”/„BACUL” rule and `MARKETING.md` for promotional copy).

## 8. Workflow for every feature

Before implementing a non-trivial feature:
1. Inspect the relevant existing code.
2. Identify reusable code and existing patterns.
3. Identify affected files and dependencies.
4. Consider backend, frontend, database and API implications.
5. Consider possible regressions.
6. Propose a concise implementation plan.
7. For significant architectural changes, wait for approval before implementing.
8. Implement the smallest coherent change.
9. Run the relevant existing tests (`pytest …`).
10. Run the available lint and build checks when applicable (`npm run lint`, `npm run build`).
11. Review the final diff (`git diff`) for unintended changes.

After implementation, report:
- files created
- files modified
- what changed
- tests and checks executed
- their results (report failures as they are, including failures that already existed before the change)
- anything that should be verified manually (for example, flows that need the Docker stack, a real Judge0, migrations or a re-seed)

## 9. Safety rules

Never:
- delete files unless explicitly necessary and justified;
- modify unrelated functionality;
- silently change API contracts;
- silently change database structure;
- disable, skip or weaken tests to make them pass;
- remove validation to solve an error (including `extra="forbid"`, Pydantic field constraints and the assessment public-config whitelist);
- hardcode secrets;
- replace working architecture simply because another approach seems cleaner;
- perform large refactors as part of an unrelated feature.

If a requested feature conflicts with the existing architecture or requires a risky architectural change (for example, adding Alembic, moving auth to middleware, making judging asynchronous, or changing identifiers from slugs to ids), explain the issue before implementing it.
