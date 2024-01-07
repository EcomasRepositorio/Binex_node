import { Router } from "express";
import { createUser, removeUser, showAllUser } from "../controllers/user.controllers";

export const userRoute = Router();

userRoute.get("/users", showAllUser)
userRoute.post("user", createUser)
userRoute.delete("/user/:id", removeUser)