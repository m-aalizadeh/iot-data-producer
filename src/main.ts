import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  const sampleData = appService.getSampleData();
  const configService = app.get(ConfigService);

  const rabbitmqUrl = configService.get<string>('RABBITMQ_URL');

  const connection = amqp.connect([rabbitmqUrl], {
    reconnectTimeInSeconds: 5,
  });

  const channelWrapper = connection.createChannel({
    setup: (channel) => {
      return channel.assertQueue('xray_queue', { durable: true });
    },
  });

  setInterval(() => {
    channelWrapper.sendToQueue(
      'xray_queue',
      Buffer.from(JSON.stringify(sampleData)),
    );
    console.log('Sent sample data to xray_queue');
  }, 60000);
}

bootstrap().catch((err) => {
  console.error('Producer failed to start', err);
  process.exit(1);
});
