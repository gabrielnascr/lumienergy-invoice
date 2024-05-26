import { NextFunction, Request, Response } from "express";

import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDTO: CreateUserDTO = req.body;
      const data = await this.userService.createUser(createUserDTO);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
