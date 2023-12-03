import {Document} from "mongoose";

export interface IUser extends Document {
  userID: string;
  mail: string;
  name: string;
  ID: string;
  createdAt: Date;
  phoneNumber?: string;
}