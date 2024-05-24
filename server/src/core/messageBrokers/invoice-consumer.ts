import * as amqplib from "amqplib";

export class InvoiceConsumer {
  private readonly QUEUE_NAME = "invoice_queue";

  async consume(handler: (message: any) => void) {
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
            await handler(message.content);
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
