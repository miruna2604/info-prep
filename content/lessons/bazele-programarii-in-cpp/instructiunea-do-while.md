# Instrucțiunea `do...while`

Instrucțiunea `do...while` repetă un bloc de instrucțiuni **cât timp o condiție este adevărată**.

Forma generală este:

```cpp
do {
    instructiuni;
} while (conditie);
```

Diferența importantă față de `while` este că aici **condiția se verifică după executarea instrucțiunilor**.

Așadar, corpul buclei se execută **cel puțin o dată**.

---

# Cum funcționează?

Exemplu:

```cpp
int x = 1;

do {
    cout << x << " ";
    x++;
} while (x <= 5);
```

Execuția este:

```text
x = 1 → afișează 1 → x = 2 → 2 <= 5 → true
x = 2 → afișează 2 → x = 3 → 3 <= 5 → true
x = 3 → afișează 3 → x = 4 → 4 <= 5 → true
x = 4 → afișează 4 → x = 5 → 5 <= 5 → true
x = 5 → afișează 5 → x = 6 → 6 <= 5 → false
                                              ↓
                                             STOP
```

Se afișează:

```text
1 2 3 4 5
```

Logica este:

```text
execută instrucțiunile
        ↓
verifică condiția
        ↓
   true → repetă
        ↓
   false → STOP
```

---

# `while` vs. `do...while`

Aceasta este diferența pe care trebuie să o reții.

### `while`

```cpp
while (conditie) {
    instructiuni;
}
```

```text
verifică → execută
```

Condiția este verificată **înainte**.

Corpul se poate executa de `0` ori.

### `do...while`

```cpp
do {
    instructiuni;
} while (conditie);
```

```text
execută → verifică
```

Condiția este verificată **după**.

Corpul se execută **cel puțin o dată**.

---

# Exemplu important

Să avem:

```cpp
int x = 10;
```

Cu `while`:

```cpp
while (x < 5) {
    cout << x;
}
```

condiția:

```text
10 < 5 → false
```

este falsă de la început, deci nu se afișează nimic.

Cu `do...while`:

```cpp
do {
    cout << x;
} while (x < 5);
```

mai întâi se execută:

```cpp
cout << x;
```

deci se afișează:

```text
10
```

Abia apoi se verifică:

```text
10 < 5 → false
```

și bucla se oprește.

> **De reținut:** `do...while` execută instrucțiunile o dată înainte să verifice prima condiție.

---

# Exemplu practic

`do...while` este util atunci când vrem să citim o valoare **cel puțin o dată** și să repetăm citirea până când aceasta este validă.

De exemplu, citim un număr până când utilizatorul introduce o valoare pozitivă:

```cpp
int x;

do {
    cin >> x;
} while (x <= 0);

cout << x;
```

### Input

```text
-5
0
8
```

Programul citește:

```text
-5 → x <= 0 → true  → citește din nou
 0 → x <= 0 → true  → citește din nou
 8 → x <= 0 → false → STOP
```

### Output

```text
8
```

---

# Atenție la `;`

Sintaxa se termină cu `;` după condiție:

```cpp
do {
    instructiuni;
} while (conditie);
```

Observă:

```cpp
while (conditie);
                 ↑
```

Acel `;` face parte din sintaxa instrucțiunii `do...while`.

---

# Recapitulare

Forma generală:

```cpp
do {
    instructiuni;
} while (conditie);
```

Diferența esențială:

```text
while
→ verifică → execută
→ 0 sau mai multe repetări

do...while
→ execută → verifică
→ 1 sau mai multe repetări
```

Reține și:

```text
do...while → condiția este verificată la final
```

și nu uita `;`:

```cpp
} while (conditie);
```

> Ideea esențială: **`do...while` este alegerea naturală atunci când instrucțiunile trebuie executate cel puțin o dată.**