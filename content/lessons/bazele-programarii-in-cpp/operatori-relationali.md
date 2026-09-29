# Operatori relaționali în C++

Operatorii relaționali sunt folosiți pentru a **compara două valori**.

De exemplu:

```cpp
5 < 10
```

verifică dacă `5` este mai mic decât `10`.

Rezultatul unei comparații poate fi:

```text
true  → adevărat
false → fals
```

Aceste valori sunt de tip `bool`, pe care l-am întâlnit deja la tipurile de date.

---

# Operatorii relaționali

În C++ folosim:

| Operator | Semnificație |
| --- | --- |
| `==` | egal cu |
| `!=` | diferit de |
| `<` | mai mic decât |
| `>` | mai mare decât |
| `<=` | mai mic sau egal cu |
| `>=` | mai mare sau egal cu |

---

# Cum funcționează o comparație?

Să avem:

```cpp
int a = 5;
int b = 8;
```

Expresia:

```cpp
a < b
```

devine:

```text
5 < 8
```

Afirmația este adevărată, deci rezultatul este:

```text
true
```

În schimb:

```cpp
a > b
```

devine:

```text
5 > 8
```

ceea ce este fals:

```text
false
```

> **De reținut:** un operator relațional compară două valori și produce `true` sau `false`.

---

# Egalitatea `==`

Pentru a verifica dacă două valori sunt egale folosim:

```cpp
==
```

De exemplu:

```cpp
int a = 7;
int b = 7;
```

Expresia:

```cpp
a == b
```

verifică:

```text
7 == 7
```

Rezultatul este:

```text
true
```

Dacă valorile ar fi diferite, rezultatul ar fi `false`.

---

# Atenție: `=` nu este `==`

Aceasta este una dintre cele mai importante diferențe de reținut.

```cpp
x = 5;
```

este o **atribuire**:

```text
memorează valoarea 5 în x
```

În schimb:

```cpp
x == 5
```

este o **comparație**:

```text
este x egal cu 5?
```

Așadar:

```text
=   → atribuire
==  → comparație
```

> **Atenție:** `=` modifică valoarea unei variabile, iar `==` verifică dacă două valori sunt egale.

---

# Diferit `!=`

Operatorul:

```cpp
!=
```

verifică dacă două valori sunt diferite.

Pentru:

```cpp
int x = 5;
```

avem:

```text
x != 3 → true
x != 5 → false
```

Putem reține:

```text
!= → diferit de
```

---

# Mai mic și mai mare

Operatorii:

```text
< → mai mic decât
> → mai mare decât
```

funcționează la fel ca în matematică.

Pentru:

```cpp
int x = 7;
```

avem:

```text
x < 10 → true
x > 10 → false
x > 3  → true
```

---

# Mai mic sau egal / mai mare sau egal

Pentru „mai mic sau egal” folosim:

```cpp
<=
```

iar pentru „mai mare sau egal”:

```cpp
>=
```

Pentru:

```cpp
int x = 10;
```

avem:

```text
x <= 10 → true
x >= 10 → true

x < 10  → false
x > 10  → false
```

`<=` și `>=` includ și cazul în care valorile sunt egale.

> **Atenție:** folosim `<=` și `>=`, nu `=<` sau `=>`.

---

# Putem compara și variabile

Putem compara direct valorile a două variabile.

```cpp
int a = 12;
int b = 7;
```

Atunci:

```text
a > b  → true
a < b  → false
a == b → false
a != b → true
```

---

# Rezultatul este o valoare `bool`

O comparație produce o valoare de tip `bool`.

De exemplu:

```cpp
bool rezultat = 5 < 10;
```

Comparația:

```text
5 < 10
```

este adevărată, deci:

```text
rezultat = true
```

În schimb:

```cpp
bool rezultat = 8 == 3;
```

produce:

```text
rezultat = false
```

Acesta este motivul pentru care operatorii relaționali vor fi foarte importanți atunci când vom începe să construim **condiții**.

---

# Exercițiu tip BAC

**Indicați două valori pe care le poate avea variabila întreagă `x`, astfel încât, pentru fiecare dintre acestea, expresia C/C++ alăturată să aibă valoarea `1`.**

```cpp
x % 20 == x / 23
```

### Variante de răspuns

```text
a. {20, 40}
b. {20, 41}
c. {40, 62}
d. {60, 83}
```

### Rezolvare

Expresia compară două valori:

```text
x % 20 → restul împărțirii lui x la 20
x / 23 → câtul întreg al împărțirii lui x la 23
```

Pentru ca expresia să aibă valoarea `1` (`true`), cele două rezultate trebuie să fie **egale**.

Verificăm variantele până o găsim pe cea corectă.

**Varianta a:**

```text
x = 20

20 % 20 = 0
20 / 23 = 0

0 == 0 → true ✓
```

Dar trebuie ca **ambele valori** din variantă să verifice expresia:

```text
x = 40

40 % 20 = 0
40 / 23 = 1

0 == 1 → false ✗
```

Deci varianta `a` nu este corectă.

**Varianta b:**

```text
x = 20

20 % 20 = 0
20 / 23 = 0

0 == 0 → true ✓
```

și:

```text
x = 41

41 % 20 = 1
41 / 23 = 1

1 == 1 → true ✓
```

Ambele valori verifică expresia.

> **Răspuns corect: b. `{20, 41}`**

---

# Exemple utile

## Verificarea parității

În lecția despre operatorul `%` am întâlnit:

```cpp
n % 2 == 0
```

Acum putem înțelege complet expresia.

Mai întâi:

```cpp
n % 2
```

calculează restul împărțirii lui `n` la `2`.

Apoi:

```cpp
== 0
```

verifică dacă acel rest este egal cu `0`.

Pentru:

```text
n = 8
```

avem:

```text
8 % 2 == 0
   ↓
0 == 0
   ↓
 true
```

Deci `8` este par.

---

## Verificarea divizibilității

Expresia:

```cpp
a % b == 0
```

verifică dacă `a` este divizibil cu `b`.

Pentru:

```text
a = 15
b = 5
```

avem:

```text
15 % 5 == 0
    ↓
0 == 0
    ↓
 true
```

În schimb:

```text
16 % 5 == 0
    ↓
1 == 0
    ↓
 false
```

Observăm astfel că putem combina operații aritmetice cu comparații.

---

# Ordinea evaluării

Într-o expresie precum:

```cpp
n % 2 == 0
```

mai întâi se calculează operația aritmetică, apoi se face comparația.

De exemplu:

```text
7 % 2 == 0
 ↓
1 == 0
 ↓
false
```

Nu este nevoie să memorăm acum o listă mare de priorități. Este suficient să înțelegem ordinea în care este evaluată expresia.

---

# Recapitulare

Operatorii relaționali compară două valori:

```text
== → egal cu
!= → diferit de

<  → mai mic decât
>  → mai mare decât

<= → mai mic sau egal cu
>= → mai mare sau egal cu
```

Rezultatul unei comparații este:

```text
true
```

sau:

```text
false
```

Nu confunda:

```text
=  → atribuire
== → comparație
```

Operatorii relaționali pot fi combinați cu expresii aritmetice:

```cpp
n % 2 == 0
```

sau:

```cpp
a % b == 0
```

Mai întâi se calculează expresia aritmetică, apoi se compară rezultatul.

> Operatorii relaționali ne permit să formulăm **condiții**. În continuare vom vedea cum putem combina mai multe condiții folosind operatorii logici.