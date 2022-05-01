import React, { useContext, useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import { Typography, Button, Divider, Grid, CardHeader, Card, CardContent } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { Link } from 'react-router-dom';

import IndividualSales from './IndividualSales';
import SalesGraph from './SalesGraph';
import { salesCalc } from '../../constants/salesCalc';

import Dropdown, {
  SelectDailyDuration,
  SelectDropdownType,
  SelectGeneralDuration
} from '../../components/Dropdown';
import {
  getTimeSubbedFromSelectedDay,
  getTimeSubbedFromSelectedHour
} from '../../constants/getUnixFromSelectedDay';
import { SettingsContext } from '../../context/SettingContext';
import { EuroSymbol } from '@mui/icons-material';
import {
  initialSalesState,
  initialSelectGeneralDurationState,
  initialSelectDailyDurationState
} from '../../constants/initialState';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 15px',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardHeader-action': {
      alignSelf: 'center'
    }
  },
  toolbar: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainTypos: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  btn: {
    display: 'inline-block',
    width: '70%',
    margin: '20px auto',
    textTransform: 'capitalize',
    fontSize: '16px'
  }
}));

export type SalesNameType =
  | 'card'
  | 'test'
  | 'prescription'
  | 'quickPrescription'
  | 'quickLabTest';
export type SalesType = {
  order: number;
  label: string;
  inWeek: number[];
  name: SalesNameType;
  amount: number;
};
type SalesValue =
  | { price: number; updated_at: string; paid?: boolean }[]
  | undefined;
type ActionType = {
  type: SalesNameType;
  payload: {
    data: SalesValue;
    selectGeneralDuration: SelectDropdownType<SelectGeneralDuration>;
    selectDailyDuration?: SelectDropdownType<SelectDailyDuration>;
  };
};
interface Props {
  cardSales: { price: number; updated_at: string }[] | undefined;
  prescriptionTestSales: SalesValue;
  laboratoryTestSales: SalesValue;
  quickLaboratoryTestSales: SalesValue;
  quickPrescriptionTestSales: SalesValue;
}

const salesReducer = function(
  sales: SalesType[],
  action: ActionType
): SalesType[] {
  const timeTillSelectedDay = getTimeSubbedFromSelectedDay(
    action.payload.selectGeneralDuration
  );
  const timeInterval =
    action.payload.selectDailyDuration &&
    getTimeSubbedFromSelectedHour(action.payload.selectDailyDuration);
  const miniData = action.payload.data!.map(({ price, updated_at }) => ({
    price,
    updated_at
  }));
  const { amount, inWeek } = salesCalc(
    miniData,
    timeTillSelectedDay,
    timeInterval
  );
  const exceptDispatchedSales = sales.filter(
    sales => sales.name !== action.type
  );
  const dispatchedSales = sales.find(sales => sales.name === action.type);
  switch (action.type) {
    default:
      return [
        ...exceptDispatchedSales,
        { ...dispatchedSales!, amount, inWeek }
      ];
  }
};

const SalesContainer: React.FC<Props> = ({
  cardSales,
  prescriptionTestSales,
  laboratoryTestSales,
  quickLaboratoryTestSales,
  quickPrescriptionTestSales
}) => {
  const classes = useStyles();
  const [totalAmount, setTotalAmount] = useState(0);
  const [sales, dispatch] = useReducer(salesReducer, initialSalesState);

  const [selectGeneralDuration, setSelectGeneralDuration] = useState<
    SelectDropdownType<SelectGeneralDuration>
  >(initialSelectGeneralDurationState);
  const [selectDailyDuration, setSelectDailyDuration] = useState<
    SelectDropdownType<SelectDailyDuration>
  >(initialSelectDailyDurationState);

  const { cardPrice, cardExpirationDate } = useContext(SettingsContext);

  useEffect(() => {
    let amount = 0;
    sales.forEach(sales => {
      amount += sales.amount;
    });
    setTotalAmount(amount);
    selectGeneralDuration.find(({ active }) => active)?.label !== 'today' &&
      setSelectDailyDuration(initialSelectDailyDurationState);
  }, [sales, selectGeneralDuration, selectDailyDuration]);

  useEffect(() => {
    if (!cardSales) return;
    dispatch({
      type: 'card',
      payload: { data: cardSales, selectGeneralDuration, selectDailyDuration }
    });
  }, [cardSales, selectGeneralDuration, selectDailyDuration]);

  useEffect(() => {
    if (!laboratoryTestSales) return;
    dispatch({
      type: 'test',
      payload: {
        data: laboratoryTestSales,
        selectGeneralDuration: selectGeneralDuration
      }
    });
  }, [laboratoryTestSales, selectGeneralDuration]);

  useEffect(() => {
    if (!prescriptionTestSales) return;
    dispatch({
      type: 'prescription',
      payload: {
        data: prescriptionTestSales,
        selectGeneralDuration: selectGeneralDuration
      }
    });
  }, [prescriptionTestSales, selectGeneralDuration]);

  useEffect(() => {
    if (!quickPrescriptionTestSales) return;
    dispatch({
      type: 'quickPrescription',
      payload: {
        data: quickPrescriptionTestSales,
        selectGeneralDuration: selectGeneralDuration
      }
    });
  }, [quickPrescriptionTestSales, selectGeneralDuration]);

  useEffect(() => {
    if (!quickLaboratoryTestSales) return;
    dispatch({
      type: 'quickLabTest',
      payload: {
        data: quickLaboratoryTestSales,
        selectGeneralDuration: selectGeneralDuration
      }
    });
  }, [quickLaboratoryTestSales, selectGeneralDuration]);

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        action={
          <>
            {/* {selectGeneralDuration.find(({ active }) => active)?.label ===
              'today' && (
              <Dropdown
                selectDropdownState={{
                  selectDropdown: selectDailyDuration,
                  setSelectDropdown: setSelectDailyDuration
                }}
              />
            )} */}
            <Dropdown
              selectDropdownState={{
                selectDropdown: selectGeneralDuration,
                setSelectDropdown: setSelectGeneralDuration
              }}
            />
          </>
        }
        title={
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Sales Summary
            <Typography variant="body2" color="textSecondary">
              Overview of Latest Month
            </Typography>
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item md={4} xs={12}>
            <Typography variant="h2" className={classes.mainTypos}>
              <Typography variant="body1" color="textSecondary">
                Total Revenue
              </Typography>
              <Typography variant="h5" component="span">
                <EuroSymbol />
              </Typography>
              {totalAmount}
            </Typography>
            <Typography variant="body1" className={classes.mainTypos}>
              Current Card Price
              <Typography variant="body2" color="textSecondary">
                etb: {cardPrice}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                exp: {cardExpirationDate}
              </Typography>
            </Typography>
            <Link className={classes.btn} color="primary" to="/app/settings">
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="primary"
              >
                Change Prices
              </Button>
            </Link>
          </Grid>
          <Grid item md={8} xs={12}>
            <SalesGraph sales={sales} />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2}>
          {sales
            .sort((a, b) => a.order - b.order)
            .map((sales, index) => (
              <IndividualSales key={index} sales={sales} />
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalesContainer;
