## Când este un număr prim?

Un număr prim este mai mare decât `1` și are numai divizorii `1` și numărul însuși. Pornim cu presupunerea `prim = true`; dacă `n < 2` sau găsim un divizor propriu, schimbăm valoarea în `false`.

## De ce verificăm doar până la √n?

Divizorii apar în perechi. Dacă `d` divide `n`, atunci și `n / d` este divizor. În fiecare pereche, cel puțin unul dintre cei doi divizori este mai mic sau egal cu `√n`.

De aceea este suficient să verificăm condiția `d * d <= n`. Dacă nu am găsit niciun divizor până când `d * d` depășește `n`, nu vom găsi unul nou nici după radical.

Condiția completă a buclei este `d * d <= n && prim`:

- prima parte ne oprește după `√n`;
- a doua parte oprește imediat căutarea când am găsit un divizor și `prim` a devenit `false`.

Astfel, pentru un număr compus nu continuăm verificările inutil.
