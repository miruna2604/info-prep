# Tipuri de date în C++

Fiecare variabilă din C++ are un **tip de date**.

Tipul stabilește **ce fel de valoare poate memora variabila** și ce operații putem face cu aceasta.

De exemplu:

```cpp
int varsta = 18;
double medie = 9.75;
char litera = 'A';
bool admis = true;
```

Avem tipuri diferite deoarece valorile memorate sunt diferite:

```text
18      → număr întreg
9.75    → număr real
'A'     → caracter
true    → valoare logică
```

> **De reținut:** Tipul variabilei trebuie ales în funcție de valorile pe care vrem să le memorăm și de rezultatele care pot apărea în calcule.

---

# `int` - numere întregi

Tipul `int` este folosit pentru **numere întregi**.

Exemple:

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

dar nu este potrivit pentru valori cu parte zecimală, precum:

```text
3.14
9.75
2.5
```

`int` este unul dintre cele mai folosite tipuri de date în problemele de BAC.

Îl vom întâlni pentru:

* numere naturale și întregi
* contoare
* indici
* cifre
* elementele vectorilor
* elementele matricilor

---

## Cât de mare poate fi un `int`?

În mediile folosite în mod obișnuit la problemele de liceu, un `int` pe 32 de biți poate memora valori între:

```text
-2 147 483 648
și
 2 147 483 647
```

Pentru BAC este suficient să reții aproximativ:

```text
int → de la -2 × 10⁹ până la 2 × 10⁹
```

De exemplu:

```text
100000        → încape în int
1000000000    → încape în int
1000000000000 → NU încape în int
```

---

# `long long` - numere întregi mai mari

Dacă avem nevoie să memorăm numere întregi mai mari decât limita lui `int`, putem folosi:

```cpp
long long
```

Exemplu:

```cpp
long long n = 5000000000;
```

Valoarea `5 000 000 000` este prea mare pentru un `int` obișnuit, dar încape într-un `long long`.

Un `long long` pe 64 de biți poate memora valori aproximativ între:

```text
-9,22 × 10¹⁸
și
 9,22 × 10¹⁸
```

Pentru BAC putem reține:

```text
int        → aproximativ ±2 × 10⁹
long long  → aproximativ ±9 × 10¹⁸
```

> **Regulă utilă:** `int` ajunge în zona lui `10⁹`, iar `long long` ajunge în zona lui `10¹⁸`.

---

# Cum alegem între `int` și `long long`?

Ne uităm în primul rând la **restricțiile din enunțul problemei**.

Dacă avem:

```text
n ≤ 100000
```

putem folosi:

```cpp
int n;
```

Dacă avem:

```text
n ≤ 1000000000
```

adică:

```text
n ≤ 10⁹
```

valoarea încă încape într-un `int`.

Dar dacă avem:

```text
n ≤ 1000000000000
```

adică:

```text
n ≤ 10¹²
```

`int` nu mai este suficient.

Folosim:

```cpp
long long n;
```

pentru că:

```text
10¹² > 2 × 10⁹
```

---

# Atenție la rezultatele calculelor

Nu este suficient să verificăm doar dacă valorile citite încap într-un `int`.

Trebuie să verificăm și **valorile care pot apărea în timpul calculelor**.

De exemplu:

```cpp
int a = 100000;
int b = 100000;
```

Atât `a`, cât și `b` încap fără probleme într-un `int`.

Dar:

```text
a × b = 100000 × 100000
      = 10000000000
      = 10¹⁰
```

Rezultatul nu mai încape într-un `int`.

Pentru a efectua calculul folosind `long long`, putem scrie:

```cpp
long long produs = 1LL * a * b;
```

`1LL` este o constantă de tip `long long`, astfel încât calculul este realizat folosind `long long`.

> **Important pentru BAC:** Verifică atât valorile de intrare, cât și cea mai mare valoare care poate apărea în calcule.

---

# `float` și `double` - numere reale

Pentru numere care pot avea **parte zecimală** putem folosi:

```cpp
float
double
```

Exemple:

```cpp
float temperatura = 23.5;
double medie = 9.75;
```

Ambele tipuri pot memora numere reale, dar `double` oferă o precizie mai mare.

Aproximativ:

```text
float  → 6-7 cifre semnificative
double → 15-16 cifre semnificative
```

Pentru problemele de liceu, atunci când avem nevoie de numere reale, vom prefera în general:

```cpp
double
```

---

## Exemplu

```cpp
double a = 10;
double b = 4;

cout << a / b;
```

Rezultatul este:

```text
2.5
```

---

# Împărțirea între numere întregi

Aceasta este una dintre cele mai importante diferențe pe care trebuie să le înțelegem.

Dacă ambii operanzi sunt întregi:

```cpp
int a = 5;
int b = 2;

cout << a / b;
```

rezultatul este:

```text
2
```

nu:

```text
2.5
```

Pentru că avem:

```text
int / int → împărțire întreagă
```

Partea zecimală este eliminată.

---

## `int` vs. `double` la împărțire

Compară:

```cpp
int a = 5;
int b = 2;

cout << a / b;
```

Rezultat:

```text
2
```

cu:

```cpp
double a = 5;
double b = 2;

cout << a / b;
```

Rezultat:

```text
2.5
```

Tipurile operanzilor influențează rezultatul operației.

---

# Conversia pentru o împărțire reală

Să presupunem că avem:

```cpp
int a = 5;
int b = 2;
```

Dacă scriem:

```cpp
cout << a / b;
```

obținem:

```text
2
```

Putem transforma unul dintre operanzi în `double`:

```cpp
cout << (double)a / b;
```

Acum obținem:

```text
2.5
```

Această transformare se numește **conversie de tip**.

---

# Atenție la tipul expresiei

Să analizăm următorul cod:

```cpp
int a = 5;
int b = 2;

double rezultat = a / b;
```

Am putea crede că `rezultat` va fi `2.5`, deoarece variabila este `double`.

Dar expresia:

```cpp
a / b
```

este calculată **înainte** de atribuirea rezultatului.

Pentru că `a` și `b` sunt `int`:

```text
5 / 2
 ↓
2
```

Abia apoi valoarea este pusă în `double`:

```text
2 → 2.0
```

Deci:

```text
rezultat = 2.0
```

Pentru a obține `2.5`:

```cpp
double rezultat = (double)a / b;
```

> **De reținut:** Tipul variabilei în care salvăm rezultatul nu schimbă automat modul în care a fost calculată expresia.

---

# `char` - un singur caracter

Tipul `char` este folosit pentru memorarea unui **singur caracter**.

Exemple:

```cpp
char litera = 'A';
char cifra = '7';
char semn = '+';
```

Un caracter se scrie între **apostrofuri**:

```cpp
'A'
```

---

## Caracter vs. număr

Este foarte important să facem diferența între:

```cpp
char c = '7';
```

și:

```cpp
int x = 7;
```

În primul caz:

```text
'7' → caracterul 7
```

În al doilea:

```text
7 → numărul 7
```

Deci:

```text
'7' ≠ 7
```

---

# Codurile caracterelor

Calculatorul reprezintă caracterele prin valori numerice.

De exemplu, cifrele:

```text
'0'
'1'
'2'
...
'9'
```

au coduri consecutive.

Acest lucru ne permite să facem anumite transformări foarte simplu.

---

## Transformarea unei cifre caracter în număr

Dacă avem:

```cpp
char c = '7';
```

putem obține numărul `7` astfel:

```cpp
int cifra = c - '0';
```

Rezultatul este:

```text
cifra = 7
```

Acest tip de operație va fi foarte util atunci când vom lucra cu **șiruri de caractere**.

---

# `bool` - adevărat sau fals

Tipul `bool` poate memora doar două valori:

```cpp
true
false
```

Exemplu:

```cpp
bool gasit = false;
```

Putem modifica valoarea:

```cpp
gasit = true;
```

`bool` este foarte util atunci când vrem să memorăm dacă o anumită proprietate este sau nu adevărată.

---

## `bool` în algoritmii de BAC

Vom întâlni frecvent variabile precum:

```cpp
bool prim = true;
bool gasit = false;
bool palindrom = true;
bool schimbat = false;
```

De exemplu:

```cpp
bool prim = true;

if (n < 2)
    prim = false;

for (int d = 2; d * d <= n && prim; d++) {
    if (n % d == 0)
        prim = false;
}
```

Variabila `prim` poate fi privită ca un indicator:

```text
true  → numărul este considerat prim
false → numărul nu este prim
```

> **De reținut:** `bool` este foarte util pentru situații de tip **DA / NU**, **există / nu există**, **adevărat / fals**.

---

# `void` - lipsa unei valori returnate

`void` va fi întâlnit mai ales atunci când vom studia **subprogramele**.

De exemplu:

```cpp
void afisare() {
    cout << "Salut!";
}
```

`void` arată că funcția **nu returnează o valoare**.

Pentru moment este suficient să reții:

> **`void` este folosit în special pentru funcții care nu returnează o valoare.**

Vom reveni asupra lui la lecția despre subprograme.

---

# Conversii între tipuri

Uneori o valoare este transformată dintr-un tip în altul.

De exemplu:

```cpp
double x = 5.8;

int n = x;
```

Variabila `n` va conține:

```text
5
```

Putem reprezenta conversia astfel:

```text
5.8
 ↓
int
 ↓
5
```

Partea zecimală este eliminată.

> **Important:** Conversia de la un număr real la `int` elimină partea zecimală. Nu realizează rotunjirea obișnuită.

---

## Conversie explicită

Putem cere noi conversia:

```cpp
double x = 5.8;

int n = (int)x;
```

Rezultatul este:

```text
n = 5
```

Un alt exemplu foarte important:

```cpp
int a = 5;
int b = 2;

double rezultat = (double)a / b;
```

Rezultatul este:

```text
2.5
```

---

# Ce tip alegem?

Pentru BAC, putem folosi următoarea regulă simplă:

| Ce vrem să memorăm?      | Tip recomandat |
| ------------------------ | -------------- |
| Număr întreg             | `int`          |
| Număr întreg foarte mare | `long long`    |
| Număr real               | `double`       |
| Un caracter              | `char`         |
| Adevărat / fals          | `bool`         |

Exemple:

```cpp
int varsta = 18;

long long numar = 5000000000;

double medie = 9.75;

char litera = 'A';

bool gasit = false;
```

---

# Ce limite trebuie să reținem?

Pentru BAC, cele mai importante sunt:

```text
int
≈ -2 × 10⁹ ... 2 × 10⁹

long long
≈ -9 × 10¹⁸ ... 9 × 10¹⁸

float
≈ 6-7 cifre semnificative

double
≈ 15-16 cifre semnificative
```

Nu este necesar să memorezi toate limitele exacte.

Cele mai utile valori de ținut minte sunt:

```text
int        → zona lui 10⁹
long long  → zona lui 10¹⁸
```

---

# Exemplu de alegere a tipului

Să presupunem că într-o problemă avem:

```text
1 ≤ n ≤ 100000
```

Putem folosi:

```cpp
int n;
```

Dacă avem:

```text
1 ≤ n ≤ 10¹²
```

trebuie să folosim:

```cpp
long long n;
```

Dacă trebuie să calculăm o medie:

```cpp
double medie;
```

Dacă trebuie să memorăm o literă:

```cpp
char litera;
```

Dacă trebuie să memorăm dacă am găsit sau nu o valoare:

```cpp
bool gasit;
```

Alegerea tipului pornește întotdeauna de la **ce fel de valoare avem și cât de mare poate deveni aceasta**.

---

# Recapitulare

* **`int`** - numere întregi.

```cpp
int x = 10;
```

Interval uzual:

```text
aproximativ ±2 × 10⁹
```

* **`long long`** - numere întregi mai mari.

```cpp
long long x = 5000000000;
```

Interval uzual:

```text
aproximativ ±9 × 10¹⁸
```

* **`double`** - numere reale.

```cpp
double x = 3.14;
```

Are o precizie de aproximativ **15-16 cifre semnificative**.

* **`float`** - tot pentru numere reale, dar are o precizie mai mică decât `double`.

* **`char`** - un singur caracter.

```cpp
char c = 'A';
```

* **`bool`** - adevărat sau fals.

```cpp
bool gasit = false;
```

* **`void`** - folosit în special pentru funcții care nu returnează o valoare.

---

## Lucruri importante pentru BAC

### 1. `int / int` produce împărțire întreagă

```cpp
5 / 2
```

produce:

```text
2
```

---

### 2. Pentru împărțire reală putem face conversie

```cpp
(double)5 / 2
```

produce:

```text
2.5
```

---

### 3. Conversia la `int` elimină partea zecimală

```text
(int)5.8 → 5
```

---

### 4. Verificăm limitele din enunț

```text
int       → aproximativ 10⁹
long long → aproximativ 10¹⁸
```

---

### 5. Verificăm și rezultatele intermediare

Chiar dacă `a` și `b` încap în `int`, produsul lor poate să nu încapă.

```cpp
long long produs = 1LL * a * b;
```

> **Reține:** La BAC nu trebuie să memorezi toate tipurile existente în C++. Trebuie să știi să alegi tipul potrivit pentru valoarea din problemă și să înțelegi cum tipurile influențează rezultatul expresiilor.
