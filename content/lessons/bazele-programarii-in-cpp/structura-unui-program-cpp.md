# Structura unui program C++

## Ce este un program C++?

Un **program C++** este o succesiune de instrucțiuni prin care îi spunem calculatorului ce operații să execute.

Instrucțiunile sunt scrise într-un **cod sursă**, respectând regulile limbajului C++.

Hai să vedem cum arată un program simplu.

## Primul program

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Salut!";

    return 0;
}
```

Acest program afișează pe ecran:

```text
Salut!
```

Chiar dacă programul este foarte scurt, conține principalele elemente pe care le vom întâlni în programele C++.

## Structura programului

Să analizăm fiecare parte.

### `#include <iostream>`

```cpp
#include <iostream>
```

Include biblioteca necesară pentru operațiile standard de **citire și afișare**.

Datorită ei vom putea folosi:

* `cin` pentru citirea datelor;
* `cout` pentru afișarea datelor.

Le vom studia în detaliu în lecția despre **Citire și afișare**.

---

### `using namespace std;`

```cpp
using namespace std;
```

Ne permite să folosim elemente precum `cin` și `cout` fără să scriem `std::` înaintea lor.

Astfel putem scrie:

```cpp
cout << "Salut!";
```

în loc de:

```cpp
std::cout << "Salut!";
```

În programele pe care le vom scrie în continuare vom folosi:

```cpp
using namespace std;
```

---

### Funcția `main()`

```cpp
int main() {

}
```

`main()` este **funcția principală a programului**.

Execuția unui program C++ începe din `main()`.

Instrucțiunile pe care vrem să le execute programul vor fi scrise între acoladele funcției:

```cpp
int main() {
    // instrucțiuni
}
```

> **De reținut:** Execuția programului începe din funcția `main()`.

---

### Acoladele `{ }`

Acoladele marchează începutul și sfârșitul unui **bloc de instrucțiuni**.

În cazul nostru:

```cpp
int main() {
    cout << "Salut!";
    return 0;
}
```

ele delimitează corpul funcției `main()`.

Vom întâlni acolade și în alte situații pe parcursul lecțiilor.

---

### Instrucțiunile și `;`

În interiorul funcției `main()` scriem instrucțiunile programului.

De exemplu:

```cpp
cout << "Salut!";
```

este o instrucțiune care afișează textul `Salut!`.

Majoritatea instrucțiunilor C++ se termină cu:

```text
;
```

Dacă uităm `;` acolo unde este necesar, programul nu se va compila.

---

### `return 0;`

La finalul funcției `main()` vom întâlni:

```cpp
return 0;
```

Această instrucțiune încheie funcția `main()` și indică terminarea cu succes a programului.

În programele noastre vom păstra forma:

```cpp
int main() {

    // instrucțiuni

    return 0;
}
```

## În ce ordine sunt executate instrucțiunile?

În mod normal, instrucțiunile sunt executate **de sus în jos**, în ordinea în care sunt scrise.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Prima ";
    cout << "A doua ";
    cout << "A treia";

    return 0;
}
```

Programul execută:

```text
1. cout << "Prima ";
2. cout << "A doua ";
3. cout << "A treia";
```

și afișează:

```text
Prima A doua A treia
```

Mai târziu vom învăța instrucțiuni care pot modifica această ordine, precum structurile alternative și repetitive.

## Comentariile

Comentariile sunt explicații scrise în cod pentru a-l face mai ușor de înțeles.

Un comentariu pe o singură linie începe cu:

```cpp
//
```

Exemplu:

```cpp
// Afișăm un mesaj
cout << "Salut!";
```

Comentariile sunt **ignorate de compilator**, deci nu influențează rezultatul programului.

Putem avea și comentarii pe mai multe linii:

```cpp
/*
Acesta este
un comentariu
pe mai multe linii.
*/
```

Comentariile sunt utile pentru explicarea codului, dar nu trebuie să comentăm fiecare instrucțiune evidentă.

## De la cod la rezultat

Calculatorul nu execută direct codul C++ pe care îl scriem.

Procesul poate fi privit simplu:

```text
Scriem codul → Compilăm → Rulăm → Obținem rezultatul
```

### 1. Scriem codul

Scriem programul respectând regulile limbajului C++.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Salut!";
    return 0;
}
```

### 2. Compilăm

Înainte ca programul să poată fi rulat, acesta trebuie **compilat**.

Compilatorul verifică dacă programul respectă regulile limbajului C++ și îl transformă într-o formă care poate fi executată de calculator.

Dacă există anumite greșeli în cod, compilarea nu poate fi realizată cu succes.

De exemplu:

```cpp
cout << "Salut!"
```

Lipsește:

```text
;
```

Prin urmare, apare o **eroare de compilare**.

> **Eroare de compilare:** o eroare care împiedică programul să fie compilat cu succes.

### 3. Rulăm programul

Dacă programul a fost compilat cu succes, îl putem rula.

În timpul rulării sunt executate instrucțiunile programului.

Pentru:

```cpp
cout << "Salut!";
```

vom obține:

```text
Salut!
```

## Recapitulare pentru BAC

Din această lecție trebuie să reții:

* execuția unui program C++ începe din funcția `main()`;
* `#include <iostream>` permite folosirea operațiilor standard de citire și afișare;
* `using namespace std;` ne permite să folosim direct `cin` și `cout`;
* `{ }` delimitează un bloc de instrucțiuni;
* majoritatea instrucțiunilor se termină cu `;`;
* comentariile sunt ignorate de compilator;
* în mod normal, instrucțiunile sunt executate de sus în jos;
* înainte de rulare, programul trebuie compilat;
* o greșeală de scriere a codului poate produce o **eroare de compilare**.

### Structura de bază pe care trebuie să o recunoști

```cpp
#include <iostream>
using namespace std;

int main() {

    // instrucțiuni

    return 0;
}
```

> **Pentru BACUL la INFO:** structura unui program și comentariile fac parte explicit din programa de examen. În problemele de programare vei folosi această structură pentru a construi programele cerute.
