# Instrucțiunea `switch`

Instrucțiunea `switch` este utilă atunci când vrem să executăm acțiuni diferite **în funcție de valoarea unei expresii**.

De exemplu:

```cpp
int optiune;
cin >> optiune;

switch (optiune) {
    case 1:
        cout << "Adaugare";
        break;

    case 2:
        cout << "Stergere";
        break;

    case 3:
        cout << "Afisare";
        break;

    default:
        cout << "Optiune invalida";
}
```

---

# Cum funcționează?

`switch` verifică valoarea expresiei și caută un `case` corespunzător.

Pentru:

```text
optiune = 2
```

avem:

```text
case 1 → nu
case 2 → da
    ↓
afișează "Stergere"
    ↓
break
```

`case` indică o valoare posibilă:

```cpp
case 2:
```

iar `break` încheie cazul respectiv.

---

# Rolul lui `break`

Fără `break`, programul continuă și cu instrucțiunile din cazurile următoare.

De aceea, în mod obișnuit scriem:

```cpp
case 1:
    cout << "Unu";
    break;
```

> **De reținut:** `break` încheie cazul curent și iese din `switch`.

---

# `default`

`default` este executat dacă **niciun `case` nu corespunde** valorii.

```cpp
default:
    cout << "Valoare invalida";
```

Este asemănător cu ultimul `else` dintr-o structură `if`.

---

# Exemplu complet

Se citesc două numere întregi `a`, `b` și un caracter `op`, care reprezintă operația dorită:

```text
+ → adunare
- → scădere
* → înmulțire
```

Programul:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    char op;

    cin >> a >> b >> op;

    switch (op) {
        case '+':
            cout << a + b;
            break;

        case '-':
            cout << a - b;
            break;

        case '*':
            cout << a * b;
            break;

        default:
            cout << "Operator invalid";
    }

    return 0;
}
```

### Exemplu de input

```text
8 3 *
```

Variabilele primesc:

```text
a = 8
b = 3
op = '*'
```

`switch` caută cazul:

```cpp
case '*':
```

și execută:

```cpp
cout << a * b;
```

### Output

```text
24
```

---

# `switch` vs. `if`

`switch` este potrivit când comparăm **aceeași expresie cu mai multe valori exacte**:

```text
x este 1?
x este 2?
x este 3?
```

Pentru condiții precum:

```cpp
x > 10
x % 2 == 0
x >= 10 && x <= 99
```

folosim `if`.

Pe scurt:

```text
switch → cazuri bazate pe valori exacte
if     → condiții generale
```

---

# Recapitulare

Structura de bază:

```cpp
switch (expresie) {
    case valoare1:
        // instrucțiuni
        break;

    case valoare2:
        // instrucțiuni
        break;

    default:
        // dacă niciun caz nu corespunde
}
```

Reține:

```text
switch  → verifică valoarea
case    → definește un caz
break   → încheie cazul
default → niciun caz nu s-a potrivit
```

> Ideea esențială: **`switch` alege ce să execute în funcție de valoarea unei expresii.**