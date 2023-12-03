import {Document} from "mongoose";

export interface ITransaction {
  userId: string;
  amount: number;
  transactionId: string;
  status: "pending" | "success" | "rejected";
  currency: Currency;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IProduct extends Document {
  productDescription: string;
  amount: number;
}

export interface IRequestTransaction extends Document {
  userId: string;
  cart: [IProduct];
  currency: Currency;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TransactionQuery {
  transactionType: "sent" | "received" | "all";
  startDate: string;
  endDate: string;
  page: string;
  limit: string;
}

export type Currency = "ils" | "usd" | "euro";
