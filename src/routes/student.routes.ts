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
import { imageUpload } from "../middlewares/certificate.middlewares";
import { authenticate } from "../middlewares/auth.middlewares";
import { userRole } from "../middlewares/role.middlewares";
import { adminRole } from "../middlewares/role.middlewares";
import { pagination } from "../utils/pagination.server";
import excelUpload from '../middlewares/excel.middlewares';

export const studentRoute = Router();

studentRoute.get("/students",authenticate, userRole, showAllStudents)
studentRoute.get("/student/code/:code", showStudentCode)
studentRoute.get("/student/dni/:documentNumber", showStudentDNI)
studentRoute.get("/student/name/:name", showStudentName)
studentRoute.post("/student",authenticate, userRole, imageUpload, validateCreateStudents, createStudent)
studentRoute.post("/students/many",authenticate, userRole, excelUpload, validateCreateStudents, createAllStudent, (req, res) => {
  res.json({ message: 'Archivo Excel procesado correctamente'})
})
studentRoute.put("/student/:id",authenticate, userRole, imageUpload, validateUpdateStudent, updateStudent)
studentRoute.delete("/student/:id",authenticate, userRole, deleteStudent)