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
import { PrescriptionsFromCardQuery } from '../../@types/Cards';
import { useLocation } from 'react-router';
import { format } from 'date-fns';
import {
  PrescriptionTestsDocument,
  PrescriptionTestsQuery,
  useDeletePrescriptionTestMutation
} from '../../generated/graphql';
import AlertDialog from '../../components/AlertDialog';
import { useHistory } from 'react-router-dom';
import { PrescriptionSettingDataType } from '../../context/SettingContext';
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
  prescription: PrescriptionsFromCardQuery;
}> = ({ prescription }) => {
  const classes = useStyles();
  const itemDom = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [dialogToggle, setDialogToggle] = useState(false);
  const [proceedToAction, setProceedToAction] = useState(false);

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('prescriptionId');

  const [deletePrescription, { client }] = useDeletePrescriptionTestMutation({
    onError: err => console.log(err),
    variables: {
      id: prescription.id
    },
    onCompleted() {
      const prescriptionTestsCache: PrescriptionTestsQuery | null = client.readQuery(
        {
          query: PrescriptionTestsDocument
        }
      );
      if (!prescriptionTestsCache) return;
      const deletedItemRemoved = prescriptionTestsCache.prescriptionTests.filter(
        prescTest => prescTest.id !== prescription.id
      );
      client.writeQuery({
        query: PrescriptionTestsDocument,
        data: { prescriptionTests: [...deletedItemRemoved] }
      });
    }
  });
  const handleClick = () => {
    setOpen(!open);
  };
  const handleDialogOpen = () => {
    setDialogToggle(true);
  };
  useEffect(() => {
    if (id === prescription.id) {
      setOpen(true);
      itemDom.current?.scrollIntoView();
    }
  }, [id]);
  useEffect(() => {
    if (!proceedToAction) return;
    deletePrescription();
    history.push('/app/data/prescription-test');
  }, [proceedToAction]);

  return (
    <Grid item md={6} sm={12} ref={itemDom}>
      <ListItem
        className={clsx({ [classes.queried]: prescription.id === id })}
        button
        onClick={handleClick}
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
            {(JSON.parse(
              prescription.result
            ) as PrescriptionSettingDataType[]).map((prescription, index) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={`${prescription.name} `}
                    secondary={
                      <>
                        <Typography variant="body2">
                          {prescription.quantity}
                        </Typography>
                        <Typography variant="body2">
                          {prescription.perDay}
                        </Typography>
                        <Typography variant="body2">
                          For {prescription.forDays} Days
                        </Typography>
                        <Typography variant="body2">
                          {prescription.other}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </ul>
          <AlertDialog
            dialogText={`Delete #${prescription.id} test`}
            state={{ dialogToggle, setDialogToggle, setProceedToAction }}
          />
          <Button
            onClick={handleDialogOpen}
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
