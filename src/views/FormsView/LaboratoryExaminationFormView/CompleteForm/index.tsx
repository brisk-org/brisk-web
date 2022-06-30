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
  ButtonGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router-dom';

import Page from '../../../../components/Page';
import SingleAccordion from './SingleAccordion';
import { Alert } from '@mui/material';
import {
  useCompleteLaboratoryExaminationMutation,
  useLaboratoryExaminationQuery,
  CardDocument,
  useSaveLaboratoryExaminationMutation,
  useLaboratoryTestCategoriesQuery,
  LaboratoryTestCategoriesQuery,
  LaboratoryExaminationDocument
} from '../../../../generated/graphql';
import { ExpandMore } from '@mui/icons-material';
import { SettingsContext } from '../../../../context/SettingContext';
// import { LaboratoryExaminationCatagories } from '../../../../data/testsSeed';

type OriginalLaboratoryTest = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['laboratoryTests'][0];
type OriginalLaboratoryCategory = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
export interface LaboratoryTestWithValue
  extends Omit<OriginalLaboratoryTest, 'created_at'> {
  value: string;
}
export interface LaboratoryCategoriesWithTestValue
  extends Omit<OriginalLaboratoryCategory, 'laboratoryTests'> {
  laboratoryTests: LaboratoryTestWithValue[];
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
  const [categories, setCategories] = useState<
    LaboratoryCategoriesWithTestValue[]
  >();
  const queryId = query.get('id') || '';

  // const { data: categoryData } = useLaboratoryTestCategoriesQuery();
  const { categories: categoriesContext } = useContext(SettingsContext);
  const { data, loading } = useLaboratoryExaminationQuery({
    variables: {
      id: queryId
    },
    onError: err => console.error
  });

  const [
    completeLaboratoryExamination
  ] = useCompleteLaboratoryExaminationMutation({
    onError: err => console.error
  });
  const [
    completeLaboratoryExaminationLater
  ] = useSaveLaboratoryExaminationMutation({ onError: err => console.error });

  useEffect(() => {
    if (!categoriesContext) return;
    setCategories(
      categoriesContext.map(category => ({
        ...category,
        laboratoryTests: []
      }))
    );
  }, [categoriesContext]);

  useEffect(() => {
    console.log(data);
    if (!data) return;
    setCategories(prevLabCategories =>
      prevLabCategories?.map(category => ({
        ...category,
        laboratoryTests: data.laboratoryExamination.laboratoryTests
          .filter(test => test.category?.name === category.name)
          .map(test => ({ ...test, value: '' }))
      }))
    );
    setCategories(prevLabCategories =>
      prevLabCategories?.filter(category => category.laboratoryTests.length > 0)
    );
  }, [data, loading]);

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = event => {
    if (!categories) return;
    event.preventDefault();
    const labTests = categories
      .map(category => category.laboratoryTests)
      .flat()
      .map(({ id, value }) => ({
        id,
        value
      }));
    completeLaboratoryExamination({
      variables: { id: queryId, content: labTests },
      refetchQueries: [
        {
          query: CardDocument,
          variables: {
            id: data?.laboratoryExamination.cardId || ''
          }
        }
      ]
    });
    setCategories(undefined);
    history.push('/app/data/laboratory-test');
  };

  const handleSave = () => {
    if (!categories) return;
    const labTests = categories
      .map(category => category.laboratoryTests)
      .flat()
      .map(({ id, value }) => ({
        id,
        value
      }));
    completeLaboratoryExaminationLater({
      variables: { id: queryId, content: labTests },
      refetchQueries: [
        {
          query: LaboratoryExaminationDocument,
          variables: {
            id: queryId
          }
        }
      ]
    });
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
        <form onSubmit={handleSubmit}>
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
              categories.map((category, index) => (
                <Grid key={index} item md={6} xs={12}>
                  <Accordion disabled={!category} sx={{ borderRadius: 'none' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{category.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderRadius: 'none' }}>
                      <Grid container spacing={3}>
                        {category.laboratoryTests.map(test => (
                          <SingleAccordion
                            categoryName={category.name}
                            laboratoryTest={test}
                            setLabCategories={setCategories}
                          />
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
          </Grid>

          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <ButtonGroup variant="contained" disabled={!queryId}>
              <Button onClick={handleSave} name="now" color="secondary">
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
