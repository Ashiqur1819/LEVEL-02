import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.getUpdateUser);
router.delete("/:id", userController.deleteUserByID);

export const userRouter = router;
