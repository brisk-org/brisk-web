import React, { useContext, useEffect, useState } from 'react';
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
  CheckInInput,
  Occupation,
  PerDay,
  PrescriptionsQuery,
  useMarkPrescriptionAsPaidMutation,
  useUpdatePrescriptionCheckInMutation
} from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';
import MedicationStepper from './MedicationStepper';

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
  completed: number;
  paid: number;
  remaining: number;
  paidToday: number;
  checkIn: CheckInInput[];
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

  const { occupation } = useContext(AuthContext);
  const [medicationsCheckIn, setMedicationsCheckIn] = useState<
    PrescriptionCheckIns[]
  >();

  useEffect(() => {
    if (!open) return;
    setMedicationsCheckIn(
      prescription.medications?.map(medication => ({
        name: medication.medicine.name,
        remaining: medication.checkIn.reduce(
          (prevPrice, medication) =>
            !medication.status.some(status => status.isPaid)
              ? prevPrice + medication.price
              : prevPrice,
          0
        ),
        perDay: medication.perDay,
        paid: medication.checkIn.reduce(
          (prevPrice, medication) =>
            medication.status.some(status => status.isPaid)
              ? prevPrice + medication.price
              : prevPrice,
          0
        ),
        paidToday: 0,
        completed: 0,
        checkIn: medication.checkIn.map(checkIn => {
          return {
            date: checkIn.date,
            price: checkIn.price,
            status: checkIn.status.map(status => ({
              isPaid: status.isPaid,
              isCompleted: status.isCompleted
            }))
          };
        })
      }))
    );
  }, [open, prescription.medications]);

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
    if (!medicationsCheckIn) {
      return;
    }
    await updatePrescriptionCheckIn({
      variables: {
        id: prescription.id,
        checkIn: medicationsCheckIn.map(
          medicationsCheckIn => medicationsCheckIn.checkIn
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
        <DialogContent dividers sx={{ minWidth: 400 }}>
          <Box textAlign="center">
            <IconButton
              className={classes.moneyIcon}
              size="medium"
              onClick={handleClose}
            >
              <AttachMoney fontSize="large" />
            </IconButton>
            <Typography gutterBottom>
              This is a Prescription for {prescription.card?.name}
              <Typography variant="body2" gutterBottom>
                Age {prescription.card?.age} | Gender{' '}
                {prescription.card?.gender}
              </Typography>
            </Typography>
          </Box>
          <Typography variant="body1">
            Costs a total of {prescription.price} birr
          </Typography>
          <Typography variant="body2">
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
            medicationsCheckIn.map(medicationCheckIn => {
              console.log(medicationCheckIn, prescription.medications);
              return occupation === Occupation['Reception'] ? (
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
              ) : (
                <MedicationStepper
                  prescriptionCheckIn={medicationCheckIn}
                  lastCheckIn={
                    prescription.medications?.find(
                      medication =>
                        medication.medicine.name === medicationCheckIn.name
                    )?.checkIn
                  }
                  setPrescriptionsCheckIn={setMedicationsCheckIn}
                />
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button
            // disabled={loadinag}
            disabled={false}
            autoFocus
            onClick={handleSuccess}
            color="primary"
          >
            {!loading ? 'Payment Successful' : 'Submitting...'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
