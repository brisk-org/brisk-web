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

type Field = {
  name: string;
  price?: number;
};
interface Props {
  title: string;
  description?: string;
  hasPrice?: boolean;
  onSubmit: () => void;
  field: Field;
  setField: React.Dispatch<React.SetStateAction<Field>>;
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
  const [error, setError] = useState('');
  const onClose = () => {
    setOpen(false);
  };
  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = e => {
    const name = e.target.name;
    const value = name === 'price' ? parseInt(e.target.value) : e.target.value;
    setField(prevField => ({ ...prevField, [name]: value }));
  };

  const handleSuccess = () => {
    if (!field.name) {
      setError("name can't be empty");
      return;
    }
    onSubmit();
    setField({ name: '', price: undefined });
    onClose();
    setError('');
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            error={!!error}
            helperText={error}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mr: 2 }}
            onClick={handleSuccess}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewFieldsFormDialog;
