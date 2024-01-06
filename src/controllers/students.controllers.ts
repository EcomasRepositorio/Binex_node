import { Prisma, Student } from '@prisma/client';
import { NextFunction, Request, Response } from "express";
import { studentServices } from "../services/students.services";
import { paginationInfo, Payload, userInfo } from '../utils/format.server';
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
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    res.status(400).json(error);
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
          errorDescription: "Error,",
          status: 400,
          message: "Error, No se puedo encontrar la lista",
          errorContent: "Error,"
        })
      } else {
        res.status(200).json(result)
      }
    } else {
        res.status(400).json({ error: convertCode })
    }
} catch (error) {
  //console.log(error)
  next ({
    errorDescription: error,
    status: 404,
    message: "Error, No se puedo encontrar la lista code",
    errorContent: "Error,"
  })
  }
};

export const showStudentDNI = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { DNI } = req.params
    console.log(req.params)
    const convertDNI = parseInt(DNI)
    console.log(convertDNI)
    if (typeof convertDNI  ===  "number" && convertDNI >= 0) {
      const result = await studentServices.searchDNI(convertDNI);
      console.log(result)
      /* if (result == null) {
        next ({
          errorDescription: "Error,",
          status: 400,
          message: "Error, No se puedo encontrar la lista",
          errorContent: "Error,"
        })
      } else {} */
        res.status(200).json(result)
    } else {
        res.status(400).json({ error: convertDNI })
    }
  } catch (error: any) {
    console.log(error)
    next ({
      errorDescription: error,
      status: 404,
      message: "Error, Invalid DNI",
      errorContent: "Error,"
    })
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
          res.status(404).json({ message: 'Error: Incorrect name'})
        }
        } else {
          res.status(400).json({ error: 'error' })
        }
      } catch (error) {
        console.log(error)
        next ({
          errorDescription: error,
          status: 400,
          message: "Error, No se puedo encontrar la lista name",
          errorContent: "Error,"
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
  } catch (error) {
    //console.log(error);
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
          message: "Error, Insert a valid Id",
          errorContent: "Error, Invalid id for user",
        })
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //console.log(error);
      }
  }
}