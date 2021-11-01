import mongoose from "mongoose";
require("dotenv").config();

const connectDatabase = () => {
  mongoose.Promise = require("bluebird");

  mongoose
    .connect(process.env.URI_DB as string||"mongodb://localhost:27017/bookstore", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection created");
    })
    .catch((err) => {
      console.log("Error:/n", err);
    });
};

export default connectDatabase;
