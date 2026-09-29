# Noțiuni de bază despre vectori

Un **vector** ne permite să memorăm mai multe valori de același tip sub același nume.

De exemplu, în loc să folosim 5 variabile:

```cpp
int a, b, c, d, e;
```

putem folosi un singur vector:

```cpp
int v[5];
```

Fiecare element are un **indice** prin care îl putem accesa:

```text
indice:    0     1     2     3     4
           ↓     ↓     ↓     ↓     ↓
valoare:   7    12     4     9    20

          v[0]  v[1]  v[2]  v[3]  v[4]
```

> În C++, indexarea standard începe de la `0`.

---

# Declararea unui vector

Forma generală este:

```cpp
tip nume[dimensiune];
```

De exemplu:

```cpp
int v[100];
```

înseamnă:

```text
int  → tipul elementelor
v    → numele vectorului
100  → numărul maxim de elemente
```

Vectorul are indicii:

```text
0, 1, 2, ..., 99
```

Observă regula:

```text
100 elemente → indici 0 ... 99
```

Ultimul indice este cu `1` mai mic decât dimensiunea vectorului.

---

# Dimensiunea vectorului și `n`

În probleme vom întâlni foarte des:

```cpp
int n;
int v[100];
```

Aici:

```text
v[100] → avem spațiu pentru maximum 100 de elemente
n      → numărul de elemente pe care le folosim efectiv
```

Dacă:

```text
n = 5
```

folosim doar:

```text
v[0]  v[1]  v[2]  v[3]  v[4]
```

chiar dacă vectorul a fost declarat cu dimensiunea `100`.

---

# Accesarea elementelor

Un element este accesat prin:

```cpp
v[indice]
```

Dacă avem:

```text
indice:    0     1     2     3     4
           ↓     ↓     ↓     ↓     ↓
valoare:   7    12     4     9    20
```

atunci:

```text
v[0] → 7
v[1] → 12
v[2] → 4
v[3] → 9
v[4] → 20
```

Putem folosi un element ca pe o variabilă obișnuită:

```cpp
cout << v[2];
```

Output:

```text
4
```

Îi putem și modifica valoarea:

```cpp
v[2] = 10;
```

Vectorul devine:

```text
7  12  10  9  20
```

---

# Indice vs. poziție

La indexarea de la `0`, **indicele** și **poziția** nu sunt același lucru:

```text
poziție:   1     2     3     4     5
indice:    0     1     2     3     4
           ↓     ↓     ↓     ↓     ↓
valoare:   7    12     4     9    20
```

Așadar:

```text
primul element       → v[0]
al doilea element    → v[1]
al treilea element   → v[2]
...
elementul de poziție k → v[k-1]
```

De exemplu:

```text
elementul de pe poziția 3
             ↓
            v[2]
             ↓
             4
```

> **Atenție:** dacă problema vorbește despre „poziția” unui element, verifică dacă aceasta trebuie transformată în indice.

---

# Indexare de la `0` vs. indexare de la `1`

În probleme poți întâlni ambele variante.

## De la `0`

Pentru `n = 5`:

```text
indice:    0     1     2     3     4
           ↓     ↓     ↓     ↓     ↓
valoare:   7    12     4     9    20
```

Avem:

```text
primul  → v[0]
ultimul → v[n-1]
```

și parcurgem:

```cpp
for (int i = 0; i < n; i++)
```

---

## De la `1`

Putem alege să folosim:

```text
indice:    1     2     3     4     5
           ↓     ↓     ↓     ↓     ↓
valoare:   7    12     4     9    20
```

Atunci:

```text
primul  → v[1]
ultimul → v[n]
```

și parcurgem:

```cpp
for (int i = 1; i <= n; i++)
```

Comparația importantă este:

| Indexare | Primul element | Ultimul element | Parcurgere |
|---|---|---|---|
| de la `0` | `v[0]` | `v[n-1]` | `i = 0; i < n; i++` |
| de la `1` | `v[1]` | `v[n]` | `i = 1; i <= n; i++` |

Ambele variante pot fi folosite dacă vectorul este declarat suficient de mare.

În lecțiile noastre vom folosi în principal **indexarea standard de la `0`**.

> **Important:** nu combina cele două variante. Dacă începi de la `0`, mergi până la `n-1`. Dacă începi de la `1`, mergi până la `n`.

---

# Citirea unui vector

Să presupunem că inputul este:

```text
5
8 3 12 6 9
```

Prima valoare reprezintă numărul de elemente:

```cpp
cin >> n;
```

Apoi citim cele `n` elemente:

```cpp
for (int i = 0; i < n; i++)
    cin >> v[i];
```

Urmărește ce se întâmplă:

```text
i = 0 → cin >> v[0] → 8
i = 1 → cin >> v[1] → 3
i = 2 → cin >> v[2] → 12
i = 3 → cin >> v[3] → 6
i = 4 → cin >> v[4] → 9
```

După citire:

```text
indice:    0   1   2   3   4
           ↓   ↓   ↓   ↓   ↓
vector:    8   3  12   6   9
```

Observă de ce condiția este:

```cpp
i < n
```

Pentru `n = 5`, `i` ia exact valorile:

```text
0  1  2  3  4
```

adică exact cei 5 indici de care avem nevoie.

---

# Afișarea unui vector

Afișarea funcționează pe aceeași idee: trecem prin fiecare indice și afișăm elementul corespunzător.

```cpp
for (int i = 0; i < n; i++)
    cout << v[i] << " ";
```

Pentru:

```text
v = [8, 3, 12, 6, 9]
```

outputul este:

```text
8 3 12 6 9
```

Un program complet de citire și afișare arată astfel:

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    int v[100];

    cin >> n;

    for (int i = 0; i < n; i++)
        cin >> v[i];

    for (int i = 0; i < n; i++)
        cout << v[i] << " ";

    return 0;
}
```

---

# Cum trebuie să gândești `i` și `v[i]`

Aceasta este ideea pe care trebuie să o înțelegi foarte bine înainte să mergi mai departe.

În:

```cpp
for (int i = 0; i < n; i++)
    cout << v[i];
```

`i` nu reprezintă valoarea din vector.

`i` reprezintă **indicele**, iar `v[i]` reprezintă **valoarea de la acel indice**.

Pentru:

```text
v = [8, 3, 12, 6, 9]
```

avem:

```text
i = 0  →  v[i] = v[0] = 8
i = 1  →  v[i] = v[1] = 3
i = 2  →  v[i] = v[2] = 12
i = 3  →  v[i] = v[3] = 6
i = 4  →  v[i] = v[4] = 9
```

Gândește-te astfel:

```text
i
↓
UNDE sunt în vector?

v[i]
↓
CE valoare se află acolo?
```

Această diferență este esențială pentru toate problemele cu vectori.

---

# Atenție la limite

Dacă avem `n` elemente indexate de la `0`, ultimul este:

```cpp
v[n-1]
```

De aceea:

```cpp
for (int i = 0; i < n; i++)
```

este corect.

În schimb:

```cpp
for (int i = 0; i <= n; i++)
```

merge cu un pas prea departe.

Pentru `n = 5`:

```text
i < 5

0  1  2  3  4
✓  ✓  ✓  ✓  ✓
```

dar:

```text
i <= 5

0  1  2  3  4  5
✓  ✓  ✓  ✓  ✓  ✗
```

Am încerca să lucrăm și cu `v[5]`, deși cele 5 elemente folosite sunt `v[0] ... v[4]`.

---

# Recapitulare

```text
VECTOR CU n ELEMENTE — INDEXARE DE LA 0

indice:    0      1      2          n-1
           ↓      ↓      ↓           ↓
          v[0]   v[1]   v[2]  ...  v[n-1]
```

```cpp
// declarare
int v[100];

// citire
for (int i = 0; i < n; i++)
    cin >> v[i];

// afișare
for (int i = 0; i < n; i++)
    cout << v[i] << " ";
```

Reține:

```text
i    → indicele
v[i] → valoarea de la acel indice

indexare de la 0 → v[0] ... v[n-1]
indexare de la 1 → v[1] ... v[n]
```

> **Ideea esențială:** un vector este o colecție de valori de același tip, iar fiecare valoare poate fi accesată prin indicele ei.