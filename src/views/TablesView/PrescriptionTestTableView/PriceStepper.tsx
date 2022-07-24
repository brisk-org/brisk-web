import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Stepper,
  IconButton,
  Typography,
  Step,
  StepLabel,
  Chip,
  StepIcon
} from '@mui/material';
import { format, isBefore, isToday, sub } from 'date-fns';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Star
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { PrescriptionCheckIns } from './ConfirmationDialog';
import clsx from 'clsx';
import { CheckIn, Occupation, PerDay } from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  stepSuccess: {
    '& .Mui-completed': {
      color: theme.palette.success.main
    }
  }
}));
interface Props {
  prescriptionCheckIn: PrescriptionCheckIns;
  lastCheckIn?: CheckIn[];
  setPrescriptionsCheckIn: React.Dispatch<
    React.SetStateAction<PrescriptionCheckIns[] | undefined>
  >;
}

const PriceStepper: React.FC<Props> = ({
  prescriptionCheckIn: medicationsCheckIn,
  lastCheckIn,
  setPrescriptionsCheckIn
}) => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);

  const [activeStep, setActiveStep] = useState(
    medicationsCheckIn.checkIn.findIndex(checkIn => !checkIn.status[0].isPaid)
  );
  useEffect(() => {
    const paid = medicationsCheckIn.checkIn.reduce(
      (prevValue, currentCheckInEdit) =>
        currentCheckInEdit.status.every(status => status.isPaid)
          ? prevValue + currentCheckInEdit.price
          : prevValue,
      0
    );
    const totalPrice = medicationsCheckIn.checkIn.reduce(
      (prevValue, currentCheckInEdit) => prevValue + currentCheckInEdit.price,
      0
    );
    const paidToday = medicationsCheckIn.checkIn.reduce(
      (prevPrice, currentCheckIn, index) =>
        lastCheckIn && !lastCheckIn[index].status[0].isPaid
          ? currentCheckIn.status[0].isPaid
            ? currentCheckIn.price + prevPrice
            : prevPrice
          : prevPrice,
      0
    );

    setPrescriptionsCheckIn(prevCheckInPrices =>
      prevCheckInPrices?.map(prevCheckInPrice => {
        if (prevCheckInPrice.name === medicationsCheckIn.name) {
          return {
            ...prevCheckInPrice,
            paid,
            paidToday: paidToday,
            remaining: totalPrice - paid
          };
        }
        return { ...prevCheckInPrice };
      })
    );
    console.log(lastCheckIn, 'lastCheckIn');
  }, [activeStep]);

  const handleStepperClick = (index: number) => {
    if (lastCheckIn && lastCheckIn[index].status[0].isPaid) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === medicationsCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map(
                (checkIn, checkInIndex) => ({
                  ...checkIn,
                  status: checkIn.status.map(status => ({
                    ...status,
                    isPaid: index >= checkInIndex,
                    paidAt: !status.paidAt
                      ? new Date().toISOString()
                      : status.paidAt
                  }))
                })
              )
            }
          : { ...prevPrescriptionCheckIn }
      )
    );
    setActiveStep(index + 1);
  };

  const handleNext = () => {
    if (activeStep > medicationsCheckIn.checkIn.length - 1) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn => {
        if (prevPrescriptionCheckIn.name !== medicationsCheckIn.name) {
          return {
            ...prevPrescriptionCheckIn
          };
        }
        return {
          ...prevPrescriptionCheckIn,
          checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) => {
            if (index !== activeStep) return { ...checkIn };
            setActiveStep(prevActiveStep => prevActiveStep + 1);
            return {
              ...checkIn,
              status: checkIn.status.map(status => ({
                ...status,
                isPaid: true,
                paidAt: new Date().toISOString()
              }))
            };
          })
        };
      })
    );
  };

  const handleBack = () => {
    if (activeStep < 1) return;
    if (lastCheckIn && lastCheckIn[activeStep - 1].status[0].isPaid) return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn => {
        if (prevPrescriptionCheckIn.name !== medicationsCheckIn.name) {
          return {
            ...prevPrescriptionCheckIn
          };
        }

        return {
          ...prevPrescriptionCheckIn,
          checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) => {
            if (index === activeStep - 1) {
              return { ...checkIn };
            }
            setActiveStep(prevActiveStep => prevActiveStep - 1);
            return {
              ...checkIn,
              status: checkIn.status.map(status => ({
                ...status,
                isPaid: false,
                paidAt: ''
              }))
            };
          })
        };
      })
    );
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
      {medicationsCheckIn.checkIn.length === activeStep && (
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
          {medicationsCheckIn.name}{' '}
          <Typography variant="caption">
            {/* ({prescriptionCheckIn.checkIn[0].perDay}) */}
          </Typography>
          {}
          <Typography variant="caption" component="p">
            paid: (
            {
              // prescriptionCheckIn.find(prescriptionCheckIn => prescriptionCheckIn. === name)
              medicationsCheckIn.paid
            }
            ) remaining: ({medicationsCheckIn.remaining})
          </Typography>
          {occupation === Occupation['Reception'] && (
            <Typography variant="caption" component="p">
              Paid Today: {medicationsCheckIn.paidToday}
            </Typography>
          )}
        </Typography>
        {/* <div>
          <IconButton onClick={handleBack} color="secondary">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleNext} color="primary">
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </div> */}
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
        {medicationsCheckIn.checkIn.map((checkIn, index) => (
          <Step
            onClick={() => handleStepperClick(index)}
            sx={{ cursor: 'pointer' }}
            key={index}
            completed={checkIn.status[0].isPaid}
          >
            <StepLabel
              error={
                isBefore(
                  new Date(checkIn.date),
                  sub(new Date(), { hours: 1 })
                ) && !checkIn.status[0].isPaid
              }
              className={clsx({
                [classes.stepSuccess]:
                  lastCheckIn &&
                  lastCheckIn[index] &&
                  !lastCheckIn[index].status[0].isPaid
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
