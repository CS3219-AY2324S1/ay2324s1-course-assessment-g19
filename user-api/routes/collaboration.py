from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pika
import time

router = APIRouter()

connection_params = pika.ConnectionParameters(
    host='gareth-rabbit',            # RabbitMQ server hostname or IP address
    port=5672,                   # RabbitMQ server port (default is 5672)
    virtual_host='/',            # Virtual host (default is '/')
    credentials=pika.PlainCredentials('guest', 'guest'),  # RabbitMQ username and password
    connection_attempts=3,        # Number of connection attempts
    retry_delay=5,               # Delay between connection retries (in seconds)
    heartbeat=600,
)

connection = pika.BlockingConnection(connection_params)
read_channel = connection.channel()
write_channel = connection.channel()
wait_channel = connection.channel()


class CollaborationMessage(BaseModel):
    user: str
    message: str
    difficulty: str
    language: str


class ConnectionMessage(BaseModel):
    partner: str
    user: str


@router.post("/join-queue")
async def send_message(request_data: CollaborationMessage):

    queue_name = f"{request_data.language}-{request_data.difficulty}"
    write_channel.queue_declare(queue=queue_name)
    message = request_data.model_dump_json()
    # Publish a message to RabbitMQ
    write_channel.basic_publish(exchange='', routing_key=queue_name, body=message)
    return {"message": request_data.user}


@router.get("/check-queue/{queue_name}")
async def receive_message(queue_name: str):

    read_channel.queue_declare(queue=queue_name)

    method_frame, header_frame, body = read_channel.basic_get(queue=queue_name, auto_ack=True)

    if method_frame:
        message = CollaborationMessage.model_validate_json(body.decode("utf-8"))
        return {"message": message}
    else:
        return {"message": "empty"}


@router.post("/notify-partner")
async def send_notification(request_data: ConnectionMessage):

    queue_name = f"{request_data.partner}"
    write_channel.queue_declare(queue=queue_name)
    message = request_data.model_dump_json()
    # Publish a message to RabbitMQ
    write_channel.basic_publish(exchange='', routing_key=queue_name, body=message)
    return {"message": request_data.user}


@router.get("/wait-partner/{queue_name}")
async def wait_partner(queue_name: str):

    wait_channel.queue_declare(queue=queue_name)
    start_time = time.time()  # Record the start time

    # Start consuming messages from the queue
    while True:
        method_frame, properties, body = wait_channel.basic_get(queue=queue_name, auto_ack=True)

        if method_frame:
            # A message is received
            message = ConnectionMessage.model_validate_json(body.decode("utf-8"))
            return {"message": message}

        current_time = time.time()
        elapsed_time = current_time - start_time

        if elapsed_time >= 30:
            # 30 seconds have passed, break out of the loop
            return {"message": "empty"}

        # Sleep briefly to avoid busy-waiting
        time.sleep(1)
