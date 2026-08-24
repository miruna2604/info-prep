# Conținutul lecțiilor

Fiecare lecție are un fișier Markdown în directorul capitolului său:

```text
content/lessons/<chapter-slug>/<lesson-slug>.md
```

Numele directoarelor și fișierelor trebuie să coincidă cu slugurile definite în `app/seed.py`.

Dacă fișierul unei lecții lipsește, seed-ul salvează `content=""`, iar frontendul afișează lecția ca fiind în pregătire.
