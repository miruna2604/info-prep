## Două maxime distincte

`max1` păstrează cea mai mare valoare, iar `max2` a doua cea mai mare valoare distinctă. Le inițializăm cu `INT_MIN`, mai mic decât orice valoare obișnuită din vector.

Când găsim un maxim nou, vechiul `max1` coboară în `max2`. Altfel, elementul poate actualiza numai `max2`, dar doar dacă este diferit de `max1`.
