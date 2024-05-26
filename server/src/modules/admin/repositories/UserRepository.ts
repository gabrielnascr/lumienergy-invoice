import { Admin, PrismaClient } from "@prisma/client";

import { PrismaService } from "../../../core/PrismaService";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

interface IUserRepository {
  create: (createUserDTO: CreateUserDTO) => Promise<Admin>;
  findByEmail: (email: string) => Promise<Admin>;
}

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  async create(createUserDTO: CreateUserDTO) {
    return this.prisma.getPrisma().admin.create({
      data: {
        ...createUserDTO,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.getPrisma().admin.findFirst({
      where: {
        email: email,
      },
    });
  }
}
