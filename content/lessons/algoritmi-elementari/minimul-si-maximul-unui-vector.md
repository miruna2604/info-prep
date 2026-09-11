## Ideea algoritmului

Pornim cu primul element atât ca minim, cât și ca maxim. Apoi parcurgem vectorul de la poziția `1` și comparăm fiecare element cu valorile păstrate.

Dacă `v[i] < minim`, actualizăm minimul. Separat, dacă `v[i] > maxim`, actualizăm maximul. La sfârșit avem cele două extreme după o singură parcurgere.
