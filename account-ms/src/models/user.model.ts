import { Schema, model, Types } from "mongoose";
import { IUser } from "../utils/common_interfaces";

const userSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, default: new Types.ObjectId, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  ID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  phoneNumber: { type: String },
});

export const UserModel = model<IUser>("User", userSchema);
