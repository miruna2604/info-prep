## Condiția esențială: vectorul trebuie să fie sortat

Căutarea binară folosește ordinea elementelor pentru a elimina jumătate din zona rămasă. `st` și `dr` delimitează intervalul în care valoarea `x` mai poate exista, iar `mij` este poziția din mijloc.

Dacă `v[mij] == x`, am găsit valoarea. Dacă `x < v[mij]`, tot ce se află de la `mij` spre dreapta este prea mare, deci continuăm în stânga prin `dr = mij - 1`. Altfel continuăm în dreapta prin `st = mij + 1`.

Ne oprim când găsim valoarea sau când `st > dr`, situație în care intervalul de căutare a devenit gol.
