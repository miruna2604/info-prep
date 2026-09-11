## O secvență trebuie să fie consecutivă

Comparăm fiecare valoare `x` cu `anterior`. Dacă `x > anterior`, secvența strict crescătoare continuă și mărim `lungime`.

Dacă `x <= anterior`, creșterea s-a întrerupt. Elementul curent devine începutul unei secvențe noi de lungime `1`.

`maxim` memorează recordul, iar `anterior = x` pregătește următoarea comparație. Algoritmul caută o porțiune consecutivă; nu putem sări peste elemente care întrerup creșterea.
