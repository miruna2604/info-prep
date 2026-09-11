## Două contoare cu roluri diferite

`lungime` măsoară secvența pozitivă care se termină la elementul curent. `maxim` păstrează cea mai mare lungime întâlnită până acum.

Când `x > 0`, secvența continuă și executăm `lungime++`. Când întâlnim zero sau o valoare negativă, secvența pozitivă se întrerupe și resetăm `lungime = 0`.

După fiecare element comparăm `lungime` cu `maxim`. Recordul este actualizat numai când secvența curentă a devenit mai lungă. Pentru `2 -1 4 7 3 -2 5 6`, recordul final este `3`, corespunzător secvenței `4 7 3`.
