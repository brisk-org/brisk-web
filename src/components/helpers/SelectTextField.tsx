import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SelectTextFieldProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  handleChange: (event: SelectChangeEvent<string>) => void;
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
  return (
    <Select
      fullWidth
      sx={{ height: '100%' }}
      label={label}
      name={name}
      onChange={handleChange}
      required={required}
      value={value}
      margin="dense"
      variant="standard"
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectTextField;
