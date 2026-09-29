# Vector de frecvență

Un **vector de frecvență** ne ajută să aflăm rapid **de câte ori apare fiecare valoare**.

Să avem:

```text
v = [3, 1, 3, 2, 1, 3]
```

În loc să căutăm separat de câte ori apare `1`, apoi `2`, apoi `3`, construim un vector în care:

```text
f[x] = numărul de apariții ale valorii x
```

Pentru exemplul nostru:

```text
valoare x:      0   1   2   3
                    ↓   ↓   ↓
frecvență f[x]: 0   2   1   3
```

Așadar:

```text
f[1] = 2 → valoarea 1 apare de 2 ori
f[2] = 1 → valoarea 2 apare o dată
f[3] = 3 → valoarea 3 apare de 3 ori
```

Ideea esențială este:

```text
indicele din f → valoarea din vector
f[indice]      → de câte ori apare acea valoare
```

---

# Construirea vectorului de frecvență

Să presupunem că valorile din vector sunt cuprinse între `0` și `100`.

Declarăm:

```cpp
int f[101] = {};
```

Prin:

```cpp
= {}
```

elementele vectorului sunt inițializate cu `0`.

La început avem:

```text
f[0] = 0
f[1] = 0
f[2] = 0
...
f[100] = 0
```

Apoi parcurgem vectorul:

```cpp
for (int i = 0; i < n; i++)
    f[v[i]]++;
```

Această instrucțiune este cheia întregii metode:

```cpp
f[v[i]]++;
```

Să vedem ce înseamnă pentru:

```text
v = [3, 1, 3, 2, 1, 3]
```

Pornim cu frecvențele `0`:

```text
f[1] = 0
f[2] = 0
f[3] = 0
```

Parcurgem:

```text
v[0] = 3 → f[3]++ → f[3] = 1
v[1] = 1 → f[1]++ → f[1] = 1
v[2] = 3 → f[3]++ → f[3] = 2
v[3] = 2 → f[2]++ → f[2] = 1
v[4] = 1 → f[1]++ → f[1] = 2
v[5] = 3 → f[3]++ → f[3] = 3
```

La final:

```text
valoare:     0   1   2   3
frecvență:   0   2   1   3
```

---

# De ce folosim `f[v[i]]`?

Aici apare partea care poate părea ciudată la început.

Dacă:

```cpp
v[i] = 3;
```

atunci:

```cpp
f[v[i]]++;
```

devine:

```cpp
f[3]++;
```

Adică:

> Am întâlnit încă o valoare `3`, deci cresc numărul ei de apariții.

Imaginează-ți vectorul de frecvență ca pe niște cutii:

```text
valoarea:       0      1      2      3      4
                ↓      ↓      ↓      ↓      ↓
frecvența:    [ 0 ]  [ 2 ]  [ 1 ]  [ 3 ]  [ 0 ]
```

Cutia cu indicele `3` păstrează numărul de apariții ale valorii `3`.

---

# Numărul de apariții al unei valori

După ce vectorul de frecvență este construit, aflarea numărului de apariții devine foarte simplă.

Dacă vrem să știm:

> De câte ori apare valoarea `x`?

răspunsul este direct:

```cpp
f[x]
```

De exemplu:

```text
f[3] = 3
```

înseamnă:

```text
valoarea 3 apare de 3 ori
```

Putem afișa:

```cpp
cout << f[x];
```

---

# Verificarea existenței unei valori

Vectorul de frecvență ne spune imediat și dacă o valoare există.

```cpp
if (f[x] > 0)
    cout << "DA";
else
    cout << "NU";
```

Pentru că:

```text
f[x] = 0 → x nu apare

f[x] > 0 → x apare
```

---

# Valori distincte

Putem afla și câte **valori diferite** apar în vector.

Să avem:

```text
v = [3, 1, 3, 2, 1, 3]
```

Valorile distincte sunt:

```text
1, 2, 3
```

Deci avem `3` valori distincte.

În vectorul de frecvență trebuie doar să numărăm indicii care au frecvența mai mare decât `0`:

```cpp
int cnt = 0;

for (int x = 0; x <= 100; x++)
    if (f[x] > 0)
        cnt++;
```

De ce?

```text
f[x] > 0
   ↓
valoarea x apare cel puțin o dată
```

Fiecare astfel de `x` reprezintă o valoare distinctă.

---

# Parcurgerea vectorului de frecvență

După construire, nu mai parcurgem neapărat vectorul inițial.

Putem parcurge direct valorile posibile:

```cpp
for (int x = 0; x <= 100; x++) {
    // folosim f[x]
}
```

Aici este util să gândești:

```text
x    → valoarea
f[x] → numărul ei de apariții
```

De exemplu, dacă vrem să afișăm fiecare valoare care apare:

```cpp
for (int x = 0; x <= 100; x++)
    if (f[x] > 0)
        cout << x << " ";
```

Pentru:

```text
v = [3, 1, 3, 2, 1, 3]
```

obținem:

```text
1 2 3
```

Observă un avantaj important: valorile sunt afișate automat **în ordine crescătoare**, deoarece parcurgem indicii lui `f` de la mic la mare.

---

# Afișarea valorilor împreună cu frecvența lor

Dacă vrem să afișăm fiecare valoare și numărul ei de apariții:

```cpp
for (int x = 0; x <= 100; x++) {
    if (f[x] > 0)
        cout << x << " apare de " << f[x] << " ori\n";
}
```

Pentru:

```text
v = [3, 1, 3, 2, 1, 3]
```

obținem:

```text
1 apare de 2 ori
2 apare de 1 ori
3 apare de 3 ori
```

Așadar, după ce am construit frecvențele, putem răspunde la mai multe cerințe fără să mai căutăm fiecare valoare în vectorul inițial.

---

# Cum gândești o problemă cu frecvențe?

Dacă cerința vorbește despre **aparițiile valorilor**, întreabă-te dacă un vector de frecvență simplifică problema.

De exemplu:

```text
„De câte ori apare fiecare valoare?”
                ↓
         am nevoie de frecvențe
                ↓
           f[v[i]]++
```

Apoi interpretezi:

```text
f[x] == 0 → x nu apare

f[x] == 1 → x apare o singură dată

f[x] > 1  → x apare de mai multe ori
```

Astfel, multe cerințe se reduc la construirea vectorului `f` și apoi la verificarea valorilor lui.

---

# Atenție la valorile din vector

Pentru instrucțiunea:

```cpp
f[v[i]]++;
```

valoarea `v[i]` devine **indice** în vectorul `f`.

De aceea, trebuie să știm ce valori poate avea vectorul inițial.

Dacă:

```text
0 ≤ v[i] ≤ 100
```

putem declara:

```cpp
int f[101] = {};
```

pentru indicii:

```text
0 ... 100
```

Nu putem folosi direct această metodă dacă valorile pot fi, de exemplu:

```text
-5  -2  3  7
```

deoarece:

```cpp
f[-5]
```

nu este un indice valid.

> **De reținut:** înainte să folosești un vector de frecvență, verifică intervalul în care se află valorile.

---

# Recapitulare

Ideea de bază:

```text
f[x] = numărul de apariții ale valorii x
```

Construirea:

```cpp
int f[101] = {};

for (int i = 0; i < n; i++)
    f[v[i]]++;
```

Interpretarea:

```text
f[x] == 0 → x nu apare
f[x] == 1 → x apare o dată
f[x] > 1  → x apare de mai multe ori
```

Iar când parcurgi vectorul de frecvență:

```text
x    → valoarea
f[x] → numărul ei de apariții
```

> **Ideea esențială:** valoarea din vectorul inițial devine indice în vectorul de frecvență, iar pe acel indice memorăm de câte ori a apărut.