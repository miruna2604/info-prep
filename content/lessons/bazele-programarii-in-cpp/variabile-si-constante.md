# Variabile și constante în C++

Într-un program avem nevoie să **memorăm și să prelucrăm date**.

Pentru aceasta folosim **variabile**.

O variabilă poate fi privită ca o **zonă din memorie care are un nume și în care putem păstra o valoare**.

De exemplu:

```cpp
int varsta = 18;
```

Putem reprezenta variabila astfel:

```text
   varsta
┌─────────┐
│   18    │
└─────────┘
```

* `int` reprezintă **tipul**
* `varsta` reprezintă **numele variabilei**
* `18` reprezintă **valoarea memorată**

> **De reținut:** O variabilă are un **tip**, un **nume** și poate memora o **valoare**.

---

# Declararea unei variabile

Înainte să folosim o variabilă, trebuie să o declarăm.

Forma generală este:

```text
tip nume;
```

Exemplu:

```cpp
int x;
```

Am declarat o variabilă:

* de tip `int`
* cu numele `x`

Aceasta va putea memora un număr întreg.

---

## Declararea mai multor variabile

Putem declara mai multe variabile de același tip:

```cpp
int a;
int b;
int c;
```

sau, mai simplu:

```cpp
int a, b, c;
```

Toate cele trei variabile sunt de tip `int`.

---

# Inițializarea unei variabile

Putem da unei variabile o valoare chiar în momentul declarării.

```cpp
int x = 10;
```

Această operație se numește **inițializare**.

```text
      x
┌─────────┐
│   10    │
└─────────┘
```

Putem inițializa și mai multe variabile:

```cpp
int a = 5, b = 10;
```

Acum:

```text
    a           b
┌───────┐   ┌───────┐
│   5   │   │  10   │
└───────┘   └───────┘
```

---

# Declarare vs. inițializare

Este important să facem diferența.

### Doar declarare

```cpp
int x;
```

Am creat variabila `x`, dar nu i-am dat încă noi o valoare.

### Declarare și inițializare

```cpp
int x = 10;
```

Am creat variabila și i-am dat valoarea inițială `10`.

> **De reținut:** Inițializarea înseamnă atribuirea unei valori inițiale unei variabile.

---

# Atribuirea unei valori

După declararea unei variabile îi putem atribui o valoare folosind operatorul `=`.

```cpp
int x;

x = 10;
```

După instrucțiunea:

```cpp
x = 10;
```

variabila `x` conține valoarea `10`.

---

# Modificarea valorii unei variabile

Valoarea unei variabile se poate modifica în timpul executării programului.

```cpp
int x = 10;

x = 20;
```

Inițial avem:

```text
      x
┌─────────┐
│   10    │
└─────────┘
```

După:

```cpp
x = 20;
```

avem:

```text
      x
┌─────────┐
│   20    │
└─────────┘
```

Vechea valoare este înlocuită de noua valoare.

---

# Operatorul `=`

În C++, `=` este **operatorul de atribuire**.

Instrucțiunea:

```cpp
x = 5;
```

înseamnă:

> Pune valoarea `5` în variabila `x`.

Putem atribui unei variabile și rezultatul unei expresii:

```cpp
x = 5 + 3;
```

După executarea instrucțiunii:

```text
x = 8
```

---

## Atribuirea folosind alte variabile

Putem folosi valoarea unei variabile pentru a calcula valoarea alteia.

```cpp
int a = 5;
int b;

b = a;
```

Acum ambele variabile conțin valoarea `5`.

```text
    a           b
┌───────┐   ┌───────┐
│   5   │   │   5   │
└───────┘   └───────┘
```

Dacă modificăm ulterior `a`:

```cpp
a = 10;
```

obținem:

```text
    a           b
┌───────┐   ┌───────┐
│  10   │   │   5   │
└───────┘   └───────┘
```

Modificarea lui `a` nu modifică automat valoarea lui `b`.

---

# Noua valoare poate depinde de valoarea veche

O instrucțiune foarte întâlnită în probleme este:

```cpp
x = x + 1;
```

Aceasta nu este o egalitate matematică.

În programare înseamnă:

1. luăm valoarea actuală a lui `x`
2. adăugăm `1`
3. rezultatul devine noua valoare a lui `x`

Dacă inițial:

```cpp
int x = 5;
```

după:

```cpp
x = x + 1;
```

vom avea:

```text
x = 6
```

Vizual:

```text
x = 5

   x + 1
     ↓
   5 + 1
     ↓
     6
     ↓

x = 6
```

Acest tip de operație apare foarte des în algoritmii pentru BAC.

---

# Variabile și citirea datelor

O valoare citită cu `cin` este memorată într-o variabilă.

```cpp
int x;

cin >> x;
```

Dacă utilizatorul introduce:

```text
25
```

atunci:

```text
      x
┌─────────┐
│   25    │
└─────────┘
```

Putem apoi folosi valoarea în calcule:

```cpp
int x;

cin >> x;

x = x * 2;

cout << x;
```

Pentru valoarea:

```text
5
```

programul va afișa:

```text
10
```

---

# Numele variabilelor

Numele unei variabile se numește și **identificator**.

Exemple de nume corecte:

```cpp
int x;
int varsta;
int nota1;
int suma_totala;
```

Există câteva reguli importante.

### 1. Poate conține litere, cifre și `_`

Corect:

```cpp
int nota1;
int suma_totala;
```

---

### 2. Nu poate începe cu o cifră

Greșit:

```cpp
int 1nota;
```

Corect:

```cpp
int nota1;
```

---

### 3. Nu poate conține spații

Greșit:

```cpp
int nota finala;
```

Corect:

```cpp
int notaFinala;
```

sau:

```cpp
int nota_finala;
```

---

### 4. Nu putem folosi cuvinte rezervate din C++

Greșit:

```cpp
int int;
```

sau:

```cpp
int for;
```

`int` și `for` au deja o semnificație în limbajul C++.

---

### 5. C++ face diferența între litere mari și mici

Variabilele:

```cpp
int x;
int X;
```

sunt două variabile diferite.

La fel:

```cpp
int suma;
int Suma;
```

reprezintă două nume diferite.

> **De reținut:** C++ este **case-sensitive**, deci literele mari și mici sunt considerate diferite.

---

# Alegerea numelor variabilelor

Este recomandat să folosim nume care ne ajută să înțelegem rolul variabilei.

În loc de:

```cpp
int x;
```

într-un program care calculează suma putem folosi:

```cpp
int suma;
```

În algoritmii de BAC vei întâlni însă foarte des și nume scurte precum:

```cpp
n
i
j
x
s
nr
maxim
minim
```

Acestea sunt potrivite atunci când rolul lor este clar.

---

# Ce este o constantă?

O **constantă** este o valoare care nu se modifică în timpul executării programului.

De exemplu:

```cpp
const double PI = 3.14159;
```

Cuvântul:

```cpp
const
```

arată că valoarea nu mai poate fi modificată după inițializare.

---

# Declararea unei constante

Forma generală este:

```text
const tip nume = valoare;
```

Exemplu:

```cpp
const int MAXIM = 100;
```

sau:

```cpp
const double PI = 3.14159;
```

După ce am declarat:

```cpp
const int MAXIM = 100;
```

nu putem face ulterior:

```cpp
MAXIM = 200;
```

pentru că `MAXIM` este o constantă.

---

# Variabilă vs. constantă

O variabilă își poate modifica valoarea:

```cpp
int x = 10;

x = 20;
```

Acest lucru este permis.

În schimb:

```cpp
const int x = 10;

x = 20;
```

nu este permis.

Putem reține diferența astfel:

```text
VARIABILĂ

x = 10
   ↓
x = 20

valoarea se poate modifica


CONSTANTĂ

x = 10
   ↓
rămâne 10

valoarea nu poate fi modificată
```

---

# Constante scrise direct în program

În instrucțiunea:

```cpp
int x = 10;
```

`x` este o variabilă, iar:

```text
10
```

este o valoare constantă scrisă direct în program.

La fel:

```cpp
cout << 25;
```

valoarea `25` este constantă.

În:

```cpp
cout << "Salut";
```

textul `"Salut"` este de asemenea o valoare scrisă direct în program.

Pentru problemele de BAC este suficient să recunoști diferența dintre **o variabilă, a cărei valoare se poate modifica**, și **o constantă, a cărei valoare rămâne fixă**.

---

# Exemplu complet

Programul citește lungimea și lățimea unui dreptunghi și calculează aria.

```cpp
#include <iostream>
using namespace std;

int main() {
    int lungime, latime;
    int aria;

    cin >> lungime >> latime;

    aria = lungime * latime;

    cout << aria;

    return 0;
}
```

În acest program:

```cpp
int lungime, latime;
```

declară două variabile.

```cpp
int aria;
```

declară variabila în care vom memora rezultatul.

```cpp
cin >> lungime >> latime;
```

atribuie variabilelor valorile citite.

```cpp
aria = lungime * latime;
```

calculează o valoare nouă și o memorează în variabila `aria`.

---

# Exemplu cu o constantă

Calculăm lungimea unui cerc folosind o valoare constantă pentru π.

```cpp
#include <iostream>
using namespace std;

int main() {
    const double PI = 3.14159;

    double raza;
    double lungime;

    cin >> raza;

    lungime = 2 * PI * raza;

    cout << lungime;

    return 0;
}
```

Valoarea lui `raza` se poate schimba în funcție de datele citite.

În schimb:

```cpp
PI
```

rămâne constant pe parcursul programului.

---

# Recapitulare

* **Variabila** memorează o valoare care poate fi folosită și modificată în program.
* Fiecare variabilă are un **tip** și un **nume**.
* **Declararea** creează variabila.

```cpp
int x;
```

* **Inițializarea** îi oferă o valoare inițială.

```cpp
int x = 10;
```

* **Atribuirea** pune o valoare într-o variabilă.

```cpp
x = 20;
```

* `=` este operatorul de **atribuire**.
* O instrucțiune precum `x = x + 1;` folosește valoarea actuală a variabilei pentru a calcula noua valoare.
* Numele variabilelor nu pot începe cu o cifră, nu pot conține spații și nu pot fi cuvinte rezervate.
* C++ face diferența între litere mari și mici: `x` și `X` sunt variabile diferite.
* **`const`** este folosit pentru o valoare care nu trebuie modificată.

```cpp
const int MAXIM = 100;
```

> **Reține:** O variabilă este ca o cutie în care putem păstra și modifica o valoare. O constantă păstrează o valoare care nu poate fi modificată după inițializare.
