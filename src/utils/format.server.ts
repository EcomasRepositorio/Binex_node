import { User, Profile } from "@prisma/client"

export type userPick = Pick<
  User,
  "email" | "password" | "role">;

export type loginPick = Pick<
  User,
  "email" | "password">;

  export type userProfilePick = Pick<
  User & Profile,
  | "email"
  | "password"
  | "role"
  | "first_name"
  | "last_name"
  | "phone"
  | "image"
  | "age">;