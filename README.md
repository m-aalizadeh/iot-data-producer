A NestJS application that simulates IoT devices sending X-ray data to a RabbitMQ queue for processing by the PANTOhealth backend system.

Table of Contents
Features

Prerequisites

Installation

Configuration

Running the Application

Docker Setup

API Documentation

Testing

Troubleshooting

License

Features
🚀 RabbitMQ Integration: Connects to RabbitMQ to send X-ray data messages

📊 Sample Data: Includes sample X-ray data in JSON format

⏱ Scheduled Publishing: Automatically sends data at regular intervals

🔧 Configurable: Environment variables for easy configuration

🐳 Docker Support: Ready for containerized deployment

Prerequisites
Node.js v16+

npm or yarn

RabbitMQ server

Docker (optional)

Installation
Clone the repository:

bash
git clone https://github.com/your-username/pantohealth-producer.git
cd pantohealth-producer
Install dependencies:

bash
npm install
Configuration
Create a .env file in the root directory:

env
RABBITMQ_URL=amqp://guest:guest@localhost:5672
PUBLISH_INTERVAL_MS=5000
SAMPLE_DATA_FILE=public/sample-data.json
Running the Application
Development Mode
bash
npm run start:dev
Production Mode
bash
npm run build
npm run start:prod
Using Docker
bash
docker-compose up --build
Docker Setup
The included docker-compose.yml will:

Build the producer application

Connect to RabbitMQ service

Mount the sample data file

To run with Docker:

bash
docker-compose up -d
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
