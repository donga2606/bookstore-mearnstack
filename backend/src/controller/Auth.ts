import { Request, Response } from "express";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";
require("dotenv").config();
const secretKey: any = process.env.TOKEN_SECRET_KEY;
const bcrypt = require("bcrypt");

export default class AuthCallback {
  static async register(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .json({ error: "Please enter a valid email or password" });
    }
    try {
      const oldUser = await UserModel.findOne({ email: req.body.email });

      if (oldUser) {
        return res.status(409).json({
          error: "User Already Exist. Please login or choose another email",
        });
      }

      const newUser = new UserModel(req.body);

      const payload = await newUser.save();

      const token = jwt.sign({ user_id: newUser._id }, secretKey);

      console.log(token);

      return res.json({ success: true, data: payload, token });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(404).json({ error: "Invalid email or password" });
      }

      const user = await UserModel.findOne({ email }).populate({
        path: "cart.orderBooks.book",
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id }, secretKey, {
          expiresIn: "1d",
        });
        return res.status(200).json({ success: true, data: user, token });
      }

      return res.status(400).send({ error: "wrong email or password" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async accessToken(req: Request, res: Response) {
    const payload = await req.user
      .populate({ path: "cart.orderBooks.book" })
      .execPopulate();
    const token = jwt.sign({ user_id: req.user._id }, secretKey);
    return res.status(200).json({ success: true, data: req.user, token });
  }
}
