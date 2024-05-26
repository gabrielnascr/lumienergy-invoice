import { NextFunction, Request, Response } from "express";

import { LoginDTO } from "../dtos/LoginDTO";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDTO: LoginDTO = req.body;
      const data = await this.authService.authenticate(loginDTO);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
