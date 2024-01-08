import { Router } from "express";
import { showAllPosts, createPost, updatePost, deletePost } from "../controllers/posts.controllers";
import { validatePost } from "../middlewares/post.middlewares";
import { pagination } from "../utils/pagination.server";
import { adminRole } from "../middlewares/role.middlewares";
import { authenticate } from "../middlewares/auth.middlewares";

export const postRoute = Router();

postRoute.get("/posts", showAllPosts)
postRoute.post("/post",validatePost, createPost)
postRoute.put("/post/:id",validatePost, updatePost)
postRoute.delete("/post/:id", deletePost)