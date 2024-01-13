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
import { userRole } from "../middlewares/role.middlewares";
import { pagination } from "../utils/pagination.server";
import excelUpload from '../middlewares/excel.middlewares';

export const studentRoute = Router();

studentRoute.get("/students", showAllStudents)
studentRoute.get("/student/code/:code", showStudentCode)
studentRoute.get("/student/dni/:documentNumber", showStudentDNI)
studentRoute.get("/student/name/:name", showStudentName)
studentRoute.post("/student", imageUpload, createStudent)
studentRoute.post("/students/many", excelUpload, (req, res) => {
  res.json({ message: 'Archivo Excel procesado correctamente'})
})
studentRoute.put("/student/:id", imageUpload, validateUpdateStudent, updateStudent)
studentRoute.delete("/student/:id", deleteStudent)