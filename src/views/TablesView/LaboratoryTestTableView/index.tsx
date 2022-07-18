import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import Toolbar from '../../../components/Toolbar';
import { Link } from 'react-router-dom';
import {
  LaboratoryExaminationsQuery,
  useSearchLaboratoryExaminationQuery,
  useLaboratoryExaminationsQuery,
  NewCreatedLaboratoryExaminationDocument,
  useLaboratoryExaminationCountQuery,
  Occupation
} from '../../../generated/graphql';
import MainContainerTable from '../../../components/MainContainerTable';
import SingleExaminationRow from './SingleTestRow';
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

const LaboratoryExaminationTableView = () => {
  const classes = useStyles();
  const [terms, setTerms] = useState<SearchTermsType>({
    name: ''
  });
  const { occupation } = useContext(AuthContext);

  const firstRender = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const { data: countData } = useLaboratoryExaminationCountQuery();

  const isBeingSearched = terms.name;

  const [laboratoryExaminations, setLaboratoryExaminations] = useState<
    LaboratoryExaminationsQuery['laboratoryExaminations']
  >();

  const {
    loading: searchedLaboratoryExaminationsLoading,
    data: searchedLaboratoryExaminationsData
  } = useSearchLaboratoryExaminationQuery({
    variables: { term: terms.name!, skip, take },
    skip: !isBeingSearched,
    onError: err => console.log(err)
  });

  const {
    loading: laboratoryExaminationsLoading,
    data: laboratoryExaminationData,
    subscribeToMore
  } = useLaboratoryExaminationsQuery({
    variables: { skip, take },
    skip: !!isBeingSearched,
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only',
    onError: err => console.log(err)
  });

  subscribeToMore({
    document: NewCreatedLaboratoryExaminationDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newCreatedLaboratoryExamination = subscriptionData.data;
      if (!newCreatedLaboratoryExamination) return prev;
      return Object.assign({}, prev, {
        laboratoryExaminations: prev.laboratoryExaminations
          ? [newCreatedLaboratoryExamination, ...prev.laboratoryExaminations]
          : [newCreatedLaboratoryExamination]
      });
    },
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (isBeingSearched) {
      setLaboratoryExaminations(
        searchedLaboratoryExaminationsData?.searchLaboratoryExamination
      );
      return;
    }
    setLaboratoryExaminations(
      laboratoryExaminationData?.laboratoryExaminations
    );
  }, [
    laboratoryExaminationData,
    searchedLaboratoryExaminationsData,
    isBeingSearched
  ]);

  return (
    <Page className={classes.root} title="Laboratory Examination">
      <Container ref={firstRender} maxWidth={false}>
        <Toolbar
          loading={searchedLaboratoryExaminationsLoading}
          searchState={{ terms, setTerms }}
          disablePhoneSearchField={true}
        />

        <Box mt={3}>
          {laboratoryExaminations && !laboratoryExaminations[0] && 'No result'}
          {(laboratoryExaminationsLoading ||
            searchedLaboratoryExaminationsLoading) &&
            'Loading...'}
          {laboratoryExaminations && (
            <MainContainerTable
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
              tableHead={defaultTableHeads}
              count={countData?.laboratoryExaminationCount}
            >
              {laboratoryExaminations.map((laboratoryExamination, index) => {
                return occupation === Occupation.Doctor ? (
                  <SingleExaminationRow
                    key={index}
                    laboratoryExamination={laboratoryExamination}
                  />
                ) : laboratoryExamination.paid &&
                  !laboratoryExamination.completed ? (
                  occupation === Occupation.Laboratory && (
                    <SingleExaminationRow
                      key={index}
                      laboratoryExamination={laboratoryExamination}
                    />
                  )
                ) : (
                  occupation === Occupation.Reception &&
                  !laboratoryExamination.paid && (
                    <SingleExaminationRow
                      key={index}
                      laboratoryExamination={laboratoryExamination}
                    />
                  )
                );
              })}
            </MainContainerTable>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default LaboratoryExaminationTableView;
