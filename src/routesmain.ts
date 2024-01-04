import express from "express";
import cors from "cors";
import morgan from "morgan";
//import { handleError } from "./middlewares/error.middlewares";


export const app = express();
//Development
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const prefix: string = "/api/v1";
//Routes


//Middleware Error

export default app;
