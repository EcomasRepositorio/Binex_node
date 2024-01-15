import { Router } from "express";
import { removeUser, showAllUser,updateUser } from "../controllers/user.controllers";
import { authenticate } from "../middlewares/auth.middlewares";
import { adminRole } from "../middlewares/role.middlewares";

export const userRoute = Router();

userRoute.get("/users", authenticate, adminRole, showAllUser)
userRoute.put("/user/:id", authenticate, adminRole, updateUser)
userRoute.delete("/user/:id", authenticate, adminRole, removeUser)