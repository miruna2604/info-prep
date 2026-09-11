# Operatori aritmetici în C++

Operatorii aritmetici sunt folosiți pentru a efectua **calcule matematice** asupra valorilor și variabilelor.

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

* `a` și `b` sunt **operanzi**
* `+` este **operatorul**

---

# Operatorii aritmetici principali

În C++, cei mai importanți operatori aritmetici sunt:

| Operator | Operație          | Exemplu |
| -------- | ----------------- | ------- |
| `+`      | adunare           | `a + b` |
| `-`      | scădere           | `a - b` |
| `*`      | înmulțire         | `a * b` |
| `/`      | împărțire         | `a / b` |
| `%`      | restul împărțirii | `a % b` |

Vom întâlni foarte des și:

| Operator | Operație             |
| -------- | -------------------- |
| `++`     | crește valoarea cu 1 |
| `--`     | scade valoarea cu 1  |

---

# Adunarea `+`

Operatorul `+` calculează suma a două valori.

```cpp
int a = 7;
int b = 3;

cout << a + b;
```

Rezultatul este:

```text
10
```

Putem memora rezultatul într-o variabilă:

```cpp
int suma = a + b;
```

---

# Scăderea `-`

Operatorul `-` calculează diferența dintre două valori.

```cpp
int a = 7;
int b = 3;

cout << a - b;
```

Rezultatul:

```text
4
```

---

# Înmulțirea `*`

Operatorul `*` este folosit pentru înmulțire.

```cpp
int a = 7;
int b = 3;

cout << a * b;
```

Rezultatul:

```text
21
```

În C++ folosim:

```text
*
```

și nu simbolul matematic `×`.

---

# Împărțirea `/`

Operatorul `/` este folosit pentru împărțire.

```cpp
cout << 10 / 2;
```

Rezultatul este:

```text
5
```

Trebuie însă să fim foarte atenți la **tipurile valorilor împărțite**.

---

# Împărțirea între numere întregi

Dacă ambii operanzi sunt întregi, C++ efectuează o **împărțire întreagă**.

```cpp
int a = 10;
int b = 3;

cout << a / b;
```

Rezultatul este:

```text
3
```

nu:

```text
3.333...
```

Putem privi împărțirea astfel:

```text
10 : 3 = 3 rest 1
         ↑
        a / b
```

Operatorul `/` ne oferă câtul:

```cpp
10 / 3
```

rezultat:

```text
3
```

> **Important pentru BAC:** Dacă ambii operanzi sunt întregi, `/` produce o împărțire întreagă.

---

# Împărțirea reală

Dacă vrem un rezultat real, cel puțin unul dintre operanzi trebuie să fie real.

De exemplu:

```cpp
cout << 10.0 / 3;
```

rezultatul este aproximativ:

```text
3.33333
```

Putem face și o conversie:

```cpp
int a = 10;
int b = 3;

cout << (double)a / b;
```

Astfel obținem o împărțire reală.

---

# Operatorul `%` - restul împărțirii

Operatorul `%` calculează **restul împărțirii a două numere întregi**.

De exemplu:

```cpp
cout << 10 % 3;
```

rezultatul este:

```text
1
```

pentru că:

```text
10 : 3 = 3 rest 1
                   ↑
                 10 % 3
```

Putem reține foarte simplu:

```text
/ → câtul împărțirii
% → restul împărțirii
```

Exemplu:

```text
17 : 5 = 3 rest 2
```

deci:

```cpp
17 / 5
```

este:

```text
3
```

iar:

```cpp
17 % 5
```

este:

```text
2
```

> **De reținut:** Operatorul `%` se folosește cu valori întregi.

---

# `/` și `%` împreună

Pentru două numere naturale `a` și `b`, cu `b != 0`, putem interpreta:

```cpp
a / b
```

ca **partea întreagă a câtului**, iar:

```cpp
a % b
```

ca **restul împărțirii**.

De exemplu:

```text
23 : 5 = 4 rest 3
```

În C++:

```cpp
cout << 23 / 5;
```

afișează:

```text
4
```

iar:

```cpp
cout << 23 % 5;
```

afișează:

```text
3
```

---

# `%` este foarte important la BAC

Operatorul `%` apare în foarte mulți algoritmi.

## Verificarea parității

Un număr este par dacă restul împărțirii sale la `2` este `0`.

```cpp
if (n % 2 == 0)
    cout << "PAR";
```

Pentru un număr impar:

```cpp
if (n % 2 != 0)
    cout << "IMPAR";
```

Putem reține:

```text
n % 2 == 0 → n este par

n % 2 != 0 → n este impar
```

---

# Verificarea divizibilității

Un număr `a` este divizibil cu `b` dacă restul împărțirii este `0`.

```cpp
if (a % b == 0)
    cout << "DIVIZIBIL";
```

De exemplu:

```text
20 % 5 = 0
```

deci `20` este divizibil cu `5`.

În schimb:

```text
22 % 5 = 2
```

deci `22` nu este divizibil cu `5`.

> **Șablon important pentru BAC:**

```cpp
a % b == 0
```

înseamnă:

```text
a este divizibil cu b
```

---

# Ultima cifră a unui număr

Una dintre cele mai importante utilizări ale operatorului `%` este prelucrarea cifrelor.

Pentru un număr natural `n`, ultima cifră se obține cu:

```cpp
n % 10
```

De exemplu:

```cpp
int n = 5387;

cout << n % 10;
```

Rezultatul:

```text
7
```

Putem reține:

```text
5387 % 10 = 7
              ↑
         ultima cifră
```

---

# Eliminarea ultimei cifre

Pentru a elimina ultima cifră folosim împărțirea întreagă la `10`.

```cpp
n / 10
```

De exemplu:

```text
5387 / 10 = 538
```

Astfel:

```text
n % 10 → extrage ultima cifră

n / 10 → elimină ultima cifră
```

Acesta este unul dintre cele mai importante șabloane pentru problemele de BAC.

---

## Exemplu

```cpp
int n = 5387;

int cifra = n % 10;
n = n / 10;
```

După prima instrucțiune:

```text
cifra = 7
```

iar după a doua:

```text
n = 538
```

Putem repeta procesul:

```text
5387 → cifra 7 → rămâne 538
 538 → cifra 8 → rămâne 53
  53 → cifra 3 → rămâne 5
   5 → cifra 5 → rămâne 0
```

De aici pornesc foarte mulți algoritmi pentru **prelucrarea cifrelor unui număr**.

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

Instrucțiunile:

```cpp
x = x + 1;
```

și:

```cpp
x++;
```

au același efect asupra valorii lui `x`.

`++` apare foarte des la contoare și în structuri repetitive.

De exemplu:

```cpp
nr++;
```

înseamnă:

> crește valoarea lui `nr` cu 1.

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

Instrucțiunile:

```cpp
x = x - 1;
```

și:

```cpp
x--;
```

au același efect asupra valorii lui `x`.

---

# `x++` și `++x`

Operatorul `++` poate fi scris în două moduri:

```cpp
x++;
```

sau:

```cpp
++x;
```

Dacă instrucțiunea este singură:

```cpp
x++;
```

sau:

```cpp
++x;
```

efectul final este același: `x` crește cu `1`.

Diferența apare atunci când operatorul face parte dintr-o expresie.

---

# Post-incrementare `x++`

La:

```cpp
x++
```

este folosită mai întâi **valoarea veche**, apoi `x` este incrementat.

Exemplu:

```cpp
int x = 5;
int y;

y = x++;
```

Mai întâi:

```text
y = 5
```

apoi:

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

# Pre-incrementare `++x`

La:

```cpp
++x
```

variabila este mai întâi incrementată, apoi este folosită noua valoare.

Exemplu:

```cpp
int x = 5;
int y;

y = ++x;
```

Mai întâi:

```text
x = 6
```

apoi:

```text
y = 6
```

La final:

```text
x = 6
y = 6
```

Putem reține:

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

# Operatorul minus ca semn

Simbolul `-` poate fi folosit și pentru a schimba semnul unei valori.

```cpp
int x = 5;

cout << -x;
```

Rezultatul este:

```text
-5
```

Aici `-` nu realizează o scădere între două valori, ci este aplicat unei singure valori.

---

# Ordinea operațiilor

La fel ca în matematică, operațiile nu sunt executate întotdeauna pur și simplu de la stânga la dreapta.

De exemplu:

```cpp
int x = 2 + 3 * 4;
```

Mai întâi se efectuează înmulțirea:

```text
3 * 4 = 12
```

apoi adunarea:

```text
2 + 12 = 14
```

Deci:

```text
x = 14
```

---

# Prioritatea operatorilor aritmetici

Pentru expresiile aritmetice de bază putem reține:

```text
1. ( )

2. *   /   %

3. +   -
```

Operatorii `*`, `/` și `%` au prioritate mai mare decât `+` și `-`.

De exemplu:

```cpp
cout << 10 + 6 / 2;
```

Mai întâi:

```text
6 / 2 = 3
```

apoi:

```text
10 + 3 = 13
```

Rezultatul este:

```text
13
```

---

# Folosirea parantezelor

Parantezele ne permit să stabilim clar ordinea operațiilor.

Compară:

```cpp
int x = 2 + 3 * 4;
```

Rezultat:

```text
14
```

cu:

```cpp
int x = (2 + 3) * 4;
```

Rezultat:

```text
20
```

> **Recomandare:** Dacă o expresie este mai complicată, folosește paranteze pentru a face ordinea calculelor cât mai clară.

---

# Operații cu aceeași prioritate

Pentru operatorii aritmetici binari de aceeași prioritate, evaluarea se grupează în mod obișnuit de la stânga la dreapta.

De exemplu:

```cpp
cout << 20 / 5 * 2;
```

calculăm:

```text
20 / 5 = 4
4 * 2 = 8
```

Rezultatul:

```text
8
```

Un exemplu foarte important:

```cpp
cout << 20 / 3 * 3;
```

Mai întâi:

```text
20 / 3 = 6
```

deoarece avem împărțire întreagă.

Apoi:

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

Nu putem împărți la zero.

De exemplu:

```cpp
int a = 10;
int b = 0;

cout << a / b;
```

este problematic deoarece încearcă să calculeze:

```text
10 / 0
```

Împărțirea la zero nu este definită.

Același lucru trebuie evitat și pentru:

```cpp
a % 0
```

> **Important:** Înainte de `/` sau `%`, trebuie să fim siguri că împărțitorul nu este `0`.

---

# Exemple importante pentru BAC

### Exemplul 1

```cpp
cout << 17 / 5;
```

Rezultat:

```text
3
```

---

### Exemplul 2

```cpp
cout << 17 % 5;
```

Rezultat:

```text
2
```

---

### Exemplul 3

```cpp
cout << 1234 % 10;
```

Rezultat:

```text
4
```

---

### Exemplul 4

```cpp
cout << 1234 / 10;
```

Rezultat:

```text
123
```

---

### Exemplul 5

```cpp
cout << 2 + 3 * 4;
```

Rezultat:

```text
14
```

---

### Exemplul 6

```cpp
cout << (2 + 3) * 4;
```

Rezultat:

```text
20
```

---

### Exemplul 7

```cpp
int x = 5;
int y = x++;
```

La final:

```text
x = 6
y = 5
```

---

### Exemplul 8

```cpp
int x = 5;
int y = ++x;
```

La final:

```text
x = 6
y = 6
```

---

# Recapitulare

Operatorii aritmetici principali sunt:

```text
+ → adunare
- → scădere
* → înmulțire
/ → împărțire
% → restul împărțirii
```

Operatorii:

```text
++ → crește valoarea cu 1
-- → scade valoarea cu 1
```

Pentru numere întregi:

```text
17 / 5 = 3
17 % 5 = 2
```

Pentru prelucrarea cifrelor:

```text
n % 10 → ultima cifră
n / 10 → eliminarea ultimei cifre
```

Pentru divizibilitate:

```cpp
a % b == 0
```

înseamnă că `a` este divizibil cu `b`.

Pentru paritate:

```cpp
n % 2 == 0
```

înseamnă că `n` este par.

Diferența dintre incrementări:

```text
x++ → folosește valoarea, apoi crește

++x → crește valoarea, apoi o folosește
```

Prioritatea operațiilor aritmetice de bază:

```text
( )
 ↓
*  /  %
 ↓
+  -
```

> **Reține:** Pentru BAC, acordă o atenție deosebită operatorilor `/` și `%`. Ei apar constant în probleme cu cifre, divizibilitate, paritate și în exercițiile în care trebuie să urmărești valoarea unei expresii.
