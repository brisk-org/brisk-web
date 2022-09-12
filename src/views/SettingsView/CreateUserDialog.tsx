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
  SelectChangeEvent,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  AllUsersDocument,
  Occupation,
  useRegisterMutation
} from '../../generated/graphql';

const occupationOptions: { value: Occupation; label: string }[] = [
  {
    label: 'Admin',
    value: Occupation.Admin
  },
  {
    label: 'Doctor',
    value: Occupation.Doctor
  },
  {
    label: 'Reception',
    value: Occupation.Reception
  },
  {
    label: 'Laboratory',
    value: Occupation.Laboratory
  },
  {
    label: 'Nurse',
    value: Occupation.Nurse
  }
];

const CreateUserDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    occupation: Occupation.Admin,
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
    refetchQueries: [{ query: AllUsersDocument }],
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

  const handleSuccess: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    const res = await register();
    console.log(res);
    !res.data?.register.errors && handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSuccess}>
        <DialogTitle>Add a new User</DialogTitle>
        <DialogContent>
          <DialogContentText>This fields can't be edited</DialogContentText>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <TextField
            autoFocus
            fullWidth
            label="Username"
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Occupation</InputLabel>
            <Select
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
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="outlined">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CreateUserDialog;
