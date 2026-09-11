## 1. Algoritmul lui Euclid cu împărțiri

Pentru a afla cel mai mare divizor comun, calculăm repetat restul `r = a % b`, apoi mutăm valorile: `a = b`, `b = r`. Când `b` ajunge la `0`, valoarea rămasă în `a` este CMMDC.

Această metodă înlocuiește perechea `(a, b)` cu `(b, a % b)`. CMMDC-ul nu se schimbă, deoarece divizorii comuni ai lui `a` și `b` sunt aceiași cu divizorii comuni ai lui `b` și ai restului `a % b`.

## 2. Algoritmul lui Euclid cu scăderi

Există și o variantă care folosește numai scăderi. Cât timp numerele sunt diferite, îl scădem pe cel mai mic din cel mai mare:

- dacă `a > b`, înlocuim `a` cu `a - b`;
- altfel, înlocuim `b` cu `b - a`;
- când `a == b`, valoarea comună este CMMDC.

De ce este corect? Dacă un număr divide atât `a`, cât și `b`, atunci divide și diferența `a - b`. Invers, un divizor comun al lui `a - b` și `b` îl divide și pe `(a - b) + b = a`. Prin urmare, scăderea nu modifică mulțimea divizorilor comuni.

Exemplu pentru `a = 24`, `b = 18`: `(24, 18) → (6, 18) → (6, 12) → (6, 6)`. Când valorile devin egale, CMMDC este `6`.
