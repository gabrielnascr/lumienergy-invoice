import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}
}
