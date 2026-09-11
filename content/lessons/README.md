# Conținutul lecțiilor

Fiecare lecție are un fișier Markdown în directorul capitolului său:

```text
content/lessons/<chapter-slug>/<lesson-slug>.md
```

Numele directoarelor și fișierelor trebuie să coincidă cu slugurile definite în `app/seed.py`.

Dacă fișierul unei lecții lipsește, seed-ul salvează `content=""`, iar frontendul afișează lecția ca fiind în pregătire.

## Lecțiile separate din Bazele programării în C++

Operatorii relaționali, operatorii logici și cele trei structuri repetitive au
lecții și adrese separate. Materialele lor se adaugă în
`content/lessons/bazele-programarii-in-cpp/`:

- `operatori-relationali.md`
- `operatori-logici.md`
- `instructiunea-for.md`
- `instructiunea-while.md`
- `instructiunea-do-while.md`

Până la adăugarea materialului, pagina fiecărei lecții afișează mesajul de
pregătire. Linkurile din capitol și din harta materiei folosesc aceleași sluguri.

Din rădăcina proiectului, cu serviciul `api` pornit, actualizează datele:

```bash
docker compose exec api python -m app.seed
```

Seed-ul identifică lecțiile după slug, păstrează ID-urile existente și retrage
din lista publicată cele două lecții grupate vechi, fără să le șteargă.
Repetarea comenzii nu dublează lecțiile. Nu este necesară o migrare de schemă
sau reconstruirea containerelor pentru această schimbare: codul este montat
în container prin Docker Compose. După seed, reîncarcă pagina capitolului.
