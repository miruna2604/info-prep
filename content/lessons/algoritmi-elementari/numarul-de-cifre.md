## Ideea algoritmului

La fiecare împărțire întreagă la `10`, ultima cifră a numărului dispare. Numărăm câte astfel de împărțiri putem face până când numărul ajunge la `0`.

- `nr` pornește de la `0`;
- la fiecare iterație creștem contorul cu `1`;
- `n = n / 10` elimină ultima cifră;
- când `n` devine `0`, `nr` conține numărul de cifre.

Numărul `0` este un caz special: are o singură cifră, de aceea atribuim direct `nr = 1`.

Folosește animația pentru a urmări legătura dintre număr, contor și fiecare instrucțiune din cod.
