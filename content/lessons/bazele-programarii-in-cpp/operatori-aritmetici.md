# Operatori aritmetici în C++

Operatorii aritmetici sunt folosiți pentru a efectua **calcule** cu valori și variabile.

De exemplu:

```cpp
int a = 10;
int b = 3;

int suma = a + b;
```

În expresia:

```cpp
a + b
```

avem:

* `a` și `b` → **operanzi**
* `+` → **operator**

---

# Operatorii aritmetici principali

În C++, operatorii aritmetici de bază sunt:

| Operator | Operație          |
| -------- | ----------------- |
| `+`      | adunare           |
| `-`      | scădere           |
| `*`      | înmulțire         |
| `/`      | împărțire         |
| `%`      | restul împărțirii |

De exemplu, pentru:

```cpp
int a = 10;
int b = 3;
```

avem:

```text
a + b → 13
a - b → 7
a * b → 30
a / b → 3
a % b → 1
```

Primele trei operații sunt exact cele cunoscute din matematică.

În C++, pentru înmulțire folosim:

```text
*
```

nu simbolul `×`.

Operatorii `/` și `%` necesită însă puțin mai multă atenție.

---

# Împărțirea `/`

Operatorul `/` este folosit pentru împărțire.

```cpp
10 / 2
```

produce:

```text
5
```

Rezultatul devine mai interesant atunci când împărțirea nu este exactă.

## Împărțirea între numere întregi

Dacă ambii operanzi sunt întregi:

```cpp
int a = 10;
int b = 3;
```

atunci:

```cpp
a / b
```

produce:

```text
3
```

Putem privi operația astfel:

```text
10 : 3 = 3 rest 1
         ↑
        10 / 3
```

Când ambii operanzi sunt întregi, `/` ne oferă **câtul întreg**.

```text
17 / 5 = 3
20 / 6 = 3
8 / 2  = 4
```

> **De reținut:** `int / int` produce o împărțire întreagă.

În lecția despre tipurile de date am văzut și că, dacă cel puțin unul dintre operanzi este `double`, împărțirea devine reală.

Nu reluăm aici conversiile de tip; important este să recunoaștem diferența.

---

## Exercițiu tip BAC

**Indicați valoarea expresiei C/C++ alăturate.**

```cpp
6.3 / 20 + 24
```

**Variante de răspuns:**

```text
a. 0
b. 24
c. 24.315
d. 24.9
```

### Rezolvare

```text
6.3 / 20 + 24

= 0.315 + 24

= 24.315
```

Observăm că `6.3` este o valoare reală, deci împărțirea:

```text
6.3 / 20
```

este o **împărțire reală**.

```text
✓ Răspuns corect: c. 24.315
```

---

# Operatorul `%` — restul împărțirii

Operatorul `%` ne oferă **restul împărțirii a două valori întregi**.

De exemplu:

```text
17 : 5 = 3 rest 2
```

În C++:

```cpp
17 / 5
```

produce:

```text
3
```

iar:

```cpp
17 % 5
```

produce:

```text
2
```

Putem reține foarte simplu:

```text
/ → câtul întreg

% → restul
```

Un alt exemplu:

```text
23 : 5 = 4 rest 3
```

deci:

```text
23 / 5 = 4
23 % 5 = 3
```

> Operatorul `%` se folosește cu valori întregi.

---

# Unde folosim `%`?

Operatorul `%` este foarte important deoarece restul unei împărțiri ne poate spune multe despre un număr.

## Paritatea

Un număr este **par** dacă restul împărțirii sale la `2` este `0`.

```text
n % 2 == 0 → n este par
```

De exemplu:

```text
14 % 2 = 0
```

deci `14` este par.

Pentru un număr impar:

```text
n % 2 != 0 → n este impar
```

De exemplu:

```text
15 % 2 = 1
```

deci `15` este impar.

Operatorii `==` și `!=` vor fi explicați în lecția despre operatorii relaționali. Pentru moment, citește:

```text
== → este egal cu
!= → este diferit de
```

---

## Divizibilitatea

Un număr `a` este divizibil cu `b` dacă împărțirea se face fără rest.

Adică:

```text
a % b == 0
```

De exemplu:

```text
20 % 5 = 0
```

deci:

```text
20 este divizibil cu 5
```

În schimb:

```text
22 % 5 = 2
```

deci `22` nu este divizibil cu `5`.

> **De reținut:** `a % b == 0` înseamnă că `a` este divizibil cu `b`.

---

# Ultima cifră a unui număr

Operatorii `/` și `%` sunt foarte utili și atunci când lucrăm cu cifrele unui număr.

Să avem:

```text
n = 5387
```

Ultima cifră se obține cu:

```cpp
n % 10
```

Pentru că:

```text
5387 % 10 = 7
```

deci:

```text
n % 10 → ultima cifră
```

---

# Eliminarea ultimei cifre

Pentru a elimina ultima cifră folosim împărțirea întreagă la `10`.

Pentru:

```text
n = 5387
```

avem:

```text
5387 / 10 = 538
```

deci:

```text
n / 10 → numărul fără ultima cifră
```

Cele două operații formează un șablon foarte important:

```text
n % 10 → extrage ultima cifră

n / 10 → elimină ultima cifră
```

Vom folosi repetat aceste două idei când vom studia algoritmii pentru prelucrarea cifrelor.

---

# Incrementarea `++`

Operatorul `++` crește valoarea unei variabile cu `1`.

```cpp
int x = 5;

x++;
```

După executare:

```text
x = 6
```

Așadar:

```cpp
x = x + 1;
```

și:

```cpp
x++;
```

au același efect asupra valorii lui `x`.

Operatorul `++` va apărea foarte des atunci când vom lucra cu contoare și structuri repetitive.

---

# Decrementarea `--`

Operatorul `--` scade valoarea unei variabile cu `1`.

```cpp
int x = 5;

x--;
```

După executare:

```text
x = 4
```

Așadar:

```cpp
x = x - 1;
```

și:

```cpp
x--;
```

au același efect asupra valorii lui `x`.

---

# `x++` vs. `++x`

Operatorul `++` poate fi scris în două moduri:

```cpp
x++;
```

sau:

```cpp
++x;
```

Dacă apar singure ca instrucțiuni, efectul final este același:

```text
x crește cu 1
```

Diferența apare atunci când sunt folosite într-o expresie.

## `x++` — folosește, apoi crește

Să avem:

```cpp
int x = 5;
int y;

y = x++;
```

Mai întâi este folosită valoarea actuală a lui `x`:

```text
y = 5
```

apoi `x` crește:

```text
x = 6
```

La final:

```text
x = 6
y = 5
```

Putem reține:

```text
x++ → folosește, apoi crește
```

---

## `++x` — crește, apoi folosește

Acum:

```cpp
int x = 5;
int y;

y = ++x;
```

Mai întâi crește `x`:

```text
x = 6
```

apoi este folosită noua valoare:

```text
y = 6
```

La final:

```text
x = 6
y = 6
```

Așadar:

```text
x++ → folosește, apoi crește

++x → crește, apoi folosește
```

Aceeași idee se aplică și pentru:

```cpp
x--
--x
```

---

# Minusul aplicat unei valori

Simbolul `-` nu este folosit doar pentru scădere.

De exemplu:

```cpp
int x = 5;

cout << -x;
```

afișează:

```text
-5
```

În acest caz, `-` schimbă semnul valorii lui `x`.

---

# Ordinea operațiilor

La fel ca în matematică, operațiile au o anumită prioritate.

Să analizăm:

```cpp
int x = 2 + 3 * 4;
```

Înmulțirea se efectuează prima:

```text
3 * 4 = 12
```

apoi:

```text
2 + 12 = 14
```

Deci:

```text
x = 14
```

---

## Prioritatea operatorilor aritmetici

Pentru expresiile pe care le folosim acum este suficient să reții:

```text
1. ( )

2. *   /   %

3. +   -
```

Operatorii `*`, `/` și `%` au aceeași prioritate și se execută înaintea operatorilor `+` și `-`.

De exemplu:

```cpp
10 + 6 / 2
```

Mai întâi:

```text
6 / 2 = 3
```

apoi:

```text
10 + 3 = 13
```

---

# Parantezele schimbă ordinea

Compară:

```cpp
2 + 3 * 4
```

Rezultat:

```text
14
```

cu:

```cpp
(2 + 3) * 4
```

Rezultat:

```text
20
```

Parantezele ne permit să stabilim ce operație trebuie efectuată prima.

> Dacă o expresie este mai complicată, parantezele o pot face mai clară și mai ușor de urmărit.

---

## Exercițiu tip BAC

**Indicați expresia C/C++ cu valoarea `2022`.**

```text
a. 4044 / 4 / 2
b. 4044 / (4 * 2)
c. 1011 * 1 + 1
d. 1011 * (1 + 1)
```

### Rezolvare

Calculăm fiecare expresie respectând ordinea operațiilor:

```text
a. 4044 / 4 / 2
   = 1011 / 2
   = 505
```

Împărțirea este între numere întregi, deci:

```text
1011 / 2 = 505
```

---

```text
b. 4044 / (4 * 2)
   = 4044 / 8
   = 505
```

---

```text
c. 1011 * 1 + 1
   = 1011 + 1
   = 1012
```

---

```text
d. 1011 * (1 + 1)
   = 1011 * 2
   = 2022
```

Prin urmare:

```text
✓ Răspuns corect: d. 1011 * (1 + 1)
```

---

# Operatori cu aceeași prioritate

Pentru operatorii aritmetici binari de aceeași prioritate, operațiile se grupează de la stânga la dreapta.

De exemplu:

```cpp
20 / 5 * 2
```

calculăm:

```text
20 / 5 = 4
4 * 2 = 8
```

Rezultatul este:

```text
8
```

Atenție însă la împărțirea întreagă:

```cpp
20 / 3 * 3
```

Mai întâi:

```text
20 / 3 = 6
```

apoi:

```text
6 * 3 = 18
```

Rezultatul este:

```text
18
```

nu `20`.

---

# Împărțirea la zero

Împărțitorul nu poate fi `0`.

De exemplu:

```cpp
int a = 10;
int b = 0;

cout << a / b;
```

încearcă să calculeze:

```text
10 / 0
```

iar împărțirea la zero nu este definită.

Același lucru trebuie evitat și pentru:

```cpp
a % 0
```

> **De reținut:** înainte de `/` sau `%`, împărțitorul trebuie să fie diferit de `0`.

---

# Recapitulare

Operatorii aritmetici de bază sunt:

```text
+ → adunare
- → scădere
* → înmulțire
/ → împărțire
% → restul împărțirii
```

Pentru numere întregi:

```text
17 / 5 = 3
17 % 5 = 2
```

Operatorul `%` ne permite să recunoaștem rapid situații importante:

```text
n % 2 == 0 → n este par

a % b == 0 → a este divizibil cu b
```

Pentru cifrele unui număr natural:

```text
n % 10 → ultima cifră

n / 10 → elimină ultima cifră
```

Pentru incrementare și decrementare:

```text
x++ → x crește cu 1
x-- → x scade cu 1
```

Când incrementarea face parte dintr-o expresie:

```text
x++ → folosește valoarea, apoi crește

++x → crește valoarea, apoi o folosește
```

Prioritatea operațiilor aritmetice de bază este:

```text
( )
 ↓
*  /  %
 ↓
+  -
```

> **Pentru bacul la info:** acordă atenție în special împărțirii întregi, operatorului `%`, expresiilor cu `++` și ordinii operațiilor. Aceste idei sunt folosite ulterior în prelucrarea cifrelor, divizibilitate, structuri repetitive și în exercițiile în care trebuie urmărită valoarea unei expresii.
