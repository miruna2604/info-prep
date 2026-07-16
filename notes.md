## Nivelul 1 - Arhitectura generala
                       ┌─────────────────────────────┐
                       │        Frontend (React)     │
                       │  Utilizator apasă "Run"     │
                       └──────────────┬──────────────┘
                                      │
                           HTTP POST /submission
                                      │
                                      ▼
                 ┌─────────────────────────────────────┐
                 │         FastAPI Application         │
                 └─────────────────────────────────────┘
                                      │
                                      ▼
                                app/main.py
                       (creează aplicația FastAPI)
                                      │
                                      ▼
                        app.include_router(router)
                                      │
                                      ▼
                      app/routers/submissions.py
                 (primește request-ul și îl validează)
                                      │
                                      ▼
                        execute_submission(submission)
                                      │
                                      ▼
                      app/services/judge0_service.py
               (transformă request-ul și vorbește cu Judge0)
                                      │
                                      ▼
                          HTTP POST către Judge0
                                      │
                                      ▼
                    http://localhost:2358/submissions
                                      │
                                      ▼
                        Judge0 Server Container
                                      │
                                      ▼
                   pune submission-ul în Redis Queue
                                      │
                                      ▼
                        Redis (coada de execuție)
                                      │
                                      ▼
                            Judge0 Worker Container
                            (ia primul job din coadă)
                                      │
                                      ▼
                             isolate (sandbox Linux)
                                      │
                                      ▼
                             GCC compilează C++
                                      │
                                      ▼
                             Execută programul
                                      │
                                      ▼
                         stdout / stderr / status
                                      │
                                      ▼
                                 Judge0 Server
                                      │
                                      ▼
                                  Response JSON
                                      │
                                      ▼
                             judge0_service.py
                                      │
                                      ▼
                          Router (FastAPI endpoint)
                                      │
                                      ▼
                                 HTTP Response
                                      │
                                      ▼
                                   Frontend

## Nivelul 2 - Ce exista in Docker
```text
          Docker Network

         developer-api-1
               │
               │
               ▼
      developer-server-1
               │
        ┌──────┴──────┐
        ▼             ▼
developer-redis-1   developer-db-1
        │
        ▼
developer-worker-1
```

## Judge0 Server
Responsabil de comunicarea cu aplicația backend.

**Rol:**
- Primește request-urile HTTP de la FastAPI.
- Validează și procesează cererea.
- Creează o nouă submission.
- O introduce în coada Redis.
- Primește rezultatul execuției de la Worker.
- Returnează răspunsul către aplicația backend.

> **Important:** Judge0 Server **nu execută codul**. Rolul său este doar de coordonare.

---

## Redis
Reprezintă **coada de execuție (queue)**.

**Rol:**
- Stochează submission-urile în ordinea în care sunt primite.
- Asigură procesarea lor pe rând.
- Face legătura dintre Judge0 Server și Worker.

Exemplu:

```text
┌──────────────┐
│ Submission 1 │
├──────────────┤
│ Submission 2 │
├──────────────┤
│ Submission 3 │
├──────────────┤
│ Submission 4 │
└──────────────┘
```

Worker-ul va prelua întotdeauna primul element din coadă.

---

## Judge0 Worker
Responsabil de executarea efectivă a codului.

**Rol:**
- Preia primul job din Redis.
- Compilează codul (dacă este necesar).
- Rulează programul într-un sandbox (`isolate`).
- Colectează rezultatul execuției (`stdout`, `stderr`, status).
- Trimite rezultatul înapoi către Judge0 Server.

---

## PostgreSQL
Reprezintă baza de date utilizată de Judge0.

**Rol:**
- Stochează informațiile despre fiecare submission.
- Păstrează statusul execuției.
- Salvează rezultatul compilării și execuției.
- Asociază fiecărei submission un token unic.
- Permite regăsirea ulterioară a rezultatelor.
 
## Nivelul 3 - Aplicatie
```text
app/
│
├── main.py
│   │
│   ├── creează aplicația FastAPI
│   └── include_router(router)
│
├── routers/
│   │
│   └── submissions.py
│       ├── primește request-ul HTTP
│       ├── validează datele
│       └── apelează execute_submission()
│
├── services/
│   │
│   └── judge0_service.py
│       ├── construiește payload-ul Judge0
│       ├── trimite request-ul HTTP
│       └── primește răspunsul
│
├── models/
│   │
│   └── submissions.py
│       ├── SubmissionRequest
│       └── contractul API
│
└── requirements.txt
```

## Nivelul 4 - Fluxul unei cereri
```text
Utilizator

↓

apasă Run

↓

Frontend

↓

POST /submission

↓

FastAPI Router

↓

Pydantic validează JSON-ul

↓

SubmissionRequest

↓

Judge0 Service

↓

Construiește payload

↓

httpx.post()

↓

Judge0 Server

↓

Redis

↓

Worker

↓

isolate

↓

GCC compilează

↓

Programul rulează

↓

stdout

↓

Judge0 Server

↓

JSON Response

↓

FastAPI

↓

Frontend
```

## Nivelul 5 - Cum arata request-ul
# Fluxul datelor dintre aplicație și Judge0

## 1. Aplicația ta

Trimite către backend un obiect JSON care conține codul sursă și datele de intrare.

```json
{
    "source_code": "...",
    "stdin": "..."
}
```

↓

## 2. Service (`judge0_service.py`)

Primește request-ul și îl transformă în formatul cerut de API-ul Judge0.

↓

## 3. Request trimis către Judge0

```json
{
    "language_id": 105,
    "source_code": "...",
    "stdin": "..."
}
```

↓

## 4. Judge0

- Compilează codul (dacă limbajul necesită compilare).
- Execută programul într-un sandbox (`isolate`).
- Colectează rezultatul execuției.

↓

## 5. Response primit de la Judge0

```json
{
    "stdout": "...",
    "stderr": null,
    "status": {
        "id": 3,
        "description": "Accepted"
    }
}
```

↓

## 6. Frontend

Primește răspunsul și afișează utilizatorului:
- ieșirea programului (`stdout`);
- eventualele erori (`stderr`);
- statusul execuției.


```text
                 ┌────────────────────────┐
                 │      Frontend          │
                 └──────────┬─────────────┘
                            │
                            ▼
                 ┌────────────────────────┐
                 │        Router          │
                 │   (primește request)   │
                 └──────────┬─────────────┘
                            │
                            ▼
                 ┌────────────────────────┐
                 │        Service         │
                 │ (vorbește cu Judge0)   │
                 └──────────┬─────────────┘
                            │
                     HTTP Request
                            │
                            ▼
                 ┌────────────────────────┐
                 │        Judge0          │
                 └──────────┬─────────────┘
                            │
                  Redis → Worker → isolate
                            │
                            ▼
                 ┌────────────────────────┐
                 │       Response         │
                 └──────────┬─────────────┘
                            │
                            ▼
                 ┌────────────────────────┐
                 │       Frontend         │
                 └────────────────────────┘
```


# Encode - Decode
```text
                 C++ Source
                      │
                      ▼
                 Judge0 Worker
                      │
                      ▼
              g++ Compiler
                      │
                      ▼
             Raw Compiler Bytes
                      │
                      │
        sunt UTF-8?
          │               │
          │DA             │NU
          ▼               ▼
     JSON direct     Base64 Encode
          │               │
          └──────┬────────┘
                 ▼
            HTTP Response
                 │
                 ▼
             FastAPI API
                 │
                 ▼
         Base64 Decode (dacă este cazul)
                 │
                 ▼
          UTF-8 Decode
                 │
                 ▼
      String Python (str)
                 │
                 ▼
          JSON către Frontend
                 │
                 ▼
             Utilizator
```