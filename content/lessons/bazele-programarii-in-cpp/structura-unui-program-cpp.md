## Ce este un program C++?

Un program C++ este o succesiune de instrucțiuni pe care calculatorul le execută în ordinea stabilită de programator.

## Primul program

```cpp
// Include biblioteca iostream,
// care ne permite să afișăm și să citim date
#include <iostream>

// Ne permite să folosim cout, cin, endl
// fără să scriem std:: înaintea lor
using namespace std;

// Funcția main este punctul de pornire al programului
int main() {

    // cout afișează un mesaj pe ecran
    cout << "Hello World!" << endl;

    // Marchează terminarea cu succes a programului
    return 0;
}
```

# Structura unui program în C++

1. **`#include <iostream>`** - ne permite să folosim operațiile standard de intrare/ieșire, precum `cin` și `cout`.

2. **`using namespace std;`** - ne permite să folosim `cout`, `cin` și alte elemente standard fără să scriem `std::` în fața lor.

3. **`int main()`** - este funcția principală a programului. Execuția unui program C++ începe din funcția `main()`.

4. **`{ }`** - acoladele marchează începutul și sfârșitul unui bloc de cod. Aici delimitează corpul funcției `main()`.

5. **`cout << "Hello World!";`** - este o instrucțiune care afișează textul `Hello World!` pe ecran. `cout` este folosit pentru afișarea datelor.

6. **`;`** - punctul și virgula marchează sfârșitul unei instrucțiuni.

7. **`return 0;`** - încheie funcția `main()` și indică faptul că programul s-a terminat cu succes.

8. **Comentariile `//`** - sunt explicații scrise în cod pentru programator și sunt ignorate de compilator.

> **De reținut:** Execuția unui program C++ începe din funcția `main()`.

## Ordinea execuției

Un program C++ începe execuția din funcția `main()`.

Instrucțiunile din interiorul funcției `main()` sunt executate, în mod normal, **de sus în jos**, în ordinea în care sunt scrise.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Prima";
    cout << "A doua";
    cout << "A treia";

    return 0;
}
```

Programul va executa mai întâi prima instrucțiune, apoi a doua și apoi a treia.

## Cum ajunge codul să fie executat?

Calculatorul nu execută direct codul C++ pe care îl scriem. Înainte de rulare, programul trebuie **compilat**.

Procesul poate fi reținut foarte simplu:

**Scriem codul → Compilăm → Rulăm programul → Obținem rezultatul**

### 1. Scriem codul

Mai întâi scriem instrucțiunile programului în C++.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Salut!";
    return 0;
}
```

### 2. Compilarea

**Compilarea** este etapa în care compilatorul verifică programul și transformă codul C++ într-o formă pe care calculatorul o poate executa.

Dacă am încălcat regulile limbajului C++, compilatorul ne semnalează o **eroare de compilare**.

De exemplu:

```cpp
cout << "Salut!"
```

Lipsește `;`, deci programul nu se compilează.

> **Eroare de compilare** = programul conține o greșeală care împiedică realizarea cu succes a compilării.

### 3. Rularea

Dacă programul a fost compilat cu succes, acesta poate fi **rulat**.

În timpul rulării, calculatorul execută instrucțiunile programului.

De exemplu:

```cpp
cout << "Salut!";
```

va produce:

```text
Salut!
```

### Erori de rulare

Chiar dacă un program s-a compilat cu succes, poate apărea o problemă în timpul executării lui. Aceasta se numește **eroare de rulare**.

### Exemplu de eroare de rulare

Un exemplu simplu este **împărțirea unui număr întreg la zero**.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 0;

    cout << a / b;

    return 0;
}
```

Programul poate trece de compilare, deoarece instrucțiunile respectă regulile de scriere ale limbajului C++.

Problema apare **în timpul rulării**, când programul încearcă să calculeze:

```text
10 / 0
```

Împărțirea la zero nu este definită, iar programul poate eșua în timpul execuției.

> **Important:** Faptul că un program se compilează nu înseamnă că acesta va funcționa corect atunci când este rulat.

> **Eroare de rulare** = programul a putut fi compilat și pornit, dar apare o problemă în timpul execuției.

## Recapitulare

- **Cod sursă** - instrucțiunile C++ scrise de programator.
- **Compilare** - codul este verificat și transformat pentru a putea fi executat.
- **Eroare de compilare** - compilarea nu se poate finaliza cu succes din cauza unei greșeli.
- **Rulare** - programul este executat.
- **Eroare de rulare** - apare o problemă în timp ce programul se execută.

> **Reține:** Mai întâi scriem codul, apoi îl compilăm și, dacă compilarea reușește, îl putem rula.