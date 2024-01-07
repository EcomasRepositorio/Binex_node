import { Request, Response, NextFunction } from "express";

export const validateCreateStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    documentNumber,
    name,
    code,
    activityAcademy,
    participation,
    institute,
  } = req.body;

  if (typeof documentNumber !== "string" || documentNumber.length !== 8) {
    res.status(400).json({
      error: `Value '${documentNumber}' not set to documentNumber`
    });
  } else if (typeof name !== "string" || name.length <= 0) {
    res.status(400).json({
      error: `Value '${name}' not set to name`
    });
  } else if (typeof code !== "number") {
    res.status(400).json({
      error: `Value '${code}' not set to code`
    });
  } else if (typeof activityAcademy !== "string" || activityAcademy.length <= 0) {
    res.status(400).json({
      error: `Value '${activityAcademy}' not set to activityAcademy`
    });
  } else if (typeof participation !== "string" || participation.length <= 0) {
    res.status(400).json({
      error: `Value '${participation}' not set to participation`
    });
  } else if (typeof institute !== "string" || institute.length <= 0) {
    res.status(400).json({
      error: `Value '${institute}' not set to institute`
    });
  } else {
    next();
  }
}

export const validateUpdateStudent = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    documentNumber,
    name,
    activityAcademy,
    participation,
    institute,
    hour
  } = req.body;

  if (typeof documentNumber !== "string" || documentNumber.length !== 8) {
    res.status(400).json({
      error: `Value '${documentNumber}' not set to documentNumber`
    });
  } else if (typeof name !== "string" || name.length <= 0) {
    res.status(400).json({
      error: `Value '${name}' not set to name`
    });
  } else if (typeof activityAcademy !== "string" || activityAcademy.length <= 0) {
    res.status(400).json({
      error: `Value '${activityAcademy}' not set to activityAcademy`
    });
  } else if (typeof participation !== "string" || participation.length <= 0) {
    res.status(400).json({
      error: `Value '${participation}' not set to participation`
    });
  } else if (typeof institute !== "string" || institute.length <= 0) {
    res.status(400).json({
      error: `Value '${institute}' not set to institute`
    });
  } else if (typeof hour !== "number") {
    res.status(400).json({
      error: `Value '${hour}' not set to hour`
    });
  } else {
    next();
  }
}