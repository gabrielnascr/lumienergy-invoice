import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserServiceFactory } from "../services/factories/UserServiceFactory";
import { validateDTO } from "../../../api/middlewares/validate";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { AuthController } from "../controllers/AuthController";
import { AuthServiceFactory } from "../services/factories/AuthServiceFactory";

const router = Router();

const userController = new UserController(UserServiceFactory.create());
const authController = new AuthController(AuthServiceFactory.create());

router.post("/register", validateDTO(CreateUserDTO), (req, res, next) =>
  userController.createUser(req, res, next)
);

router.post("/authenticate", validateDTO(LoginDTO), (req, res, next) =>
  authController.authenticate(req, res, next)
);

export default router;
