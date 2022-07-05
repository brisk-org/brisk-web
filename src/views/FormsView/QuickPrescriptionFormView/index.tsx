import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import PrescriptionForm from './QuickPrescriptionForm';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useCreateQuickPrescriptionMutation,
  useCompleteQuickPrescriptionMutation,
  useQuickPrescriptionQuery,
  useQuickMedicinesQuery
} from '../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export type QuickPrescription = {
  id?: string | null;
  name: string;
  medicines: {
    id: string;
    name: string;
    selected: boolean;
    price: number;
  }[];
  other?: string | null;
};

const QuickPrescriptionFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);

  const [isQueried, setIsQueried] = useState(false);
  const history = useHistory();

  const [prescription, setPrescription] = useState<QuickPrescription>({
    id: query.get('id'),
    name: 'Anonimous',
    medicines: [{ id: '', name: '', selected: false, price: 0 }]
  });

  const { data: quickPrescriptionData } = useQuickPrescriptionQuery({
    variables: { id: prescription.id || '' },
    skip: !prescription.id
  });
  const { data: quickMedicinesData } = useQuickMedicinesQuery({
    skip: !!prescription.id
  });

  useEffect(() => {
    if (prescription.id) {
      setIsQueried(true);
      if (!quickPrescriptionData) return;
      const {
        id,
        name,
        medicines,
        other
      } = quickPrescriptionData.quickPrescription;

      setPrescription({
        id,
        name: name || 'Anonimous',
        other,
        medicines: medicines.map(medicine => ({
          id: medicine.id,
          name: medicine.name,
          price: 0,
          selected: false
        }))
      });
      return;
    }
    if (!quickMedicinesData) return;
    setPrescription({
      name: 'Anonimous',
      medicines: quickMedicinesData.quickMedicines.map(medicines => ({
        id: medicines.id,
        name: medicines.name,
        selected: false,
        price: 0
      }))
    });
  }, [quickMedicinesData, quickPrescriptionData]);

  const [createQuickPrescription] = useCreateQuickPrescriptionMutation({
    onError: err => console.log(err)
  });
  const [completeQuickPrescription] = useCompleteQuickPrescriptionMutation({
    onError: err => console.log(err)
  });
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    const { id, medicines: medicine, name, other } = prescription;
    const price = medicine.reduce(
      (previousValue, currentValue) => currentValue.price + previousValue,
      0
    );

    !id
      ? createQuickPrescription({
          variables: {
            name,
            medicineIds: medicine
              .filter(medicine => medicine.selected)
              .map(medicine => medicine.id),
            other
          }
        })
      : completeQuickPrescription({
          variables: {
            id,
            price,
            other
          }
        });
    history.push('/app/data/quick-prescription-test');
  };

  return (
    <Page title="Prescription Form">
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <PrescriptionForm
                isQueried={isQueried}
                prescriptionState={{ prescription, setPrescription }}
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default QuickPrescriptionFormView;
