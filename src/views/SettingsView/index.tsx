import React, { useContext, useState } from 'react';

import { Box, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../components/Page';
import ChangePassword from './ChangePassword';
import ChangeRates from './ChangeRates';
import { AuthContext } from '../../context/AuthContext';
import AttendanceDialog from './AttendanceDialog';
import RegisteredUsers from './RegisteredUsers';
import { Occupation } from '../../generated/graphql';

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

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box mt={3}>{occupation === Occupation.Admin && <ChangeRates />}</Box>
        <Box my={3}>
          <ChangePassword />
        </Box>
        {occupation === Occupation.Admin && <RegisteredUsers />}
        <AttendanceDialog open={open} setOpen={setOpen} />
      </Container>
    </Page>
  );
};

export default SettingsView;
