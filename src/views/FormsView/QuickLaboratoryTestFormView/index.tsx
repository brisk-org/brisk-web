import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import QuickLabTestForm from './QuickLabTestForm';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useCompleteQuickLaboratoryTestMutation,
  useCreateQuickLaboratoryTestMutation
} from '../../../generated/graphql';
import { NotificationContext } from '../../../context/NotificationContext';
import { NotifAction } from '../../../@types/Notification';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export type QuickLabTest = {
  id: string | null;
  name: string;
  fbs: {
    selected: boolean;
    price: number;
  };
  hcg: {
    selected: boolean;
    price: number;
  };
  rbs: {
    selected: boolean;
    price: number;
  };
  other: string;
};

const QuickLaboratoryTestFormView = () => {
  const classes = useStyles();

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [isQueried, setIsQueried] = useState(false);
  const [qLabTest, setQLabTest] = useState<QuickLabTest>({
    id: query.get('id'),
    name: query.get('name') || '',
    fbs: { selected: query.get('fbs') === 'true' || false, price: 0 },
    hcg: { selected: query.get('hcg') === 'true' || false, price: 0 },
    rbs: { selected: query.get('rbs') === 'true' || false, price: 0 },
    other: ''
  });

  const { notifications, handleDeleteNotification } = useContext(
    NotificationContext
  );
  useEffect(() => {
    qLabTest.id && setIsQueried(true);
  }, [query]);

  const [createQuickLabTest] = useCreateQuickLaboratoryTestMutation({
    onError: err => console.log(err)
  });
  const [completeQuickLabTest] = useCompleteQuickLaboratoryTestMutation({
    onError: err => console.log(err),
    onCompleted() {
      const viewedNotif = notifications.find(
        notif =>
          notif.quick_laboratory_test_id === Number(qLabTest.id) &&
          (notif.action as NotifAction) === 'CREATE_QUICK_LABORATORY_TEST'
      );
      viewedNotif && handleDeleteNotification(viewedNotif.id);
    }
  });
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    const { id, name, fbs, hcg, rbs, other } = qLabTest;
    const price = fbs.price + hcg.price + rbs.price;
    const result = JSON.stringify({
      fbs: fbs.selected,
      hcg: hcg.selected,
      rbs: rbs.selected,
      other
    });
    !id
      ? createQuickLabTest({
          variables: {
            name,
            result,
            other
          }
        })
      : completeQuickLabTest({
          variables: {
            id,
            price,
            other
          }
        });
    history.push('/app/data/quick-laboratory-test');
  };

  return (
    <Page title="Quick Lab-Test Form">
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <QuickLabTestForm
                isQueried={isQueried}
                qLabTestState={{ qLabTest, setQLabTest }}
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default QuickLaboratoryTestFormView;
