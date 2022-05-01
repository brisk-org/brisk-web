import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useContext } from 'react';
import NumberTextField from '../../../components/helpers/NumberTextField';
import { AuthContext } from '../../../context/AuthContext';

interface SinglePrescProps {
  singleDetail: { name: string; price: number; selected: boolean };
  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  handleFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}
const SingleQuickPrescForm: React.FC<SinglePrescProps> = ({
  singleDetail: { name, price, selected },
  handleChange,
  handleFieldChange
}) => {
  const { occupation } = useContext(AuthContext);
  return (
    <>
      {occupation === 'NURSE' ? (
        <>
          <Typography>{name}:</Typography>
          <NumberTextField
            handleChange={handleFieldChange}
            label="By Price:"
            name={name}
            value={price}
          />
        </>
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              checked={selected}
              onChange={handleChange}
              name={name}
              color="primary"
            />
          }
          label={name}
        />
      )}
    </>
  );
};

export default SingleQuickPrescForm;
