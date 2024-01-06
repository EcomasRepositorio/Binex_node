import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = req.headers.authorization;
    const token = result?.split(" ")[1];
    if (secret && token) {
      const decodedToken = jwt.verify(token, secret);
      res.locals.userInfo = decodedToken;
      next();
    } else {
      res.status(400).json({
        message: "Necesita iniciar sesión para ver la información",
        errorContent: "Need to log in to see the information",
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};