import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import QuickLabTestForm from './QuickLabTestForm';
import { useHistory, useLocation } from 'react-router-dom';
import {
  NotificationAction,
  QuickLaboratoryExamination,
  QuickLaboratoryExaminationResult,
  useCompleteQuickLaboratoryExaminationMutation,
  useCreateQuickLaboratoryExaminationMutation,
  useQuickLaboratoryExaminationQuery,
  useQuickLaboratoryTestsQuery
} from '../../../generated/graphql';
import { NotificationContext } from '../../../context/NotificationContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export type QuickLabExamination = {
  id?: string | null;
  name: string;
  tests: {
    id: string;
    name: string;
    selected: boolean;
    price: number;
  }[];
  result?: QuickLaboratoryExaminationResult | null;
  other?: string | null;
};

const QuickLaboratoryTestFormView = () => {
  const classes = useStyles();

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [isQueried, setIsQueried] = useState(false);
  const [qLabTest, setQLabTest] = useState<QuickLabExamination>({
    id: query.get('id'),
    name: 'Anonimous',
    tests: [{ id: '', name: '', selected: false, price: 0 }]
  });

  const { notifications, handleDeleteNotification } = useContext(
    NotificationContext
  );
  const { data: quickLaboratoryTestsData } = useQuickLaboratoryTestsQuery({
    skip: isQueried
  });
  const {
    data: quickLaboratoryExaminationData
  } = useQuickLaboratoryExaminationQuery({
    variables: { id: qLabTest.id || '' },
    skip: !qLabTest.id
  });

  useEffect(() => {
    if (qLabTest.id) {
      setIsQueried(true);
      if (!quickLaboratoryExaminationData) return;
      const {
        id,
        name,
        tests,
        other,
        result
      } = quickLaboratoryExaminationData.quickLaboratoryExamination;
      console.log(result, tests, id);

      setQLabTest({
        id,
        name: name || 'Anonimous',
        other,
        result,
        tests: tests.map(test => ({
          id: test.id,
          name: test.name,
          price: 0,
          selected: false
        }))
      });
      return;
    }
    if (!quickLaboratoryTestsData) return;
    setQLabTest({
      name: 'Anonimous',
      tests: quickLaboratoryTestsData.quickLaboratoryTests.map(test => ({
        id: test.id,
        name: test.name,
        selected: false,
        price: 0
      }))
    });
  }, [quickLaboratoryExaminationData, quickLaboratoryTestsData]);

  const [createQuickLabTest] = useCreateQuickLaboratoryExaminationMutation({
    onError: err => console.log(err)
  });
  const [completeQuickLabTest] = useCompleteQuickLaboratoryExaminationMutation({
    onError: err => console.log(err),
    onCompleted() {
      const viewedNotif = notifications?.find(
        notif =>
          notif.quick_laboratory_test?.id === qLabTest.id &&
          notif.action === NotificationAction['Complete']
      );
      viewedNotif && handleDeleteNotification(viewedNotif.id);
    }
  });
  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async event => {
    event.preventDefault();
    const { id, name, tests, other, result } = qLabTest;
    const price = tests.reduce(
      (previousValue, currentValue) => currentValue.price + previousValue,
      0
    );

    !id
      ? await createQuickLabTest({
          variables: {
            name,
            result,
            testIds: tests.filter(test => test.selected).map(test => test.id),
            other
          }
        })
      : await completeQuickLabTest({
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
