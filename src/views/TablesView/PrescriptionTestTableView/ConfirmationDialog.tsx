import React, { useEffect, useState } from 'react';
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
import { useMarkPrescriptionTestAsPaidMutation } from '../../../generated/graphql';
import { PrescriptionTest } from '.';
import PriceStepper from './PriceStepper';

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

export type CheckInPrice = { name: string; paid: number; remaining: number };
interface ConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prescription: PrescriptionTest;
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  prescription
}) => {
  const classes = useStyles();
  const [checkInPrices, setCheckInPrices] = useState<CheckInPrice[]>();

  useEffect(() => {
    console.log(open);
    if (!open) return;
    console.log(checkInPrices);
    setCheckInPrices(undefined);
    prescription.result.forEach(prescription => {
      const checkInPrice = {
        name: prescription.name,
        remaining: prescription.checkIn.reduce(
          (prevValue, currentCheckIn) => prevValue + currentCheckIn.price,
          0
        ),
        paid: 0
      };
      setCheckInPrices(prevCheckInPrices =>
        !prevCheckInPrices
          ? [checkInPrice]
          : [...prevCheckInPrices, checkInPrice]
      );
    });
  }, [open]);

  const [markPrescriptionTestAsPaid] = useMarkPrescriptionTestAsPaidMutation();
  console.log(prescription);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = () => {
    markPrescriptionTestAsPaid({ variables: { id: prescription.id } });
    setOpen(false);
  };

  return (
    <Dialog className={classes.root} onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography variant="h6">
          Verify Payment for {prescription.card?.name}
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
          The Prescription for {prescription.card?.name} Costs a total of{' '}
          {prescription.price} birr
        </Typography>
        <Typography variant="body1" gutterBottom>
          Paid(
          {checkInPrices?.reduce(
            (prevPrice, currentCheckInPrices) =>
              prevPrice + currentCheckInPrices.paid,
            0
          )}
          ) Remaining(
          {checkInPrices?.reduce(
            (prevPrice, currentCheckInPrices) =>
              prevPrice + currentCheckInPrices.remaining,
            0
          )}
          )
        </Typography>
        <Typography gutterBottom></Typography>
        {prescription.result.map(({ checkIn, name }) => (
          <PriceStepper
            checkIn={checkIn}
            checkInPrices={checkInPrices}
            setCheckInPrices={setCheckInPrices}
            name={name}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSuccess} color="primary">
          Payment Successful
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
