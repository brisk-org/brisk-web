import React from 'react';
import { Box, Step, StepLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { isBefore, sub, isToday, format } from 'date-fns';
import { CheckIn } from '../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  stepSuccess: {
    '& .Mui-completed': {
      color: theme.palette.success.main
    }
  }
}));
interface Props {
  isCompleted: boolean;
  onClick: () => void;
  checkIn: CheckIn;
  lastCheckInIsCompleted: boolean;
}
const StepperSteps: React.FC<Props> = ({
  onClick,
  isCompleted,
  checkIn,
  lastCheckInIsCompleted
}) => {
  const classes = useStyles();
  return (
    <Step
      onClick={() => onClick()}
      sx={{ cursor: 'pointer', mx: 1 }}
      completed={isCompleted}
    >
      <StepLabel
        error={
          isBefore(new Date(checkIn.date), sub(new Date(), { hours: 1 })) &&
          !isCompleted
        }
        className={clsx({
          [classes.stepSuccess]: !lastCheckInIsCompleted
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
  );
};

export default StepperSteps;
