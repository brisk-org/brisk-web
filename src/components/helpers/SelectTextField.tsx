import React from 'react';
import { TextField } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.body1.fontFamily,
    margin: '3px 0'
  }
}));

interface SelectTextFieldProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  options: {
    value: string;
    label: string;
  }[];
}
const SelectTextField: React.FC<SelectTextFieldProps> = ({
  label,
  name,
  value,
  required = true,
  handleChange,
  options
}) => {
  const classes = useStyles();

  return (
    <TextField
      select
      fullWidth
      label={label}
      name={name}
      onChange={handleChange}
      required={required}
      value={value}
      variant="standard"
      defaultValue={value}
    >
      {options.map((option, index) => (
        <option className={classes.root} key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};

export default SelectTextField;
