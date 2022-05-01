import React, { useState } from 'react';
import clsx from 'clsx';
import {
  ListItem,
  ListItemText,
  Box,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  TextField
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Close, Edit } from '@mui/icons-material';
import { LaboratorySettingDataType } from '../../context/SettingContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  fieldContainer: {
    maxWidth: '100px',
    marginRight: '16px'
  }
}));

interface SingleRateProps {
  name: string;
  price: number;
  normalValue: string | undefined;
  setTests: React.Dispatch<React.SetStateAction<LaboratorySettingDataType[]>>;
}
const SingleRate: React.FC<SingleRateProps> = ({
  name,
  price,
  normalValue,
  setTests
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setTests(prevTests => {
      const value = event.target.value;
      const changedPrice = prevTests
        ?.filter(test => test.name === name)
        .map(test => {
          event.target.name === 'price' && (test.price = Number(value));
          event.target.name === 'normalValue' && (test.normalValue = value);
          return test;
        });
      console.log(prevTests, changedPrice);
      return [...new Set([...prevTests, ...changedPrice])];
    });
  };

  return (
    <ListItem className={clsx({ [classes.root]: normalValue })}>
      <ListItemText primary={name} secondary={normalValue} />
      {open && (
        <Box
          display="flex"
          className={clsx({ [classes.fieldContainer]: !normalValue })}
        >
          <TextField
            name="price"
            value={price}
            type="number"
            label="New Price"
            onChange={handlePriceChange}
          />
          {normalValue && (
            <TextField
              name="normalValue"
              value={normalValue}
              label="New Normal value"
              onChange={handlePriceChange}
            />
          )}
        </Box>
      )}
      <ListItemSecondaryAction>
        <IconButton
          name={name}
          onClick={() => {
            setOpen(prevOpen => !prevOpen);
          }}
          edge="end"
          size="large"
        >
          {open ? <Close fontSize="small" /> : <Edit fontSize="small" />}
        </IconButton>
      </ListItemSecondaryAction>
      <Divider />
    </ListItem>
  );
};

export default SingleRate;
