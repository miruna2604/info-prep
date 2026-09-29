# Secvențe în vector

O **secvență** este formată din elemente aflate pe **poziții consecutive** în vector.

De exemplu:

```text
v = [4, 7, 7, 7, 2, 5]
        └─────┘
         secvență
```

Cele trei valori `7` formează o secvență deoarece apar una după alta.

> **Important:** la secvențe contează elementele **consecutive**, nu doar faptul că anumite valori există în vector.

În această lecție vom urmări secvențe de:
- elemente egale;
- elemente în ordine crescătoare;
- elemente în ordine descrescătoare;
- și vom vedea cum găsim **cea mai lungă secvență**.

---

# Ideea din spatele problemelor cu secvențe

În majoritatea problemelor, trebuie să comparăm elementul curent cu **elementul anterior**:

```text
v[i - 1]    v[i]
    ↑         ↑
 anterior    curent
```

De aceea, parcurgerea începe de obicei de la:

```cpp
i = 1
```

Astfel putem compara:

```cpp
v[i]
```

cu:

```cpp
v[i - 1]
```

fără să ieșim din vector.

---

# Secvență de elemente egale

Să avem:

```text
v = [2, 5, 5, 5, 3, 3, 8]
```

Secvențele de valori egale sunt:

```text
[2] [5, 5, 5] [3, 3] [8]
```

Pentru a vedea dacă secvența continuă, comparăm două elemente consecutive:

```cpp
v[i] == v[i - 1]
```

De exemplu:

```text
5  5
↑  ↑
egale → secvența continuă
```

dar:

```text
5  3
↑  ↑
diferite → secvența s-a terminat
```

---

# Secvență crescătoare

O secvență este **strict crescătoare** dacă fiecare element este mai mare decât cel anterior.

Exemplu:

```text
2  5  8  11
   ↑  ↑   ↑
   >  >   >
```

Condiția este:

```cpp
v[i] > v[i - 1]
```

În vectorul:

```text
v = [7, 2, 5, 8, 3, 6]
```

avem:

```text
7 | 2  5  8 | 3  6
      ↑  ↑      ↑
      >  >      >
```

Secvența:

```text
2 5 8
```

este crescătoare.

> **Atenție:** dacă cerința spune **strict crescătoare**, două valori egale întrerup secvența.

```text
2  5  5  8
      ↑
   nu mai crește strict
```

Dacă problema spune **crescătoare în sens larg / nedescrescătoare**, condiția devine:

```cpp
v[i] >= v[i - 1]
```

Citește cu atenție formularea cerinței.

---

# Secvență descrescătoare

Ideea este aceeași, dar comparația se inversează.

O secvență strict descrescătoare respectă:

```cpp
v[i] < v[i - 1]
```

Exemplu:

```text
9  7  4  2
   ↓  ↓  ↓
   <  <  <
```

În:

```text
v = [3, 9, 7, 4, 8]
```

secvența:

```text
9 7 4
```

este strict descrescătoare.

---

# Cea mai lungă secvență

Aici apare modelul important.

Să căutăm **lungimea celei mai lungi secvențe de elemente egale**.

Pentru:

```text
v = [2, 5, 5, 5, 3, 3, 8]
```

avem:

```text
[2] [5, 5, 5] [3, 3] [8]

 1       3        2     1
```

Răspunsul este:

```text
3
```

Pentru a rezolva problema avem nevoie de două variabile:

```cpp
int lung = 1;
int maxim = 1;
```

Gândește-le astfel:

```text
lung  → lungimea secvenței în care mă aflu ACUM
maxim → cea mai mare lungime găsită PÂNĂ ACUM
```

---

# Cum construim algoritmul?

Pornim de la primul element:

```text
orice element singur formează o secvență de lungime 1
```

de aceea:

```cpp
int lung = 1;
int maxim = 1;
```

Apoi comparăm fiecare element cu precedentul.

Dacă sunt egale:

```cpp
if (v[i] == v[i - 1])
    lung++;
```

Secvența continuă.

Dacă nu sunt egale:

```cpp
else
    lung = 1;
```

începe o secvență nouă, formată momentan doar din elementul curent.

După fiecare pas verificăm dacă am obținut un nou maxim:

```cpp
if (lung > maxim)
    maxim = lung;
```

Algoritmul complet:

```cpp
int lung = 1;
int maxim = 1;

for (int i = 1; i < n; i++) {
    if (v[i] == v[i - 1])
        lung++;
    else
        lung = 1;

    if (lung > maxim)
        maxim = lung;
}
```

---

# Urmărirea algoritmului

Pentru:

```text
v = [2, 5, 5, 5, 3, 3, 8]
```

avem:

```text
element       lung     maxim

2               1        1
5               1        1
5               2        2
5               3        3
3               1        3
3               2        3
8               1        3
```

Rezultatul:

```text
maxim = 3
```

Observă ceva foarte important:

```text
secvența continuă → lung++
secvența se rupe  → lung = 1
```

`maxim` nu se resetează. El păstrează cel mai bun rezultat găsit până în acel moment.

---

# Aceeași idee pentru secvențe crescătoare

Acum vrem:

> Lungimea celei mai lungi secvențe strict crescătoare.

Structura algoritmului rămâne aceeași.

Se schimbă doar condiția care spune dacă secvența continuă:

```cpp
v[i] > v[i - 1]
```

Codul:

```cpp
int lung = 1;
int maxim = 1;

for (int i = 1; i < n; i++) {
    if (v[i] > v[i - 1])
        lung++;
    else
        lung = 1;

    if (lung > maxim)
        maxim = lung;
}
```

Pentru:

```text
v = [7, 2, 5, 8, 3, 6]
```

secvențele crescătoare sunt:

```text
[7] [2, 5, 8] [3, 6]

 1       3        2
```

deci:

```text
maxim = 3
```

---

# Dar pentru o secvență descrescătoare?

Din nou, algoritmul nu trebuie reinventat.

Schimbăm doar condiția:

```cpp
v[i] < v[i - 1]
```

```cpp
int lung = 1;
int maxim = 1;

for (int i = 1; i < n; i++) {
    if (v[i] < v[i - 1])
        lung++;
    else
        lung = 1;

    if (lung > maxim)
        maxim = lung;
}
```

---

# Cum gândești singur o problemă cu secvențe?

Când vezi:

> „cea mai lungă secvență...”

nu încerca să memorezi câte un algoritm separat pentru fiecare cerință.

Întreabă-te:

```text
1. Când CONTINUĂ secvența?
            ↓
      stabilesc condiția

2. Dacă continuă?
            ↓
          lung++

3. Dacă se rupe?
            ↓
         lung = 1

4. Am obținut o secvență mai lungă?
            ↓
      actualizez maxim
```

De cele mai multe ori, structura rămâne aceeași și se schimbă doar condiția:

```text
elemente egale
v[i] == v[i - 1]

strict crescătoare
v[i] > v[i - 1]

strict descrescătoare
v[i] < v[i - 1]
```

Aceasta este ideea pe care trebuie să o înțelegi, nu trei coduri învățate pe de rost.

---

# Recapitulare

La secvențe comparăm de obicei:

```text
v[i - 1] cu v[i]
```

Condiția spune dacă secvența continuă:

```text
egale          → v[i] == v[i - 1]
crescătoare    → v[i] >  v[i - 1]
descrescătoare → v[i] <  v[i - 1]
```

Pentru cea mai lungă secvență:

```text
lung  → secvența curentă
maxim → cea mai lungă găsită

condiția este adevărată → lung++
condiția este falsă     → lung = 1
lung > maxim            → maxim = lung
```

> **Ideea esențială:** într-o problemă cu secvențe, găsește mai întâi condiția care spune **„secvența continuă”**. Restul algoritmului se construiește în jurul ei.