import { Router } from "express";
import { login } from "../controllers/auth.controllers";

const route = Router();

route.post("/auth/login", login);

export const authRoutes = route;