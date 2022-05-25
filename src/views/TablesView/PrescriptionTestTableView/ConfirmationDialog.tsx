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
import { PrescriptionCheckIn } from '../../../context/SettingContext';
import AlertDialog from '../../../components/AlertDialog';

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

// export type CheckInPrice = { name: string; };
export type PrescriptionCheckIns = {
  name: string;
  paid: number;
  remaining: number;
  paidToday: number;
  checkIn: PrescriptionCheckIn[];
};
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

  const [alertDialogToggle, setAlertDialogToggle] = useState(false);
  const [proceedToAction, setProceedToAction] = useState(false);

  // const [checkInPrices, setCheckInPrices] = useState<CheckInPrice[]>();
  const [prescriptionsCheckIn, setPrescriptionsCheckIn] = useState<
    PrescriptionCheckIns[]
  >();

  useEffect(() => {
    if (!open) return;
    console.log(prescription.result);
    setPrescriptionsCheckIn(
      prescription.result.map(({ name, checkIn: checkInArray }) => ({
        name,
        remaining: checkInArray.reduce(
          (prevValue, currentCheckIn) => prevValue + currentCheckIn.price,
          0
        ),
        paid: 0,
        paidToday: 0,
        checkIn: checkInArray
          // .filter((checkIn, index) =>
          //   checkIn.perDay === 'bid' ? index % 2 === 1 : true
          // )
          .map(checkIn => ({
            ...checkIn,
            price: checkIn.perDay === 'bid' ? checkIn.price * 2 : checkIn.price
          }))
      }))
    );
  }, [open, prescription.result]);

  useEffect(() => {
    if (proceedToAction) {
      handleSuccess();
    }
  }, [proceedToAction]);

  const [
    markPrescriptionTestAsPaid,
    { loading }
  ] = useMarkPrescriptionTestAsPaidMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = async () => {
    await markPrescriptionTestAsPaid({
      variables: {
        id: prescription.id,
        result: prescription.result.map(result => {
          const currentCheckIn = prescriptionsCheckIn!.find(
            prescriptionsCheckIn => prescriptionsCheckIn.name === result.name
          )!.checkIn;

          const sortedCheckIn: PrescriptionCheckIn[] = [];
          if (currentCheckIn[0].perDay === 'bid') {
            for (let i = 0; i < currentCheckIn.length / 2; i++) {
              sortedCheckIn.push(currentCheckIn[i]);
              sortedCheckIn.push(
                currentCheckIn[Math.floor(currentCheckIn.length / 2 + i)]
              );
            }
          }
          return {
            ...result,
            checkIn: JSON.stringify(
              currentCheckIn[0].perDay === 'bid'
                ? sortedCheckIn
                : currentCheckIn
            )
          };
        }),
        done: prescriptionsCheckIn!.every(
          prescriptionCheckIn => prescriptionCheckIn.remaining === 0
        )
      }
    });
    setOpen(false);
  };

  return (
    <>
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
            {prescriptionsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.paid,
              0
            )}
            etb) Remaining: (
            {prescriptionsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.remaining,
              0
            )}
            etb)
          </Typography>
          <Typography variant="body2" gutterBottom>
            Paid Today: (
            {prescriptionsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.paidToday,
              0
            )}
            etb)
          </Typography>
          {prescriptionsCheckIn &&
            prescriptionsCheckIn.map(prescriptionCheckIn => (
              <PriceStepper
                prescriptionCheckIn={prescriptionCheckIn}
                lastCheckIn={
                  prescription.result.find(
                    presc => presc.name === prescriptionCheckIn.name
                  )?.checkIn
                }
                setPrescriptionsCheckIn={setPrescriptionsCheckIn}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            autoFocus
            onClick={() => setAlertDialogToggle(true)}
            color="primary"
          >
            {!loading ? 'Payment Successful' : 'Submitting...'}
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        dialogText="Are you sure you want to proceed?"
        state={{
          dialogToggle: alertDialogToggle,
          setDialogToggle: setAlertDialogToggle,
          setProceedToAction
        }}
      />
    </>
  );
};

export default ConfirmationDialog;
