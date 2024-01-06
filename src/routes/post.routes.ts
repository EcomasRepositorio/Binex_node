import { Router } from "express";
import { showAllPosts, createPost, updatePost, deletePost } from "../controllers/posts.controllers";
import { pagination } from "../utils/pagination.server";
import { adminRole } from "../middlewares/role.middlewares";
import { authenticate } from "../middlewares/auth.middlewares";

export const postRoute = Router();

postRoute.get("/posts", showAllPosts)
postRoute.post("/post", createPost)
postRoute.put("/post/:id", updatePost)
postRoute.delete("/post/:id", deletePost)