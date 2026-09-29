# Interclasarea a doi vectori sortați

**Interclasarea** înseamnă să combinăm doi vectori deja sortați într-un singur vector care rămâne sortat.

De exemplu:

```text
a = [2, 5, 8, 12]
b = [1, 4, 7, 10]

          ↓ interclasare

c = [1, 2, 4, 5, 7, 8, 10, 12]
```

Ideea importantă este că **nu punem vectorii unul după altul și apoi îi sortăm**.

Profităm de faptul că `a` și `b` sunt deja sortați.

---

# Cum trebuie să ne imaginăm interclasarea?

Folosim câte un indice pentru fiecare vector:

```text
        i
        ↓
a:      2   5   8   12

        j
        ↓
b:      1   4   7   10
```

La fiecare pas comparăm:

```cpp
a[i]
```

cu:

```cpp
b[j]
```

Elementul mai mic este următorul care trebuie pus în vectorul rezultat.

În exemplul nostru:

```text
a[i] = 2
b[j] = 1

1 < 2
↓
punem 1 în c
```

Apoi avansăm doar în vectorul din care am luat elementul:

```text
        i
        ↓
a:      2   5   8   12

            j
            ↓
b:      1   4   7   10

c:      1
```

Acum comparăm `2` cu `4`.

---

# Construirea vectorului rezultat

Să avem:

```text
a = [2, 5, 8]
b = [1, 4, 7]
```

Folosim:

```cpp
int i = 0;
int j = 0;
int k = 0;
```

Rolul lor este:

```text
i → elementul curent din a
j → elementul curent din b
k → următoarea poziție liberă din c
```

Cât timp mai avem elemente în **ambii vectori**, le comparăm:

```cpp
while (i < n && j < m) {
    if (a[i] < b[j]) {
        c[k] = a[i];
        i++;
    } else {
        c[k] = b[j];
        j++;
    }

    k++;
}
```

Să urmărim execuția:

```text
a: 2  5  8
b: 1  4  7
c: -
```

Prima comparație:

```text
2 vs 1 → aleg 1

c: 1
```

Apoi:

```text
2 vs 4 → aleg 2

c: 1  2
```

Apoi:

```text
5 vs 4 → aleg 4

c: 1  2  4
```

Continuăm:

```text
5 vs 7 → aleg 5
8 vs 7 → aleg 7
```

Am ajuns la:

```text
c: 1  2  4  5  7
```

În acest moment vectorul `b` s-a terminat, dar în `a` mai avem valoarea `8`.

---

# Ce facem cu elementele rămase?

Bucla principală funcționează doar cât timp:

```cpp
i < n && j < m
```

adică atât timp cât **ambii vectori mai au elemente**.

Când unul dintre ei se termină, elementele rămase în celălalt sunt deja în ordine și pot fi copiate direct.

Pentru elementele rămase din `a`:

```cpp
while (i < n) {
    c[k] = a[i];
    i++;
    k++;
}
```

Pentru elementele rămase din `b`:

```cpp
while (j < m) {
    c[k] = b[j];
    j++;
    k++;
}
```

În exemplul nostru mai rămâne:

```text
a: 8
```

deci îl copiem:

```text
c: 1  2  4  5  7  8
```

Interclasarea este terminată.

---

# Algoritmul complet

Pentru doi vectori sortați crescător:

```cpp
int i = 0;
int j = 0;
int k = 0;

while (i < n && j < m) {
    if (a[i] < b[j]) {
        c[k] = a[i];
        i++;
    } else {
        c[k] = b[j];
        j++;
    }

    k++;
}

while (i < n) {
    c[k] = a[i];
    i++;
    k++;
}

while (j < m) {
    c[k] = b[j];
    j++;
    k++;
}
```

La final, vectorul `c` are:

```text
n + m
```

elemente.

---

# Ce se întâmplă dacă elementele sunt egale?

Să avem:

```text
a = [2, 5, 8]
b = [1, 5, 7]
```

La un moment dat comparăm:

```text
a[i] = 5
b[j] = 5
```

Algoritmul de mai sus pune unul dintre ele în `c`, iar la pasul următor va fi pus și celălalt.

Rezultatul conține ambele valori:

```text
c = [1, 2, 5, 5, 7, 8]
```

Interclasarea **nu elimină automat valorile egale**.

---

# De ce trebuie să fie vectorii sortați?

Interclasarea funcționează deoarece știm că:

```text
a[i] → cel mai mic element rămas din a
b[j] → cel mai mic element rămas din b
```

Prin urmare, dacă:

```text
a[i] < b[j]
```

știm sigur că `a[i]` este următorul element care trebuie pus în rezultat.

Dacă vectorii nu sunt sortați, această concluzie nu mai este valabilă.

De exemplu:

```text
a = [8, 2, 5]
b = [1, 7, 4]
```

compararea doar a elementelor curente nu ne mai permite să construim corect un rezultat sortat.

> **Interclasarea pornește de la doi vectori deja sortați.**

---

# Cum gândești singur interclasarea?

Imaginează-ți două degete care se deplasează prin cei doi vectori:

```text
        i
        ↓
a:      2   5   8   12

        j
        ↓
b:      1   4   7   10
```

La fiecare pas:

```text
compar a[i] cu b[j]
        ↓
aleg valoarea mai mică
        ↓
o pun în c
        ↓
avansez doar în vectorul din care am luat-o
```

Când unul dintre vectori se termină:

```text
copiez ce a mai rămas din celălalt
```

Nu trebuie să memorezi algoritmul ca pe un bloc de cod. Dacă înțelegi aceste două „degete”, îl poți reconstrui.

---

# Recapitulare

```text
a sortat + b sortat
        ↓
compar a[i] și b[j]
        ↓
pun valoarea mai mică în c
        ↓
avansez indicele corespunzător
        ↓
repet
        ↓
un vector se termină
        ↓
copiez elementele rămase
```

Indicii folosiți:

```text
i → poziția curentă în a
j → poziția curentă în b
k → poziția curentă în c
```

Rezultatul:

```text
n elemente + m elemente → n + m elemente
```

> **Ideea esențială:** la interclasare nu sortăm din nou elementele. Comparăm permanent cele mai mici valori rămase din cei doi vectori și construim direct rezultatul în ordine.