# Arhitectura
```text
                users
                   │
                   │ 1:N
                   ▼
             submissions
                   ▲
                   │ N:1
                problems
                   ▲
                   │ N:1
                lessons
                   ▲
                   │ N:1
               chapters
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
- lesson_id (FK)
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

