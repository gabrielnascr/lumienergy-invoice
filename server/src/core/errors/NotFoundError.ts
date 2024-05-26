import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found") {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
