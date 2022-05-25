import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import Toolbar from '../../../components/Toolbar';
import {
  NewCreatedPrescriptionTestDocument,
  usePrescriptionTestsCountQuery,
  usePrescriptionTestsQuery,
  useSearchPrescriptionTestsQuery
} from '../../../generated/graphql';
import { SearchTermsType } from '../../../@types';
import MainContainerTable from '../../../components/MainContainerTable';
import { defaultTableHeads } from '../../../constants/tableHeads';
import SinglePrescriptionRow from './SinglePrescriptionRow';
import { AuthContext } from '../../../context/AuthContext';
import {
  PrescriptionCheckIn,
  PrescriptionSettingDataType
} from '../../../context/SettingContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export type PrescriptionTest = {
  id: string;
  card: { id: string; name: string; age: string; gender: string };
  rx: string;
  result: PrescriptionSettingDataType[];
  paid: boolean;
  started: boolean;
  price: number;
  completed: boolean;
  new: boolean;
  created_at: string;
  updated_at: string;
};
const PrescriptionTestTableView = () => {
  const classes = useStyles();

  const { occupation } = useContext(AuthContext);
  const [terms, setTerms] = useState<SearchTermsType>({
    name: ''
  });
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const isBeingSearched = terms.name;

  const { data: countData } = usePrescriptionTestsCountQuery();

  const [allPrescriptions, setAllPrescriptions] = useState<
    PrescriptionTest[]
  >();
  const firstRender = useRef<HTMLDivElement>(null);

  const {
    data: searchedPrescriptionData,
    loading: searchedPrescriptionsLoading
  } = useSearchPrescriptionTestsQuery({
    variables: { term: terms.name!, skip, take },
    skip: !isBeingSearched,
    onError: err => console.log(err)
  });

  const {
    data: allPrescriptionsData,
    loading: allPrescriptionsLoading,
    subscribeToMore
  } = usePrescriptionTestsQuery({
    variables: { skip, take },
    skip: !!isBeingSearched,
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only',
    onError: err => console.log(err)
  });

  subscribeToMore({
    document: NewCreatedPrescriptionTestDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newCreatedPrescriptionTest = subscriptionData.data;
      if (!newCreatedPrescriptionTest) return prev;
      return Object.assign({}, prev, {
        prescriptionTests: prev.prescriptionTests
          ? [newCreatedPrescriptionTest, ...prev.prescriptionTests]
          : [newCreatedPrescriptionTest]
      });
    },
    onError: err => console.log(err)
  });
  subscribeToMore({
    document: NewCreatedPrescriptionTestDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newPaidPrescriptionTest = subscriptionData.data;
      if (!newPaidPrescriptionTest) return prev;
      if (!prev && newPaidPrescriptionTest)
        return { prescriptionTests: newPaidPrescriptionTest as any };
      const filteredPrevWithoutPaidLaboratoryTest = prev.prescriptionTests.filter(
        test =>
          test.id !==
          (newPaidPrescriptionTest as any).newCreatedPrescriptionTest.id
      );
      return Object.assign({}, prev, {
        prescriptionTests: [
          newPaidPrescriptionTest,
          ...filteredPrevWithoutPaidLaboratoryTest
        ]
      });
    },
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (isBeingSearched) {
      setAllPrescriptions(
        searchedPrescriptionData?.searchPrescriptionTests.map(prescription => ({
          ...prescription,
          result: (JSON.parse(
            prescription.result
          ) as PrescriptionSettingDataType[]).map(result => ({
            ...result,
            checkIn: JSON.parse(
              (result.checkIn as unknown) as string
            ) as PrescriptionCheckIn[]
          }))
        }))
      );
      return;
    }
    setAllPrescriptions(
      allPrescriptionsData?.prescriptionTests.map(prescription => ({
        ...prescription,
        result: (JSON.parse(
          prescription.result
        ) as PrescriptionSettingDataType[]).map(
          result =>
            result && {
              ...result,
              checkIn: JSON.parse(
                (result.checkIn as unknown) as string
              ) as PrescriptionCheckIn[]
            }
        )
      }))
    );
  }, [allPrescriptionsData, searchedPrescriptionData, isBeingSearched]);

  return (
    <Page className={classes.root} title="Prescription Test">
      <Container ref={firstRender} maxWidth={false}>
        <Toolbar
          loading={searchedPrescriptionsLoading}
          searchState={{ terms, setTerms }}
          disablePhoneSearchField={true}
        />
        <Box mt={3}>
          {allPrescriptions && !allPrescriptions[0] && 'No result'}
          {(allPrescriptionsLoading || searchedPrescriptionsLoading) &&
            'Loading...'}
          {allPrescriptions && (
            <MainContainerTable
              tableHead={[
                'For',
                'Started',
                'Paid?',
                'Completed?',
                'Requested At'
              ]}
              count={countData?.prescriptionTestsCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {allPrescriptions.map((prescription, index) => {
                return occupation === 'NURSE' ? (
                  prescription.started && (
                    <SinglePrescriptionRow
                      key={index}
                      prescription={prescription}
                    />
                  )
                ) : occupation === 'RECEPTION' ? (
                  !prescription.paid && (
                    <SinglePrescriptionRow
                      key={index}
                      prescription={prescription}
                    />
                  )
                ) : (
                  <SinglePrescriptionRow
                    key={index}
                    prescription={prescription}
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

export default PrescriptionTestTableView;
