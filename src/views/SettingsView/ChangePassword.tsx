import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AuthContext } from '../../context/AuthContext';
import { useChangeUserDetailMutation } from '../../generated/graphql';

const useStyles = makeStyles({
  root: {},
  warning: {
    color: colors.red[600]
  }
});

const ChangePassword = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    newUserName: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const { username, login } = useContext(AuthContext);

  const [changePassword] = useChangeUserDetailMutation({
    update(_, { data }) {
      data && login({ login: data.changeUserDetail });
    },
    variables: {
      username,
      newName: values.newUserName,
      password: values.password
    }
  });

  const handleChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    setError('');
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    if (values.password !== values.confirm) {
      setError('Password Didnt Match');
      return;
    }
    const { data } = await changePassword();
    const error = data?.changeUserDetail.errors;
    error && error[0] && setError(error[0].message!);
    setValues({
      confirm: '',
      password: '',
      newUserName: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.root)}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Typography className={classes.warning}>{error}</Typography>
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="New User Name"
            margin="normal"
            name="newUserName"
            onChange={handleChange}
            value={values.newUserName}
            variant="outlined"
            required
          />{' '}
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
            required
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            type="submit"
            disabled={!!error && values.password !== ''}
            color="primary"
            variant="contained"
          >
            Update User
          </Button>
        </Box>
      </Card>
    </form>
  );
};
export default ChangePassword;
