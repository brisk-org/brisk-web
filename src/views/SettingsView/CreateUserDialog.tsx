import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useRegisterMutation } from '../../generated/graphql';
import { Occupation } from '../../context/AuthContext';

const occupationOptions: { value: Occupation; label: string }[] = [
  {
    label: 'Admin',
    value: 'ADMIN'
  },
  {
    label: 'Doctor',
    value: 'DOCTOR'
  },
  {
    label: 'Reception',
    value: 'RECEPTION'
  },
  {
    label: 'Laboratorian',
    value: 'LABORATORIAN'
  },
  {
    label: 'Nurse',
    value: 'NURSE'
  }
];

const CreateUserDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    occupation: 'RECEPTION',
    password: ''
  });
  const [register] = useRegisterMutation({
    update(_, { data }) {
      if (!data) {
        return;
      }
      if (data.register.errors) {
        setError(data.register.errors[0]!.message!);
        return;
      }
    },
    onError(error) {
      console.log(error);
    },
    variables: {
      ...user
    }
  });
  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = event => {
    console.log(event.target.value, user);
    setUser(prevUser => ({
      ...prevUser,
      [event.target.name]: event.target.value
    }));
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    setUser(prevUser => ({
      ...prevUser,
      [event.target.name]: event.target.value
    }));
  };

  const handleSuccess = () => {
    register();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        <TextField
          autoFocus
          fullWidth
          label="Enter Your Job Classification"
          margin="normal"
          name="username"
          onChange={handleChange}
          value={user.username}
          type="name"
          required
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          onChange={handleChange}
          value={user.password}
          type="password"
          required
          variant="outlined"
        />
        <Select
          fullWidth
          label="Occupation"
          name="occupation"
          onChange={handleSelectChange}
          value={user.occupation}
          variant="outlined"
          required
        >
          {occupationOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSuccess}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateUserDialog;
