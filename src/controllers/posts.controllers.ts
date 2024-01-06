import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { postService } from "../services/posts.services";
import { paginationInfo } from "../utils/format.server";

export const showAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset } = res.locals as paginationInfo;
      const result = await postService.getAll(limit, offset)
      res.status(200).json(result);
  } catch (error) {
      next({
        status: 400,
        message: 'Error: Insert valid Id',
        errorContent: ''
      })
  }
};

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      const result = await postService.create(body)
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          next({
            status: 400,
            message: 'Error: AuthorId inexistent',
            errorContent: error.meta?.cause
          })
        }
      }
    }
  };

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const newId = parseInt(id)
      const data = req.body
      if (typeof newId === 'number' && newId >= 0) {
        const result = await postService.update(newId, data)
        res.status(200).json(result);
      } else {
        next({
          status: 400,
          message: 'Invalid Id'
        })
      }
    } catch (error: any) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error)
        if (error.code == 'P2025') {
          next({
            status: 400,
            message: 'Error: not exist Id',
            errorContent: error.meta?.cause
          })
        } else if (error.code == 'P2009') {
          next({
            status: 400,
            message: 'Error: Id inexistent',
            errorContent: error.meta?.query_validation_error
          })
        } else if (error.code == 'P2033') {
          next({
            status: 400,
            message: 'Error: Id incorrect',
            errorContent: error.meta?.details
          })
        } else if (error.code == 'P2002') {
          next({
            status: 400,
            message: 'Error: update done',
            errorContent: error.meta?.target
          })
        } else {
          res.status(400).json(error)
        }
      } else {
        next({
          status: 400,
          message: 'Error: insert valid Id',
          errorContent: error.clientVersion
        })
      }
    }
  };

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const newId = parseInt(id)
      if (typeof newId === 'number' && newId >= 0) {
        const result = await postService.delete(newId)
        res.status(200).json(result)
      } else {
        next({
          status: 400,
          message: 'Error: invalid Id'
        })
      }
    } catch (error: any) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          next({
            status: 400,
            message: 'Error: not exist Id',
            errorContent: error.meta?.cause
          })
        } else if (error.code == 'P2009') {
          next({
            status: 400,
            message: 'Error: Id inexistent',
            errorContent: error.meta?.query_validation_error
          })
        } else {
          res.status(400).json(error);
        }
      } else {
        res.status(400).json(error)
      }
    }
  };