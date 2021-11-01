import React from "react";
import { Admin, Resource } from "react-admin";
import AuthorCreate from "./components/create/AuthorCreate";
import BookCreate from "./components/create/BookCreate";
import ListCreate from "./components/create/ListCreate";
import AuthorEdit from "./components/edit/AuthorEdit";
import BookEdit from "./components/edit/BookEdit";
import ListEdit from "./components/edit/ListEdit";
import AuthorList from "./components/list/AuthorList";
import BookList from "./components/list/BookList";
import ListBookList from "./components/list/ListBookList";
import authProvider from "./controller/authProvider";
import baseDataProvider from "./controller/dataProvider/baseDataProvider";

function App() {
  return (
    <Admin dataProvider={baseDataProvider} authProvider={authProvider}>
      <Resource
        name="book"
        list={BookList}
        create={BookCreate}
        edit={BookEdit}
      />
      <Resource
        name="author"
        list={AuthorList}
        create={AuthorCreate}
        edit={AuthorEdit}
      />
      <Resource
        name="list"
        list={ListBookList}
        edit={ListEdit}
        create={ListCreate}
      />
    </Admin>
  );
}

export default App;
