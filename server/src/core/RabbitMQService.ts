import * as amqplib from "amqplib";
import { rabbitmqConfig } from "./config/rabbitmq";

export class RabbitMQService {
  private connection: amqplib.Connection | null = null;

  private async getConnection(): Promise<amqplib.Connection> {
    if (!this.connection) {
      this.connection = await amqplib.connect(
        `amqp://${rabbitmqConfig.user}:${rabbitmqConfig.pass}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`
      );
    }
    return this.connection;
  }

  async createChannel(): Promise<amqplib.Channel> {
    const connection = await this.getConnection();
    return connection.createChannel();
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}
