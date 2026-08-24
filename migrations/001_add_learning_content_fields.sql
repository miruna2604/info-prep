ALTER TABLE chapters
    ADD COLUMN IF NOT EXISTS slug VARCHAR,
    ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE chapters
SET slug = 'chapter-' || id
WHERE slug IS NULL;

ALTER TABLE chapters
    ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ix_chapters_slug
    ON chapters (slug);

ALTER TABLE lessons
    ADD COLUMN IF NOT EXISTS slug VARCHAR,
    ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE lessons
SET slug = 'lesson-' || id
WHERE slug IS NULL;

ALTER TABLE lessons
    ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_lesson_chapter_slug
    ON lessons (chapter_id, slug);
