import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const config = JSON.parse(
  readFileSync(new URL("./config.json", import.meta.url), "utf8"),
);

const compositions = {
  "suma-cifrelor": "DigitSumReel",
  "numarul-de-cifre": "CountDigitsReel",
};
const composition = compositions[config.algorithm];

if (!composition) {
  console.error(`Algoritm video necunoscut: ${config.algorithm}. Alege: ${Object.keys(compositions).join(", ")}.`);
  process.exit(1);
}

const result = spawnSync(
  "npx",
  [
    "remotion",
    "render",
    "video/index.ts",
    composition,
    `out/${config.outputFile}`,
  ],
  { stdio: "inherit", shell: process.platform === "win32" },
);

process.exit(result.status ?? 1);
