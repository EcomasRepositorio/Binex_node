import { User, Post, Student, Prisma } from "@prisma/client"

export type userPick = Pick<
  User,
  "email" | "password" | "role">;

export type loginPick = Pick<
  User,
  "email" | "password">;

export type createPostPick = Pick<
  Post,
  | "description"
  | "image"
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
  | "description"
  | "image"
  | "authorId"
  | "createdAt"
>;

export type updateStudentPick = Pick<
  Student,
  | "DNI"
  | "name"
  | "code"
  | "activityAcademy"
  | "participation"
  | "Institute"
  | "hour"
  | "date"
>;

export type paginationInfo = {
  limit: number;
  offset: number;
}

export type errorProp = {
  errorDescription?: Prisma.PrismaClientKnownRequestError | any;
  errorContent?: string;
  status: number;
  message: string;
};