# Arhitectura
```text
                 Chapters
                 /      \
                /        \
               ▼          ▼
          Lessons      Problems
                           │
                           ▼
                    ProblemTests

Users ─────────────► Submissions ◄──────────── Problems
```

## 1. Users

- id
- username
- email
- password_hash
- created_at

## 2. Chapters

- id
- title
- order

## 3. Lessons

- id
- chapter_id (FK)
- title
- video_url
- pdf_url
- order

## 4. Problems

- id
- chapter_id (FK)
- title
- statement
- input_description
- output_description
- sample_input
- sample_output

## 5. Problem tests
- id
- problem_id (FK)
- input
- expected_output
- is_hidden


## 6. Submissions
- id
- user_id (FK)
- problem_id (FK)
- source_code
- status
- created_at



## Intram in PostgreSQL
```bash
docker exec -it infooo-prep-db-1 bash
```
```bash
psql -U judge0 -d judge0
```
