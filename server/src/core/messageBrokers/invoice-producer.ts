import * as amqplib from "amqplib";

export class InvoiceProducer {
  private readonly QUEUE_NAME = "invoice_queue";

  async send(message: Buffer) {
    const connection = await amqplib.connect(
      "amqp://ogabrielnascr:ogabrielnascr@rabbitmq-server"
    );
    const channel = await connection.createChannel();

    await channel.assertQueue(this.QUEUE_NAME, { durable: true });
    channel.sendToQueue(this.QUEUE_NAME, message, {
      persistent: true,
    });

    await channel.close();
    await connection.close();
  }
}
