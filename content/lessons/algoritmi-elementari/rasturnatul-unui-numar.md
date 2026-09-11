## Ce înseamnă răsturnatul unui număr?

Răsturnatul conține aceleași cifre, dar în ordine inversă. De exemplu, `1234` devine `4321`.

La fiecare pas, `n % 10` extrage ultima cifră. Expresia-cheie este:

`invers = invers * 10 + n % 10`

Înmulțirea cu `10` face loc unei cifre noi, iar apoi ultima cifră din `n` este așezată în acel loc. Prin `n = n / 10`, cifra folosită este eliminată.
