import app from "./routesmain";
import { prisma } from "./utils/prisma.server";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
// export const app = express();

app.use(cors({ origin: ["localhost:8000"] }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  prisma;
  res.status(200).json({
    message: "Wellcome to Binex API",
  });
});

export default app;