import React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceArrayInput,
  SelectArrayInput,
  BooleanInput,
  ImageField,
} from "react-admin";
const ListEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />

        <BooleanInput source="show" label="Show" />
        <ReferenceArrayInput source="books_ids" reference="book">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <TextInput source="image" accept="image/*" />
        <ImageField source="image" label="Using Logo" />
      </SimpleForm>
    </Edit>
  );
};

export default ListEdit;
