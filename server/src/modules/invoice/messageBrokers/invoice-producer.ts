import { RabbitMQService } from "../../../core/RabbitMQService";

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
  private rabbitMQService: RabbitMQService;

  constructor(rabbitMQService: RabbitMQService) {
    this.rabbitMQService = rabbitMQService;
  }

  async send({ filename, buffer }: { filename: string; buffer: Buffer }) {
    const channel = await this.rabbitMQService.createChannel();

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
  }
}
