FROM python:3.9-slim

WORKDIR /code

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]