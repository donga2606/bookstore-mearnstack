import React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
const AuthorEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" validate={[required()]} />

        <RichTextInput source="about" label="About" validate={[required()]} />
        <ReferenceArrayInput source="books_ids" reference="book">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default AuthorEdit;
