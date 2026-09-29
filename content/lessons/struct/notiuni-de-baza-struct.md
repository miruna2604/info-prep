# Noțiuni de bază despre structuri (`struct`)

Până acum, într-o variabilă memoram o singură valoare:

```cpp
int varsta;
double medie;
```

Dar uneori vrem să păstrăm împreună **mai multe informații despre același lucru**.

De exemplu, pentru un elev vrem să memorăm:

```text
nume
vârstă
medie
```

Aceste informații au legătură între ele, dar pot avea tipuri diferite.

În C++, le putem grupa folosind o **structură (`struct`)**.

---

# Declararea unei structuri

Putem defini un nou tip de date astfel:

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};
```

Gândește-te la structură ca la un model:

```text
Elev
│
├── nume
├── varsta
└── medie
```

Fiecare informație din structură se numește **câmp**.

În exemplul nostru avem trei câmpuri:

```cpp
char nume[30];
int varsta;
double medie;
```

Observă că ele pot avea tipuri diferite.

> **Atenție:** după `}` de la declararea structurii se scrie `;`.

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};
```

---

# Structura definește un tip

Declarația:

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};
```

definește tipul `Elev`.

Nu am creat încă un elev concret.

Este asemănător cu:

```text
int    → tip
Elev   → tip
```

După ce tipul `Elev` există, putem declara variabile de acest tip.

---

# Variabile de tip structură

Declarăm:

```cpp
Elev e;
```

Acum `e` este o variabilă care conține toate câmpurile definite în `Elev`:

```text
e
│
├── nume
├── varsta
└── medie
```

Putem avea mai multe variabile de același tip:

```cpp
Elev e1, e2;
```

Fiecare are propriile valori:

```text
e1                    e2
│                     │
├── nume               ├── nume
├── varsta             ├── varsta
└── medie              └── medie
```

Modificarea lui `e1` nu modifică automat și `e2`.

---

# De ce folosim structuri?

Fără `struct`, am putea avea:

```cpp
char nume[30];
int varsta;
double medie;
```

Dar dacă avem mai mulți elevi, lucrurile devin rapid greu de organizat.

O structură ne permite să spunem:

```text
toate aceste informații descriu același obiect
```

și să le grupăm:

```cpp
Elev e;
```

Același principiu poate fi folosit pentru multe situații:

```cpp
struct Punct {
    int x;
    int y;
};
```

sau:

```cpp
struct Produs {
    int cod;
    double pret;
};
```

Structura se construiește în funcție de informațiile pe care trebuie să le memorăm.

---

# Cum gândești o structură?

Dacă o problemă descrie mai multe caracteristici ale aceluiași element, gândește:

```text
Ce reprezintă elementul?
        ↓
Ce informații trebuie să memorez despre el?
        ↓
Fiecare informație devine un câmp
```

De exemplu:

```text
Un punct are:
- coordonata x
- coordonata y
```

devine:

```cpp
struct Punct {
    int x;
    int y;
};
```

---

# Recapitulare

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};
```

```text
Elev            → tipul definit de noi

nume
varsta          → câmpurile structurii
medie

Elev e;         → variabilă de tip Elev
```

> **Ideea esențială:** `struct` ne permite să grupăm mai multe informații, chiar și de tipuri diferite, care descriu același element.