import { Router } from "express";
import {
  showAllStudents,
  showStudentCode,
  showStudentDNI,
  showStudentName,
  createStudent,
  updateStudent,
  deleteStudent,
  createAllStudent
} from "../controllers/students.controllers";
import { validateCreateStudents, validateUpdateStudent } from "../middlewares/student.middlewares";
import { userRole } from "../middlewares/role.middlewares";
import { pagination } from "../utils/pagination.server";

export const studentRoute = Router();

studentRoute.get("/students", showAllStudents)
studentRoute.get("/student/code/:code", showStudentCode)
studentRoute.get("/student/dni/:documentNumber", showStudentDNI)
studentRoute.get("/student/name/:name", showStudentName)
studentRoute.post("/student", validateCreateStudents, createStudent)
studentRoute.post("/students/many", createAllStudent)
studentRoute.put("/student/:id", validateUpdateStudent, updateStudent)
studentRoute.delete("/student/:id", deleteStudent)