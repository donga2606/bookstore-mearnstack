import defaultType from "../utils/defaultType";
import { Schema, Document } from "mongoose";
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

import mongoose from "mongoose";
import { BookDoc } from "./Book";

interface AuthorDoc extends Document {
  name: string;
  about: string;
  books: Array<Schema.Types.ObjectId>;
}
const AuthorSchema = new Schema<AuthorDoc>({
  name: defaultType.string,
  about: defaultType.string,
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

AuthorSchema.set("toJSON", { virtuals: true });

AuthorSchema.virtual("id").get(function (this: AuthorDoc) {
  return this._id;
});

AuthorSchema.virtual("books_ids").get(function (this: any) {
  return this.books.map((book: BookDoc) => book.id) || this.books;
});

AuthorSchema.plugin(mongooseLeanVirtuals);

export { AuthorDoc };

export default AuthorSchema;
