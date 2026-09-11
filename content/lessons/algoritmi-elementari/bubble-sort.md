## Ideea Bubble Sort

Comparăm elementele vecine `v[j]` și `v[j + 1]`. Dacă sunt în ordine greșită, le interschimbăm. Elementele mari „urcă” treptat spre dreapta, asemenea unor bule.

După prima parcurgere, cel mai mare element este sigur pe ultima poziție. După următoarea, al doilea cel mai mare este fixat înaintea lui. De aceea bucla interioară se oprește la `n - i - 1`.

Variabila `schimbat` detectează un vector deja sortat. La începutul fiecărei parcurgeri devine `false`; dacă nu efectuăm nicio interschimbare, condiția buclei exterioare oprește algoritmul.
