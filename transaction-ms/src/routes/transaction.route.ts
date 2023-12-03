import { Router } from "express";
import container from "../config/awilix";
const { TransactionsController } = container.cradle;

const router = Router();
router.post("/transactions/", TransactionsController.getTransactions);
router.post("/transactions/execute", TransactionsController.executeTransaction);

export default router;
