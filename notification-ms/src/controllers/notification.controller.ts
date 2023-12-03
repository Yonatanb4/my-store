import { Request, Response } from "express";
import { NotificationModel } from "../models/notification.model";
import { getErrorMessage, reportError } from "../utils/error_utils";
import {INotification} from "../utils/common_interfaces";

export class NotificationController {
  public static async sendNotification(req: Request, res: Response): Promise<void> {
    // Retrieve user data based on user IDs
    try {
      const mail = req.params.mail;
      const notification = await NotificationModel.findOne({ mail });

      if (notification && notification.alreadySent) {
        // todo send notification email
        // alreadySent = true;
        // User found
        res.json({ data: "notification sent", status: 200 });
      } else {
        // User not found
        res.json({ message: "email not found", status: 404 });
      }
    } catch (error) {
      // Handle errors
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public static async updateNotification(req: Request, res: Response): Promise<void> {
    // Retrieve user data based on user IDs
    try {
      const notification: INotification = await NotificationModel.updateOne({ req });

      if (notification.transactionDetails && notification.paymentDetails && notification.invoiceDetails && notification.shippingDetails){
        this.sendNotification(req, res);
      }


    } catch (error) {
      // Handle errors
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}
