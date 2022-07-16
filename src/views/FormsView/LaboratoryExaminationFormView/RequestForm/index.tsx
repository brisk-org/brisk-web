import React, { useState, useEffect, useContext } from 'react';

import {
  Box,
  Card,
  Button,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  Snackbar
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Page from '../../../../components/Page';
import SingleAccordion from './SingleAccordion';
import {
  LaboratoryTestCategoriesQuery,
  useCreateLaboratoryExaminationMutation,
  useLaboratoryTestCategoriesQuery
} from '../../../../generated/graphql';
import { cardQuery } from '../../../../constants/queries';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { SettingsContext } from '../../../../context/SettingContext';
import { testsPlaceHolder } from '../../../../data/testsPlaceHolder';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
type LabTestCategory = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
type LabTestSubCategory = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['subCategories'][0];
type LabTest = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['laboratoryTests'][0];

interface SubCategory extends LabTestSubCategory {
  selected: boolean;
}
interface RequestLabTest extends LabTest {
  selected: boolean;
}
export interface RequestCategories extends LabTestCategory {
  selected: boolean;
  laboratoryTests: RequestLabTest[];
  subCategories: SubCategory[];
}

const RequestLaboratoryTestFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [faitalError, setFaitalError] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [fromQuery] = useState({
    id: query.get('id'),
    cardName: query.get('name')
  });
  const { categories: categoriesContext } = useContext(SettingsContext);

  const categoriesInitialState = categoriesContext?.map(category => ({
    ...category,
    selected: false,
    subCategories: category.subCategories.map(test => ({
      ...test,
      selected: false
    })),
    laboratoryTests: category.laboratoryTests.map(test => ({
      ...test,
      selected: false
    }))
  }));

  const [categories, setCategories] = useState<RequestCategories[] | undefined>(
    categoriesInitialState
  );
  const [createLaboratoryExamination] = useCreateLaboratoryExaminationMutation({
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (!categoriesContext) return;
    setCategories(categoriesInitialState);
  }, [categoriesContext]);

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
    setFaitalError(false);
    event.preventDefault();
    try {
      if (!fromQuery.id) return;
      let price = 0;
      const selectedCategories = categories
        ?.map(category => {
          const selectedTests = category.laboratoryTests.filter(
            test => test.selected
          );
          if (!selectedTests[0]) {
            return;
          }
          if (category.selected && !category.price) {
            setFaitalError(true);
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
              !test.hasPrice ||
              (category.selected && test.isInfluencedByCategory)
            ) {
              return;
            }
            if (!test.hasPrice) {
              setFaitalError(true);
              enqueueSnackbar(
                `${test.name} in ${category.name} must have a price to be selected individually`,
                { variant: 'error' }
              );
              return;
            }
            price += test.price || 0;
          });
          return {
            ...category,
            tests: selectedTests
          };
        })
        .filter(category => category?.name);
      if (faitalError) {
        return;
      }

      const selectedLaboratoryTestId = selectedCategories
        ?.map(category =>
          category!.laboratoryTests
            .filter(test => test.selected)
            .map(test => ({ id: test.id || '' }))
        )
        .flat()
        .flat();
      const selectedSubCategories = categories
        ?.map(category =>
          category.subCategories.filter(subCategory => subCategory.selected)
        )
        .flat();
      selectedSubCategories?.forEach(subCategory => {
        price += subCategory.price;
      });

      const laboratoryTestsFromSubCategory = selectedSubCategories
        ?.map(subCategory =>
          subCategory.laboratoryTests
            .map(test => ({ id: test.id || '' }))
            .flat()
        )
        .flat();

      if (!selectedLaboratoryTestId && !laboratoryTestsFromSubCategory) return;
      console.log('result', price, selectedLaboratoryTestId);
      const test = await createLaboratoryExamination({
        variables: {
          cardId: fromQuery.id,
          price,
          laboratoryTest: [
            ...(selectedLaboratoryTestId ? selectedLaboratoryTestId : []),
            ...(laboratoryTestsFromSubCategory
              ? laboratoryTestsFromSubCategory
              : [])
          ],
          selectedSubCategories: selectedSubCategories?.map(
            subCategory => subCategory?.id || ''
          ),
          selectedCategories: selectedCategories
            ?.filter(category => category && category.trackInStock)
            .map(category => category?.id || '')
        }
      });
      setSuccessSnackbarOpen(true);
      console.log('test', test);
      history.push(
        cardQuery({
          id: fromQuery.id,
          testId: test.data?.createLaboratoryExamination.id
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
            {categories ? (
              categories.map((category, index) => (
                <Grid key={index} item md={6} xs={12}>
                  <SingleAccordion
                    category={category}
                    setCategories={setCategories}
                    validId={!!fromQuery.id}
                  />
                </Grid>
              ))
            ) : (
              <Typography>No Laboratory Tests Found</Typography>
            )}
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
        <Snackbar
          open={successSnackbarOpen}
          onClose={handleCloseSnackbar}
          message="You have Successfully Send A Lab Request"
        />
      </Container>
    </Page>
  );
};

export default RequestLaboratoryTestFormView;
