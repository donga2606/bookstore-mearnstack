import React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  ReferenceArrayInput,
  SelectArrayInput,
  BooleanInput,
  Create,
} from "react-admin";
const ListCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />

        <BooleanInput source="show" label="Show" />
        <ReferenceArrayInput source="books_ids" reference="book">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <TextInput source="image" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};

export default ListCreate;
