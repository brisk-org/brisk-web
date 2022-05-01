import React, { useState } from 'react';
import clsx from 'clsx';
import { ListItem, ListItemText, Box, Divider, IconButton, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Close, Edit } from '@mui/icons-material';
import { PrescriptionSettingDataType } from '../../context/SettingContext';
import SelectTextField from '../../components/helpers/SelectTextField';
import NumberTextField from '../../components/helpers/NumberTextField';
import StringTextField from '../../components/helpers/StringTextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '33.3%',
    display: 'inline-block'
  }
}));
export const perDayOption = [
  {
    label: 'Stat',
    value: 'stat'
  },
  {
    label: 'Bid',
    value: 'bid'
  }
];
interface SingleRateProps {
  prescription: PrescriptionSettingDataType;
  setPrescription: React.Dispatch<
    React.SetStateAction<PrescriptionSettingDataType[]>
  >;
}
const SinglePrescriptionRate: React.FC<SingleRateProps> = ({
  prescription: { name, price, quantity, forDays, perDay, other },
  setPrescription
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setPrescription(prevTests => {
      const sValue = event.target.value;
      const nValue = Number(sValue);
      const changedPrice = prevTests
        ?.filter(test => test.name === name)
        .map(test => {
          event.target.name === 'price' && (test.price = nValue);
          event.target.name === 'quantity' && (test.quantity = sValue);
          event.target.name === 'forDays' && (test.forDays = nValue);
          event.target.name === 'other' && (test.other = sValue);
          event.target.name === 'perDay' &&
            (test.perDay = sValue as 'stat' | 'bid');
          return test;
        });

      return [...new Set([...prevTests, ...changedPrice])];
    });
  };

  return (
    <ListItem className={clsx(classes.root)}>
      <ListItemText
        primary={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">{name}</Typography>
            <IconButton
              name={name}
              onClick={() => {
                setOpen(prevOpen => !prevOpen);
              }}
              size="large">
              {open ? <Close fontSize="small" /> : <Edit fontSize="small" />}
            </IconButton>
          </Box>
        }
        secondary={<>{open && <Divider />}</>}
      />
      {open && (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <NumberTextField
              name="price"
              value={price}
              label="New Price"
              handleChange={handlePriceChange}
            />
          </Grid>
          {typeof quantity === 'string' && (
            <Grid item md={6} sm={12}>
              <StringTextField
                name="quantity"
                value={quantity}
                label="New Normal value"
                handleChange={handlePriceChange}
              />
            </Grid>
          )}
          <Grid item md={6} sm={12}>
            <SelectTextField
              name="perDay"
              value={perDay}
              label="Per Day"
              handleChange={handlePriceChange}
              options={perDayOption}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <NumberTextField
              name="forDays"
              value={forDays}
              label="For: "
              handleChange={handlePriceChange}
            />
          </Grid>
          <Grid item sm={12}>
            <StringTextField
              name="other"
              handleChange={handlePriceChange}
              label="Others: "
              value={other || ''}
              required={false}
            />
          </Grid>
        </Grid>
      )}
      <Divider />
    </ListItem>
  );
};

export default SinglePrescriptionRate;
