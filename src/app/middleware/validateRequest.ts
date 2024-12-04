import {NextFunction, Request, Response,} from "express";
import { AnyZodObject } from "zod";

//* Request Validator
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate data
      await schema.parseAsync({
        body: req.body,
      });

      // If valid, move to next middleware or controller
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validateRequest;
