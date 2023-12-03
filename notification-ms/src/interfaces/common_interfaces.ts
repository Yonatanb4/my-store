import {Document} from "mongoose";

export interface IUser extends Document {
  userID: string;
  mail: string;
  name: string;
  ID: string;
  createdAt: Date;
  phoneNumber?: string;
}

export interface INotification {
  userId: string;
  mail: string,
  name: string,
  alreadySent: boolean,
  transactionDetails: {},
  invoiceDetails: {},
  shippingDetails: {},
  paymentDetails: {},
  createdAt: Date;
}
