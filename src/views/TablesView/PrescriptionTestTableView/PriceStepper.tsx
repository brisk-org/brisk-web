import React, { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  IconButton,
  Typography,
  Step,
  StepLabel,
  Chip
} from '@mui/material';
import { PrescriptionCheckIn } from '../../../context/SettingContext';
import { format, isBefore, isToday, sub } from 'date-fns';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { PrescriptionCheckIns } from './ConfirmationDialog';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  stepLabel: {
    '& .Mui-completed': {
      color: theme.palette.success.main
    }
  }
}));
interface Props {
  prescriptionCheckIn: PrescriptionCheckIns;
  lastCheckIn?: PrescriptionCheckIn[];
  // checkInPrices?: CheckInPrice[];
  setPrescriptionsCheckIn: React.Dispatch<
    React.SetStateAction<PrescriptionCheckIns[] | undefined>
  >;
  // setCheckInPrices: React.Dispatch<
  //   React.SetStateAction<CheckInPrice[] | undefined>
  // >;
}

const PriceStepper: React.FC<Props> = ({
  prescriptionCheckIn,
  lastCheckIn,
  setPrescriptionsCheckIn
}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(
    prescriptionCheckIn.checkIn.findIndex(checkIn => !checkIn.isPaid)
  );

  useEffect(() => {
    const paid = prescriptionCheckIn.checkIn.reduce(
      (prevValue, currentCheckInEdit) =>
        currentCheckInEdit.isPaid
          ? prevValue + currentCheckInEdit.price
          : prevValue,
      0
    );
    const totalPrice = prescriptionCheckIn.checkIn.reduce(
      (prevValue, currentCheckInEdit) => prevValue + currentCheckInEdit.price,
      0
    );
    const paidToday = prescriptionCheckIn.checkIn.reduce(
      (prevPrice, currentCheckIn, index) =>
        lastCheckIn && !lastCheckIn[index].isPaid
          ? currentCheckIn.isPaid
            ? currentCheckIn.price + prevPrice
            : prevPrice
          : prevPrice,
      0
    );

    setPrescriptionsCheckIn(prevCheckInPrices =>
      prevCheckInPrices?.map(prevCheckInPrice =>
        prevCheckInPrice.name === prescriptionCheckIn.name
          ? {
              ...prevCheckInPrice,
              paid,
              paidToday: paidToday,
              remaining: totalPrice - paid
            }
          : { ...prevCheckInPrice }
      )
    );
  }, [activeStep]);

  const handleStepperClick = (index: number) => {
    if (lastCheckIn && lastCheckIn[index].isPaid) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === prescriptionCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map(
                (checkIn, checkInIndex) =>
                  checkInIndex > index
                    ? {
                        ...checkIn,
                        isPaid: false
                      }
                    : {
                        ...checkIn,
                        isPaid: true
                      }
              )
            }
          : { ...prevPrescriptionCheckIn }
      )
    );
    setActiveStep(index + 1);
  };

  const handleNext = () => {
    if (activeStep > prescriptionCheckIn.checkIn.length - 1) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === prescriptionCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) =>
                index === activeStep
                  ? { ...checkIn, isPaid: true }
                  : { ...checkIn }
              )
            }
          : {
              ...prevPrescriptionCheckIn
            }
      )
    );
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep < 1) return;
    if (lastCheckIn && lastCheckIn[activeStep - 1].isPaid) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === prescriptionCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) =>
                index === activeStep - 1
                  ? { ...checkIn, isPaid: false }
                  : { ...checkIn }
              )
            }
          : {
              ...prevPrescriptionCheckIn
            }
      )
    );
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        mt: 2,
        pl: 2,
        pt: 2,
        border: '1px solid lightgrey'
      }}
    >
      {prescriptionCheckIn.checkIn.length === activeStep && (
        <Chip
          size="small"
          label="All Paid"
          sx={{ borderRadius: '7px' }}
          color="success"
          variant="outlined"
        />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body2">
          {prescriptionCheckIn.name}{' '}
          <Typography variant="caption">
            ({prescriptionCheckIn.checkIn[0].perDay})
          </Typography>
          <Typography variant="caption" component="p">
            paid: (
            {
              // prescriptionCheckIn.find(prescriptionCheckIn => prescriptionCheckIn. === name)
              prescriptionCheckIn.paid
            }
            ) remaining: ({prescriptionCheckIn.remaining})
          </Typography>
          <Typography variant="caption" component="p">
            Paid Today: {prescriptionCheckIn.paidToday}
          </Typography>
        </Typography>
        <div>
          <IconButton onClick={handleBack} color="secondary">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleNext} color="primary">
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </div>
      </Box>
      <Stepper
        sx={{
          maxWidth: '400px',
          mt: 2,
          overflowX: 'scroll',
          width: '100%',
          mx: 'auto'
        }}
        alternativeLabel
      >
        {prescriptionCheckIn.checkIn.map((checkIn, index) => (
          <Step
            onClick={() => handleStepperClick(index)}
            sx={{ cursor: 'pointer' }}
            key={index}
            completed={checkIn.isPaid}
          >
            <StepLabel
              error={
                isBefore(
                  new Date(checkIn.date),
                  sub(new Date(), { hours: 1 })
                ) && !checkIn.isPaid
              }
              className={clsx({
                [classes.stepLabel]: lastCheckIn && !lastCheckIn[index].isPaid
              })}
              optional={
                isToday(new Date(checkIn.date)) && (
                  <Box textAlign="center">
                    <Typography variant="caption">(today)</Typography>
                  </Box>
                )
              }
            >
              <Typography variant="body2" color="gray">
                {format(new Date(checkIn.date), 'iii')}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button size="small" sx={{ textTransform: 'capitalize' }}>
          Confirm
        </Button>
      </Box> */}
    </Box>
  );
};

export default PriceStepper;
