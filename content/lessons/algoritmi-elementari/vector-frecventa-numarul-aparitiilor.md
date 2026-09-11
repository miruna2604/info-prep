## Ce este un vector de frecvență?

Vectorul `f` este un tabel în care **indexul reprezintă valoarea**, iar elementul de la acel index reprezintă numărul ei de apariții.

`f[x] = numărul de apariții al valorii x`

Pentru valorile `3 1 3 5 1 3`, avem `f[1] = 2`, `f[3] = 3` și `f[5] = 1`. Pozițiile corespunzătoare valorilor care nu apar rămân `0`.

## Cum îl construim?

Inițial, toate cele 101 poziții sunt zero datorită declarației `int f[101] = {0}`. Pentru fiecare valoare citită în `x`, executăm `f[x]++`:

- valoarea lui `x` ne spune **la ce index mergem**;
- `f[x]` ne spune câte apariții am numărat deja;
- `++` adaugă apariția curentă.

Astfel, nu căutăm valoarea în vectorul de frecvență: ajungem direct la poziția ei folosind-o ca index.
