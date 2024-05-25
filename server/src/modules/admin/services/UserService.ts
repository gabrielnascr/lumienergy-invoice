import { Admin } from "@prisma/client";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserRepository } from "../repositories/UserRepository";

interface IUserService {}

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}
}
