import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
const AuthorCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" validate={[required()]} />

        <RichTextInput source="about" label="About" validate={[required()]} />
        <ReferenceArrayInput source="books_ids" reference="book">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default AuthorCreate;
