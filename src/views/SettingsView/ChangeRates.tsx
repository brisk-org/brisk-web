import React, { useContext, useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LabRates from './LaboratoryTestSettingAccordion/LabRates';
import {
  useChangeSettingMutation,
  SettingDocument
} from '../../generated/graphql';
import SnackbarSuccess from '../../components/SnackbarSuccess';
import CardRate from './CardRate';
import SnackbarError from '../../components/SnackbarError';
import {
  PrescriptionSettingDataType,
  SettingsContext,
  LaboratorySettingDataType
} from '../../context/SettingContext';
import PrescriptionRate from './PrescriptionRate';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const ChangeRates = () => {
  const classes = useStyles();

  const {
    cardPrice: oldCardPrice,
    cardExpirationDate: oldCardExpirationDate,
    laboratoryTestSettingData: testsRateData,
    prescriptionTestSettingData: prescriptionRateData
  } = useContext(SettingsContext);
  const history = useHistory();

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const [cardPrice, setCardRate] = useState<number>(oldCardPrice);
  const [cardExpirationDate, setCardExpirationDate] = useState<number>(
    oldCardExpirationDate
  );
  const [laboratoryTestSettingData, setLaboratoryTestSettingData] = useState<
    LaboratorySettingDataType[]
  >(testsRateData);
  const [prescriptionTestSettingData, setPrescriptionSettingData] = useState<
    PrescriptionSettingDataType[]
  >(prescriptionRateData);

  useEffect(() => {
    setLaboratoryTestSettingData(
      testsRateData.map(({ name, category, price, normalValue }) => ({
        name,
        category,
        price,
        normalValue
      }))
    );
    setPrescriptionSettingData(prescriptionRateData);
  }, [testsRateData, prescriptionRateData]);

  const handleCloseSnackbar = (
    event?: Event | React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };

  const [changeSetting] = useChangeSettingMutation({
    refetchQueries: [
      {
        query: SettingDocument
      }
    ],
    onError: err => console.log(err)
  });
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    if (!laboratoryTestSettingData) return;
    const emptyTestsField = laboratoryTestSettingData.find(
      ({ price }) => price === (null || 0)
    );
    const emptyPrescField = prescriptionTestSettingData.find(
      ({ name, quantity, price, forDays, perDay }) =>
        !name ||
        !price ||
        !forDays ||
        !perDay ||
        (typeof quantity === 'string' && !quantity)
    );
    if (
      emptyTestsField ||
      !cardPrice ||
      !cardExpirationDate ||
      emptyPrescField
    ) {
      setErrorSnackbarOpen(true);
      return;
    }
    const d = await changeSetting({
      variables: {
        card_price: cardPrice,
        card_expiration_date: cardExpirationDate,
        laboratory_tests_data: laboratoryTestSettingData,
        prescription_tests_data: prescriptionTestSettingData
      }
    });
    !d.errors && setSuccessSnackbarOpen(true);
    !d.errors && history.push('/app/dashboard');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        subheader="Set Your Current Values"
        title="Prices and Normal Values"
      />
      <CardContent>
        {(!testsRateData || !cardPrice || !cardExpirationDate) && (
          <Typography color="error">Please fill all the Prices</Typography>
        )}
        {/* <form onSubmit={handleSubmit}> */}
        <CardRate
          oldRate={oldCardPrice}
          oldDate={oldCardExpirationDate}
          priceState={{ price: cardPrice, setPrice: setCardRate }}
          dateState={{
            date: cardExpirationDate,
            setDate: setCardExpirationDate
          }}
        />
        <LabRates
          testsState={{
            tests: laboratoryTestSettingData,
            setTests: setLaboratoryTestSettingData
          }}
        />
        <PrescriptionRate
          prescriptionState={{
            prescription: prescriptionTestSettingData,
            setPrescription: setPrescriptionSettingData
          }}
        />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button type="submit" color="primary" variant="contained">
            Update Values
          </Button>
        </Box>
        {/* </form> */}
        <SnackbarSuccess
          open={successSnackbarOpen}
          handleClose={handleCloseSnackbar}
          text="You have Successfully Updated the pricing"
        />
        <SnackbarError
          open={errorSnackbarOpen}
          handleClose={handleCloseSnackbar}
          text="You have left some Pricing fields blank"
        />
      </CardContent>
    </Card>
  );
};

export default ChangeRates;
