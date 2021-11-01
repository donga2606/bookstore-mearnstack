import mongoose, { Schema } from "mongoose";
import BookSchema, { BookDoc } from "./Book";
import AuthorSchema, { AuthorDoc } from "./Author";
import ListSchema, { ListDoc } from "./List";
import UserSchema, { UserDoc } from "./User";

const BookModel = mongoose.model<BookDoc>("Book", BookSchema);
const AuthorModel = mongoose.model<AuthorDoc>("Author", AuthorSchema);
const ListModel = mongoose.model<ListDoc>("List", ListSchema);
const UserModel = mongoose.model<UserDoc>("User", UserSchema);

export { BookModel, AuthorModel, ListModel, UserModel };
