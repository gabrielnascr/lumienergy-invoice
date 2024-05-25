import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../UserService";

export class UserServiceFactory {
  static create() {
    return new UserService(new UserRepository());
  }
}
