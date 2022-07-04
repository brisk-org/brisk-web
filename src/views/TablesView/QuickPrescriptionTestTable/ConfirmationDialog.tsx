import React from 'react';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Dialog,
  Button,
  Box,
  colors
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AttachMoney, Close } from '@mui/icons-material';
import {
  QuickPrescriptionQuery,
  useMarkQuickPrescriptionAsPaidMutation
} from '../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  moneyIcon: {
    margin: '10px auto',
    color: theme.palette.success.main,
    background: colors.green[100]
  }
}));
interface ConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prescription: QuickPrescriptionQuery['quickPrescription'][0];
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  prescription
}) => {
  const classes = useStyles();

  const [markQuickPrescriptionAsPaid] = useMarkQuickPrescriptionAsPaidMutation({
    onError: err => console.log(err)
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = async () => {
    await markQuickPrescriptionAsPaid({ variables: { id: prescription.id } });
    setOpen(false);
  };

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle>
        <Typography variant="h6">
          Verify Payment for {prescription.name}
        </Typography>
        <IconButton
          className={classes.closeButton}
          size="medium"
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box textAlign="center">
          <IconButton
            className={classes.moneyIcon}
            size="medium"
            onClick={handleClose}
          >
            <AttachMoney fontSize="large" />
          </IconButton>
        </Box>
        <Typography gutterBottom>
          {prescription.completed
            ? `The Prescription for ${prescription.name} Costs
          ${prescription.price} birr`
            : `Wait until the Nurse completes the test`}
        </Typography>
      </DialogContent>
      <DialogActions>
        {prescription.completed && (
          <Button autoFocus onClick={handleSuccess} color="primary">
            Payment Successful
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
