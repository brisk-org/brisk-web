import React, { useContext, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import Page from '../../components/Page';
import { makeStyles } from '@mui/styles';

import { AuthContext } from '../../context/AuthContext';
import { useLoginMutation } from '../../generated/graphql';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  illustrationWrapper: {
    background: theme.palette.primary.light,
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const context = useContext(AuthContext);
  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = event => {
    context.formField(event.currentTarget.name, event.currentTarget.value);
  };

  const [login] = useLoginMutation({
    update(_, { data }) {
      if (!data) {
        return;
      }
      if (data.login.errors) {
        setError(data.login.errors[0]!.message!);
      }
      context.login(data);
    },
    onError(error) {
      console.log(error);
    },
    variables: {
      username: context.username,
      password: context.password
    }
  });

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = event => {
    event.preventDefault();
    login();
  };

  return (
    <Page style={{ height: '100%' }} title="Login">
      <Box
        height="93vh"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
      >
        <Box className={classes.formWrapper}>
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography fontWeight="bold" color="textSecondary" variant="h4">
                Sign up
              </Typography>
              {error && <Typography color="red">{error}</Typography>}
              <Box maxWidth={400}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Username"
                  margin="normal"
                  name="username"
                  onChange={handleChange}
                  value={context.username}
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
                  value={context.password}
                  type="password"
                  required
                  variant="outlined"
                />
                <Button
                  sx={{ marginY: 3 }}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
        <Box className={classes.illustrationWrapper}>
          <img style={{ width: '80%' }} src="/svg/login-teamwork.svg" alt="" />
        </Box>
      </Box>
    </Page>
  );
};

export default LoginView;
