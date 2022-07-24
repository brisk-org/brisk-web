import React, { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Chip,
  Button
} from '@mui/material';
import { add, format, isBefore, isToday, sub } from 'date-fns';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { PrescriptionCheckIns } from './ConfirmationDialog';
import clsx from 'clsx';
import { CheckIn, PerDay } from '../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  stepSuccess: {
    '& .Mui-completed': {
      color: theme.palette.success.main
    }
  }
}));
interface Props {
  perDay: PerDay;
  prescriptionCheckIn: PrescriptionCheckIns;
  lastCheckIn?: CheckIn[];
  setPrescriptionsCheckIn: React.Dispatch<
    React.SetStateAction<PrescriptionCheckIns[] | undefined>
  >;
}

const MedicationStepper: React.FC<Props> = ({
  perDay,
  prescriptionCheckIn: medicationsCheckIn,
  lastCheckIn,
  setPrescriptionsCheckIn
}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const completed = medicationsCheckIn.checkIn.reduce((count, checkIn) => {
      const completedLength = checkIn.status.filter(
        status => status.isCompleted
      ).length;
      return completedLength === 2
        ? count + 2
        : completedLength === 1
        ? count + 1
        : count;
    }, 0);

    setPrescriptionsCheckIn(prevCheckInPrices =>
      prevCheckInPrices?.map(prevCheckInPrice =>
        prevCheckInPrice.name === medicationsCheckIn.name
          ? {
              ...prevCheckInPrice,
              completed,
              remaining:
                medicationsCheckIn.checkIn.length *
                  (perDay === PerDay['Bid'] ? 2 : 1) -
                completed
            }
          : { ...prevCheckInPrice }
      )
    );
    console.log(completed, medicationsCheckIn, 'thisss[jk');
  }, [activeStep]);

  const handleStepperClick = (index: number, statusIndex: number) => {
    console.log(
      medicationsCheckIn.checkIn[index].status[statusIndex].isPaid,
      'yooo'
    );
    if (!medicationsCheckIn.checkIn[index].status[statusIndex].isPaid) return;
    if (lastCheckIn && lastCheckIn[index].status[statusIndex].isCompleted)
      return;
    setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
      prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn =>
        prevPrescriptionCheckIn.name === medicationsCheckIn.name
          ? {
              ...prevPrescriptionCheckIn,
              checkIn: prevPrescriptionCheckIn.checkIn.map(
                (checkIn, checkInIndex) => ({
                  ...checkIn,
                  status: checkIn.status.map((status, statusIdx) => ({
                    ...status,
                    isCompleted:
                      statusIdx === statusIndex &&
                      index === checkInIndex &&
                      status.isPaid
                        ? !status.isCompleted
                        : status.isCompleted
                  }))
                })
              )
            }
          : { ...prevPrescriptionCheckIn }
      )
    );
    setActiveStep(prevActiveStep =>
      prevActiveStep === index + 1 ? index : index + 1
    );
    console.log(activeStep);
  };

  // const handleNext = () => {
  //   if (activeStep > medicationsCheckIn.checkIn.length - 1) return;
  //   setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
  //     prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn => {
  //       if (prevPrescriptionCheckIn.name !== medicationsCheckIn.name) {
  //         return {
  //           ...prevPrescriptionCheckIn
  //         };
  //       }
  //       return {
  //         ...prevPrescriptionCheckIn,
  //         checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) => {
  //           if (index === activeStep) {
  //             setActiveStep(prevActiveStep => prevActiveStep + 1);
  //             return {
  //               ...checkIn,
  //               status: checkIn.status.map(status => ({
  //                 ...status,
  //                 isCompleted: true
  //               }))
  //             };
  //           }
  //           return { ...checkIn };
  //         })
  //       };
  //     })
  //   );
  // };

  // const handleBack = () => {
  //   if (activeStep < 1) return;
  //   if (lastCheckIn && lastCheckIn[activeStep - 1].status[0].isCompleted)
  //     return;
  //   setPrescriptionsCheckIn(prevPrescriptionsCheckIn =>
  //     prevPrescriptionsCheckIn?.map(prevPrescriptionCheckIn => {
  //       if (prevPrescriptionCheckIn.name !== medicationsCheckIn.name) {
  //         return {
  //           ...prevPrescriptionCheckIn
  //         };
  //       }

  //       return {
  //         ...prevPrescriptionCheckIn,
  //         checkIn: prevPrescriptionCheckIn.checkIn.map((checkIn, index) => {
  //           if (index === activeStep - 1) {
  //             setActiveStep(prevActiveStep => prevActiveStep - 1);
  //             return {
  //               ...checkIn,
  //               status: checkIn.status.map(status => ({
  //                 ...status,
  //                 isCompleted: false
  //               }))
  //             };
  //           }
  //           return { ...checkIn };
  //         })
  //       };
  //     })
  //   );
  // };

  return (
    <Box
      sx={{
        mt: 2,
        pl: 2,
        pt: 2,
        border: '1px solid lightgrey'
      }}
    >
      {medicationsCheckIn.remaining === 0 && (
        <Chip
          size="small"
          label="All completed"
          sx={{ borderRadius: '7px', mr: 1 }}
          color="success"
          variant="outlined"
        />
      )}
      {medicationsCheckIn.checkIn.every(({ status }) => status[0].isPaid) && (
        <Chip
          size="small"
          label="All Paid Up"
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
          {medicationsCheckIn.name}({medicationsCheckIn.strength})
          <Typography variant="caption">
            {/* ({prescriptionCheckIn.checkIn[0].perDay}) */}
          </Typography>
          <Typography variant="caption" component="p">
            completed: ({medicationsCheckIn.completed}) remaining: (
            {medicationsCheckIn.remaining})
          </Typography>
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

      {perDay === PerDay['Bid'] && (
        <Typography variant="body1" color="GrayText">
          Morning
        </Typography>
      )}
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
            index={index}
            onClick={() => handleStepperClick(index, 0)}
            sx={{ cursor: 'pointer', display: 'block' }}
            key={index}
            completed={checkIn.status[0].isCompleted}
          >
            <StepLabel
              sx={{ cursor: 'pointer' }}
              error={!checkIn.status[0].isPaid}
              className={clsx({
                [classes.stepSuccess]:
                  lastCheckIn &&
                  lastCheckIn[index] &&
                  !lastCheckIn[index].status[0].isCompleted
              })}
              optional={
                <Box textAlign="center">
                  {isBefore(
                    new Date(checkIn.date),
                    sub(new Date(), { days: 1 })
                  ) &&
                    !checkIn.status[0].isCompleted && (
                      <Typography variant="caption">(Missed)</Typography>
                    )}
                  {isToday(new Date(checkIn.date)) && (
                    <Typography variant="caption">(today)</Typography>
                  )}
                </Box>
              }
            >
              <Typography variant="body2" color="gray">
                {format(new Date(checkIn.date), 'iii')}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {perDay === PerDay['Bid'] && (
        <>
          <Typography variant="body1" color="GrayText">
            Evening
          </Typography>
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
                onClick={() => handleStepperClick(index, 1)}
                sx={{ cursor: 'pointer', mx: 1, display: 'block' }}
                key={index}
                completed={checkIn.status[1].isCompleted}
                disabled
              >
                <StepLabel
                  sx={{ cursor: 'pointer' }}
                  error={
                    !checkIn.status[0].isPaid ||
                    (isBefore(
                      new Date(checkIn.date),
                      sub(new Date(), { hours: 1 })
                    ) &&
                      !checkIn.status[0].isCompleted)
                  }
                  className={clsx({
                    [classes.stepSuccess]:
                      lastCheckIn && !lastCheckIn[index].status[1].isCompleted
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
        </>
      )}
      {medicationsCheckIn.other && (
        <Typography>Other: {medicationsCheckIn.other}</Typography>
      )}
    </Box>
  );
};

export default MedicationStepper;
