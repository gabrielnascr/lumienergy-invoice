import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../core/errors/UnauthorizedError";
import { JwtUtil } from "../../modules/admin/utils/JwtUtil";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authorization token is missing");
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = await JwtUtil.verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
}
