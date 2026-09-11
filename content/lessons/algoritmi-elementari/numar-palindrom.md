## Ce este un număr palindrom?

Un număr este palindrom dacă se citește la fel în ambele sensuri. De exemplu, `12321` este palindrom, iar `1234` nu este.

Construim răsturnatul numărului și îl comparăm cu valoarea inițială. Variabila `copie` este esențială: bucla modifică treptat `n` până la `0`, așa că păstrăm în `copie` numărul de la început.

La final, dacă `copie == invers`, afișăm `DA`; altfel afișăm `NU`.
