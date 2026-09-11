## 1. Toți divizorii unui număr

Un număr natural `d` este divizor al lui `n` dacă împărțirea este exactă, adică `n % d == 0`.

Pentru `n = 12`, divizorii sunt `1, 2, 3, 4, 6, 12`. Îi putem găsi verificând fiecare valoare de la `1` la `n`.

Valorile `1` și `n` se numesc **divizori improprii**. Ele divid orice număr natural și sunt incluse în lista tuturor divizorilor.

## 2. Divizorii proprii

Divizorii proprii sunt toți divizorii diferiți de `1` și de `n`. Pentru `12`, aceștia sunt `2, 3, 4, 6`.

De aceea începem parcurgerea cu `d = 2` și ne oprim înainte de `n`, folosind condiția `d < n`.

## 3. Metoda eficientă: verificăm numai până la √n

Divizorii apar în perechi. Dacă `d` divide `n`, atunci și `n / d` divide `n`, deoarece `d × (n / d) = n`.

Pentru `n = 36`, perechile sunt:

- `1 × 36`;
- `2 × 18`;
- `3 × 12`;
- `4 × 9`;
- `6 × 6`.

Nu trebuie să continuăm după `√n`. Dacă ambii factori ai unei perechi ar fi mai mari decât `√n`, produsul lor ar fi mai mare decât `n`, ceea ce este imposibil. Prin urmare, fiecare pereche are cel puțin un factor mai mic sau egal cu `√n`.

În cod folosim condiția `d * d <= n`, evitând calculele cu numere reale. Când găsim `d`, obținem imediat și perechea `n / d`.

La un pătrat perfect, precum `36`, pentru `d = 6` avem `d == n / d`. Afișăm `6` o singură dată, nu de două ori.
