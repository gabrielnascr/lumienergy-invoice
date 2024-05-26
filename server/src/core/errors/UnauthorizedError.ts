import { HttpError } from "./HttpError";

export class UnauthorizedError extends HttpError {
  constructor(message: string = "UnauthorizedError") {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
