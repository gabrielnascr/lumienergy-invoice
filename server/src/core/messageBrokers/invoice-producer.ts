import * as amqplib from "amqplib";

export interface IInvoiceProducer {
  send: ({
    filename,
    buffer,
  }: {
    filename: string;
    buffer: Buffer;
  }) => Promise<void>;
}

export class InvoiceProducer implements IInvoiceProducer {
  private readonly QUEUE_NAME = "invoice_queue";

  async send({ filename, buffer }: { filename: string; buffer: Buffer }) {
    const connection = await amqplib.connect(
      "amqp://ogabrielnascr:ogabrielnascr@rabbitmq-server"
    );
    const channel = await connection.createChannel();

    await channel.assertQueue(this.QUEUE_NAME, { durable: true });
    channel.sendToQueue(
      this.QUEUE_NAME,
      Buffer.from(
        JSON.stringify({
          filename,
          buffer: buffer,
        })
      ),
      {
        persistent: true,
      }
    );

    await channel.close();
    await connection.close();
  }
}
