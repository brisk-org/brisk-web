import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  DialogActions,
  SelectChangeEvent,
  Button
} from '@mui/material';
import SelectTextField from '../../../components/helpers/SelectTextField';
import { AddMedicineMutationVariables } from '../../../generated/graphql';
import { perDayOption } from './SingleMedicine';

interface Props {
  type: 'add' | 'update' | 'request';
  title: string;
  buttonText: string;
  open: boolean;
  onClose: () => void;
  medicine: AddMedicineMutationVariables;
  setMedicine: React.Dispatch<
    React.SetStateAction<AddMedicineMutationVariables>
  >;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  loading: boolean;
}

const PrescriptionSettingDialog: React.FC<Props> = ({
  type,
  title,
  buttonText,
  open,
  onClose,
  handleSubmit,
  medicine,
  setMedicine,
  loading
}) => {
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    const eventName = event.target.name;
    let value: number | string = event.target.value;
    if (
      eventName === 'price' ||
      eventName === 'forDays' ||
      eventName === 'inStock'
    ) {
      value = parseInt(event.target.value) || '';
    }
    setMedicine(prevPrescription => ({
      ...prevPrescription,
      [event.target.name]: value
    }));
  };

  return (
    <>
      <Dialog maxWidth="lg" open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent sx={{ width: '400px' }}>
            <FormControl fullWidth>
              {!(type === 'request') && (
                <>
                  <TextField
                    required
                    name="name"
                    value={medicine.name}
                    label="Name"
                    onChange={handleChange}
                    autoFocus
                    variant="standard"
                    margin="dense"
                  />
                  <TextField
                    required
                    name="price"
                    value={medicine.price}
                    label="Price"
                    onChange={handleChange}
                    variant="standard"
                    margin="dense"
                  />
                  <TextField
                    required
                    name="inStock"
                    value={medicine.inStock}
                    label="In Stock"
                    onChange={handleChange}
                    variant="standard"
                    margin="dense"
                  />
                </>
              )}
              <TextField
                required={type === 'request'}
                name="forDays"
                value={medicine.forDays}
                label="For: "
                onChange={handleChange}
                margin="dense"
                helperText="in days"
                variant="standard"
              />
              <SelectTextField
                required={type === 'request'}
                name="perDay"
                value={medicine.perDay || ''}
                label="Interval Per Day"
                handleChange={handleChange}
                options={perDayOption}
              />
              <Box sx={{ mt: 2 }}></Box>
              {typeof medicine.strength === 'string' && (
                <TextField
                  required={type === 'request'}
                  name="strength"
                  value={medicine.strength}
                  label="Strength"
                  onChange={handleChange}
                  margin="dense"
                  variant="standard"
                />
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              {loading ? '...Loading' : buttonText}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PrescriptionSettingDialog;
