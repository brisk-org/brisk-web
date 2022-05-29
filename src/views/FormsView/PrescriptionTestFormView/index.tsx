import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import { useHistory, useLocation } from 'react-router-dom';
import {
  PrescriptionCheckIn,
  PrescriptionSettingDataType,
  SettingsContext
} from '../../../context/SettingContext';
import { AuthContext } from '../../../context/AuthContext';
import {
  CreateMedicationMutationVariables,
  MedicationsQuery,
  PerDay,
  useCreatePrescriptionMutation,
  useMedicinesQuery
} from '../../../generated/graphql';
import { cardQuery } from '../../../constants/queries';
import { add, format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import PrintHeader from '../../../components/PrintHeader';
import PrescriptionBox from './PrescriptionBox';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  textArea: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px 10px'
  }
}));

// type MedicineQuery = Omit<MedicinesQuery['medicines'][0], 'created_at' | 'updated_at'>

type MedicineQuery = Omit<
  MedicationsQuery['medications'][0],
  '__typename' | 'id' | 'created_at' | 'updated_at'
>;
export interface SelectablePrescription extends MedicineQuery {
  selected: boolean;
}

export type PrescriptionInfo = {
  cardId: string | undefined;
  name: string | undefined;
  gender: string | undefined;
  age: string | undefined;
  rx: string;
  drName: string;
};

const PrescriptionTestFormView = () => {
  const classes = useStyles();
  const query = new window.URLSearchParams(useLocation().search);
  const history = useHistory();

  const { username } = useContext(AuthContext);

  const [prescriptionInfo, setPrescriptionInfo] = useState<PrescriptionInfo>({
    cardId: query.get('id') || undefined,
    name: query.get('name') || '',
    gender: query.get('gender') || 'male',
    age: query.get('age') || '',
    rx: 'Rx',
    drName: username
  });
  const [medications, setMedications] = useState<SelectablePrescription[]>();
  const { data, loading } = useMedicinesQuery();
  const [createPrescriptionTest] = useCreatePrescriptionMutation({
    onError: err => console.log(err)
  });

  const [printReady, setPrintReady] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Prescription for ${prescriptionInfo.name}`,
    onAfterPrint: () => setPrintReady(false)
  });

  useEffect(() => {
    if (!data) return;
    setMedications(
      data.medicines.map(medicine => ({
        medicine: {
          ...medicine
        },
        checkIn: '',
        forDays: medicine.forDays || 0,
        perDay: medicine.perDay || PerDay.Stat,
        strength: medicine.strength || undefined,
        selected: false
      }))
    );
  }, [data, loading]);

  const handleSubmit = async () => {
    if (!medications) return;
    const selectedMedicines: SelectablePrescription[] = medications
      .filter(medication => medication.selected)
      .map(medication => {
        const checkIn: PrescriptionCheckIn[] = [];
        for (let i = 0; i < medication.forDays; i++) {
          checkIn.push({
            date: add(new Date(), { days: i }).toISOString(),
            perDay: medication.perDay,
            price: medication.medicine.price,
            isPaid: false,
            completed: false
          });
          if (medication.perDay === 'BID') {
            checkIn.push({
              date: add(new Date(), { days: i }).toISOString(),
              perDay: medication.perDay,
              price: medication.medicine.price,
              isPaid: false,
              completed: false
            });
          }
        }

        // const sortedCheckIn: PrescriptionCheckIn[] = [];
        // if (prescription.perDay === 'BID') {
        //   for (let i = 0; i < Math.floor(checkIn.length / 2); i++) {
        //     sortedCheckIn.push(checkIn[i]);
        //     sortedCheckIn.push(checkIn[Math.floor(checkIn.length / 2 + i)]);
        //   }
        // }
        // console.log(sortedCheckIn, checkIn);

        return {
          ...medication,
          checkIn: JSON.stringify(
            checkIn
            // prescription.perDay === 'BID' ? sortedCheckIn : prescription.checkIn
          )
        };
      });

    if (!selectedMedicines) {
    }
    let price = 0;
    selectedMedicines.forEach(medication => {
      const perDay = medication.perDay === 'STAT' ? 1 : 2;
      price += medication.medicine.price * medication.forDays * perDay;
    });
    if (!prescriptionInfo.cardId) return;
    // const createdPresc = await createPrescriptionTest({
    //   variables: {
    //     cardId: prescriptionInfo.cardId,
    //     result: selectedMedicines,
    //     rx: prescriptionInfo.rx,
    //     price
    //   }
    // });
    // history.push(
    //   cardQuery({
    //     id: prescriptionInfo.cardId,
    //     prescriptionId: createdPresc.data?.createPrescriptionTest.id
    //   })
    // );
    setPrescriptionInfo({
      name: '',
      age: '',
      gender: '',
      cardId: '',
      drName: '',
      rx: 'RX'
    });
  };
  const handlePrescriptionInfoChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    setPrescriptionInfo(prevPresc => ({
      ...prevPresc,
      [event.target.name]: event.target.value
    }));
  };
  return (
    <Page title="Prescription Form">
      <Container className={classes.root} maxWidth="lg">
        <Card ref={componentRef}>
          <PrintHeader />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Card ID:{' '}
                  {prescriptionInfo.cardId
                    ? '#' + prescriptionInfo.cardId
                    : 'Please Go to the Target card and prescribe from there'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Pt'Name: {prescriptionInfo.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Age: {prescriptionInfo.age}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Sex: {prescriptionInfo.gender}
                </Typography>
              </Grid>
              {printReady ? (
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Prescriber's Name: "
                    name="drName"
                    onChange={handlePrescriptionInfoChange}
                    required
                    value={prescriptionInfo.drName}
                    variant="standard"
                  />
                </Grid>
              ) : (
                medications && (
                  <List sx={{ width: '100%' }}>
                    {medications.map((medication, index) => (
                      <PrescriptionBox
                        key={index}
                        medication={medication}
                        setMedications={setMedications}
                      />
                    ))}
                  </List>
                )
              )}
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  className={classes.textArea}
                  minRows={6}
                  name="rx"
                  onChange={handlePrescriptionInfoChange}
                  value={prescriptionInfo.rx}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Doctors Name: {prescriptionInfo.drName}
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
            onClick={handleSubmit}
            disabled={!prescriptionInfo.cardId}
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
          >
            Send Prescription
          </Button>
          <Button
            // onClick={() => setPrintReady(true)}
            onClick={() => {
              setPrintReady(true);
              handlePrint && handlePrint();
            }}
            disabled={!prescriptionInfo.cardId}
            color="secondary"
            variant="contained"
          >
            Print
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default PrescriptionTestFormView;
