import React, { useEffect, useRef, useState } from 'react';

import {
  List,
  Collapse,
  Theme,
  ListItemText,
  Button,
  ListItemButton
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TestsFromCardQuery } from '../../@types/Cards';
import { useLocation } from 'react-router';
import { format } from 'date-fns';
import {
  LaboratoryTestsQuery,
  LaboratoryTestsDocument,
  useDeleteLaboratoryTestMutation
} from '../../generated/graphql';
import AlertDialog from '../../components/AlertDialog';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useReactToPrint } from 'react-to-print';
import SingleLaboratoryTestCategory from './SingleLaboratoryTestCategory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    sticky: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0
    },
    queried: {
      background: theme.palette.success.light,
      color: theme.palette.success.contrastText
    }
  })
);

const SingleDetailedTest: React.FC<{
  test: TestsFromCardQuery;
}> = ({ test }) => {
  const classes = useStyles();
  const itemDom = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [onPrint, setOnPrint] = useState(false);
  const [dialogToggle, setDialogToggle] = useState(false);
  const [proceedToDeleteAction, setProceedToDeleteAction] = useState(false);

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('testId');
  const componentToBePrinted = useRef<HTMLDivElement>(null);

  const print = useReactToPrint({
    content: () => componentToBePrinted.current,
    onAfterPrint: () => setOnPrint(false)
  });
  const handlePrintFn = () => {
    setOnPrint(true);
    print && print();
  };

  const [deleteLabTest, { client }] = useDeleteLaboratoryTestMutation({
    onError: err => console.error,
    variables: {
      id: test.id
    },
    onCompleted() {
      const laboratoryTestsCache: LaboratoryTestsQuery | null = client.readQuery(
        {
          query: LaboratoryTestsDocument
        }
      );
      if (!laboratoryTestsCache) return;
      const deletedItemRemoved = laboratoryTestsCache.laboratoryTests.filter(
        labTest => labTest.id !== test.id
      );
      client.writeQuery({
        query: LaboratoryTestsDocument,
        data: { laboratoryTests: [...deletedItemRemoved] }
      });
    }
  });

  useEffect(() => {
    if (id === test.id) {
      setOpen(true);
      itemDom.current?.scrollIntoView();
    }
  }, [id, test.id]);
  useEffect(() => {
    if (!proceedToDeleteAction) return;
    deleteLabTest();
    history.push('/app/data/laboratory-test');
  }, [proceedToDeleteAction]);

  return (
    <>
      <ListItemButton
        className={clsx({ [classes.queried]: test.id === id })}
        ref={itemDom}
        onClick={() => setOpen(!open)}
      >
        <ListItemText
          primary={
            'Tests Issued: ' + format(Number(test.created_at), 'MM/dd/yyyy')
          }
          secondary={`Total Price: ${test.price}birr`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.sticky} subheader={<li />}>
          <SingleLaboratoryTestCategory
            componentToBePrinted={componentToBePrinted}
            test={test}
            onPrint={onPrint}
          />

          <Button
            onClick={handlePrintFn}
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '10px 0' }}
          >
            Print Examination
          </Button>
          <Button
            onClick={() => setDialogToggle(true)}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Delete Laboratory Test
          </Button>
        </List>
      </Collapse>
      <AlertDialog
        dialogText={`Delete #${test.id} test`}
        state={{
          dialogToggle,
          setDialogToggle,
          setProceedToAction: setProceedToDeleteAction
        }}
      />
    </>
  );
};
export default SingleDetailedTest;
