import { User } from "@prisma/client";
import { loginPick, userPick } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET;

export class authServices {

  // Registrar un 'USER' | 'ADMIN'
  static async register( data: User ) {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
    } = data;
      try {
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
    } catch (error) {
      throw error;
    }
  };

  // Realizar un LOGIN
  static async login(data: loginPick) {
    try {
      const { email, password } = data;
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
          firstName: true,
          lastName: true,
        },
      });
      if (!user) return false;
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) return null;
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Generar un TOKEN
  static getToken(data: userPick) {
    try {
      if (secret) {
        const token = jwt.sign(data, secret, { algorithm: "HS256" });
        console.log('Token generado:', token);
        return token;
      }
    } catch (error) {
      throw error;
    }
  }
}
export default authServices;