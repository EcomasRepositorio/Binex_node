import { Router } from "express";
import { removeUser, showAllUser,updateUser } from "../controllers/user.controllers";
import { authenticate } from "../middlewares/auth.middlewares";

export const userRoute = Router();

userRoute.get("/users", showAllUser)
userRoute.put("/user/:id", updateUser)
userRoute.delete("/user/:id", removeUser)