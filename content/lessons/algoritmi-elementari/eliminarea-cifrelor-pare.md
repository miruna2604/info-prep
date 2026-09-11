## Cerința

Eliminăm toate cifrele pare și păstrăm cifrele impare în ordinea lor inițială. Exemplu: `123456` devine `135`.

## Soluția 1: construim și apoi răsturnăm

Cifrele sunt extrase din `n` de la dreapta la stânga. În prima buclă păstrăm doar cifrele impare, dar ele ajung în ordine inversă în `rezultat`.

În a doua buclă răsturnăm `rezultat` și obținem `final`, numărul cerut în ordinea corectă. Animația separă clar cele două construcții.

## Soluția 2: așezăm direct cifra pe poziția corectă

Putem evita a doua răsturnare folosind variabila `p`, care reprezintă poziția următoarei cifre păstrate:

- `p = 1` înseamnă poziția unităților;
- `p = 10` înseamnă poziția zecilor;
- `p = 100` înseamnă poziția sutelor.

Când cifra este impară, calculăm `rezultat = cifra * p + rezultat`. Astfel, cifra extrasă din dreapta este introdusă în fața rezultatului deja construit.

De exemplu, dacă `rezultat = 35`, `cifra = 1` și `p = 100`, obținem `1 * 100 + 35 = 135`.

Foarte important: mărim `p` numai când păstrăm o cifră. O cifră pară este ignorată și nu trebuie să ocupe nicio poziție în rezultat.
