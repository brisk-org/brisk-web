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
import { useLocation } from 'react-router';
import { format } from 'date-fns';
import {
  LaboratoryExaminationsQuery,
  LaboratoryExaminationsDocument,
  useDeleteLaboratoryExaminationMutation,
  CardQuery
} from '../../generated/graphql';
import AlertDialog from '../../components/AlertDialog';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useReactToPrint } from 'react-to-print';
import SingleLaboratoryExaminationCategory from './SingleLaboratoryTestCategory';

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

const LaboratoryExaminationItem: React.FC<{
  laboratoryExaminations: NonNullable<
    CardQuery['card']['laboratoryExaminations']
  >[0];
}> = ({ laboratoryExaminations }) => {
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

  const [
    deleteLabExamination,
    { client }
  ] = useDeleteLaboratoryExaminationMutation({
    onError: err => console.error,
    variables: {
      id: laboratoryExaminations.id
    },
    onCompleted() {
      const laboratoryExaminationsCache: LaboratoryExaminationsQuery | null = client.readQuery(
        {
          query: LaboratoryExaminationsDocument
        }
      );
      if (!laboratoryExaminationsCache) return;
      const deletedItemRemoved = laboratoryExaminationsCache.laboratoryExaminations.filter(
        labExamination => labExamination.id !== laboratoryExaminations.id
      );
      client.writeQuery({
        query: LaboratoryExaminationsDocument,
        data: { laboratoryExaminations: [...deletedItemRemoved] }
      });
    }
  });

  useEffect(() => {
    if (id === laboratoryExaminations.id) {
      setOpen(true);
      itemDom.current?.scrollIntoView();
    }
  }, [id, laboratoryExaminations.id]);
  useEffect(() => {
    if (!proceedToDeleteAction) return;
    deleteLabExamination();
    history.push('/app/data/laboratory-test');
  }, [proceedToDeleteAction]);

  return (
    <>
      <ListItemButton
        className={clsx({
          [classes.queried]: laboratoryExaminations.id === id
        })}
        ref={itemDom}
        onClick={() => setOpen(!open)}
      >
        <ListItemText
          primary={
            'Examinations Issued: ' +
            format(Number(laboratoryExaminations.created_at), 'MM/dd/yyyy')
          }
          secondary={`Total Price: ${laboratoryExaminations.price}birr`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.sticky} subheader={<li />}>
          <SingleLaboratoryExaminationCategory
            componentToBePrinted={componentToBePrinted}
            laboratoryExamination={laboratoryExaminations}
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
            Delete Laboratory Examination
          </Button>
        </List>
      </Collapse>
      <AlertDialog
        dialogText={`Delete #${laboratoryExaminations.id} test`}
        state={{
          dialogToggle,
          setDialogToggle,
          setProceedToAction: setProceedToDeleteAction
        }}
      />
    </>
  );
};
export default LaboratoryExaminationItem;
