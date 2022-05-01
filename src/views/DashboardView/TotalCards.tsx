import React from 'react';
import clsx from 'clsx';
import { Typography, Paper, Button, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Alert } from '@mui/material';
import { useLoading, Oval } from '@agney/react-loading';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  depositContext: {
    textAlign: 'center'
  }
}));

const TotalCards: React.FC<{ count: number | undefined; loading: boolean }> = ({
  count,
  loading
}) => {
  const classes = useStyles();

  const { indicatorEl } = useLoading({
    indicator: <Oval />,
    loading
  });

  return (
    <Paper className={clsx(classes.root)}>
      <Typography variant="h4" color="primary" gutterBottom>
        <Alert severity="info">Not Counting Duplicates</Alert>
      </Typography>
      <Typography
        color="textSecondary"
        variant="h3"
        className={classes.depositContext}
      >
        <Box maxWidth="15px">{indicatorEl}</Box>
        {!loading && count}
      </Typography>
      <Typography
        gutterBottom
        color="textSecondary"
        className={classes.depositContext}
      >
        Total Issued Cards
      </Typography>
      <Button size="small" color="primary">
        <Link style={{ color: 'inherit' }} to="/app/card/add">
          Add a Card
        </Link>
      </Button>
    </Paper>
  );
};

export default TotalCards;
