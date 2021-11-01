import {
  ChipField,
  Datagrid,
  DeleteButton,
  List,
  ReferenceArrayField,
  SingleFieldList,
  TextField,
} from "react-admin";
import React from "react";
import ListActions from "./ListAction";

const AuthorList = (props) => {
  return (
    <List {...props} actions={<ListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="name" label="Name" />
        <TextField source="about" label="About" />
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

        <DeleteButton />
      </Datagrid>
    </List>
  );
};
export default AuthorList;
