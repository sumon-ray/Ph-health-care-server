import cors from "cors";
import express, { Application, Request, Response } from "express";
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

app.use("/api/v1",router)
export default app;
