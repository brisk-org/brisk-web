import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextareaAutosize,
  Typography,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Prescription, CurrentPrescription } from '.';

import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import PrintHeader from '../../../components/PrintHeader';
import SinglePresc from './SinglePresc';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {},
  textArea: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px 10px'
  }
}));

interface PrescriptionFormProps {
  isQueried: boolean;
  prescriptionState: {
    prescription: Prescription;
    setPrescription: React.Dispatch<React.SetStateAction<Prescription>>;
  };
}

const PrescriptionTestForm: React.FC<PrescriptionFormProps> = ({
  isQueried,
  prescriptionState: { prescription, setPrescription }
}) => {
  const classes = useStyles();

  const [printReady, setPrintReady] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Prescription for ${prescription.name}`,
    onAfterPrint: () => setPrintReady(false)
  });
  const handleClick = () => {
    setPrintReady(true);
  };
  useEffect(() => {
    if (printReady) {
      handlePrint && handlePrint();
    }
  });
  const handlePrescChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    const name = event.target.name;
    setPrescription(prevPresc => ({
      ...prevPresc,
      [name]: event.target.value
    }));
  };
  const handleDetailedPrescChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    const [name, field] = JSON.parse(event.target.name);
    const value = event.target.value;

    setPrescription(prevPresc => {
      const notClickedDetailedPresc = prevPresc.detailedPrescription.filter(
        presc => presc.name !== name
      );

      const clickedDetailedPresc = prevPresc.detailedPrescription.find(
        presc => presc.name === name
      );
      const selected = clickedDetailedPresc?.selected;
      const changeDetails = clickedDetailedPresc?.changeDetails;

      if (!clickedDetailedPresc) {
        return { ...prevPresc };
      }
      let changedDetailedPresc: CurrentPrescription[] = [
        clickedDetailedPresc,
        ...notClickedDetailedPresc
      ];
      if (field === 'checkbox') {
        changedDetailedPresc = [
          { ...clickedDetailedPresc, selected: !selected },
          ...notClickedDetailedPresc
        ];
      }
      if (field === 'changeDetails') {
        changedDetailedPresc = [
          {
            ...clickedDetailedPresc,
            changeDetails: !changeDetails,
            selected: !changeDetails
          },
          ...notClickedDetailedPresc
        ];
      }
      if (field === 'quantity') {
        changedDetailedPresc = [
          { ...clickedDetailedPresc, quantity: value },
          ...notClickedDetailedPresc
        ];
      }
      if (field === 'price') {
        changedDetailedPresc = [
          { ...clickedDetailedPresc, price: Number(value) },
          ...notClickedDetailedPresc
        ];
      }
      if (field === 'perDay') {
        changedDetailedPresc = [
          { ...clickedDetailedPresc, perDay: value as 'bid' | 'stat' },
          ...notClickedDetailedPresc
        ];
      }
      if (field === 'forDays') {
        changedDetailedPresc = [
          { ...clickedDetailedPresc, forDays: Number(value) },
          ...notClickedDetailedPresc
        ];
      }
      if (field === 'other') {
        changedDetailedPresc = [
          { ...clickedDetailedPresc, other: value },
          ...notClickedDetailedPresc
        ];
      }

      return {
        ...prevPresc,
        detailedPrescription: changedDetailedPresc.sort(
          (a, b) => a.order - b.order
        )
      };
    });
  };

  return <>
    <Card className={clsx(classes.root, {})} ref={componentRef}>
      <PrintHeader />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              Card ID:{' '}
              {prescription.cardId
                ? '#' + prescription.cardId
                : 'Please Go to the Target card and prescribe from there'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Pt'Name: {prescription.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Age: {prescription.age}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Sex: {prescription.gender}
            </Typography>
          </Grid>
          {!printReady &&
            prescription.detailedPrescription.map((presc, index) => (
              <Grid id="checkBox" key={index} item md={3}>
                <SinglePresc
                  presc={{ ...presc }}
                  handleChange={handleDetailedPrescChange}
                />
              </Grid>
            ))}
          {!printReady && (
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Prescriber's Name: "
                name="drName"
                onChange={handlePrescChange}
                required
                value={prescription.drName}
                variant="standard"
              />
            </Grid>
          )}
          <Grid item md={12} xs={12}>
            <TextareaAutosize
              className={classes.textArea}
              minRows={6}
              name="rx"
              onChange={handlePrescChange}
              value={prescription.rx}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Doctors Name: {prescription.drName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Date: {format(new Date(), 'dd/MM/yyyy')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Occupation: Doctor</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Button
        type="submit"
        disabled={!isQueried}
        color="primary"
        variant="contained"
        style={{ marginRight: 10 }}
      >
        Send Prescription
      </Button>
      <Button
        onClick={handleClick}
        disabled={!isQueried}
        color="secondary"
        variant="contained"
      >
        Print
      </Button>
    </Box>
  </>;
};
export default PrescriptionTestForm;
