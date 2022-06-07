import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export type LaboratorySettingEnteryFields = {
  name: string;
  price?: number;
  inStock?: number;
};
interface Props {
  title: string;
  description?: string;
  hasPrice?: boolean;
  onSubmit: () => void;
  field: LaboratorySettingEnteryFields;
  setField: React.Dispatch<React.SetStateAction<LaboratorySettingEnteryFields>>;
}
const AddNewFieldsFormDialog: React.FC<Props> = ({
  field,
  hasPrice,
  setField,
  onSubmit,
  title,
  description = `insert the name and settings can be edited later`
}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = e => {
    const name = e.target.name;
    const value = name !== 'name' ? parseInt(e.target.value) : e.target.value;
    setField(prevField => ({ ...prevField, [name]: value }));
  };

  const handleSuccess: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    onSubmit();
    setField({ name: '', price: undefined, inStock: undefined });
    onClose();
  };

  return (
    <>
      <Button
        sx={{ mt: 2, width: '100%' }}
        onClick={() => setOpen(true)}
        variant="contained"
        endIcon={<AddIcon />}
      >
        {title}
      </Button>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSuccess}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
            <TextField
              required
              name="name"
              value={field.name}
              onChange={handleChange}
              autoFocus
              margin="dense"
              label="Name"
              variant="standard"
              fullWidth
            />
            {hasPrice && (
              <TextField
                name="price"
                type="number"
                value={field.price}
                onChange={handleChange}
                margin="dense"
                label="Price"
                variant="standard"
                fullWidth
                required
              />
            )}
            {
              <TextField
                name="inStock"
                value={field.inStock}
                onChange={handleChange}
                margin="dense"
                label="In Stock"
                variant="standard"
                fullWidth
              />
            }
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Done
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddNewFieldsFormDialog;
