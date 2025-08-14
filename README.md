A NestJS application that simulates IoT devices sending X-ray data to a RabbitMQ queue for processing by the PANTOhealth backend system.

Table of Contents

- Features
- Prerequisites
- Installation
- Configuration
- Running the Application

Features
🚀 RabbitMQ Integration: Connects to RabbitMQ to send X-ray data messages
📊 Sample Data: Includes sample X-ray data in JSON format
⏱ Scheduled Publishing: Automatically sends data at regular intervals
🔧 Configurable: Environment variables for easy configuration

Prerequisites
Node.js v16+
npm or yarn
RabbitMQ server

Installation
Clone the repository:
git clone https://github.com/your-username/pantohealth-producer.git
cd iot-data-producer
Install dependencies:
npm install

Configuration
Create a .env file in the root directory:

env
RABBITMQ_URL=amqp://localhost:5672

Running the Application:
npm run start:dev

Sample Data Format
The producer sends data in this format to the xray_queue:

json
{
"deviceId": {
"data": [
[timestamp, [x_coord, y_coord, speed]],
...
],
"time": overall_timestamp
}
}
