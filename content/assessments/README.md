# Evaluarea inițială

`initial.json` este sursa seed-ului, nu un fișier livrat frontendului. După import,
întrebările, opțiunile, conceptele, regulile, testele ascunse și punctele sunt în DB.
Modificările ulterioare se aplică la seed; încercările deja începute păstrează un
snapshot privat al întrebărilor și al corectării.

## Pornire / actualizare locală

Din rădăcina proiectului, cu Docker disponibil:

```sh
docker compose up -d api_database
docker compose exec -T api_database sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < migrations/009_add_initial_assessments.sql
docker compose exec -T api_database sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < migrations/010_functional_initial_assessment.sql
docker compose up -d --build
docker compose exec api python -m app.seed --assessment-only
```

Migrațiile anterioare pentru utilizatori/onboarding trebuie să fie deja aplicate.
Migrația 009 poate fi omisă dacă shell-ul evaluării există deja. Migrația 010 și
seed-ul sunt idempotente. Nu șterg încercările sau rezultatele istorice.

Într-un alt terminal:

```sh
cd frontend
npm run dev
```

Autentificare + onboarding, apoi `/assessment/start` → `/assessment/initial` →
`/assessment/result?attempt=<id>`. `/assessment/result` arată cel mai recent
rezultat trimis. Planul este afișat și la `/dashboard`.

## Persistență și API

- `assessment_questions`: enunț, tip, ordine, puncte, allow_not_learned,
  opțiuni/config public, referințe la concepte și config privat de corectare.
- `assessment_concepts`: catalogul conceptelor, prerechizite și parametri de
  prioritizare (clasă recomandată, ponderi pe profil, importanță).
- `assessment_attempts.question_snapshot`: snapshot privat; `result`: puncte,
  assessment_score, distribuția rezultatelor, evidence și feedback pe item.
- `assessment_answers`: starea de participare (`answered`, `not_learned`,
  `unanswered`), răspunsul și `evaluation` separată. Un răspuns greșit păstrează
  `state=answered`, iar `evaluation.outcome=incorrect`; erorile de compilare
  au `outcome=compilation_error`.
- `personalized_plans`: un plan per attempt, contextul onboarding folosit și
  pașii ordonați în JSON (concept, capitol, motiv, status, prioritate, rută).

`POST /assessments/initial/attempts` reia încercarea netrimisă sau creează una;
returnează întrebările snapshot-ului fără corectare/teste/punctaj.
`PUT /assessments/attempts/{id}/answers/{question_id}` salvează un răspuns.
`POST /assessments/attempts/{id}/submit` corectează atomic și este idempotent.
`GET /assessments/attempts/{id}/result` și `GET /assessments/initial/result`
returnează rezultatul numai proprietarului unei încercări trimise.

Încercările vechi de tip placeholder nu primesc automat un scor. La reluarea
unei încercări netrimise fără snapshot, răspunsurile placeholder sunt retrase,
iar întrebările reale sunt încărcate. Încercările trimise vechi rămân păstrate.

## Corectare

- Q1–Q6: compararea ID-ului variantei; Q9: normalizarea whitespace-ului și
  compararea output-ului. Integral sau zero puncte.
- Q7: fragment într-o funcție cu `i`, `s`, `t`; 5 seturi de câte 15 săli;
  comparatorul verifică suma finală, inclusiv inițializarea lui `s`.
- Q8: fragmentul din interiorul buclelor. Lexerul exclude declarațiile și
  identificatorii noi, ignoră comentariile și distinge comparațiile de
  atribuiri; acceptă doar variabilele `a`, `i`, `j`, expresii numerice și
  instrucțiuni de control, cu maximum 3 atribuiri/actualizări. Harness-ul
  verifică toate cele 25 de valori, cu 3 inițializări diferite.
- Q10: definiția completă DNPI; 10 valori de intrare incluzând 1, prime,
  puteri ale lui 2, puteri impare și valori mari. Compararea mulțimilor de
  întregi permite orice ordine a rezultatului.
- Judge0 existent execută codul izolat, cu limite de timp/memorie/output și
  rețeaua dezactivată. Nu se returnează stdout/stderr/compilarea cu harness-ul
  sau datele ascunse. O indisponibilitate Judge0 lasă încercarea netrimisă,
  cu răspunsurile salvate, fără să transforme incidentul într-un răspuns greșit.
- Puncte cod: `points * passed_tests / total_tests`, rotunjire la 2 zecimale.
  `partial_credit` și comparatorul sunt configurabile în DB.
- Scor: suma punctelor / 52 × 100. Nu este mastery și nu modifică nivelul userului.

## Evidence și plan

Corect → `strong_evidence` (indiciu pozitiv limitat la item); greșit/parțial →
`needs_review`; neparcurs → `not_learned`; fără răspuns sau eroare de compilare →
`inconclusive`. Dacă sunt mai multe observații, se agregă prudent. Conceptele
aceluiași exercițiu primesc observații comune, fără a pretinde identificarea
exactă a cauzei greșelii.

Planul include prerechizitele, apoi prioritizează bazele, conceptele neparcurse,
cele de revizuit, consolidarea și dovezile pozitive. Clasa și profilul ajustează
ordinea în aceeași categorie; autoevaluarea din onboarding nu este utilizată
ca mastery. Un concept cu evidence pozitiv nu blochează recapitularea
prerechizitelor altuia. Configurația este în `initial.json` / DB, nu în React.
Se adaugă un link numai dacă lecția și capitolul există și sunt publicate,
iar lecția are conținut. Planul este o recomandare, fără restricții de acces.

Nu au fost pornite servicii sau executate migrațiile/seed-ul pentru implementare.
