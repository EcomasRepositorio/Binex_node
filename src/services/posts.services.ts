import { Post, User } from "@prisma/client";
import { prisma } from "../utils/prisma.server";
import { createPostPick, updatePostPick } from "../utils/format.server";

export class postService {
  static async getAll ( take: number, skip: number ) {
    try {
      const result = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take,
        skip,
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            }
          }
        },
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create ({ title, description, image }: createPostPick, authorId: User["id"]) {
    try {
      const result = await prisma.post.create({
        data: {
          title,
          description,
          image,
          author: { connect: { id: authorId } },
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: Post["id"],
  { title, description }: updatePostPick
  ) {
    try {
      const result = await prisma.post.update({
        where: { id },
        data: {
          title,
          description,
        },
        select: {
          id: true,
          title: true,
          description: true,
          authorId: true,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: Post["id"]) {
    try {
      const result = await prisma.post.delete({
        where: { id }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}