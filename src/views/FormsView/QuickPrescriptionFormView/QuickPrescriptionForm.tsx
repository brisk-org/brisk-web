import React, { useContext, useRef } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextareaAutosize,
  Typography,
  TextField
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { QuickPrescription } from '.';

import SingleQuickPrescForm from './SingleQuickPrescForm';
import { AuthContext } from '../../../context/AuthContext';
import { Occupation } from '../../../generated/graphql';

const useStyles = makeStyles(() => ({
  root: {},
  grid: { marginBottom: 50 },
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
    prescription: QuickPrescription;
    setPrescription: React.Dispatch<React.SetStateAction<QuickPrescription>>;
  };
}

const PrescribtionForm: React.FC<PrescriptionFormProps> = ({
  isQueried,
  prescriptionState: { prescription, setPrescription }
}) => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);

  const componentRef = useRef(null);
  const handleCheckboxClick:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (event, checked) => {
    const name = event.target.name;
    setPrescription(prevPrescriptions => ({
      ...prevPrescriptions,
      medicines: prevPrescriptions.medicines.map(medicine =>
        medicine.name === name
          ? { ...medicine, selected: checked }
          : { ...medicine }
      )
    }));
  };
  const handlePriceChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = event => {
    const name = event.target.name;
    setPrescription(prevPrescriptions => ({
      ...prevPrescriptions,
      medicines: prevPrescriptions.medicines.map(medicines =>
        medicines.name === name
          ? { ...medicines, price: parseInt(event.target.value) }
          : { ...medicines }
      )
    }));
  };

  return (
    <>
      <Card className={classes.root} ref={componentRef}>
        <CardHeader
          title={
            <>
              <Typography variant="h5">
                Quick Emergency Prescription Test
              </Typography>
              {!isQueried && occupation === Occupation.Nurse && (
                <Typography color="error" variant="body1">
                  Please Go to Emergency Prescription table and Select Test
                </Typography>
              )}
            </>
          }
        />
        <Divider />
        <CardContent>
          <Grid className={classes.grid} container spacing={2}>
            <Grid item md={12}>
              {occupation === Occupation.Nurse ? (
                <Typography variant="h6">Name: {prescription.name}</Typography>
              ) : (
                <TextField
                  name="name"
                  onChange={e =>
                    setPrescription(prevExamination => ({
                      ...prevExamination,
                      name: e.target.value
                    }))
                  }
                  value={prescription.name}
                  label="Name"
                  required
                />
              )}
            </Grid>
            {prescription.medicines.map(medicine => (
              <Grid key={medicine.id} item md={4} sm={12}>
                <SingleQuickPrescForm
                  singleDetail={{
                    name: medicine.name,
                    price: medicine.price,
                    selected: medicine.selected
                  }}
                  handleChange={handleCheckboxClick}
                  handleFieldChange={handlePriceChange}
                />
              </Grid>
            ))}
            {occupation === Occupation.Nurse && (
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  className={classes.textArea}
                  minRows={6}
                  name="other"
                  placeholder="Other Detail"
                  onChange={e =>
                    setPrescription(prevExamination => ({
                      ...prevExamination,
                      other: e.target.value
                    }))
                  }
                  value={prescription.other || ''}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          type="submit"
          disabled={occupation === Occupation.Nurse && !isQueried}
          color="primary"
          variant="contained"
          style={{ marginRight: 10 }}
        >
          {isQueried
            ? 'Complete Quick Prescription'
            : 'Send Quick Prescription'}
        </Button>
      </Box>
    </>
  );
};
export default PrescribtionForm;
