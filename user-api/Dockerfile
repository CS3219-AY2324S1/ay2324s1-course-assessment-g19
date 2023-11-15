FROM python:3.9-slim

RUN apt-get update && apt-get install -y libpq-dev && apt-get clean

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY requirements.txt requirements
COPY . .

ENV PYTHONPATH /usr/src/app/user-api:$PYTHONPATH

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

EXPOSE 5050

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5050", "--reload"]

