import React from 'react';
import { AlertColor, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

interface SnackbarSuccessProps {
  open: boolean;
  text: string;
  variant: AlertColor;
  handleClose: () => void;
}
const AlertSnackBar: React.FC<SnackbarSuccessProps> = ({
  handleClose,
  variant,
  open,
  text
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;
