import React, { useEffect, useRef, useState } from 'react';

import {
  List,
  ListItem,
  Collapse,
  Typography,
  Theme,
  ListItemText,
  Button,
  Grid
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { format } from 'date-fns';
import {
  CardQuery,
  PrescriptionsDocument,
  PrescriptionsQuery,
  useDeletePrescriptionMutation
} from '../../generated/graphql';
import AlertDialog from '../../components/AlertDialog';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const SingleDetailedPrescription: React.FC<{
  prescription: NonNullable<CardQuery['card']['prescriptions']>[0];
}> = ({ prescription }) => {
  const classes = useStyles();
  const itemDom = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [proceedToAction, setProceedToAction] = useState(false);

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('prescriptionId');

  const [deletePrescription, { client }] = useDeletePrescriptionMutation({
    onError: err => console.log(err),
    variables: {
      id: prescription.id
    },
    onCompleted() {
      const prescriptionCache: PrescriptionsQuery | null = client.readQuery({
        query: PrescriptionsDocument
      });
      if (!prescriptionCache) return;
      const deletedItemRemoved = prescriptionCache.prescriptions.filter(
        prescTest => prescTest.id !== prescription.id
      );
      client.writeQuery({
        query: PrescriptionsDocument,
        data: { prescriptions: [...deletedItemRemoved] }
      });
    }
  });
  useEffect(() => {
    if (id === prescription.id) {
      setOpen(true);
      itemDom.current?.scrollIntoView();
    }
  }, [id]);
  const handleDeletePrescription = async () => {
    await deletePrescription();
    setDialogOpen(false);
  };

  return (
    <Grid item md={6} sm={12} ref={itemDom}>
      <ListItem
        className={clsx({ [classes.queried]: prescription.id === id })}
        button
        onClick={() => setOpen(!open)}
      >
        <ListItemText
          primary={
            'Prescription Issued: ' +
            format(Number(prescription.created_at), 'MM/dd/yyyy')
          }
          secondary={`Total Price: ${prescription.price}birr`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.sticky} subheader={<li />}>
          <ul className={classes.ul}>
            {prescription.medications?.map((medication, index) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={`${medication.medicine.name} `}
                    secondary={
                      <>
                        <Typography variant="body2">
                          {medication.strength}
                        </Typography>
                        <Typography variant="body2">
                          {medication.perDay}
                        </Typography>
                        <Typography variant="body2">
                          For {medication.forDays} Days
                        </Typography>
                        <Typography variant="body2">
                          {medication.other}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </ul>
          <AlertDialog
            title="Are you sure?"
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
            handleConfirm={handleDeletePrescription}
          >
            Delete #{prescription.id} test
          </AlertDialog>

          <Button
            onClick={() => setDialogOpen(true)}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Delete Prescription
          </Button>
        </List>
      </Collapse>
    </Grid>
  );
};
export default SingleDetailedPrescription;
