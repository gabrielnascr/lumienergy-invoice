import { UserRepository } from "../../repositories/UserRepository";
import { AuthService } from "../AuthService";

export class AuthServiceFactory {
  static create() {
    return new AuthService(new UserRepository());
  }
}
