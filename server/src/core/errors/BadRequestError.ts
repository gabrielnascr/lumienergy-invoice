import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad request") {
    super(400, message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
