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
  cardName: string;
  cardAge: string;
  cardGender: string;
  laboratoryExaminations: NonNullable<
    CardQuery['card']['laboratoryExaminations']
  >[0];
}> = ({ laboratoryExaminations, cardName, cardAge, cardGender }) => {
  const classes = useStyles();
  const itemDom = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [onPrint, setOnPrint] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('testId');
  const componentToBePrinted = useRef<HTMLDivElement>(null);

  const print = useReactToPrint({
    content: () => componentToBePrinted.current,
    onAfterPrint: () => setOnPrint(false)
  });
  useEffect(() => {
    console.log(onPrint);
  }, [onPrint]);
  const handlePrintFn = () => {
    setOnPrint(true);
  };
  useEffect(() => {
    if (!onPrint) return;

    print && print();
  }, [onPrint]);

  const [
    deleteLabExamination,
    { client }
  ] = useDeleteLaboratoryExaminationMutation({
    onError: err => console.error(err),
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
  const handleDeleteLabExamination = async () => {
    await deleteLabExamination();
    history.push('/app/data/laboratory-test');
  };

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
            cardName={cardName}
            cardAge={cardAge}
            cardGender={cardGender}
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
            onClick={() => setDialogOpen(true)}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Delete Laboratory Examination
          </Button>
        </List>
      </Collapse>
      <AlertDialog
        title="Are you sure?"
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleConfirm={handleDeleteLabExamination}
      >
        Delete {laboratoryExaminations.id}
      </AlertDialog>
    </>
  );
};
export default LaboratoryExaminationItem;
