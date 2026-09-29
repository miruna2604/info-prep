# Tipuri de date în C++

În lecția anterioară am văzut că fiecare variabilă are un **tip**.

Tipul stabilește **ce fel de valoare poate memora variabila**.

De exemplu:

```cpp
int varsta = 18;
double medie = 9.75;
char litera = 'A';
bool admis = true;
```

Valorile memorate sunt diferite:

```text
18      → număr întreg
9.75    → număr real
'A'     → caracter
true    → valoare logică
```

De aceea avem nevoie de tipuri de date diferite.

În probleme vom folosi în principal:

```text
int        → numere întregi
long long  → numere întregi foarte mari
double     → numere reale
char       → caractere
bool       → adevărat / fals
```

> **De reținut:** Alegem tipul unei variabile în funcție de valorile pe care trebuie să le memoreze.

---

# `int` — numere întregi

Tipul `int` este folosit pentru memorarea **numerelor întregi**.

```cpp
int varsta = 18;
int temperatura = -5;
int x = 0;
```

Un `int` poate memora valori precum:

```text
-100
-5
0
17
1000
```

dar nu este potrivit pentru valori cu parte zecimală precum:

```text
3.14
9.75
2.5
```

`int` va fi unul dintre cele mai folosite tipuri în problemele pe care le vom rezolva.

---

## Cât de mare poate fi un `int`?

În mediile întâlnite în mod obișnuit la problemele de liceu, un `int` are limita aproximativă:

```text
-2 × 10⁹ ... 2 × 10⁹
```

Mai exact, pentru un `int` pe 32 de biți:

```text
-2 147 483 648
...
 2 147 483 647
```

Nu este necesar să memorezi valorile exacte.

Este suficient să reții:

```text
int → aproximativ ±2 × 10⁹
```

De exemplu:

```text
100 000          → încape
1 000 000 000    → încape
1 000 000 000 000 → nu încape
```

---

# `long long` — numere întregi mai mari

Dacă avem nevoie să memorăm numere întregi care depășesc limita lui `int`, putem folosi:

```cpp
long long
```

De exemplu:

```cpp
long long n = 5000000000;
```

Numărul:

```text
5 000 000 000
```

este mai mare decât limita unui `int`, dar poate fi memorat într-un `long long`.

Pentru problemele noastre putem reține aproximativ:

```text
int        → până în zona lui 10⁹
long long  → până în zona lui 10¹⁸
```

Mai precis, un `long long` pe 64 de biți poate ajunge aproximativ până la:

```text
±9 × 10¹⁸
```

---

## Cum alegem între `int` și `long long`?

Ne uităm la **valorile maxime care pot apărea**.

Dacă enunțul spune:

```text
n ≤ 100 000
```

putem folosi:

```cpp
int n;
```

Dacă avem:

```text
n ≤ 10⁹
```

valoarea încă încape într-un `int`.

Dar dacă avem:

```text
n ≤ 10¹²
```

`int` nu mai este suficient.

Vom folosi:

```cpp
long long n;
```

pentru că:

```text
10¹² > 2 × 10⁹
```

---

## Atenție și la rezultatul calculelor

Nu trebuie să verificăm doar dacă valorile inițiale încap într-un anumit tip.

Trebuie să ne gândim și la **valorile care pot apărea în timpul calculelor**.

Să presupunem că avem:

```cpp
int a = 100000;
int b = 100000;
```

Atât `a`, cât și `b` încap fără probleme într-un `int`.

Dar produsul lor este:

```text
100 000 × 100 000 = 10 000 000 000
```

adică:

```text
10¹⁰
```

Această valoare depășește limita unui `int`.

Într-o astfel de situație avem nevoie de un tip suficient de mare pentru rezultat, de exemplu `long long`.

> **Important:** Atunci când alegi tipul unei variabile, gândește-te și la cât de mari pot deveni rezultatele calculelor.

Dacă o valoare depășește intervalul pe care tipul respectiv îl poate reprezenta, apare o problemă numită **overflow**.

Pentru moment este suficient să reții ideea:

```text
valoarea devine prea mare pentru tipul ales
→ tipul respectiv nu mai este potrivit
```

---

# `double` — numere reale

Pentru valori care pot avea **parte zecimală** folosim, în general:

```cpp
double
```

De exemplu:

```cpp
double medie = 9.75;
double temperatura = 23.5;
double x = 2.5;
```

Compară:

```cpp
int a = 5;
double b = 5.5;
```

`a` memorează un număr întreg, iar `b` poate memora o valoare cu parte zecimală.

Există și tipul `float` pentru numere reale, însă `double` oferă o precizie mai mare și va fi alegerea noastră obișnuită atunci când avem nevoie de valori reale.

---

# `int` vs. `double` la împărțire

Aici apare una dintre cele mai importante diferențe dintre cele două tipuri.

Să avem:

```cpp
int a = 5;
int b = 2;
```

Dacă efectuăm:

```cpp
a / b
```

rezultatul este:

```text
2
```

nu:

```text
2.5
```

De ce?

Pentru că ambii operanzi sunt de tip `int`:

```text
int / int
     ↓
împărțire întreagă
     ↓
     2
```

Partea zecimală este eliminată.

---

## Dacă apare un `double`

Să schimbăm tipul uneia dintre valori:

```cpp
double a = 5;
int b = 2;
```

Acum:

```cpp
a / b
```

produce:

```text
2.5
```

Putem reține regula astfel:

```text
int / int
→ împărțire întreagă

int / double
double / int
double / double
→ împărțire reală
```

> **De reținut:** Dacă ambii operanzi sunt `int`, împărțirea este întreagă. Dacă cel puțin unul este `double`, împărțirea este reală.

---

# Atenție la tipul expresiei

Să analizăm:

```cpp
int a = 5;
int b = 2;

double rezultat = a / b;
```

Am putea crede că:

```text
rezultat = 2.5
```

deoarece `rezultat` este `double`.

Dar nu se întâmplă așa.

Mai întâi este calculată expresia:

```cpp
a / b
```

Cum `a` și `b` sunt `int`:

```text
5 / 2
  ↓
  2
```

Abia apoi rezultatul este memorat în variabila `rezultat`:

```text
2 → 2.0
```

Prin urmare:

```text
rezultat = 2.0
```

> **Important:** Tipul variabilei în care memorăm rezultatul nu schimbă modul în care expresia a fost deja calculată.

---

## Cum obținem rezultatul real?

Putem transforma unul dintre operanzi în `double`:

```cpp
int a = 5;
int b = 2;

double rezultat = (double)a / b;
```

Acum avem:

```text
(double)a / b
     ↓
   5.0 / 2
     ↓
     2.5
```

Această transformare se numește **conversie de tip**.

Pentru moment este suficient să recunoști forma:

```cpp
(double)a
```

și să știi că valoarea lui `a` este tratată ca `double` în expresia respectivă.

---

# `char` — un singur caracter

Tipul `char` este folosit pentru memorarea unui **singur caracter**.

De exemplu:

```cpp
char litera = 'A';
char cifra = '7';
char semn = '+';
```

Valorile de tip `char` se scriu între **apostrofuri**:

```cpp
'A'
```

```cpp
'7'
```

```cpp
'+'
```

---

## Caracterul `'7'` nu este numărul `7`

Este foarte important să facem diferența dintre:

```cpp
char c = '7';
```

și:

```cpp
int x = 7;
```

În primul caz avem:

```text
'7' → caracter
```

În al doilea:

```text
7 → număr întreg
```

Așadar:

```text
'7' și 7 nu reprezintă același lucru
```

Calculatorul reprezintă intern caracterele prin coduri numerice. Vom folosi această proprietate mai târziu, când vom lucra cu șiruri de caractere.

Pentru moment este suficient să reții:

```text
'A' → caracter
'7' → caracter
7   → număr
```

---

# `bool` — adevărat sau fals

Uneori vrem să memorăm dacă o anumită situație este **adevărată sau falsă**.

Pentru aceasta putem folosi tipul:

```cpp
bool
```

Acesta are două valori:

```cpp
true
false
```

De exemplu:

```cpp
bool gasit = false;
```

Mai târziu valoarea poate deveni:

```cpp
gasit = true;
```

Putem privi o variabilă `bool` ca pe un indicator:

```text
true  → DA
false → NU
```

De exemplu, nume precum:

```cpp
bool gasit;
bool prim;
bool exista;
```

sugerează că vrem să memorăm dacă o anumită proprietate este adevărată sau falsă.

Vom vedea cum folosim astfel de variabile după ce învățăm condițiile și structurile de control.

---

# Cum alegem tipul potrivit?

Putem porni de la două întrebări:

### 1. Ce fel de valoare trebuie să memorez?

```text
număr întreg      → int / long long
număr real        → double
caracter           → char
adevărat / fals   → bool
```

### 2. Cât de mare poate deveni valoarea?

Pentru numerele întregi:

```text
până în zona lui 10⁹
→ int

mai mare decât limita lui int,
dar în zona lui 10¹⁸
→ long long
```

De exemplu:

```text
n ≤ 100 000
```

→

```cpp
int n;
```

Dar:

```text
n ≤ 10¹²
```

→

```cpp
long long n;
```

Dacă avem o valoare reală:

```cpp
double medie;
```

Un caracter:

```cpp
char litera;
```

O situație adevărat/fals:

```cpp
bool gasit;
```

> Alegerea tipului pornește de la **ce vrem să memorăm** și **ce valori pot apărea în program**.

---

# Recapitulare

Din această lecție trebuie să reții în primul rând:

```text
int        → numere întregi
long long  → numere întregi mai mari
double     → numere reale
char       → un caracter
bool       → true / false
```

Pentru numere întregi, limitele utile de reținut sunt aproximativ:

```text
int        → ±2 × 10⁹
long long  → ±9 × 10¹⁸
```

Nu te uita doar la valoarea citită. Verifică și **cât de mari pot deveni rezultatele calculelor**.

### Foarte important

La împărțire:

```text
int / int
→ împărțire întreagă

cel puțin un operand double
→ împărțire reală
```

De exemplu:

```cpp
5 / 2
```

produce:

```text
2
```

iar:

```cpp
(double)5 / 2
```

produce:

```text
2.5
```

De asemenea:

```cpp
double rezultat = 5 / 2;
```

nu produce `2.5`.

Expresia `5 / 2` este calculată mai întâi ca împărțire întreagă, deci în `rezultat` ajunge valoarea `2.0`.

### Alte diferențe de recunoscut

```text
'7' → caracter
7   → număr

true / false → valori de tip bool
```

> **Pentru bacul la info:** alegerea corectă între `int` și `long long` și înțelegerea împărțirii dintre valori `int` sunt mult mai importante decât memorarea tuturor tipurilor existente în C++. Urmărește întotdeauna tipurile valorilor și rezultatul pe care îl poate produce o expresie.
