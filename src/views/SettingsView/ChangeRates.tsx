import React, { useContext, useEffect, useState } from 'react';

import { Card, CardHeader, CardContent, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LaboratoryTestSettingMainAccordion from './LaboratoryTestSettingAccordion';
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
import PrescriptionSettingAccordion from './PrescriptionSettingAccordion';
import { useHistory } from 'react-router-dom';
import { LaboratoryTestCatagories } from '../../data/testsSeed';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const ChangeRates = () => {
  const classes = useStyles();

  const {
    cardPrice: oldCardPrice,
    cardExpirationDate: oldCardExpirationDate,
    laboratoryTestSettingData,
    prescriptionTestSettingData: prescriptionRateData
  } = useContext(SettingsContext);
  const history = useHistory();

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const [cardPrice, setCardRate] = useState(oldCardPrice);
  const [cardExpirationDate, setCardExpirationDate] = useState(
    oldCardExpirationDate
  );
  const [laboratoryTestCategories, setLaboratoryTestCategories] = useState(
    laboratoryTestSettingData
  );
  const [prescriptionTestSettingData, setPrescriptionSettingData] = useState(
    prescriptionRateData
  );

  useEffect(() => {
    setCardRate(oldCardPrice);
    setCardExpirationDate(oldCardExpirationDate);
    setLaboratoryTestCategories(laboratoryTestSettingData);
    setPrescriptionSettingData(prescriptionTestSettingData);
  }, [
    laboratoryTestSettingData,
    prescriptionTestSettingData,
    oldCardPrice,
    oldCardExpirationDate
  ]);

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
  const handleSubmit = async () => {
    if (!laboratoryTestSettingData) return;
    if (!prescriptionTestSettingData) return;
    if (!cardPrice || !cardExpirationDate) {
      setErrorSnackbarOpen(true);
      return;
    }
    // const emptyPrescField = prescriptionTestSettingData.find(
    //   ({ name, quantity, price, forDays, perDay }) =>
    //     !name ||
    //     !price ||
    //     !forDays ||
    //     !perDay ||
    //     (typeof quantity === 'string' && !quantity)
    // );
    console.log(laboratoryTestSettingData);
    // if (
    //   emptyTestsField ||
    //   !cardPrice ||
    //   !cardExpirationDate ||
    //   emptyPrescField
    // ) {
    //   setErrorSnackbarOpen(true);
    //   return;
    // }
    const d = await changeSetting({
      variables: {
        card_price: cardPrice,
        card_expiration_date: cardExpirationDate,
        laboratory_tests_data: JSON.stringify(laboratoryTestCategories),
        prescription_tests_data: prescriptionTestSettingData
      }
    });
    console.log(d);
    !d.errors && setSuccessSnackbarOpen(true);
    !d.errors && history.push('/app/dashboard');
  };
  const handleSuccess = async () => {
    const d = await changeSetting({
      // variables: {
      //   card_price: cardPrice,
      //   card_expiration_date: cardExpirationDate,
      //   laboratory_tests_data: laboratoryTestSettingData,
      //   prescription_tests_data: prescriptionTestSettingData
      // }
    });
    if (!d.errors) {
      setSuccessSnackbarOpen(true);
      history.push('/app/dashboard');
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        subheader="Set Your Current Values"
        title="Prices and Normal Values"
      />
      <CardContent>
        {/* {(!testsRateData || !cardPrice || !cardExpirationDate) && (
          <Typography color="error">Please fill all the Prices</Typography>
        )} */}
        <CardRate
          priceState={{ price: cardPrice, setPrice: setCardRate }}
          dateState={{
            date: cardExpirationDate,
            setDate: setCardExpirationDate
          }}
        />
        <LaboratoryTestSettingMainAccordion
          laboratoryTestCategories={laboratoryTestCategories}
          setLaboratoryTestCategories={setLaboratoryTestCategories}
        />
        <PrescriptionSettingAccordion
          prescription={prescriptionTestSettingData}
          setPrescription={setPrescriptionSettingData}
        />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            onClick={handleSubmit}
            type="submit"
            color="primary"
            variant="contained"
          >
            Update Values
          </Button>
        </Box>
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
