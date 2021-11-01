import { Schema } from "mongoose";
import OrderBookSchema from "../models/OrderBook";

export interface OrderDoc{
    cart: {orderBooks: [typeof OrderBookSchema]}
    totalCash: number
    shippingAddress: string
}

export default new Schema({
    cart: {orderBooks: [OrderBookSchema]}
})