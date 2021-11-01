import React from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
const BookCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" validate={[required()]} />
        <RichTextInput
          source="description"
          label="description"
          validate={[required()]}
        />
        <NumberInput source="quantity_remain" validate={[required()]} />
        <NumberInput source="price" label="Price" validate={[required()]} />
        <ArrayInput source="reviews">
          <SimpleFormIterator>
            s
            <TextInput source="content" label="Content" />
            <TextInput source="reviewer" label="Reviewer" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput label="Image" accept="image/*" source="image" />
        <ReferenceInput
          label="Author"
          source="authorID"
          validate={[required()]}
          reference="author"
        >
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default BookCreate;
