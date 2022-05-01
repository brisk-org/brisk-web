import React, { useRef } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Prescribe } from '.';

import { format } from 'date-fns';
import PrintHeader from '../../../components/PrintHeader';
import { useReactToPrint } from 'react-to-print';

const useStyles = makeStyles(() => ({
  root: {},
  textArea: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px 10px'
  }
}));

interface PrescriptionFormI {
  isQueried: boolean;
  prescription: {
    certificate: Prescribe;
    setCertificate: React.Dispatch<React.SetStateAction<Prescribe>>;
  };
}

const CertificateForm: React.FC<PrescriptionFormI> = ({
  isQueried,
  prescription: { certificate, setCertificate }
}) => {
  const classes = useStyles();

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const handleChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    setCertificate(prescribe => ({
      ...prescribe,
      [event.target.name]: [event.target.value]
    }));
  };
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    handlePrint && handlePrint();
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.root)}>
      <Card ref={componentRef}>
        <PrintHeader />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography gutterBottom variant="body1">
                Date: {format(new Date(), 'MM/dd/yyyy')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom variant="body1">
                {certificate.cardNo
                  ? `Card ID: #${certificate.cardNo}`
                  : 'Please Go to the Target card and Click "Medical Certificate" from there'}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Pt'Name: {certificate.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Sex: {certificate.gender}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="body1">
                Age: {certificate.age}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Diagnosis"
                name="diagnosis"
                onChange={handleChange}
                required
                value={certificate.diagnosis}
                variant="standard"
              />
              <TextField
                fullWidth
                label="Sick leave for:"
                name="sickleave"
                onChange={handleChange}
                required
                value={certificate.sickleave}
                variant="standard"
              />
              <TextField
                fullWidth
                label="Dr's name: "
                name="drName"
                onChange={handleChange}
                required
                value={certificate.drName}
                variant="standard"
              />
            </Grid>
            <Grid item xs={7}>
              <TextareaAutosize
                className={classes.textArea}
                minRows={6}
                placeholder="Recommendation"
                name="recommendation"
                onChange={handleChange}
                value={certificate.recommendation}
                required
              />
            </Grid>
            <Grid item justifyContent="flex-end" xs={12}>
              <Typography
                style={{ margin: '15px 0' }}
                gutterBottom
                variant="body1"
              >
                Sign: _______________________
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          type="submit"
          disabled={!isQueried}
          color="primary"
          variant="contained"
        >
          Print
        </Button>
      </Box>
    </form>
  );
};

export default CertificateForm;
