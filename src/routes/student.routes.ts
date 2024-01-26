import { Router } from "express";
import {
  showStudent,
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

studentRoute.get("/show/student/:id", showStudent)
studentRoute.get("/students", showAllStudents)
studentRoute.get("/student/code/:code/type/:type", showStudentCode)
studentRoute.get("/student/dni/:documentNumber/type/:type", showStudentDNI)
studentRoute.get("/student/name/:name/type/:type", showStudentName)
studentRoute.post("/student", imageUpload, validateCreateStudents, createStudent)
studentRoute.post("/students/many",authenticate, userRole, excelUpload, validateCreateStudents, createAllStudent, (req, res) => {
  res.json({ message: 'Archivo Excel procesado correctamente'})
})
studentRoute.put("/student/:id", imageUpload, validateUpdateStudent, updateStudent)
studentRoute.delete("/delete/student/:id", deleteStudent)