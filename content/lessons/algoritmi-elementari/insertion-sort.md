## Ideea Insertion Sort

Considerăm că partea din stânga este deja sortată. Luăm următorul element în variabila `x` și îi facem loc în acea parte.

Cât timp `v[j] > x`, deplasăm `v[j]` cu o poziție spre dreapta și micșorăm `j`. Nu interschimbăm repetat elementul `x`; îl ținem separat până când găsim locul potrivit.

La final executăm `v[j + 1] = x`. Partea sortată crește cu un element și algoritmul continuă.
