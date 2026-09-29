# Căutarea într-un vector

Căutarea răspunde la o întrebare simplă:

> **Există valoarea `x` în vector?**

Putem căuta în două moduri:

```text
CĂUTARE SECVENȚIALĂ
→ verific elementele pe rând
→ funcționează indiferent de ordinea lor

CĂUTARE BINARĂ
→ elimin jumătate din zona de căutare la fiecare pas
→ vectorul trebuie să fie SORTAT
```

---

# Căutarea secvențială

La căutarea secvențială verificăm elementele **unul câte unul**, de la început.

Să căutăm `x = 9` în:

```text
indice:   0   1   2   3   4
          ↓   ↓   ↓   ↓   ↓
vector:   7   4   9   2   6
```

Verificăm:

```text
v[0] = 7 → este 9? NU
v[1] = 4 → este 9? NU
v[2] = 9 → este 9? DA ✓
```

Din moment ce l-am găsit, ne putem opri.

Codul:

```cpp
bool gasit = false;

for (int i = 0; i < n; i++) {
    if (v[i] == x) {
        gasit = true;
        break;
    }
}
```

La final:

```cpp
if (gasit)
    cout << "DA";
else
    cout << "NU";
```

`break` oprește parcurgerea imediat ce valoarea a fost găsită.

---

# Dacă vrem și poziția?

În loc să memorăm doar dacă elementul există, putem memora indicele lui:

```cpp
int poz = -1;

for (int i = 0; i < n; i++) {
    if (v[i] == x) {
        poz = i;
        break;
    }
}
```

Pornim cu:

```cpp
poz = -1;
```

deoarece `-1` nu este un indice valid.

Astfel:

```text
poz == -1 → x nu există
poz != -1 → x a fost găsit la indicele poz
```

Pentru:

```text
v = [7, 4, 9, 2, 6]
x = 9
```

obținem:

```text
poz = 2
```

Dacă valoarea apare de mai multe ori, `break` face ca algoritmul să găsească **prima apariție**.

---

# Cum gândești căutarea secvențială?

Cerința spune:

> Verifică dacă `x` apare în vector.

Transformăm cerința în pași:

```text
trebuie să caut x
        ↓
verific fiecare element
        ↓
v[i] == x ?
   ↓        ↓
  DA       NU
   ↓        ↓
găsit    continui
   ↓
 mă opresc
```

Căutarea secvențială este potrivită chiar dacă vectorul este:

```text
7  2  15  4  9  1
```

adică **nesortat**.

---

# Căutarea binară

Dacă vectorul este **sortat**, putem căuta mai eficient.

Să avem:

```text
indice:   0   1   2   3   4   5   6
          ↓   ↓   ↓   ↓   ↓   ↓   ↓
vector:   2   5   8  12  17  23  31
```

Vrem să găsim:

```text
x = 23
```

În loc să verificăm elementele unul câte unul, ne uităm la **mijlocul** zonei în care căutăm.

Pornim cu două limite:

```cpp
int st = 0;
int dr = n - 1;
```

```text
st                         dr
↓                          ↓
2   5   8   12   17   23   31
```

Calculăm mijlocul:

```cpp
int mij = (st + dr) / 2;
```

Avem:

```text
mij = (0 + 6) / 2 = 3

           mij
            ↓
2   5   8   12   17   23   31
```

Comparăm:

```text
12 < 23
```

Pentru că vectorul este sortat, știm că `23` nu poate fi în partea stângă.

Eliminăm acea jumătate:

```text
                 st        dr
                 ↓         ↓
                 17   23   31
```

Noul mijloc este:

```text
mij = (4 + 6) / 2 = 5
```

și:

```text
v[5] = 23
```

Am găsit valoarea.

---

# De ce funcționează?

Secretul este faptul că vectorul este **sortat**.

Dacă:

```text
v[mij] < x
```

atunci `x` poate fi doar în dreapta:

```cpp
st = mij + 1;
```

Dacă:

```text
v[mij] > x
```

atunci `x` poate fi doar în stânga:

```cpp
dr = mij - 1;
```

Dacă:

```text
v[mij] == x
```

am găsit valoarea.

Imaginea mentală este:

```text
                    v[mij]
                       ↓
... valori mici ... MIJLOC ... valori mari ...

x > v[mij]
→ elimin jumătatea din stânga

x < v[mij]
→ elimin jumătatea din dreapta
```

---

# Algoritmul de căutare binară

```cpp
int st = 0;
int dr = n - 1;
bool gasit = false;

while (st <= dr) {
    int mij = (st + dr) / 2;

    if (v[mij] == x) {
        gasit = true;
        break;
    }

    if (v[mij] < x)
        st = mij + 1;
    else
        dr = mij - 1;
}
```

La fiecare pas se întâmplă una dintre cele trei situații:

```text
v[mij] == x → am găsit

v[mij] < x  → caut în dreapta

v[mij] > x  → caut în stânga
```

---

# Exemplu în care valoarea nu există

Căutăm:

```text
x = 10
```

în:

```text
2  5  8  12  17  23  31
```

Urmărim limitele:

```text
st = 0, dr = 6
mij = 3 → v[3] = 12

10 < 12
→ dr = 2
```

Rămâne:

```text
2  5  8
```

Continuăm:

```text
st = 0, dr = 2
mij = 1 → v[1] = 5

10 > 5
→ st = 2
```

Apoi:

```text
st = 2, dr = 2
mij = 2 → v[2] = 8

10 > 8
→ st = 3
```

Acum:

```text
st = 3
dr = 2
```

Condiția:

```cpp
st <= dr
```

nu mai este adevărată.

Zona în care puteam căuta a devenit goală, deci `10` **nu există în vector**.

---

# De ce vectorul trebuie să fie sortat?

Să avem vectorul nesortat:

```text
2  20  5  17  8
```

și să căutăm:

```text
x = 20
```

Mijlocul este:

```text
v[2] = 5
```

Dacă am aplica regula căutării binare:

```text
20 > 5
→ caut doar în dreapta
```

am elimina partea stângă.

Dar `20` se află chiar acolo:

```text
2  20 | 5 | 17  8
    ↑
```

Așadar, fără ordine, nu putem ști în ce jumătate se află valoarea.

> **Căutarea binară se aplică doar dacă elementele sunt sortate.**

---

# Secvențială sau binară?

```text
VECTOR NESORTAT
      ↓
căutare secvențială


VECTOR SORTAT
      ↓
putem folosi căutarea binară
```

Diferența de strategie este importantă:

```text
CĂUTARE SECVENȚIALĂ

verific → verific → verific → verific → ...

poate ajunge să verifice toate cele n elemente


CĂUTARE BINARĂ

împart la jumătate
       ↓
împart din nou
       ↓
împart din nou
       ↓
...
```

De aceea, pentru un vector sortat cu foarte multe elemente, căutarea binară poate ajunge mult mai repede la rezultat.

---

# Recapitulare

```text
CĂUTARE SECVENȚIALĂ
→ verific v[i] pe rând
→ merge și pe vector nesortat


CĂUTARE BINARĂ
→ vectorul trebuie să fie SORTAT
→ folosesc st, dr și mij
→ compar x cu v[mij]

v[mij] == x → găsit
v[mij] < x  → merg în dreapta
v[mij] > x  → merg în stânga
```

> **Ideea esențială:** căutarea secvențială verifică elementele pe rând, în timp ce căutarea binară profită de faptul că vectorul este sortat și elimină câte o parte din zona de căutare.