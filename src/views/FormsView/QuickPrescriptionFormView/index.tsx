import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import PrescriptionForm from './QuickPrescriptionForm';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useCreateQuickPrescriptionTestMutation,
  useCompleteQuickPrescriptionTestMutation
} from '../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export type QuickPrescription = {
  id: string | null;
  name: string;
  bp: {
    selected: boolean;
    price: number;
  };
  dressing: {
    selected: boolean;
    price: number;
  };
  injection: {
    selected: boolean;
    price: number;
  };
  tat: {
    selected: boolean;
    price: number;
  };
  depo: {
    selected: boolean;
    price: number;
  };
  other: string;
};

const QuickPrescriptionFormView = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);

  const [isQueried, setIsQueried] = useState(false);
  const history = useHistory();

  const [prescription, setPrescription] = useState<QuickPrescription>({
    id: query.get('id'),
    name: query.get('name') || '',
    bp: { selected: query.get('bp') === 'true' || false, price: 0 },
    dressing: { selected: query.get('dressing') === 'true' || false, price: 0 },
    injection: {
      selected: query.get('injection') === 'true' || false,
      price: 0
    },
    tat: { selected: query.get('tat') === 'true' || false, price: 0 },
    depo: { selected: query.get('depo') === 'true' || false, price: 0 },
    other: ''
  });
  useEffect(() => {
    prescription.id && setIsQueried(true);
  }, [query]);

  const [createQuickPrescription] = useCreateQuickPrescriptionTestMutation({
    onError: err => console.log(err)
  });
  const [completeQuickPrescription] = useCompleteQuickPrescriptionTestMutation({
    onError: err => console.log(err)
  });
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    const {
      id,
      bp,
      name,
      dressing,
      injection,
      tat,
      depo,
      other
    } = prescription;
    const price =
      bp.price + dressing.price + injection.price + tat.price + depo.price;
    const result = {
      bp: bp.selected,
      dressing: dressing.selected,
      injection: injection.selected,
      tat: tat.selected,
      depo: depo.selected
    };
    !id
      ? createQuickPrescription({
          variables: {
            name,
            result,
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
