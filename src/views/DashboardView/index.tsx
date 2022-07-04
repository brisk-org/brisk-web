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
  usePrescriptionsForDashboardQuery,
  useQuickPrescriptionsForDashboardQuery,
  useQuickLaboratoryExaminationsForDashboardQuery,
  NewCreatedQuickLaboratoryExaminationDocument,
  NewCreatedQuickPrescriptionDocument,
  useLaboratoryExaminationsForDashboardQuery,
  NewCreatedLaboratoryExaminationDocument,
  NewMedicationUpdateDocument,
  NewMedicationUpdateSubscription
} from '../../generated/graphql';
import { getTime } from 'date-fns';

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
    subscribeToMore: subscribeToMoreQuickPrescription
  } = useQuickPrescriptionsForDashboardQuery({
    variables: { skip: 0, take: 0 }
  });

  const {
    data: quickLaboratoryTestData,
    subscribeToMore: subscribeToMoreQuickLaboratoryExamination
  } = useQuickLaboratoryExaminationsForDashboardQuery({
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
      document: NewMedicationUpdateDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMedication = (subscriptionData.data as unknown) as NewMedicationUpdateSubscription['newMedicationUpdate'];
        console.log(newMedication, 'subData');
        return Object.assign({}, prev, {
          prescriptions: [newMedication, ...prev.prescriptions]
        });
      },
      onError: err => console.log(err)
    });
    subscribeToMoreQuickLaboratoryExamination({
      document: NewCreatedQuickLaboratoryExaminationDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedCard = subscriptionData.data;
        return Object.assign({}, prev, {
          quickLaboratoryTests: [
            newCreatedCard,
            ...prev.quickLaboratoryExaminations
          ]
        });
      },
      onError: err => console.log(err)
    });

    subscribeToMoreQuickPrescription({
      document: NewCreatedQuickPrescriptionDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCreatedPrescriptionTest = subscriptionData.data;
        return Object.assign({}, prev, {
          quickprescription: [
            newCreatedPrescriptionTest,
            ...prev.quickPrescriptions
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
  const prescriptionSales = prescriptionData?.prescriptions
    .map(prescription => {
      if (!prescription.inrolled && prescription.paid) {
        return {
          price: prescription.price,
          updated_at: prescription.updated_at
        };
      }
      return prescription.medications
        ?.map(medication =>
          medication.checkIn.map(
            ({ price, status }) =>
              status
                .map(({ isPaid, paidAt }) => {
                  if (!isPaid) return { price: 0, updated_at: '' };
                  return {
                    price,
                    updated_at: String(getTime(new Date(paidAt)))
                  };
                })
                .filter(({ price }) => price !== 0)!
          )
        )
        .filter(medication => medication)!;
    })
    .flat()
    .flat()
    .flat();

  return (
    <Page title="Dashboard">
      <Container style={{ paddingTop: 40 }} maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SalesContainer
              cardSales={cardSales}
              laboratoryTestSales={laboratoryTestsData?.laboratoryExaminations}
              prescriptionSales={prescriptionSales}
              quickLaboratoryTestSales={
                quickLaboratoryTestData?.quickLaboratoryExaminations
              }
              quickPrescriptionSales={quickPrescriptionData?.quickPrescriptions}
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
