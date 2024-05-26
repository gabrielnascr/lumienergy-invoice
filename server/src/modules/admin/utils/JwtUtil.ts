import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class JwtUtil {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET);
  }

  static verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
