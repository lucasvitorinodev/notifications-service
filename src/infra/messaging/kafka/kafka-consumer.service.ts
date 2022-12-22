import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['sweeping-tick-7963-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'c3dlZXBpbmctdGljay03OTYzJJ2Pf5WV5EkAy9L9yOYT7ntTCkEvr9rS8pYlHTI',
          password: 'a49600f6f28542c89e3fcdeb1c48431c',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.close();
  }
}
