# Citirea și afișarea datelor în C++

Un program are nevoie adesea să **primească date** de la utilizator și să **afișeze rezultate** pe ecran.

În C++, pentru operațiile de bază folosim:

* **`cin`** pentru citirea datelor
* **`cout`** pentru afișarea datelor

Pentru a putea folosi `cin` și `cout`, includem biblioteca:

```cpp
#include <iostream>
```

---

## Afișarea datelor cu `cout`

`cout` este folosit pentru a **afișa informații pe ecran**.

Operatorul folosit pentru afișare este:

```text
<<
```

### Afișarea unui text

```cpp
cout << "Salut!";
```

Programul va afișa:

```text
Salut!
```

Textul pe care vrem să îl afișăm se scrie între ghilimele `" "`.

---

## Afișarea valorii unei variabile

Putem folosi `cout` și pentru a afișa valoarea unei variabile.

```cpp
int x = 10;

cout << x;
```

Rezultatul va fi:

```text
10
```

Observă diferența:

```cpp
cout << "x";
```

afișează:

```text
x
```

în timp ce:

```cpp
cout << x;
```

afișează **valoarea variabilei `x`**.

> **De reținut:** Textul se scrie între ghilimele, iar variabilele se scriu fără ghilimele.

---

## Afișarea mai multor valori

Putem afișa mai multe lucruri folosind mai mulți operatori `<<`.

```cpp
int varsta = 17;

cout << "Am " << varsta << " ani.";
```

Rezultatul va fi:

```text
Am 17 ani.
```

Putem combina astfel **texte, variabile și valori** în aceeași instrucțiune.

---

## Spațiile la afișare

`cout` nu adaugă automat spații între valorile afișate.

De exemplu:

```cpp
int a = 10;
int b = 20;

cout << a << b;
```

va afișa:

```text
1020
```

Dacă vrem un spațiu între ele, trebuie să îl adăugăm:

```cpp
cout << a << " " << b;
```

Rezultatul:

```text
10 20
```

---

# Trecerea la o linie nouă

Pentru a continua afișarea pe următoarea linie putem folosi `endl` sau `\n`.

## Folosind `endl`

```cpp
cout << "Prima linie" << endl;
cout << "A doua linie";
```

Rezultatul:

```text
Prima linie
A doua linie
```

`endl` încheie linia curentă, astfel încât următoarea afișare începe pe o linie nouă.

---

## Folosind `\n`

Putem obține același efect folosind caracterul special:

```text
\n
```

Exemplu:

```cpp
cout << "Prima linie\n";
cout << "A doua linie";
```

Rezultatul:

```text
Prima linie
A doua linie
```

Putem folosi `\n` și în interiorul unui text:

```cpp
cout << "Ana\nMaria\nAlex";
```

Rezultatul:

```text
Ana
Maria
Alex
```

> **De reținut:** Atât `endl`, cât și `\n` pot fi folosite pentru a continua afișarea pe o linie nouă.

---

# Citirea datelor cu `cin`

`cin` este folosit pentru a **citi date introduse de utilizator**.

Operatorul folosit pentru citire este:

```text
>>
```

Pentru a citi o valoare avem nevoie de o variabilă în care aceasta să fie memorată.

```cpp
int x;

cin >> x;
```

Dacă utilizatorul introduce:

```text
25
```

variabila `x` va primi valoarea `25`.

Putem vedea acest lucru afișând apoi variabila:

```cpp
int x;

cin >> x;

cout << x;
```

Dacă introducem:

```text
25
```

programul va afișa:

```text
25
```

---

# Citirea mai multor valori

Putem citi mai multe valori într-o singură instrucțiune.

```cpp
int a, b;

cin >> a >> b;
```

Dacă utilizatorul introduce:

```text
10 20
```

atunci:

```text
a = 10
b = 20
```

Valorile sunt atribuite variabilelor **în ordinea în care acestea apar în instrucțiunea `cin`**.

Putem scrie și:

```text
10
20
```

iar rezultatul va fi același.

Pentru citirea cu `cin >>`, spațiile și trecerile la linie separă valorile introduse.

---

## Exemplu complet

Să citim două numere și să afișăm suma lor.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cin >> a >> b;

    cout << a + b;

    return 0;
}
```

Dacă introducem:

```text
7 5
```

programul va afișa:

```text
12
```

Procesul este:

```text
7 5
 ↓ ↓
 a b

a + b = 12
```

Mai întâi valorile sunt **citite**, apoi programul le **prelucrează**, iar rezultatul este **afișat**.

---

# Citire → Prelucrare → Afișare

Foarte multe programe pe care le vom scrie urmează aceeași structură:

**1. Citim datele**

```cpp
cin >> a >> b;
```

**2. Prelucrăm datele**

```cpp
int suma = a + b;
```

**3. Afișăm rezultatul**

```cpp
cout << suma;
```

Programul complet:

```cpp
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

> **De reținut:** În foarte multe probleme, programul poate fi privit simplu ca: **Citire → Prelucrare → Afișare**.

---

# `cin` și tipul variabilei

Valoarea citită trebuie să fie potrivită pentru tipul variabilei.

De exemplu:

```cpp
int varsta;
cin >> varsta;
```

este potrivit pentru un număr întreg:

```text
18
```

Pentru un număr real putem folosi:

```cpp
double medie;
cin >> medie;
```

De exemplu:

```text
9.75
```

Pentru un singur caracter:

```cpp
char litera;
cin >> litera;
```

De exemplu:

```text
A
```

Tipul variabilei stabilește **ce fel de informație poate fi memorată în ea**.

---

# Citirea unui cuvânt

Putem folosi `cin` și pentru a citi un cuvânt.

```cpp
string nume;

cin >> nume;
```

Dacă introducem:

```text
Andrei
```

variabila `nume` va conține `"Andrei"`.

Pentru folosirea tipului `string` putem include:

```cpp
#include <string>
```

Exemplu:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume;

    cin >> nume;

    cout << "Salut, " << nume << "!";

    return 0;
}
```

Dacă introducem:

```text
Andrei
```

programul va afișa:

```text
Salut, Andrei!
```

---

# Atenție la textele care conțin spații

Instrucțiunea:

```cpp
cin >> nume;
```

citește în mod obișnuit până la primul spațiu.

Dacă avem:

```cpp
string nume;

cin >> nume;
```

și introducem:

```text
Ana Maria
```

în `nume` va fi citit doar:

```text
Ana
```

Pentru a citi o linie întreagă, inclusiv spațiile, putem folosi `getline()`:

```cpp
string nume;

getline(cin, nume);
```

Acum:

```text
Ana Maria
```

poate fi citit în întregime.

> **Important:** Pentru început, reține diferența simplă: `cin >>` este potrivit pentru citirea valorilor și a cuvintelor, iar `getline()` poate citi o linie întreagă care conține și spații.

---

# `cin` și `cout` împreună

Un exemplu simplu:

```cpp
#include <iostream>
using namespace std;

int main() {
    int varsta;

    cout << "Introdu varsta: ";
    cin >> varsta;

    cout << "Ai " << varsta << " ani.";

    return 0;
}
```

Dacă utilizatorul introduce `17`, programul va afișa:

```text
Introdu varsta: 17
Ai 17 ani.
```

Aici:

```cpp
cout << "Introdu varsta: ";
```

afișează un mesaj pentru utilizator,

```cpp
cin >> varsta;
```

citește valoarea,

iar:

```cpp
cout << "Ai " << varsta << " ani.";
```

afișează rezultatul.

---

# `<<` și `>>`

Este important să nu confundăm cei doi operatori.

Pentru **afișare**:

```cpp
cout << x;
```

Pentru **citire**:

```cpp
cin >> x;
```

O metodă simplă de a le reține este să urmărești direcția datelor:

```text
cout << x
      datele merg spre afișare

cin >> x
       datele merg spre variabila x
```

---

# Exemplu final

Programul citește lungimea și lățimea unui dreptunghi și afișează aria.

```cpp
#include <iostream>
using namespace std;

int main() {
    int lungime, latime;
    int aria;

    cin >> lungime >> latime;

    aria = lungime * latime;

    cout << "Aria este " << aria;

    return 0;
}
```

Pentru:

```text
5 3
```

obținem:

```text
Aria este 15
```

Avem din nou cele trei etape:

```text
CITIRE
5 3
↓ ↓
lungime latime

PRELUCRARE
aria = lungime * latime

AFIȘARE
Aria este 15
```

---

# Recapitulare

* **`#include <iostream>`** - ne permite să folosim operațiile standard de intrare și ieșire.
* **`cout`** - este folosit pentru afișarea datelor.
* **`<<`** - este operatorul folosit cu `cout`.
* **`cin`** - este folosit pentru citirea datelor.
* **`>>`** - este operatorul folosit cu `cin`.
* **`endl`** - continuă afișarea pe o linie nouă.
* **`\n`** - poate fi folosit pentru trecerea la o linie nouă.
* **`cin >> a >> b;`** - permite citirea mai multor valori.
* **`cout << a << " " << b;`** - permite afișarea mai multor valori.
* **`getline()`** - poate fi folosit pentru citirea unei linii de text care conține spații.

> **Reține:** Pentru foarte multe programe C++, gândește-te la structura **Citire → Prelucrare → Afișare**.
