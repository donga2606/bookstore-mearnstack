import { Document, Schema } from "mongoose";
import defaultType from "../utils/defaultType";
import OrderBookSchema, { OrderBookDoc } from "./OrderBook";
const bcrypt = require("bcrypt");
require("dotenv").config();

export interface UserDoc extends Document {
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  cart: { orderBooks: [typeof OrderBookSchema]; totalCash: number };
  validatePassword: () => void;
}

const UserSchema = new Schema<UserDoc>({
  email: defaultType.email,
  name: defaultType.string,
  password: defaultType.password,
  isAdmin: defaultType.booleanFalse,
  cart: { orderBooks: [OrderBookSchema], totalCash: defaultType.number },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw new Error();
    }
  }
  next();
});

UserSchema.pre("validate", async function (next) {
  if (this.isModified("cart")) {
    if (Object.keys(this.cart).length !== 0) {
      this.cart.orderBooks = <[typeof OrderBookSchema]>(
        this.cart.orderBooks.filter((item: any) => {
          return item.quantity > 0;
        })
      );
    }
  }
  next();
});

UserSchema.post("save", async function () {
  return await this.populate({ path: "cart.orderBooks.book" }).execPopulate();
});

UserSchema.methods.validatePassword = async function (password_input) {
  const validPassword = await bcrypt.compare(password_input, this.password);
};

export default UserSchema;
