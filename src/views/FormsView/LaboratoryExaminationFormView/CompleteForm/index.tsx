import React, { useEffect, useState } from 'react';

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
  LaboratoryTestCategory
} from '../../../../generated/graphql';
import { ExpandMore } from '@mui/icons-material';
// import { LaboratoryExaminationCatagories } from '../../../../data/testsSeed';

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
  const [labCategories, setLabCategories] = useState<
    LaboratoryTestCategory[]
  >();
  const queryId = query.get('id') || '';

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
  ] = useSaveLaboratoryExaminationMutation({
    onError: err => console.error
  });

  useEffect(() => {
    if (!data) return;
    // setLabCategories(
    //   JSON.parse(data.laboratoryExamination.result) as LaboratoryTestCatagories[]
    // );
    console.log(labCategories);
  }, [data, loading]);

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = event => {
    if (!labCategories) return;
    event.preventDefault();
    completeLaboratoryExamination({
      variables: { id: queryId, result: JSON.stringify(labCategories) },
      refetchQueries: [
        {
          query: CardDocument,
          variables: {
            id: data?.laboratoryExamination.cardId || ''
          }
        }
      ]
    });
    setLabCategories(undefined);
    history.push('/app/data/laboratory-test');
  };

  const handleComplete:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = event => {
    if (!labCategories) return;
    completeLaboratoryExaminationLater({
      variables: { id: queryId, result: JSON.stringify(labCategories) },
      refetchQueries: [
        {
          query: CardDocument,
          variables: {
            id: data?.laboratoryExamination.cardId || ''
          }
        }
      ]
    });
    setLabCategories(undefined);
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
            {labCategories &&
              labCategories.map((category, index) => (
                <Grid
                  key={index}
                  item
                  // md={category.name === 'Clinical Chemistry' ? 12 : 6}
                  md={6}
                  xs={12}
                >
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
                        {category.laboratoryTests.map((test, index) => (
                          // <SingleAccordion
                          //   test={test}
                          //   setLabCategories={setLabCategories}
                          // />
                          <div></div>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            {/* {Object.keys(categories).map((category, index) => {
            const categorySelected = tests?.filter(
              field => field.category === category && field.name
            );
            return (
              categorySelected &&
              categorySelected[0] && (
                <Grid
                  key={index}
                  item
                  md={category === 'Clinical Chemistry' ? 12 : 6}
                  xs={12}
                >
                  <form onSubmit={e => e.preventDefault()}>
                    <SingleAccordion
                      category={category}
                      testsState={{ tests, setExaminations }}
                    />
                  </form>
                </Grid>
              )
            );
          })} */}
          </Grid>

          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <ButtonGroup variant="contained" disabled={!queryId}>
              <Button onClick={handleComplete} name="now" color="secondary">
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
