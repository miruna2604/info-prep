## Când ne interesează doar existența

Uneori nu avem nevoie să știm de câte ori apare o valoare, ci numai dacă a apărut cel puțin o dată.

Folosim aceeași idee — valoarea `x` devine index — dar salvăm numai două stări:

- `f[x] = 0`: valoarea `x` nu a apărut;
- `f[x] = 1`: valoarea `x` a apărut.

Pentru fiecare valoare citită executăm `f[x] = 1`. Dacă valoarea apare din nou, poziția era deja `1` și rămâne `1`. Repetările nu schimbă rezultatul deoarece aici memorăm **prezența**, nu frecvența.
