import {
  CreateButton,
  ExportButton,
  sanitizeListRestProps,
  TopToolbar,
  useListContext,
  Button,
} from "react-admin";
import React from "react";
import IconEvent from "@material-ui/icons/Event";

const ListActions = (props) => {
  const { className, filters, maxResults, ...rest } = props;
  const { total } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      <CreateButton />
      <ExportButton disabled={total === 0} maxResults={maxResults} />
      <Button
        onClick={() => {
          alert("Your custom action");
        }}
        label="Show calendar"
      >
        <IconEvent />
      </Button>
    </TopToolbar>
  );
};

export default ListActions;
