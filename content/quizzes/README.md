# Conținutul quizurilor

Fiecare quiz are un fișier JSON în directorul capitolului său:

```text
content/quizzes/<chapter-slug>/<lesson-slug>.json
```

Un quiz trebuie să conțină cel puțin o întrebare. Fiecare întrebare trebuie să aibă exact trei variante și exact una dintre ele trebuie să aibă `"is_correct": true`.

Dacă fișierul unei lecții lipsește, quizul ei nu este publicat.

După modificarea unui fișier rulează:

```bash
docker compose exec api python -m app.seed
```
