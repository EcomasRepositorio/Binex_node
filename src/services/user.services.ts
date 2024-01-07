import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma.server";
import { updateUserPick } from "../utils/format.server";

export class userServices {
  static async getAll(
    take: number,
    skip: number
  ) {
    try {
      const result = await prisma.user.findMany({
        orderBy: { id: "desc" },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
        },
        take,
        skip,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create( data: User ) {
    const {
      email,
      role,
      firstName,
      lastName,
      phone,
      password,
    } = data;
      try {
      const verifyEmail = await prisma.user.findFirst({
        where: { email },
      });
      if (!verifyEmail) {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            role,
          },
        });
        return newUser;
      } else {
        return null;
      }
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
