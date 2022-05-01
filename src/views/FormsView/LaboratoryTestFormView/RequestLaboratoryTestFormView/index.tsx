import React, { useEffect, useState, useContext } from 'react';

import {
  Box,
  Card,
  Button,
  CardHeader,
  Container,
  Divider,
  Grid
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Page from '../../../../components/Page';
import {
  categories,
  testsPlaceHolder,
  PlaceholderTestType
} from '../../../../data/testsPlaceHolder';
import SingleAccordion from './SingleAccordion';
import {
  LaboratoryTestSettingInput,
  useCreateLaboratoryTestMutation
} from '../../../../generated/graphql';
import SnackbarSuccess from '../../../../components/SnackbarSuccess';
import { cardQuery } from '../../../../constants/queries';
import { SettingsContext } from '../../../../context/SettingContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RequestLaboratoryTestFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [fromQuery] = useState({
    id: query.get('id'),
    cardName: query.get('name')
  });
  const [tests, setTests] = useState<PlaceholderTestType[]>();
  const { laboratoryTestSettingData: testsRate } = useContext(SettingsContext);

  const [addLabTest] = useCreateLaboratoryTestMutation({
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (!testsRate) return;
    const testsWithRates = testsRate.map((test: LaboratoryTestSettingInput) => {
      return {
        ...testsPlaceHolder.find(
          tplaceholder => tplaceholder.name === test.name
        ),
        price: test.price,
        normalValue: test.normalValue
      };
    });
    setTests(testsWithRates as PlaceholderTestType[]);
  }, [testsRate]);

  const handleCloseSnackbar = (
    event?: Event | React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSnackbarOpen(false);
  };

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();

    try {
      if (!tests || !fromQuery.id) return;
      let price = 0;
      const selectedTests = tests
        .filter(test => test.selected)
        .map(({ name, category, price }) => ({ name, category, price }));
      const result = selectedTests.map(({ name, category }) => ({
        name,
        category
      }));

      selectedTests.forEach(test => (price += test.price));

      const test = await addLabTest({
        variables: {
          cardId: fromQuery.id,
          price,
          result
        }
      });
      setSuccessSnackbarOpen(true);
      Object.values(categories).forEach(value => {
        value = false;
      });
      history.push(
        cardQuery({
          id: fromQuery.id,
          testId: test.data?.createLaboratoryTest.id
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page className={classes.root} title="Request laboratory Test">
      <Container maxWidth="lg">
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CardHeader
              title={
                !fromQuery.id
                  ? 'Please go back to the Cards and Request for LabTest from there'
                  : `Lab Test for "${fromQuery.cardName}"`
              }
              subheader="The information can't be edited"
            />
            <Link to="/app/card/add" replace>
              <Button color="primary" variant="contained">
                Cards
              </Button>
            </Link>
          </Box>
          <Divider />
        </Card>

        <form onSubmit={handleSubmit}>
          <Grid container>
            {Object.keys(categories).map((name, index) => {
              if (!tests) return null;
              const selectedFields = tests.filter(
                field => field.category === name
              );
              return (
                <Grid
                  key={index}
                  item
                  md={
                    name === 'Clinical Chemistry' || name === 'Hormone Test'
                      ? 12
                      : 6
                  }
                  xs={12}
                >
                  <SingleAccordion
                    header={name}
                    fields={selectedFields}
                    setFields={setTests}
                    validId={!!fromQuery.id}
                  />
                </Grid>
              );
            })}
          </Grid>

          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!fromQuery.id}
            >
              Request a Lab Test
            </Button>
          </Box>
        </form>
        <SnackbarSuccess
          open={successSnackbarOpen}
          handleClose={handleCloseSnackbar}
          text="You have Successfully Send A Lab Request"
        />
      </Container>
    </Page>
  );
};

export default RequestLaboratoryTestFormView;
