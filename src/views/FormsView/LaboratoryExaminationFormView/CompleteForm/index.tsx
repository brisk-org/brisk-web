import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  Card,
  Typography,
  Button,
  CardHeader,
  Container,
  Divider,
  Grid,
  Snackbar,
  ButtonGroup
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router-dom';

import Page from '../../../../components/Page';
import { Alert } from '@mui/material';
import {
  useCompleteLaboratoryExaminationMutation,
  useLaboratoryExaminationQuery,
  CardDocument,
  useSaveLaboratoryExaminationMutation,
  LaboratoryTestCategoriesQuery,
  LaboratoryExaminationDocument
} from '../../../../generated/graphql';
import { ExpandMore } from '@mui/icons-material';
import { SettingsContext } from '../../../../context/SettingContext';
import AccordionContainer from './AccordionContainer';
// import { LaboratoryExaminationCatagories } from '../../../../data/testsSeed';

type OriginalLaboratoryTest = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['laboratoryTests'][0];
type OriginalLaboratoryCategory = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
type OriginalLaboratorySubCategory = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['subCategories'][0];
export interface LaboratoryTestWithValue
  extends Omit<OriginalLaboratoryTest, 'created_at'> {
  value: string;
}

export interface SubCategoryTestsWithValueProps
  extends Omit<OriginalLaboratorySubCategory, 'laboratoryTests'> {
  laboratoryTests: LaboratoryTestWithValue[];
}

export interface CategoryTestsWithValueProps
  extends Omit<
    OriginalLaboratoryCategory,
    'laboratoryTests' | 'subCategories'
  > {
  laboratoryTests: LaboratoryTestWithValue[];
  subCategories: SubCategoryTestsWithValueProps[];
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CompleteLaboratoryExaminationFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryTestsWithValueProps[]>();
  const queryId = query.get('id') || '';

  const { categories: categoriesContext } = useContext(SettingsContext);
  const { data, loading } = useLaboratoryExaminationQuery({
    variables: {
      id: queryId
    },
    onError: err => console.error(err)
  });

  const [
    completeLaboratoryExamination
  ] = useCompleteLaboratoryExaminationMutation({
    onError: err => console.error(err)
  });
  const [
    completeLaboratoryExaminationLater
  ] = useSaveLaboratoryExaminationMutation({ onError: err => console.error });

  useEffect(() => {
    if (!data) return;
    setCategories(() =>
      categoriesContext?.map(category => ({
        ...category,
        subCategories: category.subCategories.map(subCategory => ({
          ...subCategory,
          laboratoryTests: data.laboratoryExamination.laboratoryTests
            .filter(test => test.subCategory?.name === subCategory.name)
            .map(test => ({
              ...test,
              value:
                data.laboratoryExamination.values?.find(
                  ({ id }) => id === test.id
                )?.value || ''
            }))
        })),
        laboratoryTests: data.laboratoryExamination.laboratoryTests
          .filter(test => test.category?.name === category.name)
          .map(test => ({
            ...test,
            value:
              data.laboratoryExamination.values?.find(
                ({ id }) => id === test.id
              )?.value || ''
          }))
      }))
    );
    setCategories(prevLabCategories =>
      prevLabCategories?.filter(
        category =>
          category.laboratoryTests.length > 0 ||
          category.subCategories.some(
            ({ laboratoryTests }) => laboratoryTests.length > 0
          )
      )
    );
    console.log(data, categories, 'hereee');
  }, [data, loading]);

  const handleSubmit = async (isCompleted: boolean) => {
    if (!categories) return;
    const categoryLabTests = categories
      .map(category => category.laboratoryTests)
      .flat()
      .map(({ id, value }) => ({
        id,
        value
      }));
    const subCategoryLabTests = categories
      .map(category =>
        category.subCategories
          .map(subCategory => subCategory.laboratoryTests)
          .flat()
      )
      .flat()
      .map(({ id, value }) => ({ id, value }));

    if (isCompleted) {
      await completeLaboratoryExamination({
        variables: {
          id: queryId,
          content: [...categoryLabTests, ...subCategoryLabTests]
        },
        refetchQueries: [
          {
            query: CardDocument,
            variables: {
              id: data?.laboratoryExamination.cardId || ''
            }
          }
        ]
      });
    } else {
      await completeLaboratoryExaminationLater({
        variables: {
          id: queryId,
          content: [...categoryLabTests, ...subCategoryLabTests]
        },
        refetchQueries: [
          {
            query: LaboratoryExaminationDocument,
            variables: {
              id: queryId
            }
          }
        ]
      });
    }
    setCategories(undefined);
    history.push('/app/data/laboratory-test');
  };

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
  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(true);
          }}
        >
          <Card>
            <CardHeader
              title={
                data ? (
                  <Typography variant="h5" gutterBottom>
                    This is a Laboratory Examination for{' '}
                    {data.laboratoryExamination.card.name}
                    <Typography variant="body1" gutterBottom>
                      Age {data.laboratoryExamination.card?.age} | Gender{' '}
                      {data.laboratoryExamination.card?.gender}
                    </Typography>
                  </Typography>
                ) : (
                  'Please insert an ID'
                )
              }
              subheader="Click on save if You want to get back to it later!"
            />
            <Divider />
          </Card>
          <Grid container>
            {categories &&
              categories.map(category => (
                <AccordionContainer
                  key={category.id}
                  category={category}
                  setCategories={setCategories}
                />
              ))}
          </Grid>

          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <ButtonGroup variant="contained" disabled={!queryId}>
              <Button
                onClick={() => handleSubmit(false)}
                name="now"
                color="secondary"
              >
                Save
              </Button>
              <Button type="submit" name="later" color="primary">
                Complete Now
              </Button>
            </ButtonGroup>
          </Box>
        </form>
        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Thanks For completing the lab test
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            You havent Filled All the Possible Examination Values
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};
export default CompleteLaboratoryExaminationFormView;
