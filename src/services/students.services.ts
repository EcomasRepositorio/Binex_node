import { Student } from "@prisma/client";
import { prisma } from "../utils/prisma.server";
import { updateStudentPick } from "../utils/format.server";

export class studentServices {
  static async getAll( take: number, skip: number ) {
    try {
      const result = await prisma.student.findMany({
        orderBy: { date: "desc" },
        take,
        skip,
          select: {
            id: true,
            documentNumber: true,
            name: true,
            code: true,
            activityAcademy: true,
            participation: true,
            institute: true,
            hour: true,
            date: true,
            imageCertificate: true,
          }
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async searchCode(code: Student["code"]) {
    try {
      const result = await prisma.student.findFirst({
        where: { code },
        select: {
          documentNumber: true,
          name: true,
          code: true,
          activityAcademy: true,
          participation: true,
          institute: true,
          hour: true,
          date: true,
          imageCertificate: true,
        }
      });
      if (!result) return null;
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async searchDNI(documentNumber: Student["documentNumber"]) {
    try {
      const result = await prisma.student.findMany({
        where: {
          documentNumber: { equals: documentNumber }
        },
        select: {
          documentNumber: true,
          name: true,
          code: true,
          activityAcademy: true,
          participation: true,
          institute: true,
          hour: true,
          date: true,
          imageCertificate: true,
        },
        take: 15,
      });
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async searchName(name: Student["name"]) {
    try {
      const result = await prisma.student.findMany({
        where: {
          name: { contains: name.toLowerCase() },
        },
        orderBy: { name:"asc" },
        select: {
          documentNumber: true,
          name: true,
          code: true,
          activityAcademy: true,
          participation: true,
          institute: true,
          hour: true,
          date: true,
          imageCertificate: true,
        },
        take: 15,
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async create( data: Student ) {
    try {
      const {
        documentNumber,
        name,
        code,
        activityAcademy,
        participation,
        institute,
        hour,
        date,
        imageCertificate,
      } = data;
      const result = await prisma.student.create({
        data: {
          documentNumber,
          name,
          code,
          activityAcademy,
          participation,
          institute,
          hour,
          date,
          imageCertificate,
        }
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  };

  static async createAll( students: Student[] ) {
    try {
      const data = students.map((student) => ({
        ...student,
      }))
      const result = await prisma.student.createMany({
        data,
        skipDuplicates: false
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static async update(data: updateStudentPick, id: Student["id"]) {
    try {
      const result = await prisma.student.update({
        where: { id },
        data: data,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: Student["id"]) {
    try {
      const result = await prisma.student.delete({
        where: { id },
      })
      return result;
    } catch (error) {
      throw error;
    }
  }
}