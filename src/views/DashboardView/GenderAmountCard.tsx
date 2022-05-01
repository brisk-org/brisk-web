import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { GraphicEq, TrendingDown, TrendingUp } from '@mui/icons-material';
import { Stats } from './CardsGenderDifference';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: '20px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.info.main
  },
  typography: {
    fontWeight: 500,
    marginLeft: 15
  },
  muted: {
    flexGrow: 1,
    fontWeight: 700
  },
  success: {
    color: theme.palette.success.main
  },
  warning: {
    color: theme.palette.warning.main
  }
}));

const GenderAmountCard: React.FC<{
  header: string;
  stats: Stats;
}> = ({ header, stats: { amount, percentage, greater } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <Box className={classes.container}>
        <GraphicEq />
        <Typography variant="body1" className={classes.typography}>
          {header}
        </Typography>
      </Box>
      <Box
        mt="30px"
        className={clsx(classes.container, {
          [classes.success]: greater,
          [classes.warning]: !greater
        })}
      >
        <Typography
          variant="h5"
          color="textSecondary"
          className={classes.muted}
        >
          {amount}
        </Typography>
        <div>{greater ? <TrendingUp /> : <TrendingDown />}</div>
        <Typography component="span" variant="body2">
          {percentage.toFixed(2)}%
        </Typography>
      </Box>
    </Card>
  );
};

export default GenderAmountCard;
