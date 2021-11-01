"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var defaultType_1 = __importDefault(require("../utils/defaultType"));
var mongooseLeanVirtuals = require("mongoose-lean-virtuals");
var ListSchema = new mongoose_1.Schema({
    books: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Book" }],
    show: defaultType_1.default.boolean,
    image: defaultType_1.default.string,
    title: defaultType_1.default.string,
});
ListSchema.set("toJSON", { virtuals: true });
ListSchema.virtual("id").get(function () {
    return this._id;
});
ListSchema.virtual("books_ids").get(function () {
    return this.books.map(function (book) { return book.id; }) || this.books;
});
ListSchema.plugin(mongooseLeanVirtuals);
exports.default = ListSchema;
