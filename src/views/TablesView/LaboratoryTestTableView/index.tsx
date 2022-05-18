import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import Toolbar from '../../../components/Toolbar';
import { Link } from 'react-router-dom';
import {
  SearchLaboratoryTestsQuery,
  LaboratoryTestsQuery,
  useSearchLaboratoryTestsQuery,
  useLaboratoryTestsQuery,
  NewCreatedLaboratoryTestDocument,
  useLaboratoryTestsCountQuery
} from '../../../generated/graphql';
import MainContainerTable from '../../../components/MainContainerTable';
import SingleTestRow from './SingleTestRow';
import { SearchTermsType } from '../../../@types';
import { defaultTableHeads } from '../../../constants/tableHeads';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LaboratoryTestTableView = () => {
  const classes = useStyles();
  const [terms, setTerms] = useState<SearchTermsType>({
    name: ''
  });
  const { occupation } = useContext(AuthContext);

  const firstRender = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const { data: countData } = useLaboratoryTestsCountQuery();

  const isBeingSearched = terms.name;

  const [allTests, setAllTests] = useState<LaboratoryTestsQuery>();
  const [searchedTests, setSearchedTests] = useState<
    SearchLaboratoryTestsQuery
  >();

  const {
    loading: searchedTestsLoading,
    data: searchedTestsData
  } = useSearchLaboratoryTestsQuery({
    variables: { term: terms.name!, skip, take },
    skip: !isBeingSearched,
    onError: err => console.log(err)
  });

  const {
    loading: allTestsLoading,
    data: allTestsData,
    subscribeToMore
  } = useLaboratoryTestsQuery({
    variables: { skip, take },
    skip: !!isBeingSearched,
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only',
    onError: err => console.log(err)
  });

  subscribeToMore({
    document: NewCreatedLaboratoryTestDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newCreatedLaboratoryTest = subscriptionData.data;
      if (!newCreatedLaboratoryTest) return prev;
      return Object.assign({}, prev, {
        laboratoryTests: prev.laboratoryTests
          ? [newCreatedLaboratoryTest, ...prev.laboratoryTests]
          : [newCreatedLaboratoryTest]
      });
    },
    onError: err => console.log(err)
  });
  subscribeToMore({
    document: NewCreatedLaboratoryTestDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newPaidLaboratoryTest = subscriptionData.data;
      if (!newPaidLaboratoryTest) return prev;
      if (!prev.laboratoryTests && newPaidLaboratoryTest)
        return { laboratoryTests: newPaidLaboratoryTest as any };
      const filteredPrevWithoutPaidLaboratoryTest = prev.laboratoryTests.filter(
        test =>
          test.id !== (newPaidLaboratoryTest as any).newCreatedLaboratoryTest.id
      );
      return Object.assign({}, prev, {
        laboratoryTests: [
          newPaidLaboratoryTest,
          ...filteredPrevWithoutPaidLaboratoryTest
        ]
      });
    },
    onError: err => console.log(err)
  });

  useEffect(() => {
    (function() {
      isBeingSearched && setAllTests(undefined);
      isBeingSearched
        ? setSearchedTests(searchedTestsData)
        : setAllTests(allTestsData);
    })();
  }, [allTestsData, searchedTestsData, terms]);

  return (
    <Page className={classes.root} title="Laboratory Test">
      <Container ref={firstRender} maxWidth={false}>
        <Box display="flex" justifyContent="flex-end">
          <Link to="card/add">
            <Button color="primary" variant="contained">
              Add patients
            </Button>
          </Link>
        </Box>
        <Toolbar
          loading={searchedTestsLoading}
          searchState={{ terms, setTerms }}
          disablePhoneSearchField={true}
        />

        <Box mt={3}>
          {!allTests?.laboratoryTests[0] &&
            !searchedTests?.searchLaboratoryTests[0] &&
            'No result'}
          {(allTestsLoading || searchedTestsLoading) && 'Loading...'}
          {allTests?.laboratoryTests ? (
            <MainContainerTable
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
              tableHead={defaultTableHeads}
              count={countData?.laboratoryTestsCount}
            >
              {allTests.laboratoryTests.map((test, index) => {
                return occupation === 'DOCTOR' ? (
                  <SingleTestRow key={index} test={test} />
                ) : test.paid && !test.completed ? (
                  occupation === 'LABORATORIAN' && (
                    <SingleTestRow key={index} test={test} />
                  )
                ) : (
                  occupation === 'RECEPTION' &&
                  !test.paid && <SingleTestRow key={index} test={test} />
                );
              })}
            </MainContainerTable>
          ) : (
            <MainContainerTable
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
              tableHead={defaultTableHeads}
              count={countData?.laboratoryTestsCount}
            >
              {searchedTests?.searchLaboratoryTests.map((test, index) => {
                return occupation === 'DOCTOR' ? (
                  <SingleTestRow key={index} test={test} />
                ) : test.paid && !test.completed ? (
                  occupation === 'LABORATORIAN' && (
                    <SingleTestRow key={index} test={test} />
                  )
                ) : (
                  occupation === 'RECEPTION' &&
                  !test.paid && <SingleTestRow key={index} test={test} />
                );
              })}
            </MainContainerTable>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default LaboratoryTestTableView;
