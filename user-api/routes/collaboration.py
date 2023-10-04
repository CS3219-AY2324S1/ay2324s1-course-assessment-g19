from fastapi import APIRouter
import pika

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

# Set up RabbitMQ connection
connection = pika.BlockingConnection(connection_params)
channel = connection.channel()
channel.queue_declare(queue='my_queue')


@router.post("/send-message")
async def send_message(message: str):
    # Publish a message to RabbitMQ
    channel.basic_publish(exchange='', routing_key='my_queue', body=message)
    return {"message": "Message sent to RabbitMQ"}


@router.get("/receive-message")
async def receive_message():
    channel.queue_declare(queue='my_queue')
