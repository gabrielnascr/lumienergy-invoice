import { Admin } from "@prisma/client";

import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { ConflictError } from "../../../core/errors/ConflictError";
import { BcryptUtil } from "../utils/BcryptUtil";

interface IUserService {
  createUser: (createUserDTO: CreateUserDTO) => Promise<Admin>;
}

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(createUserDTO: CreateUserDTO) {
    console.log(createUserDTO);
    const { email, password } = createUserDTO;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictError("User already exists");
    }

    const hashedPassword = await BcryptUtil.hashPassword(password);

    const createdUser = await this.userRepository.create({
      ...createUserDTO,
      password: hashedPassword,
    });
    return createdUser;
  }
}
