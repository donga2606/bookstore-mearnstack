"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var defaultType_1 = __importDefault(require("../utils/defaultType"));
var mongooseLeanVirtuals = require("mongoose-lean-virtuals");
var BookSchema = new mongoose_1.Schema({
    name: defaultType_1.default.string,
    description: defaultType_1.default.string,
    created_date: defaultType_1.default.date_now,
    quantity_remain: defaultType_1.default.number,
    price: defaultType_1.default.number,
    reviews: defaultType_1.default.bookReviews,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "Author" },
    image: defaultType_1.default.string,
    authorname: defaultType_1.default.string,
});
BookSchema.set("toJSON", { virtuals: true });
BookSchema.virtual("id").get(function () {
    return this._id;
});
BookSchema.virtual("authorID").get(function () {
    return this.author._id || this.author;
});
BookSchema.plugin(mongooseLeanVirtuals);
exports.default = BookSchema;
