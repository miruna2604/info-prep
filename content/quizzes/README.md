# Conținutul quizurilor

Fiecare quiz are un fișier JSON în directorul capitolului său:

```text
content/quizzes/<chapter-slug>/<lesson-slug>.json
```

Un quiz trebuie să conțină cel puțin o întrebare. Fiecare întrebare trebuie să aibă 3 sau 4 variante și exact una dintre ele trebuie să aibă `"is_correct": true`.

Dacă fișierul unei lecții lipsește, quizul ei nu este publicat.

După modificarea unui fișier rulează:

```bash
docker compose exec api python -m app.seed
```

Pentru întrebările de bac, adaugă opțional `source` la fiecare întrebare.
Textul se afișează sub enunț; fără acest câmp nu apare o etichetă de sursă.
Completează ediția reală, sesiunea, varianta și numărul exercițiului, după caz.
Exemplu de structură (înlocuiește sursa cu cea reală):

```json
{
  "title": "Expresii C/C++",
  "questions": [
    {
      "text": "Indicați valoarea expresiei C/C++ `20/25*20/2`.",
      "source": "Bac [an] · [sesiune] · [variantă] · Subiectul I, exercițiul 1",
      "options": [
        { "text": "0", "is_correct": true },
        { "text": "0.02", "is_correct": false },
        { "text": "0.08", "is_correct": false },
        { "text": "8", "is_correct": false }
      ]
    }
  ]
}
```

Pentru o bază de date existentă, aplică `migrations/004_add_quiz_question_source.sql`
înainte de pornirea codului actualizat și de rularea seedului.
