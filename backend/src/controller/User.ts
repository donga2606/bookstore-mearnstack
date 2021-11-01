import { Request, Response } from "express";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";
require("dotenv").config();
const secretKey: any = process.env.TOKEN_SECRET_KEY;

export default class UserCallback {
  static async get(req: Request, res: Response) {
    if (!req.user.isAdmin)
      return res.status(401).json({ error: "You must be an administrator!!!" });
    try {
      const payload = await UserModel.find().populate({
        path: "cart.orderBooks.book",
      });

      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      if (!req.user.isAdmin && req.params.id !== req.user._id.toString())
        return res
          .status(401)
          .json({ error: "You can only update your account" });
      if (!req.user.isAdmin && req.body.isAdmin)
        return res
          .status(401)
          .json({ error: "You do not have authorized to change your role" });
      Object.assign(req.user, req.body);
      const payload = await req.user.save();

      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    if (!req.user.isAdmin || req.params.id !== req.user._id) {
      return res
        .status(401)
        .json({ error: "You can only delete your account" });
    }
    try {
      const userID = req.params.id;
      const payload = await UserModel.deleteOne({ _id: userID });
      return { success: true, data: payload };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
