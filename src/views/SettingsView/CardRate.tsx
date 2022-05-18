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
  dateState: {
    date?: number;
    setDate: React.Dispatch<React.SetStateAction<number | undefined>>;
  };
  priceState: {
    price?: number;
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  };
}
const CardRate: React.FC<CardRateProps> = ({
  priceState: { price, setPrice },
  dateState: { date, setDate }
}) => {
  const classes = useStyles();

  return (
    <form>
      <Box className={classes.root}>
        <Typography sx={{ mr: 2 }}>Change Card Price Rate</Typography>
        <TextField
          required
          type="number"
          sx={{ width: 100, my: '10px' }}
          label="Card Price"
          value={price || ''}
          onChange={e => setPrice(parseInt(e.target.value))}
        />
        <TextField
          required
          type="number"
          sx={{ width: 140, my: '10px' }}
          label="Card Expiration Date"
          value={date || ''}
          onChange={e => setDate(parseInt(e.target.value))}
        />
      </Box>
    </form>
  );
};

export default CardRate;
