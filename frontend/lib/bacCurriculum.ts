// IDs are stable navigation anchors. Add href when a destination is available.
export type CurriculumNode = {
  id: string;
  label: string;
  href?: string;
  children?: CurriculumNode[];
};

export const bacCurriculum: CurriculumNode[] = [
  {
    "id": "bazele-c",
    "label": "Bazele C++",
    "children": [
      {
        "id": "bazele-c-structura-programului",
        "label": "Structura programului",
        "href": "/chapters/bazele-programarii-in-cpp/lessons/structura-unui-program-cpp",
        "children": [
          {
            "id": "bazele-c-structura-programului-include-iostream",
            "label": "#include <iostream>"
          },
          {
            "id": "bazele-c-structura-programului-using-namespace-std",
            "label": "using namespace std"
          },
          {
            "id": "bazele-c-structura-programului-main",
            "label": "main()"
          }
        ]
      },
      {
        "id": "bazele-c-date",
        "label": "Date",
        "children": [
          {
            "id": "bazele-c-date-variabile-si-constante",
            "label": "variabile și constante",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/variabile-si-constante"
          },
          {
            "id": "bazele-c-date-tipuri-de-date",
            "label": "tipuri de date",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/tipuri-de-date"
          }
        ]
      },
      {
        "id": "bazele-c-citire-afisare",
        "label": "Citire / afișare",
        "href": "/chapters/bazele-programarii-in-cpp/lessons/citire-si-afisare",
        "children": [
          {
            "id": "bazele-c-citire-afisare-cin",
            "label": "cin"
          },
          {
            "id": "bazele-c-citire-afisare-cout",
            "label": "cout"
          }
        ]
      },
      {
        "id": "bazele-c-operatori",
        "label": "Operatori",
        "children": [
          {
            "id": "bazele-c-operatori-aritmetici",
            "label": "aritmetici: + - * / %",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/operatori-aritmetici"
          },
          {
            "id": "bazele-c-operatori-relationali",
            "label": "relaționali: < > <= >= == !=",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/operatori-relationali"
          },
          {
            "id": "bazele-c-operatori-logici",
            "label": "logici: && || !",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/operatori-logici"
          }
        ]
      },
      {
        "id": "bazele-c-expresii-si-atribuiri",
        "label": "Expresii și atribuiri"
      },
      {
        "id": "bazele-c-structuri-de-control",
        "label": "Structuri de control",
        "children": [
          {
            "id": "bazele-c-structuri-de-control-if-else",
            "label": "if / else"
          },
          {
            "id": "bazele-c-structuri-de-control-for",
            "label": "for",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-for"
          },
          {
            "id": "bazele-c-structuri-de-control-while",
            "label": "while",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-while"
          },
          {
            "id": "bazele-c-structuri-de-control-do-while",
            "label": "do while",
            "href": "/chapters/bazele-programarii-in-cpp/lessons/instructiunea-do-while"
          }
        ]
      }
    ]
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
        "id": "vectori-declarare",
        "label": "Declarare"
      },
      {
        "id": "vectori-citire-afisare",
        "label": "Citire / afișare"
      },
      {
        "id": "vectori-parcurgere",
        "label": "Parcurgere"
      },
      {
        "id": "vectori-prelucrari",
        "label": "Prelucrări",
        "children": [
          {
            "id": "vectori-prelucrari-suma-produs",
            "label": "sumă / produs"
          },
          {
            "id": "vectori-prelucrari-numarare",
            "label": "numărare"
          },
          {
            "id": "vectori-prelucrari-minim-maxim",
            "label": "minim / maxim"
          },
          {
            "id": "vectori-prelucrari-verificarea-unei-proprietati",
            "label": "verificarea unei proprietăți"
          }
        ]
      },
      {
        "id": "vectori-modificarea-vectorului",
        "label": "Modificarea vectorului",
        "children": [
          {
            "id": "vectori-modificarea-vectorului-inserare",
            "label": "inserare"
          },
          {
            "id": "vectori-modificarea-vectorului-stergere",
            "label": "ștergere"
          }
        ]
      },
      {
        "id": "vectori-sortare",
        "label": "Sortare"
      },
      {
        "id": "vectori-cautare",
        "label": "Căutare",
        "children": [
          {
            "id": "vectori-cautare-secventiala",
            "label": "secvențială"
          },
          {
            "id": "vectori-cautare-binara",
            "label": "binară"
          }
        ]
      },
      {
        "id": "vectori-vector-de-frecventa",
        "label": "Vector de frecvență"
      },
      {
        "id": "vectori-interclasare",
        "label": "Interclasare"
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
        "id": "structuri-struct-definirea-structurii",
        "label": "Definirea structurii"
      },
      {
        "id": "structuri-struct-declararea-variabilelor",
        "label": "Declararea variabilelor"
      },
      {
        "id": "structuri-struct-accesarea-campurilor",
        "label": "Accesarea câmpurilor"
      },
      {
        "id": "structuri-struct-citire-afisare",
        "label": "Citire / afișare"
      },
      {
        "id": "structuri-struct-vector-de-structuri",
        "label": "Vector de structuri"
      },
      {
        "id": "structuri-struct-prelucrarea-campurilor",
        "label": "Prelucrarea câmpurilor"
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
