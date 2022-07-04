import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Occupation } from '../../../generated/graphql';

interface Props {
  test: { name: string; price: number; selected: boolean };
  handleCheckboxClick:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}
const QuickLaboratoryTestField: React.FC<Props> = ({
  test: { name, price, selected },
  handleChange,
  handleCheckboxClick
}) => {
  const { occupation } = useContext(AuthContext);
  return (
    <>
      {occupation === Occupation.Laboratory ? (
        <>
          <Typography>{name}:</Typography>
          <TextField
            fullWidth
            name={name}
            type="number"
            onChange={handleChange}
            required
            label="By Price:"
            value={price}
          />
        </>
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              checked={selected}
              onChange={handleCheckboxClick}
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

export default QuickLaboratoryTestField;
