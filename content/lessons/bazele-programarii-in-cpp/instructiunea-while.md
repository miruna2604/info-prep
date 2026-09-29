# Instrucțiunea `while`

Instrucțiunea `while` repetă o instrucțiune sau un bloc de instrucțiuni **cât timp o condiție este adevărată**.

Forma generală este:

```cpp
while (conditie) {
    instructiuni;
}
```

O putem citi simplu:

```text
CÂT TIMP condiția este adevărată
    execută instrucțiunile
```

---

# Cum funcționează?

Exemplu:

```cpp
int x = 1;

while (x <= 5) {
    cout << x << " ";
    x++;
}
```

Să urmărim execuția:

```text
x = 1 → true  → afișează 1 → x devine 2
x = 2 → true  → afișează 2 → x devine 3
x = 3 → true  → afișează 3 → x devine 4
x = 4 → true  → afișează 4 → x devine 5
x = 5 → true  → afișează 5 → x devine 6
x = 6 → false → STOP
```

Se afișează:

```text
1 2 3 4 5
```

Logica unui `while` este:

```text
verifică condiția
       ↓
     true ─────→ execută instrucțiunile
       ↑                    ↓
       └──────── verifică din nou

     false
       ↓
      STOP
```

> **De reținut:** după fiecare repetare, programul se întoarce și verifică din nou condiția.

---

# `while` se poate executa de 0 ori

Condiția este verificată **înainte** de executarea instrucțiunilor.

De exemplu:

```cpp
int x = 10;

while (x < 5) {
    cout << x;
    x++;
}
```

Prima verificare:

```text
10 < 5 → false
```

Condiția este falsă de la început, deci corpul buclei **nu se execută deloc**.

Un `while` se poate executa:

```text
0, 1, 2, 3, ... ori
```

---

# Atenție la bucla infinită

În interiorul unui `while` trebuie, de obicei, să se modifice ceva care influențează condiția.

Corect:

```cpp
int x = 1;

while (x <= 5) {
    cout << x << " ";
    x++;
}
```

`x` crește, iar la un moment dat condiția devine falsă.

Dacă uităm:

```cpp
x++;
```

obținem:

```cpp
int x = 1;

while (x <= 5) {
    cout << x << " ";
}
```

Atunci:

```text
x rămâne 1

1 <= 5 → true
1 <= 5 → true
1 <= 5 → true
...
```

Bucla nu se mai termină.

Aceasta se numește **buclă infinită**.

> Când scrii un `while`, întreabă-te: **ce se modifică astfel încât condiția să devină la un moment dat falsă?**

---

# `if` vs. `while`

Cele două folosesc o condiție, dar au roluri diferite.

```text
if    → verifică și decide o dată

while → verifică și repetă cât timp condiția este adevărată
```

De exemplu:

```cpp
if (x < 5)
    x++;
```

poate executa `x++` o singură dată.

În schimb:

```cpp
while (x < 5)
    x++;
```

repetă `x++` până când condiția devine falsă.

---

# `for` vs. `while`

Ambele instrucțiuni pot repeta operații.

De exemplu:

```cpp
for (int i = 1; i <= 5; i++)
    cout << i << " ";
```

poate fi scris și:

```cpp
int i = 1;

while (i <= 5) {
    cout << i << " ";
    i++;
}
```

Ambele afișează:

```text
1 2 3 4 5
```

Ca idee generală:

```text
for   → foarte potrivit pentru parcurgeri cu un contor

while → foarte potrivit când repetăm cât timp o condiție este adevărată
```

---

# O utilizare importantă: cifrele unui număr

`while` este foarte util atunci când vrem să prelucrăm cifrele unui număr.

Să avem:

```text
n = 538
```

Știm deja că:

```cpp
n % 10
```

obține ultima cifră:

```text
538 % 10 = 8
```

iar:

```cpp
n / 10
```

elimină ultima cifră:

```text
538 / 10 = 53
```

Putem repeta aceste operații **cât timp mai avem cifre**:

```cpp
while (n != 0) {
    int cifra = n % 10;

    // prelucrăm cifra

    n /= 10;
}
```

Pentru `n = 538`:

```text
n = 538 → cifra = 8 → n devine 53
n = 53  → cifra = 3 → n devine 5
n = 5   → cifra = 5 → n devine 0
n = 0   → STOP
```

Observă că cifrele sunt obținute:

```text
8 → 3 → 5
```

adică **de la dreapta la stânga**.

Acesta este un tipar foarte important:

```text
cât timp mai avem cifre
        ↓
extragem ultima cifră
        ↓
o prelucrăm
        ↓
eliminăm ultima cifră
```

> Algoritmii pentru suma cifrelor, numărul cifrelor, cifra maximă și alte prelucrări îi vom construi separat. Pentru moment este important să înțelegi mecanismul buclei.

---

# Cum construim un `while`?

Gândește-te la trei întrebări:

```text
1. Care este starea inițială?

2. CÂT TIMP trebuie să repet?

3. Ce se modifică la fiecare pas?
```

De exemplu:

```cpp
int x = 1;

while (x <= 5) {
    cout << x << " ";
    x++;
}
```

avem:

```text
START      → x = 1

CONDIȚIE   → x <= 5

MODIFICARE → x++
```

Dacă aceste trei lucruri sunt clare, bucla este mult mai ușor de construit și urmărit.

---

# Recapitulare

Forma generală:

```cpp
while (conditie) {
    instructiuni;
}
```

Logica este:

```text
condiție?
   ↓
 true → execută → modifică → verifică din nou
   ↓
 false
   ↓
 STOP
```

Reține:

```text
while → repetă CÂT TIMP condiția este adevărată
```

Condiția este verificată **înainte** de fiecare repetare, deci bucla se poate executa și de `0` ori.

Ai grijă ca ceva să se modifice astfel încât condiția să poată deveni falsă:

```text
altfel → buclă infinită
```

Iar pentru cifrele unui număr, tiparul de bază este:

```cpp
while (n != 0) {
    int cifra = n % 10;

    // prelucrăm cifra

    n /= 10;
}
```

> Ideea esențială: **`while` = repetă cât timp condiția este adevărată.**