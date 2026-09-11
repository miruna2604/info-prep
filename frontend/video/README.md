# Videoclipuri InfoPrep

Pentru modificările obișnuite este suficient să editezi `video/config.json`.

## Ce poți modifica

- `number`: numărul folosit în demonstrație;
- `algorithm`: șablonul exportat (`numarul-de-cifre` sau `suma-cifrelor`);
- `brand`: numele afișat;
- `titleLine1` și `titleLine2`: titlul videoclipului;
- `subtitle`: explicația de sub titlu;
- `closingLine1` și `closingLine2`: mesajul final;
- `secondsPerStep`: timpul acordat fiecărei instrucțiuni;
- `introSeconds`: durata introducerii;
- `outroSeconds`: durata rezultatului final;
- `backgroundLogoOpacity`: vizibilitatea logo-ului mare (`0` invizibil, `1` complet opac);
- `cornerLogoOpacity`: vizibilitatea logo-ului din colț;
- `outputFile`: numele fișierului MP4 rezultat.

## Previzualizare

Din directorul `frontend`, rulează:

```bash
npm run video:studio
```

Se deschide studioul Remotion, unde poți parcurge videoclipul fără să îl randezi.

## Export MP4

Din directorul `frontend`, rulează:

```bash
npm run video:render
```

Videoclipul va apărea în directorul `frontend/out`, cu numele ales în `outputFile`.

## Exemplu: Numărul de cifre

În `video/config.json`, setează:

```json
{
  "algorithm": "numarul-de-cifre",
  "number": 4729,
  "titleLine1": "Cum aflăm",
  "titleLine2": "numărul de cifre?",
  "outputFile": "numarul-de-cifre-4729.mp4"
}
```

Nu șterge celelalte proprietăți din configurație. Salvează fișierul, verifică în studio, apoi rulează exportul.

## Ritm recomandat

Pentru elevi începători, păstrează `secondsPerStep` între `2.4` și `3` secunde.
Pentru un clip mai rapid de recapitulare, poți folosi între `1.5` și `2` secunde.
