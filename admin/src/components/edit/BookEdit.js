import {
  ArrayInput,
  DateInput,
  Edit,
  ImageField,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import React from "react";
import RichTextInput from "ra-input-rich-text";
const BookEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" validate={[required()]} />
        <RichTextInput
          source="description"
          label="description"
          validate={[required()]}
        />
        <DateInput source="created_date" disabled />
        <NumberInput source="quantity_remain" validate={[required()]} />
        <NumberInput source="price" label="Price" validate={[required()]} />
        <ArrayInput source="reviews">
          <SimpleFormIterator>
            <TextInput source="content" label="Content" />
            <TextInput source="reviewer" label="Reviewer" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput label="Image" source="image" accept="image/*" />
        <ImageField source="image" />
        <ReferenceInput label="Author" source="authorID" reference="author">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export default BookEdit;
