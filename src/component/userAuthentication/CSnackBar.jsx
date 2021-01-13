import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
}

function CSnackbars({open, handleClose, type, message, duration}) {
  const close = (event, reason) => {
    if (reason === "clickaway")
      return;
    handleClose();
  };
  return (
    <Snackbar open={open} autoHideDuration={duration ? duration : 5000} onClose={close}>
      <Alert onClose={close} severity={type ? type : TYPE.INFO} elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

export {CSnackbars, TYPE};