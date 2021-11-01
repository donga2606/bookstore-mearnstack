import { Document, Schema } from "mongoose";
import defaultType from "../utils/defaultType";

export interface OrderBookDoc extends Document {
  book: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

const OrderBookSchema = new Schema<OrderBookDoc>({
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  quantity: { type: Number, min: 1 },
  totalPrice: defaultType.number,
});

export default OrderBookSchema;
