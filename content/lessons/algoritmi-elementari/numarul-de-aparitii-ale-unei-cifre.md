## Ce vrem să aflăm?

Primim un număr întreg `n` și o cifră `c`. Trebuie să aflăm **de câte ori apare cifra `c` în numărul `n`**.

De exemplu, pentru `n = 58353` și `c = 3`, răspunsul este `2`, deoarece cifra `3` apare de două ori.

## Cum analizăm cifrele?

Lucrăm de la dreapta la stânga:

- `n % 10` ne arată ultima cifră a numărului;
- comparăm ultima cifră cu `c`;
- dacă sunt egale, creștem contorul `nr`;
- `n = n / 10` elimină ultima cifră;
- repetăm până când `n` ajunge la `0`.

În animație, cifra verificată este evidențiată. O comparație reușită devine verde, iar una nereușită devine roșie.
