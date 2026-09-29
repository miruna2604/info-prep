# Variabile și constante în C++

Într-un program avem nevoie să **memorăm și să prelucrăm date**.

Pentru aceasta folosim **variabile**.

## Ce este o variabilă?

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

În declarația:

```cpp
int varsta = 18;
```

avem:

* `int` → tipul variabilei;
* `varsta` → numele variabilei;
* `18` → valoarea memorată.

Tipul stabilește ce fel de valori poate memora variabila. În acest exemplu, `int` permite memorarea unui **număr întreg**.

Tipurile de date vor fi studiate în detaliu în lecția următoare.

> **De reținut:** O variabilă are un **tip**, un **nume** și poate memora o **valoare**.

---

## Declararea unei variabile

Înainte să folosim o variabilă, trebuie să o **declarăm**.

Forma generală este:

```text
tip nume;
```

De exemplu:

```cpp
int x;
```

Am declarat variabila `x`, de tip `int`.

Aceasta poate memora un număr întreg.

Putem declara mai multe variabile de același tip în aceeași instrucțiune:

```cpp
int a, b, c;
```

Astfel, `a`, `b` și `c` sunt toate variabile de tip `int`.

---

## Inițializarea unei variabile

Putem da unei variabile o valoare chiar în momentul declarării:

```cpp
int x = 10;
```

Aceasta se numește **inițializare**.

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

Acum avem:

```text
    a           b
┌───────┐   ┌───────┐
│   5   │   │  10   │
└───────┘   └───────┘
```

Așadar:

```cpp
int x;
```

înseamnă **declarare**, iar:

```cpp
int x = 10;
```

înseamnă **declarare și inițializare**.

> **De reținut:** Inițializarea înseamnă atribuirea unei valori inițiale unei variabile.

---

## Atribuirea unei valori

După ce o variabilă a fost declarată, îi putem da o valoare folosind operatorul `=`.

```cpp
int x;

x = 10;
```

Instrucțiunea:

```cpp
x = 10;
```

înseamnă:

> Memorează valoarea `10` în variabila `x`.

În C++, `=` este **operatorul de atribuire**.

---

## Valoarea unei variabile se poate modifica

După ce o variabilă primește o valoare, aceasta poate fi înlocuită cu alta.

```cpp
int x = 10;

x = 20;
```

Inițial:

```text
     x
┌─────────┐
│   10    │
└─────────┘
```

După executarea instrucțiunii:

```cpp
x = 20;
```

vom avea:

```text
     x
┌─────────┐
│   20    │
└─────────┘
```

Valoarea `10` a fost înlocuită de valoarea `20`.

> O variabilă memorează la un moment dat valoarea pe care a primit-o cel mai recent.

---

## Atribuirea folosind o altă variabilă

Valoarea unei variabile poate fi atribuită altei variabile.

```cpp
int a = 5;
int b;

b = a;
```

La executarea instrucțiunii:

```cpp
b = a;
```

valoarea lui `a` este copiată în `b`.

Vom avea:

```text
    a           b
┌───────┐   ┌───────┐
│   5   │   │   5   │
└───────┘   └───────┘
```

Cele două variabile sunt însă **independente**.

Dacă modificăm ulterior valoarea lui `a`:

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

`b` rămâne `5`.

Instrucțiunea:

```cpp
b = a;
```

a copiat **valoarea pe care o avea `a` în acel moment**.

---

## Noua valoare poate depinde de valoarea veche

Să presupunem că avem:

```cpp
int x = 5;
```

și apoi executăm:

```cpp
x = x + 1;
```

La prima vedere, această instrucțiune poate părea ciudată.

În matematică:

```text
x = x + 1
```

nu ar putea fi o egalitate adevărată.

În C++, însă, `=` nu înseamnă egalitate, ci **atribuire**.

Instrucțiunea este executată astfel:

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

Deci:

```cpp
x = x + 1;
```

înseamnă:

1. luăm valoarea actuală a lui `x`;
2. calculăm `x + 1`;
3. rezultatul devine noua valoare a lui `x`.

Dacă inițial:

```text
x = 5
```

după instrucțiune vom avea:

```text
x = 6
```

### Urmărește valorile

Ce valoare va avea `x` la final?

```cpp
int x = 4;

x = x + 1;
x = x + 1;
x = x + 1;
```

Urmărim instrucțiunile în ordine:

```text
x = 4
x = 5
x = 6
x = 7
```

La final:

```text
x = 7
```

> **Important:** Atunci când urmărești un program, actualizează valoarea variabilei după fiecare atribuire.

Acest mod de a modifica valorile va apărea foarte des în algoritmii pe care îi vom studia.

---

## Numele variabilelor

Numele unei variabile se numește și **identificator**.

De exemplu:

```cpp
int varsta;
int nota1;
int suma;
```

Există câteva reguli pe care trebuie să le respectăm.

### Poate conține litere, cifre și `_`

Corect:

```cpp
int nota1;
int suma_totala;
```

### Nu poate începe cu o cifră

Greșit:

```cpp
int 1nota;
```

Corect:

```cpp
int nota1;
```

### Nu poate conține spații

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

### Nu poate fi un cuvânt rezervat din C++

De exemplu, nu putem scrie:

```cpp
int int;
```

pentru că `int` are deja o semnificație în limbajul C++.

Același lucru este valabil pentru alte cuvinte ale limbajului, precum:

```text
if
for
while
return
```

### Literele mari și mici sunt diferite

C++ face diferența între literele mari și mici.

De aceea:

```cpp
int x;
int X;
```

declară **două variabile diferite**.

La fel:

```cpp
int suma;
int Suma;
```

reprezintă două nume diferite.

> **De reținut:** C++ este **case-sensitive**.

---

## Cum alegem numele variabilelor?

Este recomandat să alegem nume care sugerează rolul variabilei.

De exemplu:

```cpp
int suma;
int maxim;
int varsta;
```

sunt mai ușor de înțeles decât nume alese fără legătură cu rolul lor.

În algoritmi vom întâlni însă foarte des și nume scurte precum:

```text
n
x
i
j
s
nr
```

Acestea sunt potrivite atunci când rolul lor este clar din context.

---

# Constante

Uneori avem nevoie de o valoare care **nu trebuie să se modifice** în timpul executării programului.

Pentru aceasta putem folosi o **constantă**.

De exemplu:

```cpp
const int MAXIM = 100;
```

Cuvântul:

```cpp
const
```

arată că valoarea nu mai poate fi modificată după inițializare.

După:

```cpp
const int MAXIM = 100;
```

nu putem face:

```cpp
MAXIM = 200;
```

Această instrucțiune ar produce o eroare.

Forma generală este:

```text
const tip nume = valoare;
```

De exemplu:

```cpp
const int MAXIM = 100;
```

---

## Variabilă vs. constantă

O variabilă își poate modifica valoarea:

```cpp
int x = 10;

x = 20;
```

Acest lucru este permis.

În schimb, valoarea unei constante nu poate fi modificată:

```cpp
const int x = 10;

x = 20; // nu este permis
```

Putem reține diferența astfel:

```text
VARIABILĂ                 CONSTANTĂ

x = 10                    x = 10
   ↓                         ↓
x = 20                    rămâne 10

se poate modifica         nu se poate modifica
```

---

# Recapitulare

Din această lecție trebuie să reții:

* o **variabilă** este folosită pentru a memora o valoare;
* o variabilă are un **tip** și un **nume**;
* variabila trebuie declarată înainte să fie folosită;

```cpp
int x;
```

* putem da o valoare variabilei chiar la declarare;

```cpp
int x = 10;
```

* `=` este operatorul de **atribuire**, nu semnul egal din matematică;

```cpp
x = 5;
```

înseamnă că valoarea `5` este memorată în `x`;

* o atribuire înlocuiește valoarea veche a variabilei;

```cpp
int x = 5;
x = 8;
```

la final `x` are valoarea `8`;

* putem folosi valoarea actuală pentru a calcula valoarea nouă;

```cpp
x = x + 1;
```

* atribuirea dintre două variabile copiază valoarea din acel moment;

```cpp
b = a;
```

modificarea ulterioară a lui `a` nu modifică automat și `b`;

* C++ face diferența între litere mari și mici: `x` și `X` sunt variabile diferite;
* o constantă declarată cu `const` nu își poate modifica valoarea.

```cpp
const int MAXIM = 100;
```

> **Pentru bacul la info:** este esențial să poți urmări corect cum se modifică valorile variabilelor după fiecare atribuire. Această abilitate va fi folosită constant atunci când analizăm fragmente de cod și algoritmi.
