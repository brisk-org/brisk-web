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
import { AttachMoney, Close, Delete as DeleteIcon } from '@mui/icons-material';
// import { useMarkPrescriptionTestAsPaidMutation } from '../../../generated/graphql';
import PriceStepper from './PriceStepper';
import {
  CheckInInput,
  Occupation,
  PerDay,
  PrescriptionsQuery,
  useMarkPrescriptionAsCompletedMutation,
  useUpdatePrescriptionCheckInMutation
} from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';
import MedicationStepper from './MedicationStepper';
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
  strength: string;
  other: string;
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

  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);

  const { occupation } = useContext(AuthContext);
  const [medicationsCheckIn, setMedicationsCheckIn] = useState<
    PrescriptionCheckIns[]
  >();

  useEffect(() => {
    if (!open) return;
    setMedicationsCheckIn(
      prescription.medications?.map(medication => ({
        name: medication.medicine.name,
        strength: medication.strength || '',
        other: medication.other || '',
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
              paidAt: status.paidAt,
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

  const [markPrescriptionAsComplete] = useMarkPrescriptionAsCompletedMutation({
    variables: { id: prescription.id }
  });
  const handleCompletePrescription = async () => {
    await markPrescriptionAsComplete();
    handleClose();
  };

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
        medicationsCheckIn: medicationsCheckIn.map(medicationsCheckIn => ({
          name: medicationsCheckIn.name,
          checkIn: medicationsCheckIn.checkIn
        }))
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
            Total amount of {prescription.price} birr
          </Typography>
          <Typography variant="body2">
            Completed(
            {medicationsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.completed,
              0
            )}{' '}
            medicine) Remaining: (
            {medicationsCheckIn?.reduce(
              (prevPrice, currentCheckInPrices) =>
                prevPrice + currentCheckInPrices.remaining,
              0
            )}{' '}
            medicine)
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
                  perDay={
                    prescription.medications!.find(
                      medication =>
                        medication.medicine.name === medicationCheckIn.name
                    )!.perDay
                  }
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
          {occupation === Occupation['Nurse'] && (
            <Typography>{prescription.rx}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {occupation === Occupation['Nurse'] && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setCompleteDialogOpen(true)}
              startIcon={<DeleteIcon />}
            >
              Mark As Completed
            </Button>
          )}
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            variant="outlined"
            disabled={loading}
            autoFocus
            onClick={handleSuccess}
            color="primary"
          >
            {!loading ? 'Confirm' : 'Submitting...'}
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        title="Complete Prescription"
        open={completeDialogOpen}
        handleClose={() => setCompleteDialogOpen(false)}
        handleConfirm={handleCompletePrescription}
      >
        This action cant' be undone
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialog;
