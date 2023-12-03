import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();

router.post("/user/:sendNotification", NotificationController.sendNotification);

export default router;
