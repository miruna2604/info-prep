# Accesarea și modificarea câmpurilor

Să folosim structura:

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};
```

și o variabilă:

```cpp
Elev e;
```

Variabila `e` conține toate cele trei câmpuri:

```text
e
│
├── nume
├── varsta
└── medie
```

Pentru a lucra cu un anumit câmp folosim **operatorul `.`**.

---

# Operatorul `.`

Forma generală este:

```text
variabilă.câmp
```

Pentru variabila `e`:

```cpp
e.nume
e.varsta
e.medie
```

Putem citi expresiile astfel:

```text
e.varsta → câmpul varsta al lui e
e.medie  → câmpul medie al lui e
```

Operatorul `.` ne spune **ce câmp al structurii vrem să folosim**.

---

# Citirea câmpurilor

Câmpurile pot fi citite direct:

```cpp
cin >> e.nume;
cin >> e.varsta;
cin >> e.medie;
```

Pentru inputul:

```text
Ana 18 9.75
```

după citire avem:

```text
e
│
├── nume   = Ana
├── varsta = 18
└── medie  = 9.75
```

Putem scrie și:

```cpp
cin >> e.nume >> e.varsta >> e.medie;
```

---

# Afișarea câmpurilor

Procedăm la fel:

```cpp
cout << e.nume << " ";
cout << e.varsta << " ";
cout << e.medie;
```

Pentru valorile:

```text
nume   = Ana
varsta = 18
medie  = 9.75
```

outputul este:

```text
Ana 18 9.75
```

Observă că lucrăm cu fiecare câmp aproape ca și cum ar fi o variabilă obișnuită.

---

# Modificarea valorilor

Putem atribui direct o valoare unui câmp:

```cpp
e.varsta = 18;
e.medie = 9.75;
```

Putem și modifica o valoare existentă:

```cpp
e.varsta++;
```

sau:

```cpp
e.medie = 10;
```

Dacă inițial avem:

```text
e.medie = 9.75
```

după:

```cpp
e.medie = 10;
```

structura devine:

```text
e
│
├── nume   = Ana
├── varsta = 18
└── medie  = 10
```

S-a modificat doar câmpul `medie`.

---

# Câmpurile pot fi folosite în expresii și condiții

Pentru că fiecare câmp are propriul tip, îl putem folosi ca pe o variabilă de acel tip.

De exemplu:

```cpp
if (e.medie >= 9)
    cout << "Medie cel putin 9";
```

sau:

```cpp
cout << e.varsta + 1;
```

Dacă:

```text
e.varsta = 18
```

se afișează:

```text
19
```

---

# Copierea structurilor

Două variabile de același tip structură pot fi atribuite una alteia.

```cpp
Elev e1, e2;

e2 = e1;
```

Valorile câmpurilor lui `e1` sunt copiate în `e2`.

Conceptual:

```text
e1                     e2

nume   = Ana     →      nume   = Ana
varsta = 18      →      varsta = 18
medie  = 9.75    →      medie  = 9.75
```

Nu trebuie să copiem separat fiecare câmp:

```cpp
e2.nume ...
e2.varsta ...
e2.medie ...
```

Putem copia structura ca întreg:

```cpp
e2 = e1;
```

---

# Exemplu complet

```cpp
#include <iostream>
using namespace std;

struct Elev {
    char nume[30];
    int varsta;
    double medie;
};

int main() {
    Elev e;

    cin >> e.nume >> e.varsta >> e.medie;

    if (e.medie >= 9)
        cout << e.nume;

    return 0;
}
```

Pentru:

```text
Ana 18 9.75
```

se afișează:

```text
Ana
```

Gândirea este:

```text
citesc datele elevului
        ↓
verific e.medie
        ↓
dacă e.medie >= 9
        ↓
afișez e.nume
```

---

# Recapitulare

Pentru:

```cpp
Elev e;
```

accesăm câmpurile cu `.`:

```cpp
e.nume
e.varsta
e.medie
```

Le putem:

```text
citi       → cin >> e.varsta;
afișa      → cout << e.varsta;
modifica   → e.varsta = 18;
folosi     → if (e.medie >= 9)
```

Iar două structuri de același tip pot fi copiate:

```cpp
e2 = e1;
```

> **Ideea esențială:** `e` reprezintă întreaga structură, iar `e.camp` ne permite să lucrăm cu o anumită informație din ea.