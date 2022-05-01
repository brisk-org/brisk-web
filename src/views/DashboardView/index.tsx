import React, { useEffect, useState } from 'react';

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
  NewCreatedPrescriptionTestDocument,
  usePrescriptionTestsForDashboardQuery,
  useQuickPrescriptionTestsForDashboardQuery,
  useQuickLaboratoryTestsForDashboardQuery,
  NewCreatedQuickLaboratoryTestDocument,
  NewCreatedQuickPrescriptionTestDocument,
  useLaboratoryTestsForDashboardQuery,
  NewCreatedLaboratoryTestDocument
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
  } = useLaboratoryTestsForDashboardQuery({ variables: { skip: 0, take: 0 } });
  const {
    data: prescriptionTestsData,
    subscribeToMore: subscribeToMorePrescriptionTests
  } = usePrescriptionTestsForDashboardQuery({
    variables: { skip: 0, take: 0 }
  });
  const {
    data: quickPrescriptionData,
    subscribeToMore: subscribeToMoreQuickPrescriptionTests
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
      document: NewCreatedLaboratoryTestDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          laboratoryTests: [newCreatedCard, ...prev.laboratoryTests]
        });
      },
      onError: err => console.log(err)
    });
    subscribeToMorePrescriptionTests({
      document: NewCreatedPrescriptionTestDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          prescriptionTests: [newCreatedCard, ...prev.prescriptionTests]
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

    subscribeToMoreQuickPrescriptionTests({
      document: NewCreatedQuickPrescriptionTestDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedPrescriptionTest = subscriptionData.data;
        return Object.assign({}, prev, {
          quickPrescriptionTests: [
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
              laboratoryTestSales={laboratoryTestsData?.laboratoryTests}
              prescriptionTestSales={prescriptionTestsData?.prescriptionTests}
              quickLaboratoryTestSales={
                quickLaboratoryTestData?.quickLaboratoryTests
              }
              quickPrescriptionTestSales={
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
              laboratoryTests={laboratoryTestsData?.laboratoryTests}
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
