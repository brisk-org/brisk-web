import React, { useEffect, useRef, useState } from 'react';

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
import {
  categories,
  PlaceholderTestType
} from '../../../../data/testsPlaceHolder';
import SingleAccordion from './SingleAccordion';
import { Alert } from '@mui/material';
import {
  useCompleteLaboratoryTestMutation,
  useLaboratoryTestQuery,
  LaboratoryTestInput,
  CardDocument,
  useCompleteLaterLaboratoryTestMutation,
  useSettingQuery
} from '../../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CompleteLaboratoryTestFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const firstRender = useRef<HTMLDivElement>(null);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [tests, setTests] = useState<PlaceholderTestType[]>();
  const id = query.get('id') || '';

  const { data: settingData } = useSettingQuery();

  const { data, loading } = useLaboratoryTestQuery({
    variables: {
      id
    },
    onError: err => console.error
  });
  const [completeLaboratoryTest] = useCompleteLaboratoryTestMutation({
    onError: err => console.error
  });
  const [completeLaboratoryTestLater] = useCompleteLaterLaboratoryTestMutation({
    onError: err => console.error
  });

  useEffect(() => {
    if (!data || !settingData) return;
    console.log(data.laboratoryTest);
    JSON.parse(data.laboratoryTest.result).forEach(
      (test: LaboratoryTestInput) => {
        setTests(prevField => {
          const selectedField = (JSON.parse(
            settingData.setting.laboratory_tests_data
          ) as PlaceholderTestType[]).find(field => field.name === test.name);
          console.log(test);
          return !prevField
            ? [{ ...selectedField!, value: test.value || '' }]
            : [...prevField, { ...selectedField!, value: test.value || '' }];
        });
      }
    );
  }, [data, loading, settingData]);

  const handleComplete:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = event => {
    if (!tests) return;
    const isUnfilledTest = tests.find(test => test.value === '');
    const now = event.currentTarget.name === 'now';

    if (now && isUnfilledTest) {
      setErrorSnackbarOpen(true);
      return;
    }
    const completedTest = tests.map(test => {
      return {
        name: test.name,
        category: test.category,
        value: test.value
      };
    });
    now
      ? completeLaboratoryTest({
          variables: { id, result: completedTest },
          refetchQueries: [
            {
              query: CardDocument,
              variables: {
                id: data?.laboratoryTest.cardId || ''
              }
            }
          ]
        })
      : completeLaboratoryTestLater({
          variables: { id, result: completedTest },
          refetchQueries: [
            {
              query: CardDocument,
              variables: {
                id: data?.laboratoryTest.cardId || ''
              }
            }
          ]
        });
    setTests(undefined);
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
      <Container ref={firstRender} maxWidth="lg">
        <Card>
          <CardHeader
            title={
              data ? (
                <Typography variant="h5" gutterBottom>
                  This is a Laboratory Test for {data.laboratoryTest.card.name}
                  <Typography variant="body1" gutterBottom>
                    Age {data.laboratoryTest.card?.age} | Gender{' '}
                    {data.laboratoryTest.card?.gender}
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
          {Object.keys(categories).map((category, index) => {
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
                      testsState={{ tests, setTests }}
                    />
                  </form>
                </Grid>
              )
            );
          })}
        </Grid>

        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <ButtonGroup variant="contained" disabled={!id}>
            <Button onClick={handleComplete} name="later" color="primary">
              Save
            </Button>
            <Button onClick={handleComplete} name="now" color="secondary">
              Complete Now
            </Button>
          </ButtonGroup>
        </Box>
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
            You havent Filled All the Possible Test Values
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};
export default CompleteLaboratoryTestFormView;
