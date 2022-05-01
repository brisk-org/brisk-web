import React from 'react';

import { Box, Checkbox, FormControlLabel } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginLeft: 5
  }
}));
interface CheckBoxFieldProps {
  checked: boolean;
  label: string;
  name: string;

  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}
export const CheckBoxField: React.FC<CheckBoxFieldProps> = ({
  checked,
  handleChange,
  label,
  name
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={label}
      />
    </Box>
  );
};
