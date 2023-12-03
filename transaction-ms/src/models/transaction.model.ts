import { Schema, Types, model } from 'mongoose';
import { ITransaction } from '../interfaces/common_interfaces';

const transactionsSchema = new Schema({
  transactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, default: new Types.ObjectId },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  currency: { type: String, enum: ['ils', 'usd', 'euro'], default:"ils" },
  status: { type: String, enum: ['pending', 'success', 'rejected'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now  }
});

export const TransactionsModel = model<ITransaction>('Transaction', transactionsSchema);
