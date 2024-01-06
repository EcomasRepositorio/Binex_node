import { PrismaClient, User } from "@prisma/client";
import { prisma } from "../utils/prisma.server";
import createError from 'http-errors';
import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";
import { signAccessToken } from "../utils/jwt.server";
import { Payload } from '../utils/format.server';
//const prisma = new PrismaClient();

interface Usuarios{
  id: number;
  email: string;
  password?: string; // Hacer la propiedad 'password' opcional
  // Otras propiedades...
}

class authServices {
  static async register(data: User ): Promise<User> {
    const { email, password } = data;

    if(!password) {
      throw createError.BadRequest('Password is required');
    }
    data.password = bcrypt.hashSync(data.password, 10);
    try {
    const user = await prisma.user.create({
      data,
    });
    console.log(user);
    data.token = await signAccessToken({ payload: user });

    return data;
  } catch (error) {
    throw createError.InternalServerError('Failed to register user')
  }
}

  static async login(data: { email: string; password: string }): Promise<any> {
  const { email, password } = data;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          firstName: true,
          lastName: true,
          role: true,
        }
      });
      console.log(user)
      if (!user) {
        throw new Error('User not registered');
      }

      const checkPassword = bcrypt.compareSync(password, user.password);
      console.log(checkPassword)
      if (!checkPassword) {
        throw new Error('Email address or password not valid');
      }

      // No es necesario eliminar 'usuarios.password' aquí
      //delete user.password

      const accessToken = await signAccessToken({ payload: user });

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        accessToken: accessToken,
      };
    } catch (error) {
      console.error(error);
      throw createError.Unauthorized('Error during login')
    }
    //return { ...user, accessToken };
  }

  static async all(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}

export default authServices;
