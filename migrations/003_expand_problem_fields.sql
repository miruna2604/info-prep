ALTER TABLE problems
    ALTER COLUMN input_description TYPE TEXT,
    ALTER COLUMN output_description TYPE TEXT,
    ALTER COLUMN sample_input TYPE TEXT,
    ALTER COLUMN sample_output TYPE TEXT;

ALTER TABLE problems
    ADD COLUMN IF NOT EXISTS slug VARCHAR,
    ADD COLUMN IF NOT EXISTS subject VARCHAR,
    ADD COLUMN IF NOT EXISTS constraints JSON,
    ADD COLUMN IF NOT EXISTS starter_code TEXT;

UPDATE problems
SET
    slug = 'suma-a-doua-numere',
    subject = 'Sub I',
    constraints = '[
        "-2.000.000.000 ≤ a, b ≤ 2.000.000.000"
    ]'::json,
    starter_code = '#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;

    // Scrie soluția aici

    return 0;
}'
WHERE title = 'Suma a două numere';

UPDATE problems
SET
    slug = 'maximul-dintre-doua-numere',
    subject = 'Sub I',
    constraints = '[
        "-2.000.000.000 ≤ a, b ≤ 2.000.000.000"
    ]'::json,
    starter_code = '#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;

    // Scrie soluția aici

    return 0;
}'
WHERE title = 'Maximul dintre două numere';

UPDATE problems
SET slug = 'problem-' || id
WHERE slug IS NULL;

UPDATE problems
SET subject = 'Sub I'
WHERE subject IS NULL;

UPDATE problems
SET constraints = '[]'::json
WHERE constraints IS NULL;

UPDATE problems
SET starter_code = '#include <iostream>
using namespace std;

int main() {
    // Scrie soluția aici

    return 0;
}'
WHERE starter_code IS NULL;

ALTER TABLE problems
    ALTER COLUMN slug SET NOT NULL,
    ALTER COLUMN subject SET NOT NULL,
    ALTER COLUMN constraints SET NOT NULL,
    ALTER COLUMN starter_code SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ix_problems_slug
    ON problems (slug);