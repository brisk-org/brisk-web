import React from 'react';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import { Alert } from '@mui/material';

interface SnackbarErrorProps {
  open: boolean;
  text: string;
  handleClose:
    | ((
        event: Event | React.SyntheticEvent<Element, Event>,
        reason?: SnackbarCloseReason
      ) => void)
    | undefined;
}
const SnackbarError: React.FC<SnackbarErrorProps> = ({
  handleClose,
  open,
  text
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarError;
