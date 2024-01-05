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

export const studentRoute = Router();

studentRoute.get("/students", showAllStudents)
studentRoute.get("/student/:code", showStudentCode)
studentRoute.get("/student/:DNI", showStudentDNI)
studentRoute.get("/student/:name", showStudentName)
studentRoute.post("/student", createStudent)
studentRoute.put("/student/:id", updateStudent)
studentRoute.delete("/student/:id", deleteStudent)

