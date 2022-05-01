import React from 'react';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import { Alert } from '@mui/material';

interface SnackbarSuccessProps {
  open: boolean;
  text: string;
  handleClose:
    | ((
        event: Event | React.SyntheticEvent<Element, Event>,
        reason?: SnackbarCloseReason
      ) => void)
    | undefined;
}
const SnackbarSuccess: React.FC<SnackbarSuccessProps> = ({
  handleClose,
  open,
  text
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarSuccess;
