import { Schema, model, Types } from "mongoose";
import {INotification, IUser} from "../utils/common_interfaces";

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, default: new Types.ObjectId, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  alreadySent: { type: Boolean, required: true },
  transactionDetails: {type: Object},
  invoiceDetails: {type: Object},
  shippingDetails: {type: Object},
  paymentDetails: {type: Object},
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = model<INotification>("notification", notificationSchema);
