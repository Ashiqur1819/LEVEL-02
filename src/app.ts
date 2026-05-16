import express, { type Application } from "express";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRouter);

export default app;
