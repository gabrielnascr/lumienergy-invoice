import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export function validateDTO(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dtoObj);

    if (errors.length > 0) {
      return res.status(400).json(
        errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }))
      );
    }
    req.body = dtoObj;
    next();
  };
}
