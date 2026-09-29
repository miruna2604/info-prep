// IDs are stable navigation anchors. Add href when a destination is available.
export type CurriculumNode = {
  id: string;
  label: string;
  href?: string;
  children?: CurriculumNode[];
};

export const bacCurriculum: CurriculumNode[] = [
    {
      id: "bazele-c",
      label: "Bazele C++",
      href: "/chapters/bazele-programarii-in-cpp",
      children: [
        {
          id: "bazele-c-structura-programului",
          label: "1. Structura unui program C++",
          href: "/chapters/bazele-programarii-in-cpp/lessons/structura-unui-program-cpp",
          children: [
            {
              id: "bazele-c-structura-programului-include-iostream",
              label: "#include <iostream>",
              href: "/chapters/bazele-programarii-in-cpp/lessons/structura-unui-program-cpp#include-iostream",
            },
            {
              id: "bazele-c-structura-programului-using-namespace-std",
              label: "using namespace std;",
              href: "/chapters/bazele-programarii-in-cpp/lessons/structura-unui-program-cpp#using-namespace-std",
            },
            {
              id: "bazele-c-structura-programului-main",
              label: "int main()",
              href: "/chapters/bazele-programarii-in-cpp/lessons/structura-unui-program-cpp#functia-main",
            },
            {
              id: "bazele-c-structura-programului-comentarii",
              label: "Comentarii",
              href: "/chapters/bazele-programarii-in-cpp/lessons/structura-unui-program-cpp#comentariile",
            },
          ],
        },

        {
          id: "bazele-c-variabile-constante-tipuri-date",
          label: "2. Variabile, constante și tipuri de date",
          children: [
            {
              id: "bazele-c-variabile-constante",
              label: "Variabile și constante",
              href: "/chapters/bazele-programarii-in-cpp/lessons/variabile-si-constante",
              children: [
                {
                  id: "bazele-c-declararea-unei-variabile",
                  label: "Declararea unei variabile",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/variabile-si-constante#declararea-unei-variabile",
                },
                {
                  id: "bazele-c-initializarea-unei-variabile",
                  label: "Inițializarea unei variabile",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/variabile-si-constante#initializarea-unei-variabile",
                },
                {
                  id: "bazele-c-constante",
                  label: "Constante",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/variabile-si-constante#ce-este-o-constanta",
                },
              ],
            },

            {
              id: "bazele-c-tipuri-date",
              label: "Tipuri de date",
              href: "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date",
              children: [
                {
                  id: "bazele-c-tip-int",
                  label: "int",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date#int-numere-intregi",
                },
                {
                  id: "bazele-c-tip-long-long",
                  label: "long long",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date#long-long-numere-intregi-mai-mari",
                },
                {
                  id: "bazele-c-tip-float-double",
                  label: "float / double",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date#float-si-double-numere-reale",
                },
                {
                  id: "bazele-c-tip-char",
                  label: "char",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date#char-un-singur-caracter",
                },
                {
                  id: "bazele-c-tip-bool",
                  label: "bool",
                  href: "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date#bool-adevarat-sau-fals",
                },
              ],
            },
          ],
        },

        {
          id: "bazele-c-citire-afisare",
          label: "3. Citire și afișare",
          href: "/chapters/bazele-programarii-in-cpp/lessons/citire-si-afisare",
          children: [
            {
              id: "bazele-c-citire-afisare-cin",
              label: "cin >>",
              href: "/chapters/bazele-programarii-in-cpp/lessons/citire-si-afisare#citirea-datelor-cu-cin",
            },
            {
              id: "bazele-c-citire-afisare-cout",
              label: "cout <<",
              href: "/chapters/bazele-programarii-in-cpp/lessons/citire-si-afisare#afisarea-datelor-cu-cout",
            },
          ],
        },

        {
          id: "bazele-c-operatori-expresii",
          label: "4. Operatori",
          children: [
            {
              id: "bazele-c-operatori-aritmetici",
              label: "Operatori aritmetici",
              href: "/chapters/bazele-programarii-in-cpp/lessons/operatori-aritmetici",
            },
            {
              id: "bazele-c-operatori-relationali",
              label: "Operatori relaționali",
              href: "/chapters/bazele-programarii-in-cpp/lessons/operatori-relationali",
            },
            {
              id: "bazele-c-operatori-logici",
              label: "Operatori logici",
              href: "/chapters/bazele-programarii-in-cpp/lessons/operatori-logici",
            },
          ],
        },

        {
          id: "bazele-c-structura-alternativa-if",
          label: "5. Structura alternativă — if",
          href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-if",
          children: [
            {
              id: "bazele-c-if",
              label: "if",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-if#cum-functioneaza-if",
            },
            {
              id: "bazele-c-if-else",
              label: "if / else",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-if#if-else",
            },
            {
              id: "bazele-c-if-uri-imbricate",
              label: "if-uri imbricate",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-if#if-in-interiorul-altui-if",
            },
            {
              id: "bazele-c-conditii-compuse",
              label: "Condiții compuse",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-if#conditii-compuse",
            },
          ],
        },

        {
          id: "bazele-c-structuri-repetitive",
          label: "6. Structuri repetitive",
          children: [
            {
              id: "bazele-c-structuri-repetitive-for",
              label: "for",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-for",
            },
            {
              id: "bazele-c-structuri-repetitive-while",
              label: "while",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-while",
            },
            {
              id: "bazele-c-structuri-repetitive-do-while",
              label: "do...while",
              href: "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-do-while",
            },
          ],
        },
      ],
    },
  {
    "id": "algoritmi-elementari",
    "label": "Algoritmi elementari",
    "children": [
      {
        "id": "algoritmi-elementari-cifrele-unui-numar",
        "label": "Cifrele unui număr",
        "children": [
          {
            "id": "algoritmi-elementari-cifrele-unui-numar-parcurgerea-cifrelor",
            "label": "parcurgerea cifrelor"
          },
          {
            "id": "algoritmi-elementari-cifrele-unui-numar-suma-produs-numarare",
            "label": "sumă / produs / numărare"
          },
          {
            "id": "algoritmi-elementari-cifrele-unui-numar-construirea-unui-numar",
            "label": "construirea unui număr"
          }
        ]
      },
      {
        "id": "algoritmi-elementari-divizibilitate",
        "label": "Divizibilitate",
        "children": [
          {
            "id": "algoritmi-elementari-divizibilitate-divizori",
            "label": "divizori"
          },
          {
            "id": "algoritmi-elementari-divizibilitate-numar-prim",
            "label": "număr prim"
          },
          {
            "id": "algoritmi-elementari-divizibilitate-descompunere-in-factori-primi",
            "label": "descompunere în factori primi"
          },
          {
            "id": "algoritmi-elementari-divizibilitate-cmmdc",
            "label": "CMMDC"
          },
          {
            "id": "algoritmi-elementari-divizibilitate-algoritmul-lui-euclid",
            "label": "algoritmul lui Euclid"
          }
        ]
      },
      {
        "id": "algoritmi-elementari-sirul-fibonacci",
        "label": "Șirul Fibonacci"
      },
      {
        "id": "algoritmi-elementari-sume-cu-termen-general-dat",
        "label": "Sume cu termen general dat"
      },
      {
        "id": "algoritmi-elementari-minim-maxim",
        "label": "Minim / Maxim"
      },
      {
        "id": "algoritmi-elementari-sortari",
        "label": "Sortări",
        "children": [
          {
            "id": "algoritmi-elementari-sortari-bubble-sort",
            "label": "Bubble Sort"
          },
          {
            "id": "algoritmi-elementari-sortari-selection-sort",
            "label": "Selection Sort"
          },
          {
            "id": "algoritmi-elementari-sortari-insertion-sort",
            "label": "Insertion Sort"
          },
          {
            "id": "algoritmi-elementari-sortari-counting-sort",
            "label": "Counting Sort"
          }
        ]
      },
      {
        "id": "algoritmi-elementari-interclasare",
        "label": "Interclasare"
      },
      {
        "id": "algoritmi-elementari-cautare",
        "label": "Căutare",
        "children": [
          {
            "id": "algoritmi-elementari-cautare-secventiala",
            "label": "secvențială"
          },
          {
            "id": "algoritmi-elementari-cautare-binara",
            "label": "binară"
          }
        ]
      }
    ]
  },
  {
    "id": "vectori",
    "label": "Vectori",
    "children": [
      {
        "id": "vectori-notiuni-de-baza",
        "label": "1. Noțiuni de bază despre vectori",
        "href": "/chapters/vectori/lessons/notiuni-de-baza",
        "children": [
          {
            "id": "vectori-declarare",
            "label": "Declararea unui vector",
            "href": "/chapters/vectori/lessons/notiuni-de-baza#declararea-unui-vector"
          },
          {
            "id": "vectori-citire",
            "label": "Citirea unui vector",
            "href": "/chapters/vectori/lessons/notiuni-de-baza#citirea-unui-vector"
          },
          {
            "id": "vectori-afisare",
            "label": "Afișarea unui vector",
            "href": "/chapters/vectori/lessons/notiuni-de-baza#afisarea-unui-vector"
          },
          {
            "id": "vectori-accesarea-elementelor",
            "label": "Accesarea elementelor",
            "href": "/chapters/vectori/lessons/notiuni-de-baza#accesarea-elementelor"
          }
        ]
      },
      {
        "id": "vectori-parcurgere",
        "label": "2. Parcurgerea vectorilor",
        "href": "/chapters/vectori/lessons/parcurgerea-vectorilor",
        "children": [
          {
            "id": "vectori-parcurgere-completa",
            "label": "Parcurgerea completă",
            "href": "/chapters/vectori/lessons/parcurgerea-vectorilor#parcurgerea-completa"
          },
          {
            "id": "vectori-prelucrari-suma-produs",
            "label": "Suma / produsul elementelor",
            "children": [
              {
                "id": "vectori-suma",
                "label": "Suma elementelor",
                "href": "/chapters/vectori/lessons/parcurgerea-vectorilor#suma-elementelor"
              },
              {
                "id": "vectori-produs",
                "label": "Produsul elementelor",
                "href": "/chapters/vectori/lessons/parcurgerea-vectorilor#produsul-elementelor"
              }
            ]
          },
          {
            "id": "vectori-prelucrari-minim-maxim",
            "label": "Minim și maxim",
            "href": "/chapters/vectori/lessons/parcurgerea-vectorilor#minim-si-maxim"
          },
          {
            "id": "vectori-prelucrari-numarare",
            "label": "Numărarea elementelor",
            "href": "/chapters/vectori/lessons/parcurgerea-vectorilor#numararea-elementelor"
          },
          {
            "id": "vectori-parcurgere-cautare",
            "label": "Căutarea unui element",
            "href": "/chapters/vectori/lessons/parcurgerea-vectorilor#cautarea-unui-element"
          }
        ]
      },
      {
        "id": "vectori-modificarea-vectorului",
        "label": "3. Inserarea și ștergerea elementelor unui vector",
        "href": "/chapters/vectori/lessons/inserare-stergere",
        "children": [
          {
            "id": "vectori-modificarea-vectorului-inserare",
            "label": "Inserarea unui element",
            "href": "/chapters/vectori/lessons/inserare-stergere#inserarea-unui-element",
            "children": [
              {
                "id": "vectori-deplasarea-dreapta",
                "label": "Pasul 1 — deplasăm elementele la dreapta",
                "href": "/chapters/vectori/lessons/inserare-stergere#pasul-1-deplasam-elementele-la-dreapta"
              }
            ]
          },
          {
            "id": "vectori-modificarea-vectorului-stergere",
            "label": "Ștergerea unui element",
            "href": "/chapters/vectori/lessons/inserare-stergere#stergerea-unui-element",
            "children": [
              {
                "id": "vectori-deplasarea-stanga",
                "label": "Cum funcționează deplasarea la stânga?",
                "href": "/chapters/vectori/lessons/inserare-stergere#cum-functioneaza-deplasarea-la-stanga"
              }
            ]
          }
        ]
      },
      {
        "id": "vectori-sortare",
        "label": "4. Sortarea vectorilor",
        "href": "/chapters/vectori/lessons/sortarea-vectorilor",
        "children": [
          {
            "id": "vectori-bubble-sort",
            "label": "Bubble Sort",
            "href": "/chapters/vectori/lessons/sortarea-vectorilor#bubble-sort"
          },
          {
            "id": "vectori-selection-sort",
            "label": "Selection Sort",
            "href": "/chapters/vectori/lessons/sortarea-vectorilor#selection-sort"
          },
          {
            "id": "vectori-insertion-sort",
            "label": "Insertion Sort",
            "href": "/chapters/vectori/lessons/sortarea-vectorilor#insertion-sort"
          }
        ]
      },
      {
        "id": "vectori-cautare",
        "label": "5. Căutarea într-un vector",
        "href": "/chapters/vectori/lessons/cautare-element",
        "children": [
          {
            "id": "vectori-cautare-secventiala",
            "label": "Căutarea secvențială",
            "href": "/chapters/vectori/lessons/cautare-element#cautarea-secventiala"
          },
          {
            "id": "vectori-cautare-binara",
            "label": "Căutarea binară",
            "href": "/chapters/vectori/lessons/cautare-element#cautarea-binara",
            "children": [
              {
                "id": "vectori-cautare-vector-sortat",
                "label": "De ce vectorul trebuie să fie sortat?",
                "href": "/chapters/vectori/lessons/cautare-element#de-ce-vectorul-trebuie-sa-fie-sortat"
              }
            ]
          }
        ]
      },
      {
        "id": "vectori-vector-de-frecventa",
        "label": "6. Vector de frecvență",
        "href": "/chapters/vectori/lessons/vector-frecventa",
        "children": [
          {
            "id": "vectori-frecventa-construire",
            "label": "Construirea vectorului de frecvență",
            "href": "/chapters/vectori/lessons/vector-frecventa#construirea-vectorului-de-frecventa"
          },
          {
            "id": "vectori-frecventa-aparitii",
            "label": "Numărul de apariții al unei valori",
            "href": "/chapters/vectori/lessons/vector-frecventa#numarul-de-aparitii-al-unei-valori"
          },
          {
            "id": "vectori-frecventa-parcurgere",
            "label": "Parcurgerea vectorului de frecvență",
            "href": "/chapters/vectori/lessons/vector-frecventa#parcurgerea-vectorului-de-frecventa"
          }
        ]
      },
      {
        "id": "vectori-secvente",
        "label": "7. Secvențe în vector",
        "href": "/chapters/vectori/lessons/secvente-vector",
        "children": [
          {
            "id": "vectori-secvente-egale",
            "label": "Secvență de elemente egale",
            "href": "/chapters/vectori/lessons/secvente-vector#secventa-de-elemente-egale"
          },
          {
            "id": "vectori-secvente-crescatoare",
            "label": "Secvență crescătoare",
            "href": "/chapters/vectori/lessons/secvente-vector#secventa-crescatoare"
          },
          {
            "id": "vectori-secvente-descrescatoare",
            "label": "Secvență descrescătoare",
            "href": "/chapters/vectori/lessons/secvente-vector#secventa-descrescatoare"
          },
          {
            "id": "vectori-secvente-lungime",
            "label": "Cea mai lungă secvență",
            "href": "/chapters/vectori/lessons/secvente-vector#cea-mai-lunga-secventa"
          }
        ]
      },
      {
        "id": "vectori-interclasare",
        "label": "8. Interclasarea a doi vectori sortați",
        "href": "/chapters/vectori/lessons/interclasare",
        "children": [
          {
            "id": "vectori-interclasare-vectori-sortati",
            "label": "De ce trebuie să fie vectorii sortați?",
            "href": "/chapters/vectori/lessons/interclasare#de-ce-trebuie-sa-fie-vectorii-sortati"
          },
          {
            "id": "vectori-interclasare-comparare",
            "label": "Compararea elementelor",
            "href": "/chapters/vectori/lessons/interclasare#construirea-vectorului-rezultat"
          },
          {
            "id": "vectori-interclasare-rezultat",
            "label": "Construirea vectorului rezultat",
            "href": "/chapters/vectori/lessons/interclasare#construirea-vectorului-rezultat"
          }
        ]
      }
    ]
  },
  {
    "id": "matrici",
    "label": "Matrici",
    "children": [
      {
        "id": "matrici-declarare",
        "label": "Declarare"
      },
      {
        "id": "matrici-citire-afisare",
        "label": "Citire / afișare"
      },
      {
        "id": "matrici-parcurgere",
        "label": "Parcurgere"
      },
      {
        "id": "matrici-linii",
        "label": "Linii",
        "children": [
          {
            "id": "matrici-linii-prelucrari-pe-linii",
            "label": "prelucrări pe linii"
          }
        ]
      },
      {
        "id": "matrici-coloane",
        "label": "Coloane",
        "children": [
          {
            "id": "matrici-coloane-prelucrari-pe-coloane",
            "label": "prelucrări pe coloane"
          }
        ]
      },
      {
        "id": "matrici-matrice-patratica",
        "label": "Matrice pătratică",
        "children": [
          {
            "id": "matrici-matrice-patratica-diagonala-principala",
            "label": "diagonala principală"
          },
          {
            "id": "matrici-matrice-patratica-diagonala-secundara",
            "label": "diagonala secundară"
          },
          {
            "id": "matrici-matrice-patratica-zonele-determinate-de-diagonale",
            "label": "zonele determinate de diagonale"
          }
        ]
      },
      {
        "id": "matrici-vecini-elemente-adiacente",
        "label": "Vecini / elemente adiacente"
      }
    ]
  },
  {
    "id": "subprograme",
    "label": "Subprograme",
    "children": [
      {
        "id": "subprograme-functii",
        "label": "Funcții",
        "children": [
          {
            "id": "subprograme-functii-declarare",
            "label": "declarare"
          },
          {
            "id": "subprograme-functii-definire",
            "label": "definire"
          },
          {
            "id": "subprograme-functii-apel",
            "label": "apel"
          },
          {
            "id": "subprograme-functii-return",
            "label": "return"
          }
        ]
      },
      {
        "id": "subprograme-parametri",
        "label": "Parametri",
        "children": [
          {
            "id": "subprograme-parametri-formali",
            "label": "formali"
          },
          {
            "id": "subprograme-parametri-efectivi",
            "label": "efectivi"
          }
        ]
      },
      {
        "id": "subprograme-transmiterea-parametrilor",
        "label": "Transmiterea parametrilor",
        "children": [
          {
            "id": "subprograme-transmiterea-parametrilor-prin-valoare",
            "label": "prin valoare"
          },
          {
            "id": "subprograme-transmiterea-parametrilor-prin-referinta",
            "label": "prin referință"
          }
        ]
      },
      {
        "id": "subprograme-variabile",
        "label": "Variabile",
        "children": [
          {
            "id": "subprograme-variabile-locale",
            "label": "locale"
          },
          {
            "id": "subprograme-variabile-globale",
            "label": "globale"
          }
        ]
      },
      {
        "id": "subprograme-vizibilitatea-variabilelor",
        "label": "Vizibilitatea variabilelor"
      }
    ]
  },
  {
    "id": "siruri-de-caractere",
    "label": "Șiruri de caractere",
    "children": [
      {
        "id": "siruri-de-caractere-declarare",
        "label": "Declarare"
      },
      {
        "id": "siruri-de-caractere-citire",
        "label": "Citire",
        "children": [
          {
            "id": "siruri-de-caractere-citire-cin",
            "label": "cin"
          },
          {
            "id": "siruri-de-caractere-citire-cin-getline",
            "label": "cin.getline()"
          }
        ]
      },
      {
        "id": "siruri-de-caractere-parcurgere-caracter-cu-caracter",
        "label": "Parcurgere caracter cu caracter"
      },
      {
        "id": "siruri-de-caractere-tipuri-de-caractere",
        "label": "Tipuri de caractere",
        "children": [
          {
            "id": "siruri-de-caractere-tipuri-de-caractere-litere",
            "label": "litere"
          },
          {
            "id": "siruri-de-caractere-tipuri-de-caractere-cifre",
            "label": "cifre"
          },
          {
            "id": "siruri-de-caractere-tipuri-de-caractere-spatii",
            "label": "spații"
          },
          {
            "id": "siruri-de-caractere-tipuri-de-caractere-vocale-etc",
            "label": "vocale etc."
          }
        ]
      },
      {
        "id": "siruri-de-caractere-functii-uzuale",
        "label": "Funcții uzuale",
        "children": [
          {
            "id": "siruri-de-caractere-functii-uzuale-strlen",
            "label": "strlen"
          },
          {
            "id": "siruri-de-caractere-functii-uzuale-strcpy",
            "label": "strcpy"
          },
          {
            "id": "siruri-de-caractere-functii-uzuale-strcat",
            "label": "strcat"
          },
          {
            "id": "siruri-de-caractere-functii-uzuale-strcmp",
            "label": "strcmp"
          }
        ]
      },
      {
        "id": "siruri-de-caractere-prelucrari",
        "label": "Prelucrări",
        "children": [
          {
            "id": "siruri-de-caractere-prelucrari-numarare",
            "label": "numărare"
          },
          {
            "id": "siruri-de-caractere-prelucrari-modificare",
            "label": "modificare"
          },
          {
            "id": "siruri-de-caractere-prelucrari-eliminare",
            "label": "eliminare"
          },
          {
            "id": "siruri-de-caractere-prelucrari-cuvinte",
            "label": "cuvinte"
          }
        ]
      }
    ]
  },
  {
    "id": "structuri-struct",
    "label": "Structuri (struct)",
    "children": [
      {
        "id": "structuri-struct-notiuni-de-baza",
        "label": "1. Noțiuni de bază despre structuri (struct)",
        "href": "/chapters/structuri-de-date-struct/lessons/notiuni-de-baza-struct",
        "children": [
          {
            "id": "structuri-struct-definirea-structurii",
            "label": "Declararea unei structuri",
            "href": "/chapters/structuri-de-date-struct/lessons/notiuni-de-baza-struct#declararea-unei-structuri"
          },
          {
            "id": "structuri-struct-campuri",
            "label": "Câmpurile structurii",
            "href": "/chapters/structuri-de-date-struct/lessons/notiuni-de-baza-struct#declararea-unei-structuri"
          },
          {
            "id": "structuri-struct-declararea-variabilelor",
            "label": "Variabile de tip structură",
            "href": "/chapters/structuri-de-date-struct/lessons/notiuni-de-baza-struct#variabile-de-tip-structura"
          }
        ]
      },
      {
        "id": "structuri-struct-accesarea-campurilor",
        "label": "2. Accesarea și modificarea câmpurilor",
        "href": "/chapters/structuri-de-date-struct/lessons/campuri",
        "children": [
          {
            "id": "structuri-struct-operator-punct",
            "label": "Operatorul .",
            "href": "/chapters/structuri-de-date-struct/lessons/campuri#operatorul"
          },
          {
            "id": "structuri-struct-citire-afisare",
            "label": "Citirea / afișarea câmpurilor",
            "children": [
              {
                "id": "structuri-struct-citire",
                "label": "Citirea câmpurilor",
                "href": "/chapters/structuri-de-date-struct/lessons/campuri#citirea-campurilor"
              },
              {
                "id": "structuri-struct-afisare",
                "label": "Afișarea câmpurilor",
                "href": "/chapters/structuri-de-date-struct/lessons/campuri#afisarea-campurilor"
              }
            ]
          },
          {
            "id": "structuri-struct-prelucrarea-campurilor",
            "label": "Modificarea valorilor",
            "href": "/chapters/structuri-de-date-struct/lessons/campuri#modificarea-valorilor"
          }
        ]
      },
      {
        "id": "structuri-struct-vector-de-structuri",
        "label": "3. Vectori de structuri",
        "href": "/chapters/structuri-de-date-struct/lessons/vectori-de-structuri",
        "children": [
          {
            "id": "structuri-struct-vector-declarare",
            "label": "Declararea unui vector de structuri",
            "href": "/chapters/structuri-de-date-struct/lessons/vectori-de-structuri#declararea-unui-vector-de-structuri"
          },
          {
            "id": "structuri-struct-vector-accesare",
            "label": "Accesarea câmpurilor",
            "href": "/chapters/structuri-de-date-struct/lessons/vectori-de-structuri#accesarea-campurilor"
          },
          {
            "id": "structuri-struct-vector-parcurgere",
            "label": "Prelucrarea vectorului",
            "href": "/chapters/structuri-de-date-struct/lessons/vectori-de-structuri#prelucrarea-vectorului"
          }
        ]
      }
    ]
  },
  {
    "id": "recursivitate",
    "label": "Recursivitate",
    "children": [
      {
        "id": "recursivitate-principiul-recursivitatii",
        "label": "Principiul recursivității"
      },
      {
        "id": "recursivitate-caz-de-baza",
        "label": "Caz de bază"
      },
      {
        "id": "recursivitate-apel-recursiv",
        "label": "Apel recursiv"
      },
      {
        "id": "recursivitate-urmarirea-apelurilor",
        "label": "Urmărirea apelurilor"
      },
      {
        "id": "recursivitate-functii-recursive",
        "label": "Funcții recursive"
      },
      {
        "id": "recursivitate-proceduri-recursive",
        "label": "Proceduri recursive"
      }
    ]
  },
  {
    "id": "backtracking",
    "label": "Backtracking",
    "children": [
      {
        "id": "backtracking-principiul-metodei",
        "label": "Principiul metodei",
        "children": [
          {
            "id": "backtracking-principiul-metodei-construirea-solutiei-pas-cu-pas",
            "label": "construirea soluției pas cu pas"
          },
          {
            "id": "backtracking-principiul-metodei-verificarea-conditiilor",
            "label": "verificarea condițiilor"
          },
          {
            "id": "backtracking-principiul-metodei-revenirea",
            "label": "revenirea"
          }
        ]
      },
      {
        "id": "backtracking-generari",
        "label": "Generări",
        "children": [
          {
            "id": "backtracking-generari-permutari",
            "label": "permutări"
          },
          {
            "id": "backtracking-generari-aranjamente",
            "label": "aranjamente"
          },
          {
            "id": "backtracking-generari-combinari",
            "label": "combinări"
          },
          {
            "id": "backtracking-generari-submultimi",
            "label": "submulțimi"
          },
          {
            "id": "backtracking-generari-produs-cartezian",
            "label": "produs cartezian"
          }
        ]
      },
      {
        "id": "backtracking-conditii",
        "label": "Condiții",
        "children": [
          {
            "id": "backtracking-conditii-candidat-valid",
            "label": "candidat valid"
          },
          {
            "id": "backtracking-conditii-solutie-finala",
            "label": "soluție finală"
          }
        ]
      },
      {
        "id": "backtracking-ordinea-generarii-solutiilor",
        "label": "Ordinea generării soluțiilor"
      }
    ]
  },
  {
    "id": "grafuri",
    "label": "Grafuri",
    "children": [
      {
        "id": "grafuri-graf-neorientat",
        "label": "Graf neorientat",
        "children": [
          {
            "id": "grafuri-graf-neorientat-nod-muchie",
            "label": "nod / muchie"
          },
          {
            "id": "grafuri-graf-neorientat-adiacenta-incidenta",
            "label": "adiacență / incidență"
          },
          {
            "id": "grafuri-graf-neorientat-grad",
            "label": "grad"
          },
          {
            "id": "grafuri-graf-neorientat-lant",
            "label": "lanț"
          },
          {
            "id": "grafuri-graf-neorientat-ciclu",
            "label": "ciclu"
          },
          {
            "id": "grafuri-graf-neorientat-subgraf",
            "label": "subgraf"
          },
          {
            "id": "grafuri-graf-neorientat-graf-partial",
            "label": "graf parțial"
          }
        ]
      },
      {
        "id": "grafuri-proprietati",
        "label": "Proprietăți",
        "children": [
          {
            "id": "grafuri-proprietati-graf-conex",
            "label": "graf conex"
          },
          {
            "id": "grafuri-proprietati-componente-conexe",
            "label": "componente conexe"
          },
          {
            "id": "grafuri-proprietati-graf-complet",
            "label": "graf complet"
          },
          {
            "id": "grafuri-proprietati-graf-eulerian",
            "label": "graf eulerian"
          },
          {
            "id": "grafuri-proprietati-graf-hamiltonian",
            "label": "graf hamiltonian"
          }
        ]
      },
      {
        "id": "grafuri-graf-orientat",
        "label": "Graf orientat",
        "children": [
          {
            "id": "grafuri-graf-orientat-arc",
            "label": "arc"
          },
          {
            "id": "grafuri-graf-orientat-grad-intern-extern",
            "label": "grad intern / extern"
          },
          {
            "id": "grafuri-graf-orientat-drum",
            "label": "drum"
          },
          {
            "id": "grafuri-graf-orientat-circuit",
            "label": "circuit"
          },
          {
            "id": "grafuri-graf-orientat-subgraf-graf-partial",
            "label": "subgraf / graf parțial"
          },
          {
            "id": "grafuri-graf-orientat-tare-conexitate",
            "label": "tare conexitate"
          }
        ]
      },
      {
        "id": "grafuri-reprezentare",
        "label": "Reprezentare",
        "children": [
          {
            "id": "grafuri-reprezentare-matrice-de-adiacenta",
            "label": "matrice de adiacență"
          },
          {
            "id": "grafuri-reprezentare-liste-de-adiacenta",
            "label": "liste de adiacență"
          }
        ]
      }
    ]
  },
  {
    "id": "arbori",
    "label": "Arbori",
    "children": [
      {
        "id": "arbori-notiuni-de-baza",
        "label": "Noțiuni de bază",
        "children": [
          {
            "id": "arbori-notiuni-de-baza-nod",
            "label": "nod"
          },
          {
            "id": "arbori-notiuni-de-baza-muchie",
            "label": "muchie"
          },
          {
            "id": "arbori-notiuni-de-baza-radacina",
            "label": "rădăcină"
          }
        ]
      },
      {
        "id": "arbori-relatii",
        "label": "Relații",
        "children": [
          {
            "id": "arbori-relatii-parinte",
            "label": "părinte"
          },
          {
            "id": "arbori-relatii-fiu",
            "label": "fiu"
          },
          {
            "id": "arbori-relatii-ascendent",
            "label": "ascendent"
          },
          {
            "id": "arbori-relatii-descendent",
            "label": "descendent"
          },
          {
            "id": "arbori-relatii-frati",
            "label": "frați"
          }
        ]
      },
      {
        "id": "arbori-noduri",
        "label": "Noduri",
        "children": [
          {
            "id": "arbori-noduri-nod-terminal",
            "label": "nod terminal"
          },
          {
            "id": "arbori-noduri-frunza",
            "label": "frunză"
          }
        ]
      },
      {
        "id": "arbori-reprezentare",
        "label": "Reprezentare",
        "children": [
          {
            "id": "arbori-reprezentare-vector-de-tati",
            "label": "vector de tați"
          },
          {
            "id": "arbori-reprezentare-matrice-de-adiacenta",
            "label": "matrice de adiacență"
          },
          {
            "id": "arbori-reprezentare-liste-de-descendenti",
            "label": "liste de descendenți"
          }
        ]
      }
    ]
  },
  {
    "id": "fisiere-text",
    "label": "Fișiere text",
    "children": [
      {
        "id": "fisiere-text-deschiderea-fisierului",
        "label": "Deschiderea fișierului",
        "children": [
          {
            "id": "fisiere-text-deschiderea-fisierului-ifstream",
            "label": "ifstream"
          },
          {
            "id": "fisiere-text-deschiderea-fisierului-ofstream",
            "label": "ofstream"
          }
        ]
      },
      {
        "id": "fisiere-text-citire",
        "label": "Citire",
        "children": [
          {
            "id": "fisiere-text-citire-fin",
            "label": "fin >>"
          }
        ]
      },
      {
        "id": "fisiere-text-scriere",
        "label": "Scriere",
        "children": [
          {
            "id": "fisiere-text-scriere-fout",
            "label": "fout <<"
          }
        ]
      },
      {
        "id": "fisiere-text-parcurgerea-datelor",
        "label": "Parcurgerea datelor"
      },
      {
        "id": "fisiere-text-prelucrare-fara-memorare",
        "label": "Prelucrare fără memorare"
      }
    ]
  },
  {
    "id": "algoritmi-eficienti-siii-3",
    "label": "Algoritmi eficienți — SIII.3",
    "children": [
      {
        "id": "algoritmi-eficienti-siii-3-complexitate",
        "label": "Complexitate",
        "children": [
          {
            "id": "algoritmi-eficienti-siii-3-complexitate-timp",
            "label": "timp"
          },
          {
            "id": "algoritmi-eficienti-siii-3-complexitate-memorie",
            "label": "memorie"
          }
        ]
      },
      {
        "id": "algoritmi-eficienti-siii-3-parcurgere-unica-o-n",
        "label": "Parcurgere unică → O(n)"
      },
      {
        "id": "algoritmi-eficienti-siii-3-prelucrare-fara-memorare",
        "label": "Prelucrare fără memorare",
        "children": [
          {
            "id": "algoritmi-eficienti-siii-3-prelucrare-fara-memorare-direct-din-fisier",
            "label": "direct din fișier"
          }
        ]
      },
      {
        "id": "algoritmi-eficienti-siii-3-vector-de-frecventa",
        "label": "Vector de frecvență"
      },
      {
        "id": "algoritmi-eficienti-siii-3-numarare-aparitii",
        "label": "Numărare / apariții"
      },
      {
        "id": "algoritmi-eficienti-siii-3-minime-maxime",
        "label": "Minime / maxime"
      },
      {
        "id": "algoritmi-eficienti-siii-3-secvente",
        "label": "Secvențe",
        "children": [
          {
            "id": "algoritmi-eficienti-siii-3-secvente-lungime",
            "label": "lungime"
          },
          {
            "id": "algoritmi-eficienti-siii-3-secvente-suma",
            "label": "sumă"
          },
          {
            "id": "algoritmi-eficienti-siii-3-secvente-proprietati",
            "label": "proprietăți"
          }
        ]
      },
      {
        "id": "algoritmi-eficienti-siii-3-sortare-parcurgere",
        "label": "Sortare + parcurgere"
      },
      {
        "id": "algoritmi-eficienti-siii-3-interclasare",
        "label": "Interclasare"
      },
      {
        "id": "algoritmi-eficienti-siii-3-cautare-binara",
        "label": "Căutare binară"
      },
      {
        "id": "algoritmi-eficienti-siii-3-tehnici-matematice",
        "label": "Tehnici matematice",
        "children": [
          {
            "id": "algoritmi-eficienti-siii-3-tehnici-matematice-divizibilitate",
            "label": "divizibilitate"
          },
          {
            "id": "algoritmi-eficienti-siii-3-tehnici-matematice-cifre",
            "label": "cifre"
          },
          {
            "id": "algoritmi-eficienti-siii-3-tehnici-matematice-proprietati-ale-numerelor",
            "label": "proprietăți ale numerelor"
          }
        ]
      }
    ]
  }
];
