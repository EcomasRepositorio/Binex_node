import { Router } from "express";
import { showAllPosts, createPost, updatePost, deletePost } from "../controllers/posts.controllers";

export const postRoute = Router();

postRoute.get("/posts", showAllPosts)
postRoute.post("/post", createPost)
postRoute.put("/post/:id", updatePost)
postRoute.delete("/post/:id", deletePost)