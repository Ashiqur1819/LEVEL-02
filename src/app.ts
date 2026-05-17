import express, { type Application } from "express";
import { userRouter } from "./modules/user/user.route";
import { ProfileRouter } from "./modules/profile/profile.route";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/profiles", ProfileRouter)

export default app;
