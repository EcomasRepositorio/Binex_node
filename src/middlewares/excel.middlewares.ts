import { Request, Response, NextFunction } from 'express';
import path from 'path';
import multer from 'multer';
import xlsx from 'xlsx';
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/excel');
    },
    filename: (req, file, cb) => {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //const fileName = `excel-${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage }).single('excelFile');

const excelUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error al cargar el archivo Excel' });
    }
    if (!req.file || !req.file.originalname) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }
    const fileName = req.file.originalname;
    const filePath = path.join(__dirname, 'uploads','excel', fileName);
    console.log(filePath)
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      console.error('El archivo no existe en la ruta especificada:', filePath);
      return res.status(500).json({ error: 'Error interno al procesar el archivo Excel' });
}

    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: unknown[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];

      // Estructurar datos para createMany
      const studentsData = data
        .filter(row => row.length > 0)
        .map(row => {
        const [
          documentNumber,
          name,
          code,
          activityAcademy,
          participation,
          institute,
          hour,
          date,
          imageFilePath
        ] = row;
          const dateObject = new Date(date as string);
          const hourInt = parseInt(hour as string);

          return {
            documentNumber: documentNumber as string,
            name: name as string,
            code: code as string,
            activityAcademy: activityAcademy as string,
            participation: participation as string,
            institute: institute as string,
            hour: hourInt,
            date: dateObject,
            imageCertificate: imageFilePath as string
          };
        });

      // Insertar en la base de datos utilizando createMany
      await prisma.student.createMany({ data: studentsData });

      next();
    } catch (error) {
      console.error('Error al procesar el archivo Excel:', error);
      return res.status(500).json({ error: 'Error interno al procesar el archivo Excel' });
    }
  });
};

export default excelUpload;
