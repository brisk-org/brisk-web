import React, { useEffect, useRef, useContext, useState } from 'react';
import { Box, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import {
  NewCreatedQuickLaboratoryExaminationDocument,
  Occupation,
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

const QuickLaboratoryTestTableView = () => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);
  const firstRender = useRef<HTMLDivElement>(null);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  // const [quickLabTests, setQuickLabTests] = useState<
  //   QuickLaboratoryExaminations
  // >();

  const { data: countData } = useQuickLaboratoryExaminationCountQuery();

  const {
    data,
    loading: quickLabTestsLoading,
    subscribeToMore
  } = useQuickLaboratoryExaminationsQuery({
    variables: { skip, take },
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only'
  });
  subscribeToMore({
    document: NewCreatedQuickLaboratoryExaminationDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newCreatedQuickLaboratoryTest = subscriptionData.data;
      if (!newCreatedQuickLaboratoryTest) return prev;

      return Object.assign({}, prev, {
        quickLaboratoryTests: prev.quickLaboratoryExaminations
          ? [newCreatedQuickLaboratoryTest, ...prev.quickLaboratoryExaminations]
          : [newCreatedQuickLaboratoryTest]
      });
    },
    onError: err => console.log(err)
  });

  // useEffect(() => {
  //   setQuickLabTests(data);
  // }, [data]);

  return (
    <Page className={classes.root} title="Quick Laboratory Examination">
      <Container ref={firstRender} maxWidth={false}>
        <Box mt={3}>
          {!data?.quickLaboratoryExaminations[0] && 'No result'}
          {quickLabTestsLoading && 'Loading...'}
          {data?.quickLaboratoryExaminations && (
            <MainContainerTable
              count={countData?.quickLaboratoryExaminationCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {data.quickLaboratoryExaminations.map(
                (quickLaboratoryTest, index) => {
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
