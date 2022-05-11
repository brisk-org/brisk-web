import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

interface AlertDialogProps {
  dialogText: string;
  state: {
    dialogToggle: boolean;
    setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
    setProceedToAction: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
const AlertDialog: React.FC<AlertDialogProps> = ({
  dialogText,
  state: { dialogToggle, setDialogToggle, setProceedToAction }
}) => {
  const handleCancel = () => {
    setDialogToggle(false);
  };
  const handleContinue = async () => {
    setDialogToggle(false);
    setProceedToAction(true);
  };

  return (
    <Dialog
      open={dialogToggle}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Selected Card?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleContinue} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
