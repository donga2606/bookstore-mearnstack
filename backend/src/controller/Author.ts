import { Request, Response } from "express";
import { AuthorModel } from "../models";
import { BookModel } from "../models";
import logQueryMongoose from "../utils/printQueryMongoose";
import { getAllRecords, setHeader } from "../utils/useInCallBack";
require("dotenv").config();

interface ResponseType {
  success: boolean;
  data: any;
}

export default class AuthorCallback {
  static async get(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const payload = await getAllRecords(AuthorModel, "books");
      setHeader(res, payload, "author");
      return res.json({
        success: true,
        data: payload,
      });
    } catch (err) {
      return res.status(500);
    }
  }
  static async getById(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;
      const payload = await AuthorModel.findById(_id)
        .populate("books")
        .lean({ virtuals: true });
      return res.json({
        success: true,
        data: payload,
      });
    } catch (err) {
      return res.status(500);
    }
  }
  static async post(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const { name, about } = req.body;
      const books = req.body.books_ids;
      const payload = await AuthorModel.create({
        name,
        about,
        books,
      });
      console.log("payload post author:", payload);
      for (let book of payload.get("books")) {
        await BookModel.findOneAndUpdate(
          { _id: book._id },
          { author: payload._id },
          { new: true },
          logQueryMongoose
        );
      }
      return res.json({
        success: true,
        data: payload,
      });
    } catch {
      return res.status(500);
    }
  }
  static async update(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;
      console.log(req.body.books_ids);

      const payload = await AuthorModel.findOneAndUpdate(
        {
          _id,
        },
        { ...req.body, books: req.body.books_ids },
        { new: true },
        logQueryMongoose
      );
      if (payload) {
        for (let bookID of payload.books) {
          await BookModel.findOneAndUpdate(
            { _id: bookID },
            { author: payload._id },
            { new: true }
          );
        }
      }

      return res.json({
        success: true,
        data: payload,
      });
    } catch {
      return res.status(500);
    }
  }

  static async delete(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;
      const payload = await AuthorModel.findByIdAndRemove(_id);
      return res.json({ success: true, data: payload });
    } catch (err) {
      return res.status(500);
    }
  }
}
