import { Router } from "express";
import {
  showAllStudents,
  showStudentCode,
  showStudentDNI,
  showStudentName,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/students.controllers";
import { userRole } from "../middlewares/role.middlewares";

export const studentRoute = Router();

studentRoute.get("/students", showAllStudents)
studentRoute.get("/student/code/:code", showStudentCode)
studentRoute.get("/student/dni/:DNI", showStudentDNI)
studentRoute.get("/student/name/:name", showStudentName)
studentRoute.post("/student", createStudent)
studentRoute.put("/student/:id", updateStudent)
studentRoute.delete("/student/:id", deleteStudent)

