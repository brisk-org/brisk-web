import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import CertificateForm from './CertificateForm';
import { useLocation } from 'react-router-dom';

export type Prescribe = {
  cardNo: number | undefined;
  name: string | undefined;
  gender: string | undefined;
  age: string | undefined;
  diagnosis: string;
  recommendation: string;
  sickleave: string;
  drName: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MedicalCertificateFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);

  const [isSidebarVisible] = useState(false);
  const [isQueried, setIsQueried] = useState(false);

  const [certificate, setCertificate] = useState<Prescribe>({
    cardNo: Number(query.get('id')) || undefined,
    name: query.get('name') || '',
    gender: query.get('gender') || 'male',
    age: query.get('age') || '',
    diagnosis: '',
    recommendation: '',
    sickleave: '',
    drName: ''
  });
  useEffect(() => {
    query.get('id') && setIsQueried(true);
  }, []);

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={isSidebarVisible && 6} xs={12}>
            <CertificateForm
              isQueried={isQueried}
              prescription={{ certificate, setCertificate }}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default MedicalCertificateFormView;
