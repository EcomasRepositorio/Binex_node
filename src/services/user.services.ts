import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { userProfilePick } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";

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
          password: true,
          role: true,
          profile: true,
        },
        take,
        skip,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id: User["id"]) {
    try {
      const result = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async searchDoctor(name: string) {
    try {
      const result = await prisma.user.findMany({
        orderBy: { email: "asc" },
        where: {
          AND: [
            {
              OR: [
                {
                  email: { startsWith: name },
                },
                {
                  profile: { first_name: { startsWith: name } },
                },
                {
                  profile: { last_name: { startsWith: name } },
                },
              ],
            },
            {
              OR: [
                {
                  role: "ADMIN",
                },
                {
                  role: "USER",
                },
              ],
            },
          ],
        },
        select: {
          id: true,
          email: true,
          profile: true,
        },
        take: 20,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async search(name: string) {
    try {
      const result = await prisma.user.findMany({
        orderBy: { email: "asc" },
        where: {
          OR: [
            { email: { startsWith: name } },
            { profile: { first_name: { startsWith: name } } },
            { profile: { last_name: { startsWith: name } } },
          ],
        },
        select: {
          id: true,
          email: true,
          profile: true,
        },
        take: 20,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create({
    email,
    role,
    first_name,
    last_name,
    phone,
    image,
    password,
    age,
  }: userProfilePick ) {
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
            role,
          },
        });

        await prisma.profile.create({
          data: {
            first_name,
            last_name,
            age,
            phone,
            image,
            user: { connect: { id: newUser.id } },
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

  static async updateRole(id: User["id"], role: User["role"]) {
    try {
      const result = await prisma.user.update({
        where: { id },
        data: { role },
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
