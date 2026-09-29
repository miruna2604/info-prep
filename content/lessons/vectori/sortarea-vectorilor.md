# Sortarea vectorilor

**Sortarea** înseamnă aranjarea elementelor unui vector într-o anumită ordine.

Cel mai des vom sorta:

```text
crescător:    2  4  7  9  12
descrescător: 12  9  7  4  2
```

În această lecție învățăm trei algoritmi clasici:

```text
Bubble Sort
Selection Sort
Insertion Sort
```

Toți ajung la același rezultat, dar **gândesc sortarea diferit**.

---

# Bubble Sort

Ideea Bubble Sort este:

> Comparăm elementele vecine și le interschimbăm dacă sunt în ordinea greșită.

Pentru sortare crescătoare:

```cpp
if (v[j] > v[j + 1]) {
    int aux = v[j];
    v[j] = v[j + 1];
    v[j + 1] = aux;
}
```

Să urmărim:

```text
v = [5, 2, 4, 1]
```

La prima parcurgere:

```text
5  2  4  1
↑  ↑
5 > 2 → schimb

2  5  4  1
   ↑  ↑
5 > 4 → schimb

2  4  5  1
      ↑  ↑
5 > 1 → schimb

2  4  1  5
```

Observă ce s-a întâmplat:

```text
cel mai mare element → 5
                        ↓
                   a ajuns la final
```

După fiecare parcurgere, încă un element ajunge pe poziția sa finală.

De aceea repetăm procesul:

```cpp
for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (v[j] > v[j + 1]) {
            int aux = v[j];
            v[j] = v[j + 1];
            v[j + 1] = aux;
        }
    }
}
```

### Cum îl recunoști?

```text
Bubble Sort
↓
compar VECINI
↓
v[j] și v[j+1]
↓
îi schimb dacă sunt în ordinea greșită
```

---

# Selection Sort

Selection Sort gândește altfel:

> Găsim cel mai mic element din partea nesortată și îl punem pe poziția corectă.

Să avem:

```text
v = [5, 2, 4, 1]
```

Pentru prima poziție căutăm minimul din întregul vector:

```text
5  2  4  1
         ↑
       minim
```

Îl schimbăm cu primul element:

```text
1  2  4  5
↑
poziție rezolvată
```

Apoi căutăm minimul doar în partea rămasă:

```text
1 | 2  4  5
    ↑
   minim
```

`2` este deja unde trebuie.

Continuăm până când vectorul este sortat.

Codul:

```cpp
for (int i = 0; i < n - 1; i++) {
    int pozMin = i;

    for (int j = i + 1; j < n; j++)
        if (v[j] < v[pozMin])
            pozMin = j;

    int aux = v[i];
    v[i] = v[pozMin];
    v[pozMin] = aux;
}
```

Observă rolul lui:

```cpp
int pozMin = i;
```

Nu memorăm doar valoarea minimă, ci **indicele unde se află**, pentru că trebuie să știm ce element interschimbăm cu `v[i]`.

### Cum îl recunoști?

```text
Selection Sort
↓
aleg poziția i
↓
caut MINIMUL din partea rămasă
↓
îl aduc pe poziția i
```

După fiecare pas:

```text
partea sortată | partea nesortată
```

crește cu un element.

---

# Insertion Sort

Insertion Sort construiește treptat o parte sortată a vectorului.

Ideea este:

> Luăm următorul element și îl introducem în locul potrivit printre elementele deja sortate.

Este asemănător cu modul în care ai putea aranja cărți de joc în mână.

Să avem:

```text
5  2  4  1
```

Considerăm primul element deja sortat:

```text
[5] | 2  4  1
```

Luăm `2`.

Pentru a-i face loc, deplasăm `5` la dreapta:

```text
[ _  5 ] | 4  1
```

și introducem `2`:

```text
[2  5] | 4  1
```

Luăm apoi `4`:

```text
[2  5] | 4  1
```

`5` este mai mare, deci îl deplasăm:

```text
[2  _  5] | 1
```

și inserăm `4`:

```text
[2  4  5] | 1
```

Procesul continuă până când întregul vector este sortat.

Codul:

```cpp
for (int i = 1; i < n; i++) {
    int x = v[i];
    int j = i - 1;

    while (j >= 0 && v[j] > x) {
        v[j + 1] = v[j];
        j--;
    }

    v[j + 1] = x;
}
```

Aici:

```text
x → elementul pe care vrem să îl inserăm

j → parcurge spre stânga partea deja sortată
```

Cât timp găsim elemente mai mari decât `x`:

```cpp
v[j + 1] = v[j];
```

le deplasăm la dreapta.

Când găsim locul potrivit:

```cpp
v[j + 1] = x;
```

inserăm elementul.

### Cum îl recunoști?

```text
Insertion Sort
↓
iau următorul element
↓
deplasez la dreapta valorile mai mari
↓
îl inserez în locul potrivit
```

---

# Cum le diferențiezi?

Cele trei sortări ajung la același rezultat, dar mecanismul este diferit:

| Algoritm | Ideea principală |
|---|---|
| **Bubble Sort** | compară elemente vecine și le interschimbă |
| **Selection Sort** | caută minimul și îl aduce pe poziția curentă |
| **Insertion Sort** | introduce fiecare element în partea deja sortată |

Imaginează-le astfel:

```text
BUBBLE
5 2 4 1
↔ ↔ ↔
compar vecinii


SELECTION
5 2 4 1
      ↑
 caut minimul
      ↓
îl aduc în față


INSERTION
2 4 5 | 3
        ↑
      îl inserez
în partea deja sortată
```

---

# Sortarea descrescătoare

Nu avem nevoie de alți algoritmi.

Schimbăm **sensul comparațiilor**.

De exemplu, la Bubble Sort, pentru ordine crescătoare avem:

```cpp
if (v[j] > v[j + 1])
```

Pentru ordine descrescătoare:

```cpp
if (v[j] < v[j + 1])
```

Aceeași idee se aplică și celorlalte sortări: în loc să construim ordinea de la mic la mare, o construim de la mare la mic.

---

# Cum gândești singur algoritmul?

Nu încerca să memorezi trei blocuri mari de cod fără să știi ce fac.

Memorează mai întâi **ideea fiecărei sortări**:

```text
Bubble
→ compar vecinii

Selection
→ caut minimul

Insertion
→ inserez în partea sortată
```

Dacă înțelegi mecanismul, codul devine mult mai ușor de reconstruit.

---

# Recapitulare

```text
BUBBLE SORT
vecini → compar → schimb

SELECTION SORT
poziție → caut minimul → schimb

INSERTION SORT
element → deplasez valorile mai mari → inserez
```

Toate transformă:

```text
5  2  4  1
```

în:

```text
1  2  4  5
```

dar folosesc trei strategii diferite.

> **Ideea esențială:** nu memora codurile ca pe trei formule. Înțelege ce face fiecare algoritm la un pas, apoi repetarea acelui pas produce vectorul sortat.