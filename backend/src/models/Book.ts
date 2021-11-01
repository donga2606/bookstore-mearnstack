import { Schema, Document } from "mongoose";
import defaultType from "../utils/defaultType";

const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
interface BookDoc extends Document {
  name: string;
  description: string;
  created_date: Date;
  quantity_remain: number;
  price: number;
  reviews: Array<Object>;
  author: Schema.Types.ObjectId;
  image: string;
  authorname: string;
}

export { BookDoc };

const BookSchema = new Schema<BookDoc>({
  name: defaultType.string,
  description: defaultType.string,
  created_date: defaultType.date_now,
  quantity_remain: defaultType.number,
  price: defaultType.number,
  reviews: defaultType.bookReviews,
  author: { type: Schema.Types.ObjectId, ref: "Author" },
  image: defaultType.string,
  authorname: defaultType.string,
});

BookSchema.set("toJSON", { virtuals: true });

BookSchema.virtual("id").get(function (this: BookDoc) {
  return this._id;
});

BookSchema.virtual("authorID").get(function (this: any) {
  return this.author._id || this.author;
});

BookSchema.plugin(mongooseLeanVirtuals);

export default BookSchema;
