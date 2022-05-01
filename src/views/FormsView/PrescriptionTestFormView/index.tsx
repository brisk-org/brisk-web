import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import PrescriptionForm from './PrescriptionForm';
import { useHistory, useLocation } from 'react-router-dom';
import {
  PrescriptionSettingDataType,
  SettingsContext
} from '../../../context/SettingContext';
import { AuthContext } from '../../../context/AuthContext';
import { useCreatePrescriptionTestMutation } from '../../../generated/graphql';
import { cardQuery } from '../../../constants/queries';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
interface smartLogic {
  selected: boolean;
  changeDetails: boolean;
  order: number;
}
export interface CurrentPrescription
  extends PrescriptionSettingDataType,
    smartLogic {}

export type Prescription = {
  cardId: string | undefined;
  name: string | undefined;
  gender: string | undefined;
  age: string | undefined;
  rx: string;
  detailedPrescription: CurrentPrescription[];
  drName: string;
};

const PrescriptionTestFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const [isQueried, setIsQueried] = useState(false);
  const { prescriptionTestSettingData } = useContext(SettingsContext);
  const { username } = useContext(AuthContext);

  const [prescription, setPrescription] = useState<Prescription>({
    cardId: query.get('id') || undefined,
    name: query.get('name') || '',
    gender: query.get('gender') || 'male',
    age: query.get('age') || '',
    detailedPrescription: prescriptionTestSettingData.map((data, index) => ({
      ...data,
      selected: false,
      changeDetails: false,
      order: index
    })),
    rx: 'Rx',
    drName: username
  });
  useEffect(() => {
    query.get('id') && setIsQueried(true);
  }, [query]);
  const [createPrescriptionTest] = useCreatePrescriptionTestMutation({
    onError: err => console.log(err)
  });

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    const { cardId, detailedPrescription, rx } = prescription;
    const selectedDetailedPrescription = detailedPrescription
      .filter(presc => presc.selected)
      .map(({ name, price, perDay, forDays, quantity, other }) => ({
        name,
        price,
        perDay,
        forDays,
        quantity,
        other
      }));

    let price = 0;
    selectedDetailedPrescription.forEach(
      ({ price: prescPrice, forDays, perDay }) => {
        const perDayValue = perDay === 'stat' ? 1 : 2;
        price += prescPrice * forDays * perDayValue;
      }
    );
    if (!cardId) return;
    const createdPresc = await createPrescriptionTest({
      variables: {
        cardId,
        result: selectedDetailedPrescription,
        rx,
        price
      }
    });
    history.push(
      cardQuery({
        id: cardId,
        prescriptionId: createdPresc.data?.createPrescriptionTest.id
      })
    );
    setPrescription({
      name: '',
      age: '',
      gender: '',
      cardId: '',
      drName: '',
      detailedPrescription: prescriptionTestSettingData.map((rate, index) => ({
        ...rate,
        selected: false,
        changeDetails: false,
        order: index
      })),
      rx: 'RX'
    });
  };

  return (
    <Page title="Prescription Form">
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <PrescriptionForm
                isQueried={isQueried}
                prescriptionState={{ prescription, setPrescription }}
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PrescriptionTestFormView;
