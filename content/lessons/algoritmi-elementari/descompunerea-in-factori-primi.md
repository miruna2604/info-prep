## Factor și putere

Pornim cu `d = 2`. Cât timp `d` îl divide pe `n`, împărțim și creștem puterea `p`. Dacă `p > 0`, afișăm factorul și puterea sa, apoi încercăm următoarea valoare. Pentru `60` obținem `2^2 · 3^1 · 5^1`.

Bucla exterioară alege pe rând candidatul `d`. Pentru fiecare candidat, `p` este resetat la `0`, deoarece vrem să numărăm de la început de câte ori apare factorul curent.

Bucla interioară răspunde la întrebarea `n % d == 0?`. Cât timp răspunsul este „da”:

- creștem puterea prin `p++`;
- eliminăm un factor `d` prin `n = n / d`;
- verificăm din nou același `d`, deoarece un factor poate apărea de mai multe ori.

Abia când împărțirea nu mai este exactă ieșim din bucla interioară. Dacă `p > 0`, factorul a fost găsit și afișăm `d^p`. Apoi executăm `d++` și încercăm următorul candidat.

Valoarea lui `n` se micșorează pe parcurs. Când ajunge la `1`, toți factorii primi au fost eliminați și descompunerea este completă.
