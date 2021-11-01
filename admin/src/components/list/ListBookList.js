import {
  BooleanField,
  ChipField,
  Datagrid,
  DeleteButton,
  ImageField,
  List,
  ReferenceArrayField,
  SingleFieldList,
  TextField,
} from "react-admin";
import React from "react";
import ListActions from "./ListAction";

const ListBookList = (props) => {
  return (
    <List {...props} actions={<ListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="title" label="Title" />
        <BooleanField label="Show" source="show" />
        <ReferenceArrayField
          label="Books"
          reference="book"
          source="books_ids"
          link="show"
        >
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ImageField source="image" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
export default ListBookList;
