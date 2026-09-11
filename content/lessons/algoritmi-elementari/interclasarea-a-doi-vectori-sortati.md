## Trei pointeri

Vectorii `a` și `b` trebuie să fie sortați. `i` indică următorul element nefolosit din `a`, `j` următorul element din `b`, iar `k` poziția liberă din rezultatul `c`.

Cât timp ambii vectori mai au elemente, comparăm `a[i]` cu `b[j]` și copiem valoarea mai mică în `c[k]`. Avansăm numai pointerul vectorului din care am copiat, apoi avansăm `k`.

Când unul dintre vectori se termină, comparațiile nu mai sunt necesare. Copiem pe rând toate elementele rămase din celălalt vector. Rezultatul rămâne sortat deoarece alegem permanent cea mai mică valoare disponibilă.
