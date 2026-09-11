## Două parcurgeri

Bucla exterioară ia pe rând fiecare număr `n` din intervalul `[a, b]`. Pentru fiecare număr resetăm `prim = true`, deoarece verificarea începe de la zero.

Dacă `n < 2`, valoarea nu poate fi primă. În caz contrar, căutăm un divizor numai cât timp `d * d <= n`. Este suficient să ajungem până la `√n`, deoarece divizorii apar în perechi și cel puțin unul dintre factorii unei perechi este cel mult egal cu radicalul.

Condiția `&& prim` oprește bucla interioară imediat ce am găsit un divizor. Astfel nu mai efectuăm împărțiri inutile pentru un număr despre care știm deja că este compus.

La finalul verificării curente, afișăm `n` numai dacă `prim` a rămas `true`, apoi bucla exterioară trece la următorul număr din interval.
