import React, { useEffect, useRef, useState, useContext } from 'react';

import { Box, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import {
  NewCreatedQuickPrescriptionDocument,
  Occupation,
  QuickPrescriptionsQuery,
  useQuickPrescriptionCountQuery,
  useQuickPrescriptionsQuery
} from '../../../generated/graphql';
import MainContainerTable from '../../../components/MainContainerTable';
import SingleQuickPrescriptionTestRow from './SingleQuickPrescriptionTestRow';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const QuickPrescriptionTestTableView = () => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);
  const firstRender = useRef<HTMLDivElement>(null);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [quickPrescriptions, setQuickPrescriptions] = useState<
    QuickPrescriptionsQuery['quickPrescriptions']
  >();

  const { data: countData } = useQuickPrescriptionCountQuery();

  const { data, loading, subscribeToMore } = useQuickPrescriptionsQuery({
    variables: { skip, take },
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
  });

  useEffect(() => {
    console.log('subscribed');
    subscribeToMore({
      document: NewCreatedQuickPrescriptionDocument,
      updateQuery: (prev, { subscriptionData }) => {
        const { newCreatedQuickPrescription }: any = subscriptionData.data;
        console.log(newCreatedQuickPrescription);
        if (!newCreatedQuickPrescription) return prev;
        if (
          prev.quickPrescriptions.find(
            ({ id }) => id === newCreatedQuickPrescription.id
          )
        )
          return prev;

        console.log(newCreatedQuickPrescription);
        return Object.assign({}, prev, {
          quickPrescriptions: prev.quickPrescriptions
            ? [newCreatedQuickPrescription, ...prev.quickPrescriptions]
            : [newCreatedQuickPrescription]
        });
      },
      onError: err => console.log(err)
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    setQuickPrescriptions(data.quickPrescriptions);
  }, [data]);

  return (
    <Page className={classes.root} title="Prescription Test">
      <Container ref={firstRender} maxWidth={false}>
        <Box mt={3}>
          {(!quickPrescriptions || !quickPrescriptions[0]) && 'No result'}
          {loading && 'Loading...'}
          {quickPrescriptions && (
            <MainContainerTable
              count={countData?.quickPrescriptionCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {quickPrescriptions.map(quickPrescription => {
                return occupation === Occupation.Reception ? (
                  !quickPrescription.paid && (
                    <SingleQuickPrescriptionTestRow
                      key={quickPrescription.id}
                      prescription={quickPrescription}
                    />
                  )
                ) : (
                  <SingleQuickPrescriptionTestRow
                    key={quickPrescription.id}
                    prescription={quickPrescription}
                  />
                );
              })}
            </MainContainerTable>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default QuickPrescriptionTestTableView;
