# Instrucțiunea `for`

Instrucțiunea `for` este folosită pentru a **repeta o instrucțiune sau un bloc de instrucțiuni**.

Este foarte potrivită atunci când facem o parcurgere folosind un **contor**.

De exemplu, pentru a afișa numerele de la `1` la `5`:

```cpp
for (int i = 1; i <= 5; i++)
    cout << i << " ";
```

Se afișează:

```text
1 2 3 4 5
```

---

# Cum funcționează?

Forma generală este:

```cpp
for (initializare; conditie; modificare)
    instructiune;
```

În exemplul:

```cpp
for (int i = 1; i <= 5; i++)
    cout << i << " ";
```

avem:

```text
int i = 1  → START: de unde începem

i <= 5     → STOP: cât timp continuăm

i++        → PAS: cum se modifică i
```

Variabila `i` este folosită aici drept **contor**.

---

# Ordinea executării

Să urmărim:

```cpp
for (int i = 1; i <= 3; i++)
    cout << i << " ";
```

Execuția este:

```text
i = 1
  ↓
i <= 3 ?
  ↓ true
afișează 1
  ↓
i++ → i = 2
  ↓
i <= 3 ?
  ↓ true
afișează 2
  ↓
i++ → i = 3
  ↓
i <= 3 ?
  ↓ true
afișează 3
  ↓
i++ → i = 4
  ↓
i <= 3 ?
  ↓ false
STOP
```

Se afișează:

```text
1 2 3
```

> **Important:** inițializarea se execută o singură dată. Condiția este verificată înainte de fiecare repetare, iar modificarea se face după fiecare repetare.

---

# Parcurgere crescătoare

Pentru a parcurge valorile de la `1` la `n`:

```cpp
for (int i = 1; i <= n; i++)
    cout << i << " ";
```

Pentru `n = 5`:

```text
1 2 3 4 5
```

Schema este:

```text
START → 1
STOP  → n
PAS   → +1
```

---

# Parcurgere descrescătoare

Putem merge și invers:

```cpp
for (int i = n; i >= 1; i--)
    cout << i << " ";
```

Pentru `n = 5`:

```text
5 4 3 2 1
```

Schema devine:

```text
START → n
STOP  → 1
PAS   → -1
```

---

# Pasul poate fi diferit de `1`

Nu suntem obligați să folosim doar:

```cpp
i++
```

De exemplu:

```cpp
for (int i = 2; i <= 10; i += 2)
    cout << i << " ";
```

afișează:

```text
2 4 6 8 10
```

Aici contorul crește din `2` în `2`.

---

# `for` împreună cu `if`

În interiorul unei bucle putem folosi instrucțiunile deja învățate.

De exemplu, afișăm doar numerele pare de la `1` la `n`:

```cpp
for (int i = 1; i <= n; i++)
    if (i % 2 == 0)
        cout << i << " ";
```

Pentru:

```text
n = 7
```

se afișează:

```text
2 4 6
```

Logica este:

```text
parcurgem fiecare valoare
          ↓
     verificăm condiția
          ↓
dacă este adevărată → o prelucrăm
```

Acest tipar va apărea foarte des în probleme.

---

# Mai multe instrucțiuni

Dacă vrem să repetăm mai multe instrucțiuni, folosim acolade:

```cpp
for (int i = 1; i <= 3; i++) {
    cout << "Valoare: ";
    cout << i << "\n";
}
```

Fără `{ }`, `for` controlează **o singură instrucțiune**.

---

# Atenție la limite

Există o diferență importantă între:

```cpp
for (int i = 1; i <= 5; i++)
```

și:

```cpp
for (int i = 1; i < 5; i++)
```

Prima parcurge:

```text
1 2 3 4 5
```

A doua:

```text
1 2 3 4
```

Pentru că:

```text
<= → include limita
<  → se oprește înaintea ei
```

---

# Cum construim un `for`?

Să presupunem că vrem să afișăm numerele de la `3` la `10`.

Ne punem trei întrebări:

```text
1. De unde pornesc?  → 3

2. Până unde merg?   → 10

3. Cu ce pas?        → +1
```

Apoi scriem:

```cpp
for (int i = 3; i <= 10; i++)
    cout << i << " ";
```

Gândește un `for` astfel:

```text
START → STOP → PAS
```

---

# Recapitulare

Forma generală:

```cpp
for (initializare; conditie; modificare)
    instructiune;
```

Cele trei componente răspund la:

```text
START → de unde pornesc?

STOP  → cât timp continui?

PAS   → cum modific contorul?
```

Cele mai întâlnite parcurgeri sunt:

```cpp
// crescător
for (int i = 1; i <= n; i++)

// descrescător
for (int i = n; i >= 1; i--)
```

Iar dacă vrem să prelucrăm doar anumite valori:

```cpp
for (...) {
    if (conditie) {
        // prelucrare
    }
}
```

> Ideea esențială: **`for` = START → STOP → PAS.**