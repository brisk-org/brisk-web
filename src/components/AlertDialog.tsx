import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

interface Props {
  title: string;
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
}
const AlertDialog: React.FC<Props> = ({
  title,
  open,
  handleConfirm,
  handleClose,
  children
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={e => {
            e.stopPropagation();
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={e => {
            e.stopPropagation();
            handleConfirm();
          }}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
