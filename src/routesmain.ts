import express from "express";
import cors from "cors";
import morgan from "morgan";
import { handleError } from "./middlewares/error.middlewares";
import { postRoute } from "./routes/post.routes";
import { studentRoute } from "./routes/student.routes";
import { authhRouter } from "./routes/authh.routes";
import { authRoutes } from "./routes/auth.routes";

export const app = express();
//Development
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const prefix: string = "/api/v1";
//Routes
app.use(prefix, postRoute);
app.use(prefix, studentRoute);

//app.use(prefix, authhRouter);
app.use(prefix, authRoutes);

//Middleware Error
app.use(handleError);

export default app;
