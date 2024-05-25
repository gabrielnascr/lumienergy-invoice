import "dotenv/config";

export const rabbitmqConfig = {
  user: process.env.RABBITMQ_USER,
  pass: process.env.RABBITMQ_PASS,
  host: process.env.RABBITMQ_HOST,
  port: process.env.RABBITMQ_PORT,
};
