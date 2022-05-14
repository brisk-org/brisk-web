import React, { useState, useContext } from 'react';

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Divider
} from '@mui/material';
import { useAllUsersQuery } from '../../generated/graphql';
import { AuthContext } from '../../context/AuthContext';
import RegisteredUsersCard from './RegisteredUserCard';
import CreateUserDialog from './CreateUserDialog';

const RegisteredUsers = () => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useAllUsersQuery();
  const { username } = useContext(AuthContext);
  return (
    <>
      <Card>
        <CardHeader title="All registered user" />
        <CardContent>
          <Grid container spacing={2}>
            {data &&
              data.allUsers.map(
                user =>
                  user.username !== username && (
                    <RegisteredUsersCard user={user} />
                  )
              )}
            {loading && <div>loading</div>}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add a new User
          </Button>
        </CardActions>
      </Card>
      <CreateUserDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
export default RegisteredUsers;
