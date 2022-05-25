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
import { useCreatePrescriptionTestMutation } from '../../../generated/graphql';
import { cardQuery } from '../../../constants/queries';
import { add, format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import PrintHeader from '../../../components/PrintHeader';
import SinglePresc from './SinglePresc';

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
export interface SelectablePrescription extends PrescriptionSettingDataType {
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
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const [isQueried, setIsQueried] = useState(false);
  const { prescriptionTestSettingData } = useContext(SettingsContext);
  const { username } = useContext(AuthContext);

  const [prescriptionInfo, setPrescriptionInfo] = useState<PrescriptionInfo>({
    cardId: query.get('id') || undefined,
    name: query.get('name') || '',
    gender: query.get('gender') || 'male',
    age: query.get('age') || '',
    rx: 'Rx',
    drName: username
  });
  const [createPrescriptionTest] = useCreatePrescriptionTestMutation({
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
    if (printReady) {
      handlePrint && handlePrint();
    }
  }, [printReady]);
  const [prescriptions, setPrescriptions] = useState<SelectablePrescription[]>(
    prescriptionTestSettingData!.map(prescription => ({
      ...prescription,
      selected: false
    }))
  );
  useEffect(() => {
    if (query.get('id')) {
      setIsQueried(true);
    }
  }, [query]);
  const handleSubmit = async () => {
    const selectedPrescriptions = prescriptions
      .filter(presc => presc.selected)
      .map(prescription => {
        const checkIn: PrescriptionCheckIn[] = [];
        for (let i = 0; i < prescription.forDays; i++) {
          checkIn.push({
            date: add(new Date(), { days: i }).toISOString(),
            perDay: prescription.perDay,
            price: prescription.price,
            isPaid: false,
            completed: false
          });
        }

        const sortedCheckIn: PrescriptionCheckIn[] = [];
        if (prescription.perDay === 'bid') {
          for (let i = 0; i < checkIn.length / 2; i++) {
            sortedCheckIn.push(checkIn[i]);
            sortedCheckIn.push(checkIn[Math.floor(checkIn.length / 2 + i)]);
          }
        }

        return {
          name: prescription.name,
          perDay: prescription.perDay,
          price: prescription.price,
          forDays: prescription.forDays,
          inStock: prescription.inStock,
          other: prescription.other,
          strength: prescription.strength,
          checkIn: JSON.stringify(
            prescription.perDay === 'bid' ? sortedCheckIn : prescription.checkIn
          )
        };
      });

    if (!selectedPrescriptions) {
    }
    let price = 0;
    selectedPrescriptions.forEach(prescription => {
      const perDay = prescription.perDay === 'stat' ? 1 : 2;
      price += prescription.price * prescription.forDays * perDay;
    });
    if (!prescriptionInfo.cardId) return;
    const createdPresc = await createPrescriptionTest({
      variables: {
        cardId: prescriptionInfo.cardId,
        result: selectedPrescriptions,
        rx: prescriptionInfo.rx,
        price
      }
    });
    history.push(
      cardQuery({
        id: prescriptionInfo.cardId,
        prescriptionId: createdPresc.data?.createPrescriptionTest.id
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
    setPrescriptions(prevPresc => ({
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
              <List sx={{ width: '100%' }}>
                {!printReady &&
                  prescriptions.map((prescription, index) => (
                    <SinglePresc
                      prescription={{ ...prescription }}
                      setPrescriptions={setPrescriptions}
                    />
                  ))}
              </List>
              {!printReady && (
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
            disabled={!isQueried}
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
          >
            Send Prescription
          </Button>
          <Button
            onClick={() => setPrintReady(true)}
            disabled={!isQueried}
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
