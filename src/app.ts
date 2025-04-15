import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware.ts/globalErrorHandler";
import router from "./routes";
const app: Application = express();
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// *********************************************
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "ph health care server",
  });
});

// bad practice // worst when multiple routes will be added
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/admin", adminRouter);

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
    error: {
      path: req.originalUrl,
      message: "your requested path is not found",
    },
  });
});

export default app;
