import { NextFunction, Request, Response } from "express";
import { Prisma } from "../utils/prisma.server";
import { userServices } from "../services/user.services";
import { paginationInfo } from "../utils/format.server";

export const showAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, offset } = res.locals as paginationInfo;
      const result = await userServices.getAll(limit, offset);
      res.status(200).json(result);
    } catch (error) {
      next({
        errorDescription: error,
        status: 404,
        message: "No se pudo encontrar los registros",
        errorContent: "Could'n find users records",
      });
    }
  };

  export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await userServices.create(req.body);
      if (!result) {
        next({
          errorDescription: "Unique constraint failed on the fields: (`email`)",
          status: 400,
          message: "Error, dirección de email ya existe",
          errorContent: "Unique constraint failed on the fields: (`email`)",
        });
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          next({
            errorDescription: error,
            status: 400,
            message: "Error, documento de identidad ya existe",
            errorContent:
              "Unique constraint failed on the fields: (`documentNumber`)",
          });
        } else {
          next({
            errorDescription: error,
            status: 400,
            message: "Error, prisma client error, check logs",
            errorContent: error.clientVersion,
          });
        }
      }
    }
  };

  export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const convertId = parseInt(id);
      if (typeof convertId === "number" && convertId >= 0) {
        const result = await userServices.updateUser(data, convertId)
        res.status(200).json(result);
      } else {
        next({
          status: 400,
          message: "Invalid Id",
          errorContent: "Insert a valid Id",
        })
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //console.log(error);
      }
    }
  };

  export const removeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const convertId = parseInt(id);
      if (typeof convertId === "number" && convertId >= 0) {
        const result = await userServices.delete(convertId);
        res.status(200).json({ id: result.id });
      } else {
        next({
          errorDescription: convertId,
          status: 400,
          message: "Error, ingrese un id valido!",
          errorContent: "Error, invalid id for user",
        });
      }
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2025") {
          next({
            errorDescription: error,
            status: 400,
            message:
              "Error, usuario no encontrado en los registros para eliminar",
            errorContent: error.meta?.cause,
          });
        }
      } else {
        next({
          errorDescription: error,
          status: 400,
          message: "Error, prisma client error, check logs",
          errorContent: error.clientVersion,
        });
      }
    }
  };