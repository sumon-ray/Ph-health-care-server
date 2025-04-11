import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/modules/user.routes";
const app: Application = express();
app.use(cors());

// parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// *********************************************
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "ph health care server",
  });
});

app.use("/api/v1", userRoutes);
export default app;
