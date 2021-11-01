"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultType_1 = __importDefault(require("../utils/defaultType"));
var mongoose_1 = require("mongoose");
var mongooseLeanVirtuals = require("mongoose-lean-virtuals");
var AuthorSchema = new mongoose_1.Schema({
    name: defaultType_1.default.string,
    about: defaultType_1.default.string,
    books: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Book" }],
});
AuthorSchema.set("toJSON", { virtuals: true });
AuthorSchema.virtual("id").get(function () {
    return this._id;
});
AuthorSchema.virtual("books_ids").get(function () {
    return this.books.map(function (book) { return book.id; }) || this.books;
});
AuthorSchema.plugin(mongooseLeanVirtuals);
exports.default = AuthorSchema;
