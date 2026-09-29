# Vectori de structuri

Dacă vrem să memorăm datele unui singur elev, putem folosi:

```cpp
Elev e;
```

Dar dacă avem `n` elevi, putem crea un **vector de structuri**:

```cpp
Elev v[100];
```

Acum fiecare element al vectorului este o structură completă.

```text
v[0]                 v[1]                 v[2]
│                    │                    │
├── nume             ├── nume             ├── nume
├── varsta           ├── varsta           ├── varsta
└── medie            └── medie            └── medie
```

Astfel putem memora mai multe elemente, fiecare având mai multe caracteristici.

---

# Declararea unui vector de structuri

Pornim de la tipul:

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};
```

Apoi declarăm:

```cpp
Elev v[100];
```

Diferența este:

```text
Elev e;       → un singur elev

Elev v[100];  → până la 100 de elevi
```

Fiecare:

```cpp
v[i]
```

este o variabilă de tip `Elev`.

---

# Accesarea câmpurilor

Dacă:

```cpp
v[i]
```

este un elev, atunci câmpurile lui sunt:

```cpp
v[i].nume
v[i].varsta
v[i].medie
```

Gândește expresia în două etape:

```text
v[i].medie
 ↑      ↑
 │      └── câmpul pe care îl vreau
 │
 └── elementul din vector
```

De exemplu:

```cpp
v[2].medie
```

înseamnă:

```text
câmpul medie
al elementului v[2]
```

---

# Citirea unui vector de structuri

Mai întâi citim numărul de elemente:

```cpp
int n;
cin >> n;
```

Apoi parcurgem vectorul:

```cpp
for (int i = 0; i < n; i++)
    cin >> v[i].nume >> v[i].varsta >> v[i].medie;
```

Pentru input:

```text
3
Ana 18 9.50
Mihai 17 8.75
Ioana 18 9.80
```

obținem conceptual:

```text
v[0]
├── nume   = Ana
├── varsta = 18
└── medie  = 9.50

v[1]
├── nume   = Mihai
├── varsta = 17
└── medie  = 8.75

v[2]
├── nume   = Ioana
├── varsta = 18
└── medie  = 9.80
```

---

# Afișarea unui vector de structuri

Parcurgerea este aceeași ca la un vector obișnuit:

```cpp
for (int i = 0; i < n; i++) {
    cout << v[i].nume << " ";
    cout << v[i].varsta << " ";
    cout << v[i].medie << '\n';
}
```

Diferența este că `v[i]` nu mai reprezintă un simplu `int`.

```text
vector de int:

v[i] → o valoare


vector de structuri:

v[i] → o structură întreagă
       ├── nume
       ├── varsta
       └── medie
```

---

# Prelucrarea vectorului

Odată ce înțelegem:

```cpp
v[i].camp
```

putem folosi aproape toate ideile deja cunoscute de la vectori.

De exemplu, vrem să afișăm elevii cu media cel puțin `9`.

Cerința se transformă astfel:

```text
verific fiecare elev
        ↓
parcurg vectorul
        ↓
mă interesează media elevului curent
        ↓
v[i].medie
        ↓
verific v[i].medie >= 9
```

Cod:

```cpp
for (int i = 0; i < n; i++)
    if (v[i].medie >= 9)
        cout << v[i].nume << '\n';
```

Pentru:

```text
Ana    9.50
Mihai  8.75
Ioana  9.80
```

se afișează:

```text
Ana
Ioana
```

---

# Căutarea într-un vector de structuri

Putem căuta și după un anumit câmp.

De exemplu, vrem să găsim primul elev cu vârsta `18`.

```cpp
int poz = -1;

for (int i = 0; i < n; i++) {
    if (v[i].varsta == 18) {
        poz = i;
        break;
    }
}
```

Observă că algoritmul de căutare nu s-a schimbat.

Într-un vector simplu verificam:

```cpp
v[i] == x
```

Acum verificăm câmpul care ne interesează:

```cpp
v[i].varsta == 18
```

---

# Minim și maxim după un câmp

Să vrem elevul cu cea mai mare medie.

Nu este suficient să memorăm doar valoarea maximă dacă vrem să știm **care elev** o are.

Este mai util să memorăm indicele lui:

```cpp
int pozMax = 0;

for (int i = 1; i < n; i++)
    if (v[i].medie > v[pozMax].medie)
        pozMax = i;
```

La final:

```cpp
v[pozMax]
```

este elevul cu cea mai mare medie.

Putem afișa:

```cpp
cout << v[pozMax].nume << " " << v[pozMax].medie;
```

Ideea este:

```text
pozMax
   ↓
indicele structurii cu cea mai mare medie
   ↓
v[pozMax].nume
v[pozMax].varsta
v[pozMax].medie
```

Astfel păstrăm accesul la **toate informațiile** despre acel elev.

---

# Sortarea unui vector de structuri

Un vector de structuri poate fi sortat după unul dintre câmpuri.

De exemplu, pentru sortare crescătoare după medie putem folosi:

```cpp
for (int i = 0; i < n - 1; i++) {
    for (int j = i + 1; j < n; j++) {
        if (v[i].medie > v[j].medie) {
            Elev aux = v[i];
            v[i] = v[j];
            v[j] = aux;
        }
    }
}
```

Partea importantă este că interschimbăm:

```cpp
v[i]
```

cu:

```cpp
v[j]
```

adică **structurile întregi**, nu doar mediile.

De ce?

Să avem:

```text
Ana    9.50
Mihai  8.75
```

Dacă am schimba doar valorile câmpului `medie`, am obține:

```text
Ana    8.75
Mihai  9.50
```

și am strica legătura dintre elev și media lui.

Corect este să mutăm toate datele împreună:

```text
Mihai  8.75
Ana    9.50
```

De aceea interschimbăm:

```cpp
Elev aux = v[i];
v[i] = v[j];
v[j] = aux;
```

---

# Cum gândești problemele cu vectori de structuri?

Nu trebuie să înveți algoritmi complet noi.

Pornește de la ceea ce știi deja despre vectori și identifică **câmpul relevant**.

```text
„afișează elevii cu media peste 9”
→ v[i].medie

„numără elevii de 18 ani”
→ v[i].varsta

„găsește elevul cu media maximă”
→ compar v[i].medie

„sortează elevii după medie”
→ compar v[i].medie
→ interschimb v[i] cu v[j]
```

Modelul mental este:

```text
v[i]       → elementul curent
v[i].camp  → informația care mă interesează despre el
```

---

# Recapitulare

Declarare:

```cpp
struct Elev {
    char nume[30];
    int varsta;
    double medie;
};

Elev v[100];
```

Acces:

```text
v[i]         → structura de la indicele i
v[i].nume    → numele
v[i].varsta  → vârsta
v[i].medie   → media
```

Ideile cunoscute de la vectori rămân valabile:

```text
parcurgere
căutare
numărare
minim / maxim
sortare
```

doar că acum lucrăm cu:

```cpp
v[i].camp
```

> **Ideea esențială:** un vector de structuri este tot un vector, dar fiecare element conține mai multe informații care trebuie păstrate împreună.