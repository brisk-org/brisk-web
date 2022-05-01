import React, { useContext, useState } from 'react';

import { TableRow, TableCell, IconButton, Typography, Box, colors } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  CancelPresentationRounded,
  DoneAllRounded,
  UnfoldMore
} from '@mui/icons-material';
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthContext';
import { BallTriangle, useLoading } from '@agney/react-loading';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { cardQuery } from '../../../constants/queries';
import { PrescriptionTestType } from '../../../@types/PrescriptionTest';
import ConfirmationDialog from './ConfirmationDialog';
import CompletePrescDialog from './CompletePrescDialog';
import { useMarkPrescriptionTestAsSeenMutation } from '../../../generated/graphql';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      textAlign: 'center'
    }
  },
  newRow: {
    backgroundColor: colors.green[100],
    '&:hover': {
      backgroundColor: `${colors.green[200]}!important`
    }
  },
  paid: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  pending: {
    '& >*': {
      fill: colors.indigo[300],
      width: 20
    }
  },
  successBtn: {
    color: '#fff',
    backgroundColor: colors.green[300]
  },
  warningBtn: {
    color: '#fff',
    background: colors.red[200]
  }
}));

const SinglePrescriptionRow: React.FC<{
  prescription: PrescriptionTestType;
}> = ({ prescription }) => {
  const classes = useStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle />
  });
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [completePrescDialogOpen, setCompletePrescDialogOpen] = useState(false);
  const [markPrescriptionTestAsSeen] = useMarkPrescriptionTestAsSeenMutation();

  const history = useHistory();
  const { occupation } = useContext(AuthContext);

  const handleClick = async () => {
    switch (occupation) {
      case 'RECEPTION':
        !prescription.paid && setPaymentDialogOpen(true);
        break;
      case 'NURSE':
        setCompletePrescDialogOpen(true);
        break;
      case 'DOCTOR':
        prescription.new &&
          (await markPrescriptionTestAsSeen({
            variables: { id: prescription.id }
          }));
        history.push(
          cardQuery({
            id: prescription.card.id,
            prescriptionId: prescription.id
          })
        );
    }
  };

  const successIcon = (
    <IconButton size="small" className={classes.successBtn}>
      <DoneAllRounded fontSize="small" />
    </IconButton>
  );
  const pendingIcon = (
    <Box className={classes.pending} {...containerProps}>
      {indicatorEl}
    </Box>
  );
  const canceledIcon = (
    <IconButton size="small" className={classes.warningBtn}>
      <CancelPresentationRounded fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <TableRow
        hover
        className={clsx(classes.root, {
          [classes.newRow]: prescription.new
        })}
      >
        <TableCell padding="checkbox">
          <IconButton onClick={handleClick} size="medium">
            <UnfoldMore />
          </IconButton>
          <ConfirmationDialog
            open={paymentDialogOpen}
            setOpen={setPaymentDialogOpen}
            prescription={prescription}
          />
          <CompletePrescDialog
            open={completePrescDialogOpen}
            setOpen={setCompletePrescDialogOpen}
            prescription={prescription}
          />
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {prescription.card?.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {prescription.paid ? successIcon : pendingIcon}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {!prescription.paid
              ? canceledIcon
              : prescription.completed
              ? successIcon
              : pendingIcon}
          </Typography>
        </TableCell>
        <TableCell>
          {format(Number(prescription.created_at), 'dd/MM/yyyy')}
        </TableCell>
      </TableRow>
    </>
  );
};
export default SinglePrescriptionRow;
