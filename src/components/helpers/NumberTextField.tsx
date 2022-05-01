import React from 'react';
import { TextField } from '@mui/material';

interface NumberTextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  value: number;
  required?: boolean;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}
const NumberTextField: React.FC<NumberTextFieldProps> = ({
  label,
  name,
  helperText,
  value,
  required = true,
  handleChange
}) => {
  return (
    <TextField
      fullWidth
      type="number"
      helperText={helperText}
      label={label}
      name={name}
      onChange={handleChange}
      required={required}
      value={value === 0 ? undefined : value}
      variant="standard"
    />
  );
};

export default NumberTextField;
