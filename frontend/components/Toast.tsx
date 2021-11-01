import { Alert, Snackbar } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import ACTIONS from "../controller/store/actions";
import { DataContext } from "../controller/store/globalstate";

const Toast: FC = function () {
  const { state, dispatch } = useContext(DataContext);

  const { notify } = state;

  const handleClose = function () {
    dispatch({ type: ACTIONS.NOTIFY, payload: {} });
  };

  const [open, setOpen] = useState(false);
  const [test, setTest] = useState(true);

  useEffect(() => {
    if (Object.keys(notify).length !== 0) setOpen(true);
    if (Object.keys(notify).length === 0) setOpen(false);
  }, [notify]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
};
export default Toast;
