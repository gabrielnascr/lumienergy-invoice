import * as amqplib from "amqplib";
import { RabbitMQService } from "../../../core/RabbitMQService";

export interface InvoiceMessageHandler {
  (message: { filename: string; buffer: Buffer }): Promise<void>;
}

export interface IInvoiceConsumer {
  consume: (handler: InvoiceMessageHandler) => Promise<void>;
}

export class InvoiceConsumer implements IInvoiceConsumer {
  private readonly QUEUE_NAME = "invoice_queue";
  private rabbitMQService: RabbitMQService;

  constructor(rabbitMQService: RabbitMQService) {
    this.rabbitMQService = rabbitMQService;
  }

  async consume(handler: InvoiceMessageHandler) {
    const channel = await this.rabbitMQService.createChannel();
    await channel.assertQueue(this.QUEUE_NAME, { durable: true });
    await channel.prefetch(1);

    channel.consume(
      this.QUEUE_NAME,
      async (message: amqplib.ConsumeMessage | null) => {
        try {
          if (message) {
            await handler(JSON.parse(message.content.toString()));
            channel.ack(message);
          }
        } catch (error) {}
      },
      { noAck: false }
    );
  }
}
