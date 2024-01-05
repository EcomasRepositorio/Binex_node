import express from "express";
import cors from "cors";
import morgan from "morgan";
import { handleError } from "./middlewares/error.middlewares";
import { postRoute } from "./routes/post.routes";
import { studentRoute } from "./routes/student.routes";

export const app = express();
//Development
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const prefix: string = "/api/v1";
//Routes
app.use(prefix, postRoute);
app.use(prefix, studentRoute);


//Middleware Error
app.use(handleError);

export default app;
