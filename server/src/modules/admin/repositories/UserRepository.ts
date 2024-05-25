import { Admin, PrismaClient } from "@prisma/client";

import { PrismaService } from "../../../core/PrismaService";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

interface IUserRepository {
  createUser: (createUserDTO: CreateUserDTO) => Promise<Admin>;
}

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  async createUser(createUserDTO: CreateUserDTO) {
    return this.prisma.getPrisma().admin.create({
      data: {
        ...createUserDTO,
      },
    });
  }
}
