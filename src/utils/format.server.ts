import { User, Post, Student, Prisma, Role } from "@prisma/client"

export type userPick = Pick<
  User,
  "email" | "password" | "role">;

export type loginPick = Pick<
  User,
  "email" | "password">;

export type createPostPick = Pick<
  Post,
  | "title"
  | "description"
  | "image"
  | "createdAt"
  | "authorId"
>;

export type updateUserPick = Pick<
  User,
  | "firstName"
  | "lastName"
  | "phone"
  | "role"
>;

export type updatePostPick = Pick<
  Post,
  | "title"
  | "description"
  | "image"
  | "authorId"
  | "createdAt"
>;

export type updateStudentPick = Pick<
  Student,
  | "documentNumber"
  | "name"
  | "code"
  | "activityAcademy"
  | "participation"
  | "institute"
  | "hour"
  | "date"
>;

export type paginationInfo = {
  limit: number;
  offset: number;
}

export type userInfo = {
  id: number;
  email: string;
  password?: string;
  role: Role;
  iat: number;
}

export type errorProp = {
  errorDescription?: Prisma.PrismaClientKnownRequestError | any;
  errorContent?: string;
  status: number;
  message: string;
};

export type Payload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

