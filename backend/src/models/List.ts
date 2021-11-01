import { Document, Schema } from "mongoose";
import defaultType from "../utils/defaultType";
import { BookDoc } from "./Book";

const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const ListSchema = new Schema({
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  show: defaultType.boolean,
  image: defaultType.string,
  title: defaultType.string,
});

interface ListDoc extends Document {
  title: string;
  show: boolean;
  books: Array<Schema.Types.ObjectId>;
  image: string;
}

ListSchema.set("toJSON", { virtuals: true });

ListSchema.virtual("id").get(function (this: ListDoc) {
  return this._id;
});

ListSchema.virtual("books_ids").get(function (this: any) {
    return this.books.map((book: BookDoc) => book.id) || this.books;
  });

ListSchema.plugin(mongooseLeanVirtuals)

export { ListDoc };
export default ListSchema
