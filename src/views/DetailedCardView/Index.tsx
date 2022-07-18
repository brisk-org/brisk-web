import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../components/Page';
import SimpleCardInfo from './SimpleCardInfo';
import HistoryContainer from './HistoryContainer';
import LaboratoryExaminationConatiner from './LaboratoryExaminationConatiner';
import { useLocation } from 'react-router-dom';
import { CardQuery, useCardQuery } from '../../generated/graphql';
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
  const [card, setCard] = useState<CardQuery['card']>();

  const { data, loading } = useCardQuery({
    variables: {
      id: id || ''
    },
    fetchPolicy: 'no-cache',
    // pollInterval: 10000,
    onError: err => {
      console.log(err);
    }
  });
  useEffect(() => {
    if (!data) return;
    setCard(data.card);
  }, [data]);

  return (
    <Page title="Customers">
      <Container className={classes.root}>
        {loading && (
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {card && (
          <Grid container spacing={3}>
            <Grid item md={4} sm={12} style={{ height: 'auto' }}>
              {card && <SimpleCardInfo card={card} />}
              {card.laboratoryExaminations &&
                card.laboratoryExaminations[0] && (
                  <LaboratoryExaminationConatiner
                    cardName={card.name}
                    laboratoryExaminations={card.laboratoryExaminations}
                  />
                )}
            </Grid>
            <Grid item md={8} sm={12}>
              {card.history && card.history[0] && (
                <HistoryContainer history={card.history} />
              )}
              {card.prescriptions && card.prescriptions[0] && (
                <PrescriptionContainer
                  cardName={card.name}
                  prescriptions={card.prescriptions}
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
