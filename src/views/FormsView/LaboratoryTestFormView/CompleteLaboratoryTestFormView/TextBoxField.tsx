import React from 'react';

import { TextField } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 5
  }
}));

export const TextBoxField: React.FC<{
  label: string;
  value: string;
  normalValue?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, handleChange, normalValue }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      name={label}
      helperText={normalValue}
      required
      variant="standard"
    />
  );
};
