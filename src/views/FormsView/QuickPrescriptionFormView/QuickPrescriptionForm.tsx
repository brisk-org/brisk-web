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
  const handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (event, checked) => {
    const name = event.target.name;
    setPrescription(prevPresc => ({
      ...prevPresc,
      [name]: { selected: checked, price: 0 }
    }));
  };
  const handleFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = event => {
    const name = event.target.name;
    name === 'other' || name === 'name'
      ? setPrescription(prevPresc => ({
          ...prevPresc,
          [name]: event.target.value
        }))
      : setPrescription(prevPresc => ({
          ...prevPresc,
          [name]: { price: Number(event.target.value), selected: true }
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
                  onChange={handleFieldChange}
                  value={prescription.name}
                  label="Name"
                  required
                />
              )}
            </Grid>
            {Object.entries(prescription).map(([key, value]: any, index) => {
              if (!value || key === 'id' || key === 'other' || key === 'name')
                return null;
              if (occupation === Occupation.Nurse && !value.selected)
                return null;

              return (
                <Grid item md={4} sm={12}>
                  <SingleQuickPrescForm
                    singleDetail={{
                      name: key,
                      price: value.price,
                      selected: value.selected
                    }}
                    handleChange={handleChange}
                    handleFieldChange={handleFieldChange}
                  />
                </Grid>
              );
            })}
            {occupation === Occupation.Nurse && (
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  className={classes.textArea}
                  minRows={6}
                  name="other"
                  placeholder="Other Detail"
                  onChange={handleFieldChange}
                  value={prescription.other}
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
