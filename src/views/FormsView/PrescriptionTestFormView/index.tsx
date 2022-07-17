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
// import {
//   PrescriptionCheckIn,
//   PrescriptionSettingDataType,
//   SettingsContext
// } from '../../../context/SettingContext';
import { AuthContext } from '../../../context/AuthContext';
import {
  MedicationsQuery,
  PerDay,
  // useCreateMedicationMutation,
  useCreatePrescriptionMutation,
  useMedicinesQuery,
  CheckIn,
  CreateMedicationsInput
} from '../../../generated/graphql';
import { cardQuery } from '../../../constants/queries';
import { add, format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import PrintHeader from '../../../components/PrintHeader';
import PrescriptionBox from './PrescriptionBox';
import { useSnackbar } from 'notistack';

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
  '__typename' | 'id' | 'created_at' | 'checkIn' | 'updated_at'
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
  const { enqueueSnackbar } = useSnackbar();

  const [prescriptionInfo, setPrescriptionInfo] = useState<PrescriptionInfo>({
    cardId: query.get('id') || undefined,
    name: query.get('name') || '',
    gender: query.get('gender') || 'male',
    age: query.get('age') || '',
    rx: 'Rx',
    drName: username
  });
  const [medications, setMedications] = useState<SelectablePrescription[]>();
  const { data, loading } = useMedicinesQuery({
    pollInterval: 20000
  });

  const [
    createPrescriptionTest,
    { loading: createPrescriptionTestLoading }
  ] = useCreatePrescriptionMutation({
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
        forDays: medicine.forDays || 0,
        perDay: medicine.perDay || PerDay.Stat,
        strength: medicine.strength || undefined,
        selected: false
      }))
    );
  }, [data, loading]);

  const handleSubmit = async () => {
    if (!medications) return;
    if (!prescriptionInfo.cardId) return;

    const selectedMedicines: CreateMedicationsInput[] = medications
      .filter(medication => medication.selected)
      .map(selectedMedicine => {
        const checkIn: CheckIn[] = [];

        for (let i = 0; i < selectedMedicine.forDays; i++) {
          const checkInStatus = [
            {
              isPaid: false,
              paidAt: '',
              isCompleted: false
            },
            {
              isPaid: false,
              paidAt: '',
              isCompleted: false
            }
          ];
          checkIn.push({
            date: add(new Date(), { days: i }).toISOString(),
            price:
              selectedMedicine.perDay === PerDay['Bid']
                ? selectedMedicine.medicine.price * 2
                : selectedMedicine.medicine.price,
            status: checkInStatus.splice(
              0,
              selectedMedicine.perDay === PerDay['Bid'] ? 2 : 1
            )
          });
        }
        return {
          forDays: selectedMedicine.forDays,
          medicineId: selectedMedicine.medicine.id,
          perDay: selectedMedicine.perDay,
          other: selectedMedicine.other,
          strength: selectedMedicine.strength,
          checkIn
        };
      });

    if (!selectedMedicines[0]) {
      enqueueSnackbar('Select atleast One medicine', { variant: 'warning' });
      return;
    }
    const price = selectedMedicines.reduce(
      (prevPrice, currentMedicine) =>
        prevPrice +
        medications.find(
          ({ medicine }) => medicine.id === currentMedicine.medicineId
        )!.medicine.price *
          currentMedicine.forDays *
          (currentMedicine.perDay === PerDay.Bid ? 2 : 1),
      0
    );
    console.log('price', price, selectedMedicines);
    const prescription = await createPrescriptionTest({
      variables: {
        cardId: prescriptionInfo.cardId,
        medications: [...selectedMedicines],
        rx: prescriptionInfo.rx,
        price
      }
    });
    history.push(
      cardQuery({
        id: prescriptionInfo.cardId,
        prescriptionId: prescription.data?.createPrescription.id
      })
    );
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
                    {[...medications]
                      .sort(
                        (a, b) =>
                          parseInt(a.medicine.id) - parseInt(b.medicine.id)
                      )
                      .map((medication, index) => (
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
            {createPrescriptionTestLoading ? '...Loading' : 'Send Prescription'}
          </Button>
          <Button
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
