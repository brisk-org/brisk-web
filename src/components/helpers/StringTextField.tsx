import React from 'react';
import { TextField } from '@mui/material';

interface StringTextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  value: string;
  required?: boolean;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}
const StringTextField: React.FC<StringTextFieldProps> = ({
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
      helperText={helperText}
      label={label}
      name={name}
      onChange={handleChange}
      required={required}
      value={value}
      variant="standard"
    />
  );
};

export default StringTextField;
