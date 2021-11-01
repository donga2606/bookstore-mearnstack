import IBook from "./book";

interface IAuthor {
  name: string;
  about: string;
  books: string[] | IBook[];
}

export default IAuthor;
