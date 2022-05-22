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
import {
  PrescriptionCheckIn,
  PrescriptionSettingDataType
} from '../../../context/SettingContext';
import { format, isToday } from 'date-fns';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { CheckInPrice } from './ConfirmationDialog';

const useStyles = makeStyles(theme => ({
  stepLabel: {
    '& .Mui-active': {
      color: theme.palette.success.main
    }
  }
}));

interface Props {
  name: string;
  checkIn: PrescriptionCheckIn[];
  checkInPrices?: CheckInPrice[];
  setCheckInPrices: React.Dispatch<
    React.SetStateAction<CheckInPrice[] | undefined>
  >;
}

const PriceStepper: React.FC<Props> = ({
  checkIn: checkIns,
  name,
  checkInPrices,
  setCheckInPrices
}) => {
  const classes = useStyles();
  const [checkInEdit, setCheckInEdit] = useState(
    checkIns
      .filter((checkIn, index) =>
        checkIn.perDay === 'bid' ? index < checkIns.length / 2 : true
      )
      .map(checkIn => ({
        ...checkIn,
        price: checkIn.perDay === 'bid' ? checkIn.price * 2 : checkIn.price
      }))
  );

  const [activeStep, setActiveStep] = useState(
    checkIns.findIndex(checkIn => !checkIn.isPaid)
  );

  useEffect(() => {
    const paidPrice = checkInEdit.reduce(
      (prevValue, currentCheckInEdit) =>
        currentCheckInEdit.isPaid
          ? prevValue + currentCheckInEdit.price
          : prevValue,
      0
    );
    const totalPrice = checkInEdit.reduce(
      (prevValue, currentCheckInEdit) => prevValue + currentCheckInEdit.price,
      0
    );

    setCheckInPrices(prevCheckInPrices =>
      prevCheckInPrices?.map(prevCheckInPrice =>
        prevCheckInPrice.name === name
          ? {
              name: prevCheckInPrice.name,
              paid: paidPrice,
              remaining: totalPrice - paidPrice
            }
          : { ...prevCheckInPrice }
      )
    );
  }, [checkInEdit]);

  const handleClick = (index: number) => {
    setCheckInEdit(prevCheckIn =>
      prevCheckIn.map((checkIn, checkInIdx) =>
        index < checkInIdx
          ? { ...checkIn, isPaid: false }
          : { ...checkIn, isPaid: true }
      )
    );
    setActiveStep(index + 1);
  };

  const handleNext = () => {
    if (activeStep > checkInEdit.length - 1) return;
    setCheckInEdit(prevCheckIn =>
      prevCheckIn.map((checkIn, index) =>
        index === activeStep ? { ...checkIn, isPaid: true } : { ...checkIn }
      )
    );
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep < 1) return;
    setCheckInEdit(prevCheckIn =>
      prevCheckIn.map((checkIn, index) =>
        index === activeStep - 1
          ? { ...checkIn, isPaid: false }
          : { ...checkIn }
      )
    );
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  //   const handleSkip = () => {
  //     if (!isStepOptional(activeStep)) {
  //       // You probably want to guard against something like this,
  //       // it should never occur unless someone's actively trying to break something.
  //       throw new Error("You can't skip a step that isn't optional.");
  //     }

  //     setActiveStep(prevActiveStep => prevActiveStep + 1);
  //     setSkipped(prevSkipped => {
  //       const newSkipped = new Set(prevSkipped.values());
  //       newSkipped.add(activeStep);
  //       return newSkipped;
  //     });
  //   };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //   };
  return (
    <Box
      sx={{ width: '100%', mt: 2, pl: 2, pt: 2, border: '1px solid lightgrey' }}
    >
      {checkInEdit.length === activeStep && (
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
          {name}
          <Typography variant="caption" component="p">
            paid: (
            {
              checkInPrices?.find(checkInPrice => checkInPrice.name === name)
                ?.paid
            }
            ) remaining: (
            {
              checkInPrices?.find(checkInPrice => checkInPrice.name === name)
                ?.remaining
            }
            )
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
      <Stepper activeStep={activeStep} alternativeLabel>
        {checkInEdit.map((checkIn, index) => (
          <Step
            onClick={() => handleClick(index)}
            sx={{ cursor: 'pointer' }}
            key={index}
            completed={checkIn.isPaid}
          >
            <StepLabel
              color="secondary"
              className={classes.stepLabel}
              optional={
                isToday(new Date(checkIn.date)) && (
                  <Box textAlign="center">
                    <Typography variant="caption">(today)</Typography>
                  </Box>
                )
              }
            >
              {format(new Date(checkIn.date), 'iii')}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box></Box>
    </Box>
  );
};

export default PriceStepper;
