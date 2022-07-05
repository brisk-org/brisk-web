import React, { useEffect, useRef, useContext, useState, useMemo } from 'react';
import { Box, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import {
  NewCreatedQuickLaboratoryExaminationDocument,
  Occupation,
  QuickLaboratoryExaminationsQuery,
  useQuickLaboratoryExaminationCountQuery,
  useQuickLaboratoryExaminationsQuery
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

const QuickLaboratoryTestExaminationView = () => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);
  const firstRender = useRef<HTMLDivElement>(null);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [quickLabTests, setQuickLabTests] = useState<
    QuickLaboratoryExaminationsQuery['quickLaboratoryExaminations']
  >();

  const { data: countData } = useQuickLaboratoryExaminationCountQuery();

  const {
    data,
    loading: quickLabTestsLoading,
    subscribeToMore
  } = useQuickLaboratoryExaminationsQuery({
    variables: { skip, take },
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
  });
  useEffect(() => {
    subscribeToMore({
      document: NewCreatedQuickLaboratoryExaminationDocument,
      updateQuery: (prev, { subscriptionData }) => {
        const {
          newCreatedQuickLaboratoryExamination
        }: any = subscriptionData.data;
        if (!newCreatedQuickLaboratoryExamination) return prev;
        if (
          prev.quickLaboratoryExaminations.find(
            ({ id }) => id === newCreatedQuickLaboratoryExamination.id
          )
        )
          return prev;

        return Object.assign({}, prev, {
          quickLaboratoryExaminations: prev.quickLaboratoryExaminations
            ? [
                newCreatedQuickLaboratoryExamination,
                ...prev.quickLaboratoryExaminations
              ]
            : [newCreatedQuickLaboratoryExamination]
        });
      },
      onError: err => console.log(err)
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    setQuickLabTests(data?.quickLaboratoryExaminations);
  }, [data]);

  return (
    <Page className={classes.root} title="Quick Laboratory Examination">
      <Container ref={firstRender} maxWidth={false}>
        <Box mt={3}>
          {quickLabTests && !quickLabTests[0] && 'No result'}
          {quickLabTestsLoading && 'Loading...'}
          {quickLabTests && (
            <MainContainerTable
              count={countData?.quickLaboratoryExaminationCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {quickLabTests.map((quickLaboratoryTest, index) => {
                return occupation === Occupation.Reception ? (
                  !quickLaboratoryTest.paid && (
                    <SingleQuickLaboratoryTestRow
                      key={index}
                      laboratoryTest={quickLaboratoryTest}
                    />
                  )
                ) : (
                  <SingleQuickLaboratoryTestRow
                    key={index}
                    laboratoryTest={quickLaboratoryTest}
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

export default QuickLaboratoryTestExaminationView;
