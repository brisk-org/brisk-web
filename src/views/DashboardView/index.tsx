import React, { useEffect } from 'react';

import { Container, Grid } from '@mui/material';
import Page from '../../components/Page';
import LaboratoryTestsCategoryGraph from './LaboratoryTestsCategoryGraph';
import LaboratoryTestsGraph from './LaboratoryTestsGraph';
import CardsByAgeGraph from './CardsByAgeGraph';
import TotalCards from './TotalCards';
import SalesContainer from './SalesContainer';
import CardsGenderDifference from './CardsGenderDifference';
import ContactCard from './ContactCard';
import DailyCalander from './DailyCalander';
import {
  useCardsForDashboardQuery,
  NewCreatedCardDocument,
  NewCreatedPrescriptionDocument,
  usePrescriptionsForDashboardQuery,
  useQuickPrescriptionTestsForDashboardQuery,
  useQuickLaboratoryTestsForDashboardQuery,
  NewCreatedQuickLaboratoryTestDocument,
  NewCreatedQuickPrescriptionTestDocument,
  useLaboratoryExaminationsForDashboardQuery,
  NewCreatedLaboratoryExaminationDocument
} from '../../generated/graphql';

const DashboardView = () => {
  const {
    loading: cardsLoading,
    data: cardsData,
    subscribeToMore: subscribeToMoreCards
  } = useCardsForDashboardQuery({ variables: { skip: 0, take: 0 } });
  const {
    data: laboratoryTestsData,
    subscribeToMore: subscribeToMoreLaboratoryTests
  } = useLaboratoryExaminationsForDashboardQuery({
    variables: { skip: 0, take: 0 }
  });
  const {
    data: prescriptionData,
    subscribeToMore: subscribeToMoreprescription
  } = usePrescriptionsForDashboardQuery({
    variables: { skip: 0, take: 0 }
  });
  const {
    data: quickPrescriptionData,
    subscribeToMore: subscribeToMoreQuickprescription
  } = useQuickPrescriptionTestsForDashboardQuery({
    variables: { skip: 0, take: 0 }
  });

  const {
    data: quickLaboratoryTestData,
    subscribeToMore: subscribeToMoreQuickLaboratoryTests
  } = useQuickLaboratoryTestsForDashboardQuery({
    variables: { skip: 0, take: 0 }
  });

  useEffect(() => {
    subscribeToMoreCards({
      document: NewCreatedCardDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          cards: [newCreatedCard, ...prev.cards]
        });
      },
      onError: err => console.log(err)
    });
    subscribeToMoreLaboratoryTests({
      document: NewCreatedLaboratoryExaminationDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          laboratoryExaminations: [
            newCreatedCard,
            ...prev.laboratoryExaminations
          ]
        });
      },
      onError: err => console.log(err)
    });
    subscribeToMoreprescription({
      document: NewCreatedPrescriptionDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          prescription: [newCreatedCard, ...prev.prescriptions]
        });
      },
      onError: err => console.log(err)
    });
    subscribeToMoreQuickLaboratoryTests({
      document: NewCreatedQuickLaboratoryTestDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          quickLaboratoryTests: [newCreatedCard, ...prev.quickLaboratoryTests]
        });
      },
      onError: err => console.log(err)
    });

    subscribeToMoreQuickprescription({
      document: NewCreatedQuickPrescriptionTestDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedPrescriptionTest = subscriptionData.data;
        return Object.assign({}, prev, {
          quickprescription: [
            newCreatedPrescriptionTest,
            ...prev.quickPrescriptionTests
          ]
        });
      },
      onError: err => console.log(err)
    });
  }, []);

  const cardSales = cardsData?.cards
    .map(card =>
      card.payment!.map(({ price, created_at }) => ({
        price,
        updated_at: created_at
      }))
    )
    .flat();

  return (
    <Page title="Dashboard">
      <Container style={{ paddingTop: 40 }} maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SalesContainer
              cardSales={cardSales}
              laboratoryTestSales={laboratoryTestsData?.laboratoryExaminations}
              prescriptionSales={prescriptionData?.prescriptions}
              quickLaboratoryTestSales={
                quickLaboratoryTestData?.quickLaboratoryTests
              }
              quickprescriptionales={
                quickPrescriptionData?.quickPrescriptionTests
              }
            />
          </Grid>
          <Grid container item lg={8} md={7} xs={12} spacing={2}>
            <CardsGenderDifference cards={cardsData?.cards} />
            <Grid item sm={12} xs={12} spacing={2}>
              <CardsByAgeGraph cards={cardsData?.cards} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            lg={4}
            md={5}
            xs={12}
            spacing={2}
            style={{ alignContent: 'start' }}
          >
            <Grid item xs={12}>
              <TotalCards
                loading={cardsLoading}
                count={cardsData?.cards.length}
              />
            </Grid>
            <Grid item xs={12}>
              <ContactCard />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <LaboratoryTestsCategoryGraph
              laboratoryTests={[{ result: '', created_at: '' }]}
              // laboratoryTests={laboratoryTestsData?.laboratoryExaminations}
            />
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <DailyCalander />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
