import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma.server";
import { updateUserPick } from "../utils/format.server";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

export class userServices {

  // Mostrar todos los 'USER' & 'ADMIN'
  static async getAll(
    take: number,
    skip: number
  ) {
    try {
      const result = await prisma.user.findMany({
        orderBy: { id: "asc" },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          token: true,
        },
        take,
        skip,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(data:updateUserPick, id: User["id"]) {
    try {
      const result = await prisma.user.update({
        where: { id },
        data: data,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: User["id"]) {
    try {
      const result = await prisma.user.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export default userServices;
