import {Request, Response} from "express";
import {IRequestTransaction, ITransaction, TransactionQuery,} from "../interfaces/common_interfaces";
import {TransactionsModel} from "../models/transaction.model";
import {getErrorMessage, reportError} from "../utils/error_utils";
import logger from "../utils/logger";
import {appConfig} from "../app";

export class TransactionsController {
  public async getTransactions(
    req: Request,
    res: Response
  ): Promise<void> {
    // Retrieve transactions based on filters such as transaction type, date range, page, limit and user ID
    try {
      const {
        transactionType,
        startDate,
        endDate,
        page,
        limit,
      }: TransactionQuery = req.body;

      const filter: { [key: string]: any } = {};
      const options: { [key: string]: any } = {};

      filter.type = transactionType;


      if (startDate && endDate) {
        const sDate = Date.parse(startDate);
        const eDate = Date.parse(endDate);
        filter.createdAt = { $gte: sDate, $lte: eDate };
      }

      options.skip = parseInt(limit) * (parseInt(page) - 1);
      options.limit = parseInt(limit);

      // Query and paginate results
      const transactions = await TransactionsModel.find(
        filter,
        null,
        options
      ).sort({ date: -1 });
      if (transactions.length) {
        res.json({ data: transactions, status: 200 });
      } else {
        res.json({ message: "No results found", status: 404 });
      }
    } catch (error) {
      // Handle errors
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async createTransaction(
    transactionDetails: ITransaction,
  ) {
    try {

    const newTransaction = await TransactionsModel.create(transactionDetails);
    // updateNotificationEvent()

    }catch (e) {
      throw new Error("\"Internal Server Error No Transaction has been created\"");
    }
  }


  public async executeTransaction(
    req: IRequestTransaction,
    res: Response
  ): Promise<void> {

    try {
      const totalAmount = await this.calculateTransactionAmount(req);

      const createTransactionRequest: ITransaction=  {
        userId: req.userId,
        amount: totalAmount,
        transactionId: "generate()",
        status: "pending",
        currency: req.currency,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = this.createTransaction(createTransactionRequest);

      this.createInvoice();

      this.createPaymentStripe();

      this.createShippingProcess();


    } catch (error) {

      logger.error({
        message: "Internal Server Error No Transaction has been executed",
      });
    }
  }

  private createInvoice() {
    // content of creating invoice
    // updateNotificationEvent()
  }

  private createShippingProcess() {
    // content of creating shipping
    // updateNotificationEvent()
  }

  private createPaymentStripe() {
    // content of charging
    // updateNotificationEvent()
  }

  public async calculateTransactionAmount(req: IRequestTransaction): Promise<number>{
    let totalAmount = 0;
    req.cart.forEach((product) => {
      totalAmount = totalAmount + product.amount;
    })
    return totalAmount;
  }

}
