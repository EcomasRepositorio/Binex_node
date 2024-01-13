import { Request, Response, NextFunction } from 'express';
import path from 'path';
import multer from 'multer';
import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/excel');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileName = `excel-${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });

const upload = multer({ storage }).single('excelFile');

const excelUpload = (
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
    try {
      const fileName = req.file.originalname;
      const filePath = `uploads/excel/${fileName}`
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: unknown[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];

      // Iterar sobre los datos del archivo Excel e insertar en la base de datos
      for (const row of data) {
        if (row.length >= 0) {
        const [
          documentNumber,
          name,
          code,
          activityAcademy,
          participation,
          institute, hour,
          date,
          imageFilePath
        ] = row;

        const dateObject = new Date(date as string);
        const hourInt = parseInt(hour as string);

        const studentData = {
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

        await prisma.student.createMany({ data: studentData });
      } else {
        console.warn('Fila de archivo excel incompleta, se omitira:', row)
      }
    }
      next();
    } catch (error) {
      console.error('Error al procesar el archivo Excel:', error);
      return res.status(500).json({ error: 'Error interno al procesar el archivo Excel' });
    }
  });
};

export default excelUpload;