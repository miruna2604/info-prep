# Inserarea și ștergerea elementelor unui vector

La inserare și ștergere trebuie să înțelegi o singură idee foarte bine:

> **Elementele vectorului trebuie deplasate pentru a face loc sau pentru a acoperi locul rămas liber.**

```text
INSERARE → fac loc        → deplasez la DREAPTA
ȘTERGERE → acopăr golul   → deplasez la STÂNGA
```

În ambele cazuri se modifică și numărul de elemente `n`.

---

# Inserarea unui element

Să avem vectorul:

```text
10  20  30  40
```

și să vrem să inserăm valoarea `99` la indicele `2`.

Nu putem scrie direct:

```cpp
v[2] = 99;
```

pentru că am pierde valoarea `30`.

Trebuie mai întâi să facem loc.

### Pasul 1 — deplasăm elementele la dreapta

```text
INIȚIAL

indice:   0    1    2    3
         10   20   30   40
                   ↑
              vrem loc aici


DEPLASARE

40 → dreapta
30 → dreapta


REZULTAT

indice:   0    1    2    3    4
         10   20    _   30   40
                   ↑
                loc liber
```

Foarte important: deplasarea se face **de la dreapta spre stânga**.

```cpp
for (int i = n; i > poz; i--)
    v[i] = v[i - 1];
```

Dacă am începe din stânga, am suprascrie valori de care încă avem nevoie.

### Pasul 2 — inserăm valoarea

```cpp
v[poz] = x;
```

### Pasul 3 — creștem numărul de elemente

```cpp
n++;
```

Algoritmul complet este:

```cpp
for (int i = n; i > poz; i--)
    v[i] = v[i - 1];

v[poz] = x;
n++;
```

Pentru:

```text
v   = [10, 20, 30, 40]
poz = 2
x   = 99
```

obținem:

```text
10  20  99  30  40
```

și:

```text
n: 4 → 5
```

---

# De ce deplasăm de la dreapta spre stânga?

Să urmărim exemplul:

```text
10  20  30  40
         ↑
        poz
```

Mai întâi:

```text
v[4] = v[3]

10  20  30  40  40
```

apoi:

```text
v[3] = v[2]

10  20  30  30  40
```

Acum `v[2]` poate fi înlocuit:

```text
10  20  99  30  40
```

Dacă am deplasa în sens invers, am putea suprascrie un element înainte să îl copiem.

> **La inserare: deplasarea începe din capătul vectorului și merge spre poziția inserării.**

---

# Inserarea pe o poziție

Dacă problema folosește **poziții numerotate de la `1`**, trebuie să fim atenți la diferența dintre poziție și indice.

```text
poziție:   1    2    3    4
indice:    0    1    2    3
          10   20   30   40
```

Dacă vrem să inserăm pe **poziția `k`**, indicele corespunzător este:

```text
poz = k - 1
```

De exemplu:

```text
inserare pe poziția 3
          ↓
       indice 2
```

De aceea este important să verifici dacă cerința vorbește despre **poziție** sau despre **indice**.

---

# Inserarea la început sau la final

Același algoritm funcționează și pentru cazurile particulare.

### La început

```text
10 20 30
↓ inserăm 5

5 10 20 30
```

Trebuie deplasate toate elementele la dreapta.

### La final

```text
10 20 30
         ↓ inserăm 40

10 20 30 40
```

Nu mai trebuie deplasat niciun element.

Putem scrie direct:

```cpp
v[n] = 40;
n++;
```

---

# Ștergerea unui element

La ștergere apare problema inversă.

Să avem:

```text
10  20  30  40  50
```

și să ștergem elementul de la indicele `2`, adică valoarea `30`.

După eliminarea lui rămâne un loc liber:

```text
10  20   _   40  50
```

Trebuie să aducem elementele din dreapta cu o poziție spre stânga:

```text
40 ←
50 ←
```

Rezultatul trebuie să fie:

```text
10  20  40  50
```

Deplasarea se face astfel:

```cpp
for (int i = poz; i < n - 1; i++)
    v[i] = v[i + 1];
```

Apoi micșorăm numărul de elemente:

```cpp
n--;
```

Algoritmul complet:

```cpp
for (int i = poz; i < n - 1; i++)
    v[i] = v[i + 1];

n--;
```

---

# Cum funcționează deplasarea la stânga?

Pentru:

```text
indice:   0    1    2    3    4
         10   20   30   40   50
                   ↑
                ștergem
```

facem:

```text
v[2] = v[3]

10  20  40  40  50
```

apoi:

```text
v[3] = v[4]

10  20  40  50  50
```

În memorie poate rămâne vechea valoare la final, dar ea nu ne mai interesează, deoarece:

```text
n: 5 → 4
```

Vectorul folosit este acum doar:

```text
10  20  40  50
```

> La vector contează primele `n` elemente pe care le considerăm active.

---

# Ștergerea după valoare

Uneori cerința nu ne dă direct poziția, ci spune:

> Șterge prima apariție a valorii `x`.

Atunci avem două etape:

```text
1. caut poziția lui x
2. dacă l-am găsit → șterg elementul de acolo
```

Pornim cu:

```cpp
int poz = -1;
```

Căutăm:

```cpp
for (int i = 0; i < n; i++) {
    if (v[i] == x) {
        poz = i;
        break;
    }
}
```

Dacă:

```cpp
poz != -1
```

înseamnă că valoarea a fost găsită și o putem șterge:

```cpp
if (poz != -1) {
    for (int i = poz; i < n - 1; i++)
        v[i] = v[i + 1];

    n--;
}
```

Pentru:

```text
v = [7, 4, 9, 4, 2]
x = 4
```

prima apariție este la indicele `1`:

```text
7  4  9  4  2
   ↑
```

după ștergere:

```text
7  9  4  2
```

Observă că a fost eliminată doar **prima apariție**.

---

# Cum gândești singur algoritmul?

Nu încerca să memorezi buclele fără să înțelegi direcția deplasării.

Pentru inserare întreabă-te:

```text
Vreau să pun un element aici.
↓
Am nevoie de un loc liber.
↓
Mut elementele spre DREAPTA.
↓
Trebuie să încep din dreapta ca să nu pierd valori.
↓
Inserez elementul.
↓
n++
```

Pentru ștergere:

```text
Elimin un element.
↓
Rămâne un gol.
↓
Mut elementele următoare spre STÂNGA.
↓
Golul dispare.
↓
n--
```

Direcția se poate reține foarte simplu:

```text
INSERARE
      → → →
deplasare la DREAPTA


ȘTERGERE
      ← ← ←
deplasare la STÂNGA
```

---

# Recapitulare

### Inserare la indicele `poz`

```cpp
for (int i = n; i > poz; i--)
    v[i] = v[i - 1];

v[poz] = x;
n++;
```

```text
fac loc → deplasez la DREAPTA → inserez → n++
```

### Ștergere de la indicele `poz`

```cpp
for (int i = poz; i < n - 1; i++)
    v[i] = v[i + 1];

n--;
```

```text
șterg → deplasez la STÂNGA → n--
```

> **Ideea esențială:** la inserare **facem loc**, iar la ștergere **acoperim locul rămas liber**. Dacă înțelegi această imagine, nu mai trebuie să memorezi mecanic algoritmii.