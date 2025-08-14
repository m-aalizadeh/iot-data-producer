import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
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

  const sampleData = {
    '66bb584d4ae73e488c30a072': {
      data: [
        [762, [51.339764, 12.339223833333334, 1.2038000000000002]],
        [1766, [51.33977733333333, 12.339211833333334, 1.531604]],
        [2763, [51.339782, 12.339196166666667, 2.13906]],
      ],
      time: Date.now(),
    },
  };

  setInterval(() => {
    channelWrapper.sendToQueue(
      'xray_queue',
      Buffer.from(JSON.stringify(sampleData)),
    );
    console.log('Sent sample data to xray_queue');
  }, 5000);
}

bootstrap().catch((err) => {
  console.error('Producer failed to start', err);
  process.exit(1);
});
