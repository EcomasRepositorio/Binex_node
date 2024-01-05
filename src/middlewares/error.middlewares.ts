import { Response, Request, NextFunction } from "express";
import { errorProp } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";

export const handleError = async (
  error: errorProp,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message, errorContent, errorDescription } = error;
  const convertError: string = errorDescription?.toString();
  await prisma.logs.create({
    data: {
      errorDescription: convertError || "",
      message,
      errorContent,
    },
  });
  res.status(status).json({ message, errorContent });
};