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
            DNI: true,
            name: true,
            code: true,
            activityAcademy: true,
            participation: true,
            Institute: true,
            hour: true,
            date: true,
            pdf: true,
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
          DNI: true,
          name: true,
          code: true,
          activityAcademy: true,
          participation: true,
          Institute: true,
          hour: true,
          date: true,
          pdf: true,
        }
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async searchDNI(DNI: Student["DNI"]) {
    try {
      const result = await prisma.student.findFirst({
        where: { DNI },
        select: {
          DNI: true,
          name: true,
          code: true,
          activityAcademy: true,
          participation: true,
          Institute: true,
          hour: true,
          date: true,
          pdf: true,
        }
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async searchName(name: Student["name"]) {
    try {
      const result = await prisma.student.findFirst({
        where: { name },
        select: {
          DNI: true,
          name: true,
          code: true,
          activityAcademy: true,
          participation: true,
          Institute: true,
          hour: true,
          date: true,
          pdf: true,
        }
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  }

  static async create( data: Student ) {
    try {
      const {
        DNI,
        name,
        code,
        activityAcademy,
        participation,
        Institute,
        hour,
        date,
        pdf,
      } = data;
      const result = await prisma.student.create({
        data: {
          DNI,
          name,
          code,
          activityAcademy,
          participation,
          Institute,
          hour,
          date,
          pdf,
        }
      });
      return result;
    } catch ( error ) {
      throw error;
    }
  }

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