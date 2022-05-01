import React, { useEffect, useRef, useState, useContext } from 'react';

import { Box, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import {
  NewCreatedQuickPrescriptionTestDocument,
  QuickPrescriptionTestsQuery,
  useQuickPrescriptionTestsCountQuery,
  useQuickPrescriptionTestsQuery
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
    QuickPrescriptionTestsQuery
  >();

  const { data: countData } = useQuickPrescriptionTestsCountQuery();

  const {
    data: quickPrescriptionsData,
    loading: quickPrescriptionsLoading,
    subscribeToMore
  } = useQuickPrescriptionTestsQuery({
    variables: { skip, take },
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
  });

  subscribeToMore({
    document: NewCreatedQuickPrescriptionTestDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newQuickPrescriptionTest = subscriptionData.data;
      if (!newQuickPrescriptionTest) return prev;

      return Object.assign({}, prev, {
        quickPrescriptionTests: prev.quickPrescriptionTests
          ? [newQuickPrescriptionTest, ...prev.quickPrescriptionTests]
          : [newQuickPrescriptionTest]
      });
    },
    onError: err => console.log(err)
  });

  useEffect(() => {
    setQuickPrescriptions(quickPrescriptionsData);
  }, [quickPrescriptionsData]);

  return (
    <Page className={classes.root} title="Prescription Test">
      <Container ref={firstRender} maxWidth={false}>
        <Box mt={3}>
          {!quickPrescriptions?.quickPrescriptionTests[0] && 'No result'}
          {quickPrescriptionsLoading && 'Loading...'}
          {quickPrescriptions?.quickPrescriptionTests && (
            <MainContainerTable
              count={countData?.quickPrescriptionTestsCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {quickPrescriptions.quickPrescriptionTests.map(
                (quickPrescriptionTest, index) => {
                  return occupation === 'RECEPTION' ? (
                    !quickPrescriptionTest.paid && (
                      <SingleQuickPrescriptionTestRow
                        key={index}
                        prescription={quickPrescriptionTest}
                      />
                    )
                  ) : (
                    <SingleQuickPrescriptionTestRow
                      key={index}
                      prescription={quickPrescriptionTest}
                    />
                  );
                }
              )}
            </MainContainerTable>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default QuickPrescriptionTestTableView;
