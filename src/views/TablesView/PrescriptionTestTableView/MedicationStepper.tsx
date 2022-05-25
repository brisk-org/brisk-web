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
import { PrescriptionsCheckIn } from './CompletePrescDialog';

const useStyles = makeStyles(theme => ({
  stepSuccess: {
    '& .Mui-completed': {
      color: theme.palette.success.main
    }
  }
}));
interface Props {
  prescriptionCheckIn: PrescriptionsCheckIn;
  lastCheckIn?: PrescriptionCheckIn[];
  // checkInPrices?: CheckInPrice[];
  setPrescriptionsCheckIn: React.Dispatch<
    React.SetStateAction<PrescriptionsCheckIn[] | undefined>
  >;
  // setCheckInPrices: React.Dispatch<
  //   React.SetStateAction<CheckInPrice[] | undefined>
  // >;
}

const MedicationStepper: React.FC<Props> = ({
  prescriptionCheckIn,
  lastCheckIn,
  setPrescriptionsCheckIn
}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(
    prescriptionCheckIn.checkIn.findIndex(checkIn => !checkIn.completed)
  );

  useEffect(() => {
    const completed = prescriptionCheckIn.checkIn.reduce(
      (count, checkIn) => (checkIn.completed ? count + 1 : count),
      0
    );

    setPrescriptionsCheckIn(prevCheckInPrices =>
      prevCheckInPrices?.map(prevCheckInPrice =>
        prevCheckInPrice.name === prescriptionCheckIn.name
          ? {
              ...prevCheckInPrice,
              completed,
              remaining: prescriptionCheckIn.checkIn.length - completed
            }
          : { ...prevCheckInPrice }
      )
    );
  }, [activeStep]);

  const handleStepperClick = (index: number) => {
    if (lastCheckIn && lastCheckIn[index].completed) return;

    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === prescriptionCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map(
                (checkIn, checkInIndex) => ({
                  ...checkIn,
                  completed: index >= checkInIndex
                })
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
                  ? { ...checkIn, completed: true }
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
    if (lastCheckIn && lastCheckIn[activeStep - 1].completed) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === prescriptionCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) =>
                index === activeStep - 1
                  ? { ...checkIn, completed: false }
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

  console.log(lastCheckIn);
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
          label="All completed"
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
            paid: ({prescriptionCheckIn.completed}) remaining: (
            {prescriptionCheckIn.remaining})
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
            sx={{ cursor: 'pointer', mx: 1 }}
            key={index}
            completed={checkIn.completed}
          >
            <StepLabel
              error={
                isBefore(
                  new Date(checkIn.date),
                  sub(new Date(), { hours: 1 })
                ) && !checkIn.completed
              }
              className={clsx({
                [classes.stepSuccess]:
                  lastCheckIn && !lastCheckIn[index].completed
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
    </Box>
  );
};

export default MedicationStepper;
