import React, { useContext, useState } from 'react';

import { Box, Card, CardContent, CardHeader, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../components/Page';
import ChangePassword from './ChangePassword';
import { AuthContext } from '../../context/AuthContext';
import AttendanceDialog from './AttendanceDialog';
import RegisteredUsers from './RegisteredUsers';
import { Occupation } from '../../generated/graphql';
import CardSettings from './CardSettings';
import LaboratoryTestSettingMainAccordion from './LaboratoryTestSettingAccordion';
import MedicineAccordion from './MedicineAccordion';

const SettingsView = () => {
  const [open, setOpen] = useState(false);
  const { occupation } = useContext(AuthContext);

  return (
    <Page title="Settings">
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        {occupation === Occupation.Admin && (
          <Card sx={{ mt: 3 }}>
            <CardHeader
              subheader="Set Your Current Values"
              title="Prices and Normal Values"
            />
            <CardContent>
              <CardSettings />
              <LaboratoryTestSettingMainAccordion />
              <MedicineAccordion />
            </CardContent>
          </Card>
        )}
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
