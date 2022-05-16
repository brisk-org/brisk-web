import React, { useState, useContext } from 'react';

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
// import {
//   categories,
//   testsPlaceHolder,
//   PlaceholderTestType
// } from '../../../../data/testsPlaceHolder';
import SingleAccordion from './SingleAccordion';
import { useCreateLaboratoryTestMutation } from '../../../../generated/graphql';
import SnackbarSuccess from '../../../../components/SnackbarSuccess';
import { cardQuery } from '../../../../constants/queries';
import { SettingsContext } from '../../../../context/SettingContext';
import {
  LaboratoryTestCatagories,
  LaboratoryTestDetails
} from '../../../../data/testsSeed';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

interface RequestCategoryTest extends LaboratoryTestDetails {
  selected: boolean;
}
export interface RequestCategories extends LaboratoryTestCatagories {
  selected: boolean;
  tests: RequestCategoryTest[];
}

const RequestLaboratoryTestFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [fromQuery] = useState({
    id: query.get('id'),
    cardName: query.get('name')
  });
  // const [tests, setTests] = useState<PlaceholderTestType[]>();
  const { laboratoryTestSettingData } = useContext(SettingsContext);
  const categoriesInitialState = laboratoryTestSettingData.map(category => ({
    ...category,
    selected: false,
    tests: [...category.tests.map(test => ({ ...test, selected: false }))]
  }));

  const [categories, setCategories] = useState<RequestCategories[]>(
    categoriesInitialState
  );

  const [addLabTest] = useCreateLaboratoryTestMutation({
    onError: err => console.log(err)
  });

  // useEffect(() => {
  //   if (!laboratoryTestSettingData) return;
  //   const testsWithRates = laboratoryTestSettingData.map((test) => {
  //     return {
  //       ...testsPlaceHolder.find(
  //         tplaceholder => tplaceholder.name === test.name
  //       ),
  //       price: test.price,
  //       normalValue: test.normalValue
  //     };
  //   });
  //   setTests(testsWithRates as PlaceholderTestType[]);
  // }, [laboratoryTestSettingData]);

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
      if (!fromQuery.id) return;
      let price = 0;
      const selectedCategories = categories
        .map(category => {
          const selectedTests = category.tests.filter(test => test.selected);
          console.log(selectedTests);
          if (!selectedTests[0]) {
            return;
          }
          if (category.selected && !category.price) {
            enqueueSnackbar(`${category.name} must have a price`, {
              variant: 'error'
            });
            return;
          }
          if (category.selected) {
            price += category.price!;
          }
          selectedTests.forEach(test => {
            if (!test.selected) return;
            if (
              !test.hasIndividualPrice ||
              (category.selected && test.isInfluencedByCategory)
            ) {
              return;
            }
            if (!test.individualPrice) {
              enqueueSnackbar(
                `${test.name} in ${category.name} must have a price to be selected individually`,
                { variant: 'error' }
              );
              return;
            }
            price += test.individualPrice;
          });
          return {
            ...category,
            tests: selectedTests
          };
        })
        .map(category => ({
          name: category?.name,
          tests: category?.tests,
          subCategories: category?.subCategories
        }));
      const reducedSelectedCategories = selectedCategories
        .filter(category => category.name)
        .map(category => ({
          ...category,
          tests: category.tests?.map(test => ({
            name: test.name,
            value: test.value
          })),
          subCategories: category.subCategories?.map(test => ({
            name: test.name,
            tests: test.tests.map(test => ({
              name: test.name,
              value: test.value
            }))
          }))
        }));
      console.log('result', reducedSelectedCategories, price);
      const test = await addLabTest({
        variables: {
          cardId: fromQuery.id,
          totalPrice: price,
          result: reducedSelectedCategories as any
        }
      });
      setSuccessSnackbarOpen(true);
      // Object.values(categories).forEach(value => {
      //   value = false;
      // });
      console.log('test', test);
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
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
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
            {fromQuery.id && (
              <Link to={cardQuery({ id: fromQuery.id })} replace>
                <Button
                  startIcon={<ArrowBackIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  Back to Card History
                </Button>
              </Link>
            )}
          </Box>
          <Divider />
        </Card>

        <form onSubmit={handleSubmit}>
          <Grid container>
            {categories.map((category, index) => (
              <Grid
                key={index}
                item
                md={
                  category.name === 'Clinical Chemistry' ||
                  category.name === 'Hormone Test'
                    ? 12
                    : 6
                }
                xs={12}
              >
                <SingleAccordion
                  category={category}
                  setCategories={setCategories}
                  validId={!!fromQuery.id}
                />
              </Grid>
            ))}
            {/* {Object.keys(categories).map((name, index) => {
              if (!categories) return null;
              const selectedFields = categories.filter(
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
                    setFields={setCategories}
                    validId={!!fromQuery.id}
                  />
                </Grid>
              );
            })} */}
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
