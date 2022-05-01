import React, { useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    padding: '5px 15px'
  },
  typo: {
    marginRight: theme.spacing(2)
  }
}));
interface CardRateProps {
  oldRate: number;
  oldDate: number;
  dateState: {
    date: number;
    setDate: React.Dispatch<React.SetStateAction<number>>;
  };
  priceState: {
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
  };
}
const CardRate: React.FC<CardRateProps> = ({
  oldRate,
  oldDate,
  priceState: { price, setPrice },
  dateState: { date, setDate }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setPrice(oldRate);
    setDate(oldDate);
  }, [oldRate, oldDate]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setPrice(parseInt(event.currentTarget.value));
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.typo}>Change Card Price Rate</Typography>
      <TextField
        style={{ width: 100, margin: '0 10px' }}
        label="Card Price"
        value={price}
        onChange={e => setPrice(parseInt(e.target.value))}
      />
      <TextField
        style={{ width: 140, margin: '0 10px' }}
        label="Card Expiration Date"
        value={date}
        onChange={e => setDate(parseInt(e.target.value))}
      />
    </Box>
  );
};

export default CardRate;
