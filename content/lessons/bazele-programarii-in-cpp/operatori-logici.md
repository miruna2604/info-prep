# Operatori logici în C++

Operatorii logici ne permit să **combinăm sau să negăm condiții**.

În C++ folosim:

| Operator | Semnificație |
| --- | --- |
| `&&` | ȘI |
| `||` | SAU |
| `!` | NU |

O expresie logică are rezultatul:

```text
true  → adevărat
false → fals
```

---

# `&&` — ȘI

Expresia:

```cpp
conditie1 && conditie2
```

este adevărată **doar dacă ambele condiții sunt adevărate**.

De exemplu:

```cpp
x >= 10 && x <= 99
```

verifică dacă `x` este între `10` și `99`.

```text
true  && true  → true
true  && false → false
false && true  → false
false && false → false
```

> Pentru `&&`, trebuie îndeplinite **ambele** condiții.

---

# `||` — SAU

Expresia:

```cpp
conditie1 || conditie2
```

este adevărată dacă **cel puțin una dintre condiții este adevărată**.

De exemplu:

```cpp
x < 10 || x > 99
```

verifică dacă `x` este în afara intervalului `[10,99]`.

```text
true  || true  → true
true  || false → true
false || true  → true
false || false → false
```

> Pentru `||`, este suficientă **cel puțin o condiție adevărată**.

---

# `!` — NU

Operatorul `!` neagă o condiție:

```text
!true  → false
!false → true
```

De exemplu:

```cpp
!(x == 5)
```

înseamnă:

```text
x nu este egal cu 5
```

și este echivalent cu:

```cpp
x != 5
```

---

# Exercițiu tip BAC

**Variabilele `x` și `y` sunt întregi. Indicați o expresie C/C++ care are valoarea `1` dacă și numai dacă numerele naturale memorate în `x` și `y` au aceeași paritate.**

```text
a. (x*y)%2==0
b. x%2==0 && y%2==0
c. (x+y)%2==0
d. !(x%2==y%2)
```

### Rezolvare

Aceeași paritate înseamnă:

```text
par + par     = par
impar + impar = par
```

Deci suma trebuie să fie pară:

```cpp
(x + y) % 2 == 0
```

Varianta `b` verifică doar cazul în care ambele numere sunt pare.

> **Răspuns corect: c. `(x+y)%2==0`**

---

# Negarea unei expresii

Să avem condiția:

```cpp
x >= 10 && x <= 99
```

Aceasta verifică dacă `x` este în intervalul `[10,99]`.

Dacă vrem exact opusul:

```cpp
!(x >= 10 && x <= 99)
```

obținem:

```cpp
x < 10 || x > 99
```

Regulile sunt:

```text
!(A && B) → !A || !B

!(A || B) → !A && !B
```

Acestea se numesc **legile lui De Morgan**.

Când negăm o expresie:

```text
&& ↔ ||
```

iar condițiile sunt și ele negate.

De exemplu:

```text
>= devine <
<= devine >
== devine !=
!= devine ==
```

---

# Exercițiu tip BAC

**Variabilele `x` și `y` memorează câte un număr natural (`x≤y`). Indicați expresia C/C++ cu valoarea `1` dacă și numai dacă intervalul `[x,y]` NU conține niciun număr de două cifre.**

```text
a. !(x>=10 || y>99)
b. !(x<=99 && y>=10)
c. x>=10 || y<=99
d. x>99 && y<10
```

### Rezolvare

Numerele de două cifre sunt în:

```text
[10,99]
```

Intervalul `[x,y]` conține cel puțin un astfel de număr dacă:

```cpp
x <= 99 && y >= 10
```

Dar cerința spune **NU conține**, deci negăm:

```cpp
!(x <= 99 && y >= 10)
```

> **Răspuns corect: b. `!(x<=99 && y>=10)`**

---

# Prioritatea operatorilor logici

Operatorii logici nu au aceeași prioritate.

Ordinea este:

```text
1. !    → NU
2. &&   → ȘI
3. ||   → SAU
```

Adică:

```text
!  →  &&  →  ||
```

De exemplu:

```cpp
a || b && !c
```

se interpretează:

```cpp
a || (b && (!c))
```

Mai întâi:

```text
!c
```

apoi:

```text
b && !c
```

și la final:

```text
a || ...
```

> **De reținut:** `!` se execută înainte de `&&`, iar `&&` înainte de `||`.

Dacă expresia este mai greu de urmărit, folosește paranteze pentru a face intenția clară.

---

# Cum construim o condiție?

Transformă cerința în bucăți simple.

De exemplu:

**„x este pozitiv și par”**

```text
x este pozitiv → x > 0

x este par → x % 2 == 0
```

Avem **ȘI**, deci:

```cpp
x > 0 && x % 2 == 0
```

Alt exemplu:

**„x este divizibil cu 3 sau cu 5”**

```text
x este divizibil cu 3 → x % 3 == 0

x este divizibil cu 5 → x % 5 == 0
```

Avem **SAU**, deci:

```cpp
x % 3 == 0 || x % 5 == 0
```

Ideea este:

```text
ȘI  → &&
SAU → ||
NU  → !
```

---

# Exercițiu tip BAC

**Variabila `x` este de tip întreg și memorează un număr natural nenul. Indicați o expresie C/C++ care are valoarea `1` dacă și numai dacă `x` este divizibil cu `26`, dar NU este divizibil cu `2026`.**

```text
a. !(x%26!=0) || x%2026!=0
b. !(x%26!=0) && !(x%2026==0)
c. !(x%26==0 || x%2026==0)
d. !(x%26!=0 && x%2026!=0)
```

### Rezolvare

**Divizibil cu `26`:**

```cpp
x % 26 == 0
```

echivalent cu:

```cpp
!(x % 26 != 0)
```

**NU este divizibil cu `2026`:**

```cpp
x % 2026 != 0
```

echivalent cu:

```cpp
!(x % 2026 == 0)
```

Trebuie îndeplinite **ambele**:

```text
divizibil cu 26
ȘI
nedivizibil cu 2026
```

deci:

```cpp
!(x % 26 != 0) && !(x % 2026 == 0)
```

> **Răspuns corect: b. `!(x%26!=0) && !(x%2026==0)`**

---

# Recapitulare

```text
&& → ȘI  → ambele condiții trebuie să fie adevărate

|| → SAU → cel puțin una trebuie să fie adevărată

!  → NU  → inversează rezultatul
```

Prioritatea este:

```text
!  →  &&  →  ||
```

Pentru negare:

```text
!(A && B) → !A || !B

!(A || B) → !A && !B
```

Iar când transformi o cerință într-o expresie logică:

```text
1. identifică condițiile simple
2. traduce fiecare condiție în C++
3. leagă-le folosind &&, || sau !
```

> În exercițiile de bac, cel mai sigur este să traduci cerința **bucată cu bucată**, nu să încerci să ghicești expresia corectă direct dintre variante.