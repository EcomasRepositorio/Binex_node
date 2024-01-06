import { Prisma } from "@prisma/client";
import { authServices } from "../services/auth.services";
import { NextFunction, Request, Response } from "express";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { body } = req;
      const result = await authServices.auth(body);
      if (result) {
        const token = authServices.getToken(result);
        const { password, ...data } = result;
        res.json({ ...data, token });
      } else if (result === false) {
        next({
          errorDescription: "Couldn't find user in records",
          status: 400,
          message: "No se pudo encontrar al usuario en los registros",
          errorContent: "Couldn't find user in records",
        });
      } else {
        next({
          errorDescription: "Password don't match with user",
          status: 400,
          message: "La contraseña no coincide con el usuario",
          errorContent: "Password don't match with user",
        });
      }
    } catch (error: any) {
      next({
        errorDescription: error,
        status: 400,
        message: "Error, prisma client error, check logs",
        errorContent: error.clientVersion,
      });
    }
  };