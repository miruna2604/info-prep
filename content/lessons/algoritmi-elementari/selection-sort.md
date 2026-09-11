## Ideea Selection Sort

Împărțim vectorul într-o parte sortată, în stânga, și o parte nesortată, în dreapta. Pentru fiecare poziție `i`, presupunem inițial că minimul este chiar acolo: `pozMin = i`.

Parcurgem restul vectorului cu `j`. Când găsim o valoare mai mică decât `v[pozMin]`, actualizăm poziția minimului. După terminarea căutării, interschimbăm `v[i]` cu minimul găsit.

Astfel, după fiecare pas, partea sortată crește cu exact un element.
