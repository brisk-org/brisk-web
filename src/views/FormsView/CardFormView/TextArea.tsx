import React from 'react';
import { TextareaAutosize, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100%',
    width: '100%',
    padding: '20px 10px',
    minHeight: '100px'
  }
}));

interface StringTextFieldProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}
const TextArea: React.FC<StringTextFieldProps> = ({
  label,
  name,
  value,
  required = true,
  handleChange
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="body1" color="textSecondary">
        {label}
      </Typography>
      <TextareaAutosize
        className={classes.root}
        name={name}
        onChange={handleChange}
        placeholder={`"${label}" content goes Here`}
        value={value}
        required={required}
      />
    </>
  );
};

export default TextArea;
