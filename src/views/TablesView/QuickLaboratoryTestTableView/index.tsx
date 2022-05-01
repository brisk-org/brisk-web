import React, { useEffect, useRef, useContext, useState } from 'react';
import { Box, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import {
  NewCreatedQuickLaboratoryTestDocument,
  QuickLaboratoryTestsQuery,
  useQuickLaboratoryTestsCountQuery,
  useQuickLaboratoryTestsQuery
} from '../../../generated/graphql';
import MainContainerTable from '../../../components/MainContainerTable';
import SingleQuickLaboratoryTestRow from './SingleQuickLaboratoryTestRow';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const QuickLaboratoryTestTableView = () => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);
  const firstRender = useRef<HTMLDivElement>(null);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [quickLabTests, setQuickLabTests] = useState<
    QuickLaboratoryTestsQuery
  >();

  const { data: countData } = useQuickLaboratoryTestsCountQuery();

  const {
    data: quickLabTestData,
    loading: quickLabTestsLoading,
    subscribeToMore
  } = useQuickLaboratoryTestsQuery({
    variables: { skip, take },
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
  });
  subscribeToMore({
    document: NewCreatedQuickLaboratoryTestDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newCreatedQuickLaboratoryTest = subscriptionData.data;
      if (!newCreatedQuickLaboratoryTest) return prev;

      return Object.assign({}, prev, {
        quickLaboratoryTests: prev.quickLaboratoryTests
          ? [newCreatedQuickLaboratoryTest, ...prev.quickLaboratoryTests]
          : [newCreatedQuickLaboratoryTest]
      });
    },
    onError: err => console.log(err)
  });

  useEffect(() => {
    setQuickLabTests(quickLabTestData);
  }, [quickLabTestData]);

  return (
    <Page className={classes.root} title="Prescription Test">
      <Container ref={firstRender} maxWidth={false}>
        <Box mt={3}>
          {!quickLabTests?.quickLaboratoryTests[0] && 'No result'}
          {quickLabTestsLoading && 'Loading...'}
          {quickLabTests?.quickLaboratoryTests && (
            <MainContainerTable
              count={countData?.quickLaboratoryTestsCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {quickLabTests.quickLaboratoryTests.map(
                (quickLaboratoryTest, index) => {
                  return occupation === 'RECEPTION' ? (
                    !quickLaboratoryTest.paid && (
                      <SingleQuickLaboratoryTestRow
                        key={index}
                        labTest={quickLaboratoryTest}
                      />
                    )
                  ) : (
                    <SingleQuickLaboratoryTestRow
                      key={index}
                      labTest={quickLaboratoryTest}
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

export default QuickLaboratoryTestTableView;
