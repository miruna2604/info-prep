## Două minime distincte

`min1` păstrează cea mai mică valoare, iar `min2` a doua cea mai mică valoare distinctă. Pornim de la `INT_MAX`.

Când găsim un minim nou, vechiul `min1` trece în `min2`. În caz contrar, actualizăm `min2` numai cu o valoare mai mică decât el și diferită de `min1`.
