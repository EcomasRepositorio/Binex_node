import { Router } from "express";
import { removeUser, showAllUser,showUser,updateUser } from "../controllers/user.controllers";
import { authenticate } from "../middlewares/auth.middlewares";
import { adminRole } from "../middlewares/role.middlewares";

export const userRoute = Router();

userRoute.get("/user/:id", showUser)
userRoute.get("/users", showAllUser)
userRoute.put("/user/:id", updateUser)
userRoute.delete("/user/:id", removeUser)