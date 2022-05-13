import React, { useContext, useState } from 'react';

import { Box, Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../components/Page';
import ChangePassword from './ChangePassword';
import ChangeRates from './ChangeRates';
import { AuthContext } from '../../context/AuthContext';
import AttendanceDialog from './AttendanceDialog';
import RegisteredUsers from './RegisteredUsers';
import { useAllUsersQuery } from '../../generated/graphql';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%'
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { occupation } = useContext(AuthContext);
  const { data, loading } = useAllUsersQuery();

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Box mt={3}>{occupation === 'ADMIN' && <ChangeRates />}</Box>
        <Box my={3}>
          <ChangePassword />
        </Box>
        {occupation === 'ADMIN' && (
          <Grid container spacing={2}>
            {data && data.allUsers.map(user => <RegisteredUsers user={user} />)}
            {loading && <div>loading</div>}
          </Grid>
        )}
        <AttendanceDialog open={open} setOpen={setOpen} />
      </Container>
    </Page>
  );
};

export default SettingsView;
