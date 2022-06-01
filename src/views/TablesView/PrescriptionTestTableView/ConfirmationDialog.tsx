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
// import { useMarkPrescriptionTestAsPaidMutation } from '../../../generated/graphql';
import { PrescriptionTest } from '.';
import PriceStepper from './PriceStepper';
import { PrescriptionCheckIn } from '../../../context/SettingContext';
import AlertDialog from '../../../components/AlertDialog';
import {
  CheckIn,
  PerDay,
  PrescriptionsQuery,
  useMarkPrescriptionAsPaidMutation,
  useUpdatePrescriptionCheckInMutation
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

// export type CheckInPrice = { name: string; };
export type PrescriptionCheckIns = {
  name: string;
  perDay: PerDay;
  paid: number;
  remaining: number;
  paidToday: number;
  checkIn: CheckIn[];
};
interface ConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prescription: PrescriptionsQuery['prescriptions'][0];
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
  const [medicationsCheckIn, setMedicationsCheckIn] = useState<
    PrescriptionCheckIns[]
  >();

  useEffect(() => {
    if (!open) return;
    setMedicationsCheckIn(
      prescription.medications?.map(medication => ({
        name: medication.medicine.name,
        remaining: medication.medicine.price,
        perDay: medication.perDay,
        paid: 0,
        paidToday: 0,
        checkIn: medication.checkIn
      }))
    );
    console.log(medicationsCheckIn, prescription.medications);
  }, [open, prescription.medications]);

  useEffect(() => {
    if (proceedToAction) {
      handleSuccess();
    }
  }, [proceedToAction]);

  const [
    updatePrescriptionCheckIn,
    { loading }
  ] = useUpdatePrescriptionCheckInMutation();
  // const [
  //   markPrescriptionAsPaid,
  //   { loading }
  // ] = useMarkPrescriptionAsPaidMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = async () => {
    await updatePrescriptionCheckIn({
      variables: {
        id: prescription.id,
        checkIn: medicationsCheckIn!.map(({ checkIn }) => checkIn)
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
            {medicationsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.paid,
              0
            )}
            etb) Remaining: (
            {medicationsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.remaining,
              0
            )}
            etb)
          </Typography>
          <Typography variant="body2" gutterBottom>
            Paid Today: (
            {medicationsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.paidToday,
              0
            )}
            etb)
          </Typography>
          {medicationsCheckIn &&
            medicationsCheckIn.map(medicationCheckIn => (
              <PriceStepper
                prescriptionCheckIn={medicationCheckIn}
                lastCheckIn={
                  prescription.medications?.find(
                    medication =>
                      medication.medicine.name === medicationCheckIn.name
                  )?.checkIn
                }
                setPrescriptionsCheckIn={setMedicationsCheckIn}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            // disabled={loadinag}
            disabled={false}
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
