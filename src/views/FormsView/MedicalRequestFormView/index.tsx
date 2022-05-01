import React, { useState } from 'react';
import { Card, Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import RequestForm from './RequestForm';
import PrintTemplate from './PrintTemplate';

export type Examination = {
  x_ray: boolean;
  ultrasound: boolean;
  ecg: boolean;
  echocardiography: boolean;
  pathology: boolean;
  ct_scan: boolean;
  mri: boolean;
  others: boolean;
};

export type User = {
  name: string;
  gender: string;
  age: string;
  card_no: number;
  lmp: string;
  clinical_note: string;
  examination: Examination;
  specify: string;
  requested_by: string;
  conclusion: string;
  report: string;
  reported_by: string;
};
export type SetUser = React.Dispatch<
  React.SetStateAction<{
    name: string;
    gender: string;
    age: string;
    card_no: number;
    lmp: string;
    clinical_note: string;
    examination: Examination;
    specify: string;
    requested_by: string;
    conclusion: string;
    report: string;
    reported_by: string;
  }>
>;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MedicalRequestFormView = () => {
  const classes = useStyles();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [user, setUser] = useState<User>({
    name: '',
    gender: 'male',
    age: '',
    card_no: 0,
    lmp: '',
    clinical_note: '',
    examination: {
      x_ray: false,
      ultrasound: false,
      ecg: false,
      echocardiography: false,
      pathology: false,
      ct_scan: false,
      mri: false,
      others: true
    },
    specify: '',
    requested_by: '',
    conclusion: '',
    report: '',
    reported_by: ''
  });

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={isSidebarVisible && 6} xs={12}>
            <RequestForm
              user={user}
              setUser={setUser}
              sidebarVisible={{ isSidebarVisible, setIsSidebarVisible }}
            />
          </Grid>
          {isSidebarVisible && (
            <Grid item md={6} xs={12}>
              <Card className={classes.root}>
                <PrintTemplate user={user} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default MedicalRequestFormView;
