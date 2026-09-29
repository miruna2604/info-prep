# Citirea și afișarea datelor în C++

Un program are nevoie adesea să **primească date**, să le prelucreze și să **afișeze un rezultat**.

În C++ folosim:

```text id="nkvqza"
cin  → citire
cout → afișare
```

Pentru a le putea folosi avem nevoie de:

```cpp id="b8plr9"
#include <iostream>
```

Biblioteca `iostream` a fost prezentată deja când am studiat structura unui program C++.

---

# Afișarea cu `cout`

`cout` este folosit pentru a afișa informații pe ecran.

Pentru afișare folosim:

```text id="dz0dxo"
<<
```

De exemplu:

```cpp id="8v91ke"
cout << "Salut!";
```

afișează:

```text id="4dphlo"
Salut!
```

Textul se scrie între ghilimele:

```cpp id="7dw0fc"
"Salut!"
```

---

## Afișarea unei variabile

Putem afișa și valoarea unei variabile:

```cpp id="3ul5qp"
int x = 10;

cout << x;
```

Rezultatul este:

```text id="a6efgh"
10
```

Atenție la diferență:

```cpp id="i7w55q"
cout << "x";
```

afișează:

```text id="k2ffhe"
x
```

în timp ce:

```cpp id="4j4ucb"
cout << x;
```

afișează **valoarea variabilei `x`**.

> **De reținut:** textul se scrie între ghilimele, variabilele nu.

---

## Afișarea mai multor valori

Putem lega mai multe elemente folosind `<<`.

```cpp id="yzrx17"
int varsta = 17;

cout << "Am " << varsta << " ani.";
```

Rezultatul:

```text id="bbr2kp"
Am 17 ani.
```

Putem combina astfel texte, valori și variabile în aceeași instrucțiune.

---

## Spațiile nu apar automat

Să avem:

```cpp id="ol07hx"
int a = 10;
int b = 20;

cout << a << b;
```

Rezultatul este:

```text id="0j4s7d"
1020
```

Dacă vrem spațiu între valori, trebuie să îl afișăm:

```cpp id="2o9k36"
cout << a << " " << b;
```

Rezultat:

```text id="z94xox"
10 20
```

---

# Trecerea la linia următoare

Pentru a continua afișarea pe o linie nouă putem folosi:

```cpp id="2gz76r"
endl
```

De exemplu:

```cpp id="l72r6c"
cout << "Prima linie" << endl;
cout << "A doua linie";
```

Rezultatul:

```text id="jbf5kb"
Prima linie
A doua linie
```

Putem folosi și:

```text id="6f82jd"
\n
```

De exemplu:

```cpp id="6k4mln"
cout << "Prima linie\n";
cout << "A doua linie";
```

obține același rezultat.

`\n` poate apărea direct într-un text:

```cpp id="rb41l3"
cout << "Ana\nMaria\nAlex";
```

Rezultat:

```text id="e9kkjg"
Ana
Maria
Alex
```

Pentru moment este suficient să reții:

```text id="9yg5ct"
endl → linie nouă
\n   → linie nouă
```

---

# Citirea cu `cin`

`cin` este folosit pentru a citi o valoare și a o memora într-o variabilă.

Pentru citire folosim:

```text id="a8yg0h"
>>
```

De exemplu:

```cpp id="29drc3"
int x;

cin >> x;
```

Dacă valoarea citită este:

```text id="pk5ukx"
25
```

atunci variabila `x` va conține:

```text id="13umvl"
x = 25
```

Putem privi operația astfel:

```text id="j71ftg"
25
 ↓
cin >> x
       ↓
     x = 25
```

---

# Citirea mai multor valori

Putem citi mai multe valori în aceeași instrucțiune:

```cpp id="vkwqhk"
int a, b;

cin >> a >> b;
```

Dacă datele de intrare sunt:

```text id="1i2obg"
10 20
```

atunci:

```text id="dl52we"
a = 10
b = 20
```

Valorile sunt memorate în variabile **în ordinea în care apar în instrucțiunea `cin`**.

Valorile pot fi și pe linii diferite:

```text id="bfz84w"
10
20
```

Pentru:

```cpp id="87bvt9"
cin >> a >> b;
```

rezultatul este același:

```text id="a45rv3"
a = 10
b = 20
```

---

# Tipul variabilei contează

Valoarea citită trebuie să fie potrivită pentru tipul variabilei.

Pentru un număr întreg:

```cpp id="kr4hqt"
int n;
cin >> n;
```

Pentru un număr real:

```cpp id="q3p4pd"
double x;
cin >> x;
```

Pentru un caracter:

```cpp id="s2b9vl"
char c;
cin >> c;
```

Tipurile de date au fost explicate în lecția anterioară. Aici este important să alegem variabila potrivită pentru datele pe care trebuie să le citim.

---

# Citire → Prelucrare → Afișare

Foarte multe programe pot fi privite în trei pași simpli:

```text id="adkk0m"
CITIRE
   ↓
PRELUCRARE
   ↓
AFIȘARE
```

Să presupunem că vrem să citim două numere și să afișăm suma lor.

### 1. Citim

```cpp id="i1qzba"
cin >> a >> b;
```

### 2. Prelucrăm

```cpp id="clhq8c"
suma = a + b;
```

### 3. Afișăm

```cpp id="s05vzb"
cout << suma;
```

Programul complet:

```cpp id="hh0u4i"
#include <iostream>
using namespace std;

int main() {
    int a, b;
    int suma;

    cin >> a >> b;

    suma = a + b;

    cout << suma;

    return 0;
}
```

Pentru datele de intrare:

```text id="un8gnb"
7 5
```

programul afișează:

```text id="znrbf5"
12
```

Putem urmări programul astfel:

```text id="6j5qqd"
7 5
 ↓ ↓
 a b
 ↓
a + b
 ↓
 12
```

> **De reținut:** În multe probleme vom urma modelul **Citire → Prelucrare → Afișare**.

---

# Afișează exact ce se cere

Într-un program obișnuit am putea afișa un mesaj precum:

```cpp id="l5d1hf"
cout << "Introdu numarul: ";
cin >> n;
```

Dar în problemele cu format de intrare și ieșire stabilit, trebuie să respectăm **exact cerința**.

Dacă trebuie doar să citim un număr și să afișăm dublul său, vom scrie:

```cpp id="zwx0xj"
int n;

cin >> n;

cout << n * 2;
```

Nu este nevoie să afișăm:

```text id="cyrf86"
Introdu numarul:
Rezultatul este:
```

dacă aceste texte nu sunt cerute.

Programul trebuie să producă exact rezultatul solicitat.

---

# `cin >>` și `cout <<`

Cei doi operatori sunt ușor de diferențiat dacă urmărim direcția datelor.

### Citire

```cpp id="th2nt5"
cin >> x;
```

Valoarea citită ajunge în `x`:

```text id="rdwzsm"
date → x
```

### Afișare

```cpp id="rx6gvx"
cout << x;
```

Valoarea lui `x` este trimisă spre afișare:

```text id="69fsnu"
x → ecran
```

Așadar:

```text id="l3eohg"
cin  >> variabilă
```
