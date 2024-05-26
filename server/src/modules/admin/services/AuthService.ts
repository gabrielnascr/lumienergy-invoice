import { UnauthorizedError } from "../../../core/errors/UnauthorizedError";
import { UserRepository } from "../repositories/UserRepository";
import { Admin } from "@prisma/client";
import { BcryptUtil } from "../utils/BcryptUtil";
import { JwtUtil } from "../utils/JwtUtil";
import { LoginDTO } from "../dtos/LoginDTO";

interface IAuthService {
  authenticate: (loginDTO: LoginDTO) => Promise<{ token: string; user: Admin }>;
}

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  public async authenticate(
    loginDTO: LoginDTO
  ): Promise<{ token: string; user: Admin }> {
    const user = await this.userRepository.findByEmail(loginDTO.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await BcryptUtil.comparePassword(
      loginDTO.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = await JwtUtil.generateToken({ userId: user.id });
    return { token, user };
  }
}
