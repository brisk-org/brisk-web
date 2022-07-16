import React, { useEffect } from 'react';
import { Backdrop, CircularProgress, Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../components/Page';
import SimpleCardInfo from './SimpleCardInfo';
import HistoryContainer from './HistoryContainer';
import LaboratoryExaminationConatiner from './LaboratoryExaminationConatiner';
import { useLocation } from 'react-router-dom';
import { useCardQuery } from '../../generated/graphql';
import PrescriptionContainer from './PrescriptionContainer';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DetailedCardView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');

  const { data, loading } = useCardQuery({
    variables: {
      id: id || ''
    },
    fetchPolicy: 'no-cache',
    pollInterval: 10000,
    onError: err => {
      console.log(err);
    }
  });
  useEffect(() => console.log(data), [data]);

  return (
    <Page title="Customers">
      <Container className={classes.root}>
        {loading && (
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {data && (
          <Grid container spacing={3}>
            <Grid item md={4} sm={12} style={{ height: 'auto' }}>
              <SimpleCardInfo data={data} />
              {data.card.laboratoryExaminations &&
                data.card.laboratoryExaminations[0] && (
                  <LaboratoryExaminationConatiner
                    cardName={data.card.name}
                    laboratoryExaminations={data.card.laboratoryExaminations}
                  />
                )}
            </Grid>
            <Grid item md={8} sm={12}>
              {data.card.history && data.card.history[0] && (
                <HistoryContainer history={data.card.history} />
              )}
              {data.card.prescriptions && data.card.prescriptions[0] && (
                <PrescriptionContainer
                  cardName={data.card.name}
                  prescriptions={data.card.prescriptions}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default DetailedCardView;
