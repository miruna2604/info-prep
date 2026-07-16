# instalez python
FROM python:3.11-slim

WORKDIR /code


# copiez fisierele proiectului
COPY requirements.txt /code/requirements.txt


# instalez dependentele
RUN pip install --no-cache-dir -r /code/requirements.txt

COPY . .

# pornesc serverul
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]