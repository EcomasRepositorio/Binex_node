import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from "express";
import { studentServices } from "../services/students.services";
import { paginationInfo } from '../utils/format.server';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const showAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, offset } = res.locals as paginationInfo;
      const result = await studentServices.getAll(limit, offset)
      res.status(200).json(result);
  } catch (error) {
    next ({
      errorDescription: error,
      status: 500,
      message: 'Internal Server Error',
      errorContent: 'Error: Internal Server Error'
    })
  }
};

export const showStudentCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { code } = req.params
    const convertCode = parseInt(code)
    if (typeof convertCode  ===  "number" && convertCode >= 0) {
      const result = await studentServices.searchCode(convertCode);
      if (result == null) {
        next ({
          status: 404,
          message: "Inser a valid code",
          errorContent: "Error, Incorrect code"
        });
      } else {
        res.status(200).json(result)
      }
    } else {
        next ({
          status: 400,
          message: "Inser a valid code",
          errorContent: "Error, Unassignable code"
        });
    }
  } catch (error) {
    next ({
      errorDescription: error,
      status: 404,
      message: "Inser a valid code",
      errorContent: "Error, Invalid code"
    })
  }
};

export const showStudentDNI = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { documentNumber } = req.params;
    if (typeof documentNumber !== 'string' || documentNumber.trim() === '') {
      return next({
        status: 400,
        message: 'Insert a valid DNI',
        errorContent: 'Error: Invalid DNI',
      });
    }
    const result = await studentServices.searchDNI(documentNumber.trim());
    if (result === null || result.length === 0) {
      return next({
        status: 400,
        message: 'Insert a valid DNI',
        errorContent: 'Error: Incorrect DNI',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next({
      errorDescription: error,
      status: 500,
      message: 'Internal Server Error',
      errorContent: 'Error: Internal Server Error'
    });
  }
};

export const showStudentName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { name } = req.params;
    console.log(req.params)
      if (typeof name === "string" && name.trim() !== "") {
      const result = await studentServices.searchName(name.trim());
      console.log(result)
      if (result.length > 0) {
        res.status(200).json(result)
      } else {
        next ({
          status: 400,
          message: "Insert a valid name",
          errorContent: "Error: Incorrect name"
        })
      }
      } else {
        next ({
          status: 404,
          message: "Insert a valid name",
          errorContent: "Error: Invalid name"
        })
      }
    } catch (error) {
      next ({
        errorDescription: error,
        status: 500,
        message: 'Internal Server Error',
        errorContent: 'Error: Internal Server Error'
      })
    }
};

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;
    const result = await studentServices.create(body)
      res.status(201).json(result)
  } catch (error: any) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "2002") {
        next ({
          errorDescription: error.meta,
          status: 400,
          message: 'Error: Insert new code',
          errorContent: 'Error: Unique constraint failed in code'
        });
      } else {
          next ({
            errorDescription: error,
            status: 404,
            message: 'Error: Duplicate constraint code',
            errorContent: error.clientVersion
          })
        }
    } else {
        next ({
          errorDescription: error,
          status: 404,
          message: 'Error: Value in hour or code is not a valid',
          errorContent: error.clientVersion
        });
    }
  }
};

export const createAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const result = await studentServices.createAll(body);
      res.status(201).json(result);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code == "P2002") {
        next ({
          errorDescription: error.meta?.target,
          status: 400,
          message: "Error: Insert 'code' correct",
          errorContent: "Error: Duplicate code"
        });
      }
    } else {
      next({
        errorDescription: error,
        status: 400,
        message: "Error: Data incorrect",
        errorContent: error.clientVersion
      });
    }
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const convertId = parseInt(id);
    if (typeof convertId === "number" && convertId >= 0) {
      const result = await studentServices.update(data, convertId)
      res.status(200).json(result);
    } else {
      next({
        errorDescription: convertId,
        status: 400,
        message: "Invalid Id",
        errorContent: "Insert a valid Id",
      });
    }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code == "2025") {
        next ({
          errorDescription: error,
          status: 400,
          message: "Error: Invalid Id",
          errorContent: error.meta?.cause
        });
      } else {
        next ({
          errorDescription: error,
          status: 400,
          message: "Error: Invalid Id",
          errorContent: "Error: Record to update not found"
        });
      }
    } else {
      next({
        errorDescription: error.description,
        status: 400,
        message: 'Error: Invalid hour or id',
        errorContent: error.clientVersion
      });
    }
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { id } = req.params;
    const convertId = parseInt(id);
    if (typeof convertId === "number" && convertId >= 0) {
        const result = await studentServices.delete(convertId);
        res.status(200).json({ id: result.id });
    } else {
        next({
          errorDescription: convertId,
          status: 400,
          message: "Error: Insert a valid Id",
          errorContent: "Error: Invalid Id",
        });
      }
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2025") {
          next({
            errorDescription: error,
            status: 400,
            message: "Error: Invalid Id",
            errorContent: error.meta?.cause
          });
        }
      } else {
        next({
          errorDescription: error.description,
          status: 400,
          message: "Error: Invalid Id",
          errorContent: error.clientVersion
        });
      }
  }
}