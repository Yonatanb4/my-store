import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { getErrorMessage, reportError } from "../utils/error_utils";

export class AccountController {
  public static async getUsersData(req: Request, res: Response): Promise<void> {
    // Retrieve user data based on user IDs
    try {
      const userId = req.params.userId;
      const user = await UserModel.findOne({ userID: userId });

      if (user) {
        const userObj = user.toObject()
        // User found
        res.json({ data: userObj, status: 200 });
      } else {
        // User not found
        res.json({ message: "User not found", status: 404 });
      }
    } catch (error) {
      // Handle errors
      reportError({ message: getErrorMessage(error) });
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}
