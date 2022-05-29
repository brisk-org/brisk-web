import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from '../../../components/Page';
import Toolbar from '../../../components/Toolbar';
import {
  NewCreatedPrescriptionDocument,
  PrescriptionsQuery,
  usePrescriptionCountQuery,
  usePrescriptionsQuery,
  useSearchPrescriptionsQuery
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

  const { data: countData } = usePrescriptionCountQuery();

  const [prescriptions, setPrescriptions] = useState<
    PrescriptionsQuery['prescriptions']
  >();
  const firstRender = useRef<HTMLDivElement>(null);

  const {
    data: searchedPrescriptionData,
    loading: searchedPrescriptionsLoading
  } = useSearchPrescriptionsQuery({
    variables: { term: terms.name!, skip, take },
    skip: !isBeingSearched,
    onError: err => console.log(err)
  });

  const {
    data: allPrescriptionsData,
    loading: allPrescriptionsLoading,
    subscribeToMore
  } = usePrescriptionsQuery({
    variables: { skip, take },
    skip: !!isBeingSearched,
    fetchPolicy: firstRender.current ? 'cache-first' : 'network-only',
    onError: err => console.log(err)
  });

  subscribeToMore({
    document: NewCreatedPrescriptionDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newCreatedPrescriptionTest = subscriptionData.data;
      if (!newCreatedPrescriptionTest) return prev;
      return Object.assign({}, prev, {
        prescriptions: prev.prescriptions
          ? [newCreatedPrescriptionTest, ...prev.prescriptions]
          : [newCreatedPrescriptionTest]
      });
    },
    onError: err => console.log(err)
  });
  subscribeToMore({
    document: NewCreatedPrescriptionDocument,
    updateQuery: (prev, { subscriptionData }) => {
      const newPaidPrescriptionTest = subscriptionData.data;
      if (!newPaidPrescriptionTest) return prev;
      if (!prev && newPaidPrescriptionTest)
        return { prescriptions: newPaidPrescriptionTest as any };
      const filteredPrevWithoutPaidLaboratoryTest = prev.prescriptions.filter(
        prescription =>
          prescription.id !==
          (newPaidPrescriptionTest as any).newCreatedPrescriptionTest.id
      );
      return Object.assign({}, prev, {
        prescriptions: [
          newPaidPrescriptionTest,
          ...filteredPrevWithoutPaidLaboratoryTest
        ]
      });
    },
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (isBeingSearched) {
      setPrescriptions(searchedPrescriptionData?.searchPrescriptions);
      return;
    }
    setPrescriptions(allPrescriptionsData?.prescriptions);
    console.log(prescriptions, allPrescriptionsData);
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
          {prescriptions && !prescriptions[0] && 'No result'}
          {(allPrescriptionsLoading || searchedPrescriptionsLoading) &&
            'Loading...'}
          {prescriptions && (
            <MainContainerTable
              tableHead={[
                'For',
                'Started',
                'Paid?',
                'Completed?',
                'Requested At'
              ]}
              count={countData?.prescriptionCount}
              skipState={{ skip, setSkip }}
              takeState={{ take, setTake }}
            >
              {prescriptions.map((prescription, index) => {
                return occupation === 'NURSE' ? (
                  prescription.inrolled && (
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
