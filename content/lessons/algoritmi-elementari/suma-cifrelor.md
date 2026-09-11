## Ideea algoritmului

Pentru a prelucra cifrele unui număr, le luăm pe rând **de la dreapta la stânga**.

- `n % 10` ne oferă ultima cifră a numărului;
- adăugăm cifra la `suma`;
- `n /= 10` elimină ultima cifră;
- repetăm cât timp numărul mai are cifre.

În animația de mai jos poți urmări fiecare instrucțiune executată. Încearcă și propriul tău număr.
