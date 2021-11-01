import { Request, Response } from "express";

import logQueryMongoose from "../utils/printQueryMongoose";
import { getAllRecords, setHeader } from "../utils/useInCallBack";
import { BookModel } from "../models";
import { AuthorModel } from "../models";

interface ResponseType {
  success: boolean;
  data: any;
}

export default class BookCallback {
  static async get(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const payload = await getAllRecords(BookModel, "author");
      setHeader(res, payload, "book");
      return res.json({
        success: true,
        data: payload,
      });
    } catch (err) {
      return res.status(500);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      const payload = await BookModel.findById(_id)
        .populate("author")
        .lean({ virtuals: true });
      return res.json({
        success: true,
        data: payload,
      });
    } catch {
      res.status(500);
    }
  }
  static async post(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        author: req.body.authorID,
      };
      console.log(data);
      const payload = await BookModel.create(data);
      await AuthorModel.findOneAndUpdate(
        { _id: payload.author },
        { $addToSet: { books: payload._id } },
        { new: true },
        logQueryMongoose
      );

      return res.json({
        success: true,
        data: payload,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async update(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;
      const data = {
        ...req.body,
        author: req.body.authorID,
      };
      const payload = await BookModel.findOneAndUpdate(
        {
          _id,
        },
        data,
        { new: true },
        logQueryMongoose
      ).lean({ virtuals: true });
      if (!payload) {
        throw res.status(404).json({ success: false, data: null });
      }

      await AuthorModel.findOneAndUpdate(
        { _id: payload.author },
        { $addToSet: { books: payload._id } },
        { new: true },
        logQueryMongoose
      );
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
      const payload = await BookModel.findByIdAndRemove(_id);
      return res.json({ success: true, data: payload });
    } catch (err) {
      return res.status(500);
    }
  }
}
