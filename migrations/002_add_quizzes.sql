CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER NOT NULL UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    CONSTRAINT uq_quiz_question_order UNIQUE (quiz_id, display_order)
);

CREATE TABLE IF NOT EXISTS quiz_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uq_quiz_option_order UNIQUE (question_id, display_order)
);
