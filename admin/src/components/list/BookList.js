import {
  ArrayField,
  Datagrid,
  DateField,
  DeleteButton,
  ImageField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import React from "react";
import ListActions from "./ListAction";

const CustomContentField = ({ record }) => {
  let str = record.content.trim();
  return record ? (
    <span>{str.length > 20 ? str.slice(0, 20) + "..." : str}</span>
  ) : null;
};

const BookList = (props) => {
  return (
    <List {...props} actions={<ListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="name" label="Name" />
        <ReferenceField source="authorID" reference="author" label="Author">
          <TextField label="Name" source="name" />
        </ReferenceField>
        <DateField source="created_date" />
        <NumberField source="quantity_remain" />
        <NumberField source="price" />
        <ArrayField source="reviews">
          <Datagrid>
            <CustomContentField source="content" />
            <TextField source="reviewer" />
          </Datagrid>
        </ArrayField>
        <ImageField source="image" label="Image" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
export default BookList;
