A NestJS application that simulates IoT devices sending X-ray data to a RabbitMQ queue for processing by the https://github.com/m-aalizadeh/iot-management backend system.

Table of Contents

- Features
- Prerequisites
- Installation
- Configuration
- Running the Application

Features - 🚀 RabbitMQ Integration: Connects to RabbitMQ to send X-ray data messages - 📊 Sample Data: Includes sample X-ray data in JSON format - ⏱ Scheduled Publishing: Automatically sends data at regular intervals - 🔧 Configurable: Environment variables for easy configuration

Prerequisites <br>
Node.js v16+<br>
npm or yarn<br>
RabbitMQ server<br>

Installation<br>
Clone the repository: git clone https://github.com/m-aalizadeh/iot-data-producer.git<br>
cd iot-data-producer<br>
Install dependencies:<br>
npm install<br>

Configuration<br>
Create a .env file in the root directory:<br>
RABBITMQ_URL=amqp://localhost:5672<br>

Running the Application:<br>
npm run start:dev<br>

Sample Data Format<br>
The producer sends data in this format to the xray_queue:<br>

{<br>
"deviceId": {<br>
"data": [<br>
[timestamp, [x_coord, y_coord, speed]],<br>
...<br>
],<br>
"time": overall_timestamp<br>
}<br>
}<br>
