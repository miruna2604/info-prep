## Comparăm vecinii

Primul element pornește o secvență de lungime `1` și este salvat în `anterior`. Pentru fiecare valoare următoare `x` verificăm dacă `x == anterior`.

Dacă sunt egale, continuăm grupul prin `lungime++`. Dacă sunt diferite, elementul `x` începe un grup nou, deci `lungime = 1`.

Actualizăm `maxim` când grupul curent depășește recordul, apoi executăm `anterior = x` pentru ca următoarea valoare să fie comparată cu elementul tocmai procesat.
