import { Router } from "express";
import UserController from "../controllers/UsersController";

const router = Router();

router.post("/create-user", UserController.newUser);

export default router;
