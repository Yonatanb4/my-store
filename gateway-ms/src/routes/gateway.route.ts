// gateway.route.ts

import { Router } from "express";
import { GatewayController } from "../controllers/gatewayController";

const router = Router();

// Define client routes
router.get("/user/:userId", GatewayController.getUserById);
router.post("/transactions", GatewayController.getTransactions);
router.post("/transactions/execute", GatewayController.sendTransaction);

export default router;
