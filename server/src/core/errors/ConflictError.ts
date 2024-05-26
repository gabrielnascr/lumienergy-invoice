import { HttpError } from "./HttpError";

export class ConflictError extends HttpError {
  constructor(message: string = "Conflict Error") {
    super(409, message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
