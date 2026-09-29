# Instrucțiunea `if`

Până acum, instrucțiunile programului nostru erau executate una după alta.

Uneori vrem însă ca o instrucțiune să fie executată **doar dacă este îndeplinită o anumită condiție**.

Pentru aceasta folosim:

```cpp
if
```

Putem citi `if` ca:

```text
dacă
```

---

# Cum funcționează `if`?

Forma de bază este:

```cpp
if (conditie)
    instructiune;
```

Programul verifică mai întâi condiția:

```text
             condiție
            /       \
         true       false
           ↓           ↓
     se execută     se trece
     instrucțiunea  mai departe
```

Dacă rezultatul este `true`, instrucțiunea se execută.

Dacă rezultatul este `false`, instrucțiunea este ignorată.

---

## Exemplu

Să verificăm dacă un număr este pozitiv:

```cpp
int x;
cin >> x;

if (x > 0)
    cout << "pozitiv";
```

Pentru:

```text
x = 7
```

condiția:

```cpp
x > 0
```

este `true`, deci se afișează:

```text
pozitiv
```

Pentru:

```text
x = -3
```

condiția este `false`, deci instrucțiunea:

```cpp
cout << "pozitiv";
```

nu se execută.

Programul continuă cu următoarea instrucțiune de după `if`.

---

# Mai multe instrucțiuni în `if`

Dacă vrem să executăm **mai multe instrucțiuni** atunci când condiția este adevărată, folosim acolade:

```cpp
if (conditie) {
    instructiune1;
    instructiune2;
}
```

De exemplu:

```cpp
if (x > 0) {
    cout << "Numar pozitiv";
    x = x + 1;
}
```

Ambele instrucțiuni aparțin lui `if`.

Fără acolade:

```cpp
if (x > 0)
    cout << "Numar pozitiv";

x = x + 1;
```

doar prima instrucțiune aparține lui `if`.

`x = x + 1;` se execută indiferent de rezultat.

> **De reținut:** fără `{ }`, un `if` controlează o singură instrucțiune.

---

# `if...else`

Uneori vrem să executăm ceva dacă o condiție este adevărată și **altceva dacă este falsă**.

Folosim:

```cpp
if (conditie)
    instructiune1;
else
    instructiune2;
```

Putem citi:

```text
DACĂ este adevărat
    execută prima instrucțiune
ALTFEL
    execută a doua instrucțiune
```

---

## Exemplu: par sau impar

```cpp
int n;
cin >> n;

if (n % 2 == 0)
    cout << "par";
else
    cout << "impar";
```

Pentru:

```text
n = 8
```

avem:

```text
8 % 2 == 0
0 == 0
true
```

Se execută:

```cpp
cout << "par";
```

Pentru:

```text
n = 7
```

condiția este `false`, deci se execută ramura `else`:

```cpp
cout << "impar";
```

> Dintr-un `if...else` se execută **o singură ramură**.

---

# Condiții compuse

Condiția unui `if` poate conține și operatorii logici învățați anterior.

De exemplu, vrem să verificăm dacă `x` este un număr de două cifre:

```cpp
if (x >= 10 && x <= 99)
    cout << "doua cifre";
```

Condiția spune:

```text
x >= 10
   ȘI
x <= 99
```

Ambele trebuie să fie adevărate.

Alt exemplu:

```cpp
if (x < 10 || x > 99)
    cout << "nu are doua cifre";
```

Aici este suficient ca una dintre condiții să fie adevărată.

---

# Mai multe cazuri: `else if`

Dacă avem mai mult de două situații, putem verifica mai multe condiții.

De exemplu, vrem să stabilim semnul unui număr:

```cpp
if (x > 0)
    cout << "pozitiv";
else if (x < 0)
    cout << "negativ";
else
    cout << "zero";
```

Programul verifică în ordine:

```text
x > 0 ?
  │
  ├─ DA → pozitiv
  │
  └─ NU → x < 0 ?
            │
            ├─ DA → negativ
            │
            └─ NU → zero
```

La prima condiție adevărată se execută ramura corespunzătoare, iar restul nu mai sunt verificate.

> **Important:** într-un lanț `if - else if - else` se execută cel mult o ramură.

---

# `if` în interiorul altui `if`

Un `if` poate apărea și în interiorul altui `if`.

De exemplu:

```cpp
if (x > 0) {
    if (x % 2 == 0)
        cout << "pozitiv si par";
}
```

Programul verifică:

```text
x > 0 ?
   ↓ DA
x % 2 == 0 ?
   ↓ DA
afișează mesajul
```

A doua condiție este verificată doar dacă prima este adevărată.

Această construcție se numește **`if` imbricat**.

Totuși, dacă vrem doar ca două condiții să fie adevărate simultan, putem scrie mai simplu:

```cpp
if (x > 0 && x % 2 == 0)
    cout << "pozitiv si par";
```

Această variantă este mai scurtă și mai ușor de urmărit.

---

# Atenție la `=` și `==`

Într-o condiție vrem foarte des să **comparăm** valori.

Pentru comparație folosim:

```cpp
==
```

Corect:

```cpp
if (x == 5)
```

înseamnă:

```text
dacă x este egal cu 5
```

Nu confunda cu:

```cpp
x = 5;
```

care este o atribuire.

```text
=  → atribuire
== → comparație
```

Este una dintre greșelile pe care trebuie să le eviți când scrii condiții.

---

# Cum construim un `if` din cerință?

Să avem cerința:

**Afișează `DA` dacă numărul `n` este pozitiv și divizibil cu 5.**

Nu încercăm să scriem totul direct.

### 1. Traducem fiecare condiție

```text
n este pozitiv
→ n > 0

n este divizibil cu 5
→ n % 5 == 0
```

### 2. Le combinăm

Cerința spune **și**, deci folosim `&&`:

```cpp
n > 0 && n % 5 == 0
```

### 3. Construim `if`

```cpp
if (n > 0 && n % 5 == 0)
    cout << "DA";
```

Acesta este un mod sigur de a construi condițiile:

```text
cerință
   ↓
condiții simple
   ↓
expresie logică
   ↓
if
```

---

# Exemplu complet

**Se citește un număr natural `n`. Să se afișeze `DA` dacă este divizibil cu `3`, iar în caz contrar `NU`.**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    if (n % 3 == 0)
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```

Pentru:

```text
n = 12
```

condiția:

```text
12 % 3 == 0
```

este adevărată, deci se afișează:

```text
DA
```

---

# Recapitulare

Un `if` execută o instrucțiune **doar dacă o condiție este adevărată**:

```cpp
if (conditie)
    instructiune;
```

Pentru două variante folosim:

```cpp
if (conditie)
    instructiune1;
else
    instructiune2;
```

Pentru mai multe cazuri putem folosi:

```cpp
if (conditie1)
    ...
else if (conditie2)
    ...
else
    ...
```

Dacă o ramură conține mai multe instrucțiuni, folosim:

```cpp
if (conditie) {
    instructiune1;
    instructiune2;
}
```

Condițiile pot folosi tot ce am învățat până acum:

```text
<  >  <=  >=  ==  !=
&&  ||  !
```

Cel mai important este să gândești un `if` astfel:

```text
Care este condiția?
        ↓
Este true sau false?
        ↓
Ce trebuie executat în fiecare caz?
```

> `if` este momentul în care programul începe să **ia decizii**. Dacă știi să transformi cerința într-o condiție corectă, scrierea instrucțiunii devine partea simplă.