import * as amqplib from "amqplib";

export interface InvoiceMessageHandler {
  (message: { filename: string; buffer: Buffer }): Promise<void>;
}

export interface IInvoiceConsumer {
  consume: (handler: InvoiceMessageHandler) => Promise<void>;
}

export class InvoiceConsumer implements IInvoiceConsumer {
  private readonly QUEUE_NAME = "invoice_queue";

  async consume(handler: InvoiceMessageHandler) {
    const connection = await amqplib.connect(
      "amqp://ogabrielnascr:ogabrielnascr@rabbitmq-server"
    );

    const channel = await connection.createChannel();
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
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
      { noAck: false }
    );
  }
}
