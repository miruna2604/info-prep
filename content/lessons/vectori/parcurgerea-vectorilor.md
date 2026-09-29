# Parcurgerea vectorilor

După ce am citit un vector, următorul pas este să știm să **prelucrăm elementele lui**.

Majoritatea problemelor de bază pornesc de la aceeași idee:

```text
parcurg vectorul
      ↓
iau fiecare v[i]
      ↓
fac ceva cu el
```

În funcție de cerință, putem calcula o sumă sau un produs, găsi minimul și maximul, număra anumite elemente sau căuta o valoare.

---

# Parcurgerea completă

Pentru un vector cu `n` elemente indexate de la `0`:

```text
indice:    0     1     2          n-1
           ↓     ↓     ↓           ↓
vector:   v[0]  v[1]  v[2]  ...  v[n-1]
```

parcurgerea completă este:

```cpp
for (int i = 0; i < n; i++) {
    // prelucrăm v[i]
}
```

Pentru:

```text
v = [7, 4, 9, 2]
```

bucla ajunge pe rând la:

```text
i = 0 → v[i] = 7
i = 1 → v[i] = 4
i = 2 → v[i] = 9
i = 3 → v[i] = 2
```

De aici înainte, trebuie doar să stabilim **ce facem cu fiecare `v[i]`**.

---

# Suma elementelor

Dacă vrem suma tuturor elementelor, avem nevoie de o variabilă în care acumulăm valorile.

Pornim de la:

```cpp
int suma = 0;
```

și adăugăm fiecare element:

```cpp
for (int i = 0; i < n; i++)
    suma += v[i];
```

Pentru:

```text
v = [7, 4, 9, 2]
```

urmărim:

```text
suma = 0

v[0] = 7  → suma = 7
v[1] = 4  → suma = 11
v[2] = 9  → suma = 20
v[3] = 2  → suma = 22
```

Rezultat:

```text
suma = 22
```

> Suma pornește de la `0`, deoarece `0` nu modifică rezultatul unei adunări.

---

# Produsul elementelor

Pentru produs procedăm asemănător, dar valoarea inițială trebuie să fie `1`:

```cpp
int produs = 1;

for (int i = 0; i < n; i++)
    produs *= v[i];
```

Pentru:

```text
v = [2, 3, 4]
```

avem:

```text
produs = 1

v[0] = 2 → produs = 2
v[1] = 3 → produs = 6
v[2] = 4 → produs = 24
```

Nu putem porni produsul de la `0`:

```text
0 × orice = 0
```

deci rezultatul ar rămâne mereu `0`.

---

# Minim și maxim

Să presupunem că vrem să găsim cea mai mare valoare din vector.

O idee sigură este să considerăm inițial că **primul element este maximul**:

```cpp
int maxim = v[0];
```

Apoi îl comparăm cu elementele următoare:

```cpp
for (int i = 1; i < n; i++)
    if (v[i] > maxim)
        maxim = v[i];
```

Pentru:

```text
v = [7, 4, 9, 2]
```

avem:

```text
maxim = 7

4 > 7 ? NU → maxim rămâne 7
9 > 7 ? DA → maxim devine 9
2 > 9 ? NU → maxim rămâne 9
```

Rezultat:

```text
maxim = 9
```

Pentru minim schimbăm doar comparația:

```cpp
int minim = v[0];

for (int i = 1; i < n; i++)
    if (v[i] < minim)
        minim = v[i];
```

### De ce nu inițializăm cu `0`?

Să avem:

```text
v = [-8, -3, -12]
```

Dacă scriem:

```cpp
int maxim = 0;
```

niciun element nu este mai mare decât `0`, deci am obține greșit:

```text
maxim = 0
```

deși `0` nici măcar nu apare în vector.

De aceea folosim:

```cpp
int maxim = v[0];
int minim = v[0];
```

---

# Numărarea elementelor

Când cerința întreabă:

```text
„Câte elemente...?”
```

avem nevoie de un **contor**.

De exemplu:

> Câte elemente pare există în vector?

Gândirea este:

```text
„câte?”             → am nevoie de un contor
inițial              → cnt = 0
verific fiecare      → parcurg vectorul
condiția             → v[i] % 2 == 0
dacă este adevărată  → cnt++
```

Codul devine:

```cpp
int cnt = 0;

for (int i = 0; i < n; i++)
    if (v[i] % 2 == 0)
        cnt++;
```

Pentru:

```text
v = [7, 4, 8, 3, 6]
```

avem:

```text
7 → impar → cnt = 0
4 → par   → cnt = 1
8 → par   → cnt = 2
3 → impar → cnt = 2
6 → par   → cnt = 3
```

Același model funcționează pentru orice condiție.

De exemplu, pentru numărul elementelor pozitive schimbăm doar condiția:

```cpp
if (v[i] > 0)
    cnt++;
```

Pentru numărul multiplilor de `5`:

```cpp
if (v[i] % 5 == 0)
    cnt++;
```

> Când vezi formularea **„câte elemente respectă...”**, gândește-te la `contor + condiție`.

---

# Căutarea unui element

Acum vrem să răspundem la întrebarea:

> Valoarea `x` există în vector?

La început presupunem că nu am găsit-o:

```cpp
bool gasit = false;
```

Apoi verificăm elementele:

```cpp
for (int i = 0; i < n; i++) {
    if (v[i] == x) {
        gasit = true;
        break;
    }
}
```

Pentru:

```text
v = [7, 4, 9, 2]
x = 9
```

execuția este:

```text
v[0] = 7 → 7 == 9 ? NU
v[1] = 4 → 4 == 9 ? NU
v[2] = 9 → 9 == 9 ? DA
                     ↓
                gasit = true
                     ↓
                   break
```

`break` oprește parcurgerea. Dacă am găsit deja valoarea, nu mai are rost să verificăm elementele următoare.

La final putem scrie:

```cpp
if (gasit)
    cout << "DA";
else
    cout << "NU";
```

---

# Căutarea poziției unui element

Uneori nu vrem doar să știm dacă `x` există, ci și **unde apare**.

Atunci memorăm indicele:

```cpp
int poz = -1;

for (int i = 0; i < n; i++) {
    if (v[i] == x) {
        poz = i;
        break;
    }
}
```

Pentru:

```text
indice:    0   1   2   3
           ↓   ↓   ↓   ↓
vector:    7   4   9   2
                   ↑
                  x = 9
```

obținem:

```text
poz = 2
```

Pornim cu:

```cpp
int poz = -1;
```

pentru că `-1` nu este un indice valid.

Astfel:

```text
poz == -1 → x nu a fost găsit
poz != -1 → x a fost găsit
```

Pentru că folosim `break`, dacă valoarea apare de mai multe ori, obținem **indicele primei apariții**.

---

# Cum aleg algoritmul potrivit?

Nu încerca să memorezi fiecare problemă ca pe un cod separat.

Citește cerința și caută cuvintele care îți spun **ce rezultat trebuie construit**:

```text
„suma elementelor...”          → sumă

„produsul elementelor...”      → produs

„cea mai mică valoare...”      → minim

„cea mai mare valoare...”      → maxim

„câte elemente...”             → contor

„există valoarea x...”         → căutare
```

Apoi gândește:

```text
1. Ce rezultat trebuie să obțin?
2. Cu ce valoare îl inițializez?
3. Ce fac cu fiecare v[i]?
```

Asta este mult mai important decât să memorezi codurile pe de rost.

---

# Recapitulare

Totul pornește de la:

```cpp
for (int i = 0; i < n; i++) {
    // prelucrez v[i]
}
```

Schema de reținut:

```text
sumă       → pornește de la 0
produs     → pornește de la 1
minim      → pornește de la v[0]
maxim      → pornește de la v[0]
numărare   → contor pornit de la 0
căutare    → verific dacă v[i] este valoarea dorită
```

> **Ideea esențială:** parcurgerea rămâne aceeași. Cerința problemei îți spune doar **ce trebuie să faci cu fiecare `v[i]`**.