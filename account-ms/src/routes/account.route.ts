import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const router = Router();

router.get("/user/:userId", AccountController.getUsersData);
export default router;
