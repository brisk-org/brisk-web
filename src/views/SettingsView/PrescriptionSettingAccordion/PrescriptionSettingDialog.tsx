import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  DialogActions,
  SelectChangeEvent
} from '@mui/material';
import React from 'react';
import SelectTextField from '../../../components/helpers/SelectTextField';
import { PrescriptionSettingDataType } from '../../../context/SettingContext';
import { perDayOption } from './SinglePrescriptionRate';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  prescription: PrescriptionSettingDataType;
  setPrescription: React.Dispatch<
    React.SetStateAction<PrescriptionSettingDataType>
  >;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const PrescriptionSettingDialog: React.FC<Props> = ({
  title,
  open,
  onClose,
  prescription,
  setPrescription,
  handleSubmit,
  children
}) => {
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    const eventName = event.target.name;
    let value: number | string = event.target.value;
    if (eventName === 'price' || eventName === 'forDays') {
      value = parseInt(event.target.value) || 0;
    }
    setPrescription(
      prevPrescription =>
        ({
          ...prevPrescription,
          [event.target.name]: value
        } as PrescriptionSettingDataType)
    );
  };
  return (
    <Dialog maxWidth="lg" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ width: '400px' }}>
          <FormControl fullWidth>
            <TextField
              required
              name="name"
              value={prescription.name}
              label="Name"
              onChange={handleChange}
              autoFocus
              variant="standard"
              margin="dense"
            />
            <TextField
              required
              name="price"
              value={prescription.price}
              label="Price"
              onChange={handleChange}
              variant="standard"
              margin="dense"
            />
            <TextField
              required
              name="forDays"
              value={prescription.forDays}
              label="For: "
              onChange={handleChange}
              margin="dense"
              helperText="in days"
              variant="standard"
            />
            {typeof prescription.quantity === 'string' && (
              <TextField
                required
                name="quantity"
                value={prescription.quantity}
                label="Default Quantity"
                onChange={handleChange}
                margin="dense"
                variant="standard"
              />
            )}
            <Box sx={{ mt: 2 }}></Box>
            <SelectTextField
              name="perDay"
              value={prescription.perDay}
              label="Per Day"
              handleChange={handleChange}
              options={perDayOption}
            />
            <TextField
              name="other"
              label="Others: "
              value={prescription.other || ''}
              onChange={handleChange}
              margin="dense"
              variant="standard"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>{children}</DialogActions>
      </form>
    </Dialog>
  );
};

export default PrescriptionSettingDialog;
