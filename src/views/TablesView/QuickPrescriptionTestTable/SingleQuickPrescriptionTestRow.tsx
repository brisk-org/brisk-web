import React, { useContext, useState } from 'react';

import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Box,
  colors
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DoneAllRounded, UnfoldMore } from '@mui/icons-material';
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthContext';
import { BallTriangle, useLoading } from '@agney/react-loading';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { quickPrescribeQuery } from '../../../constants/queries';
import ConfirmationDialog from './ConfirmationDialog';
import { QuickPrescriptionType } from '../../../@types/QuickLaboratoryTests';
import CompletedQuickPrescriptionTestListDialog from './CompletedQuickPrescriptionTestListDialog';
import {
  Occupation,
  useMarkQuickPrescriptionTestAsSeenMutation
} from '../../../generated/graphql';

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

const SingleQuickPrescriptionTestRow: React.FC<{
  prescription: QuickPrescriptionType;
}> = ({ prescription }) => {
  const classes = useStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle />
  });
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [completedListDialogOpen, setCompletedListDialogOpen] = useState(false);

  const history = useHistory();
  const { occupation } = useContext(AuthContext);
  const [
    markQuickPerscriptionAsSeen
  ] = useMarkQuickPrescriptionTestAsSeenMutation();

  const handleClick = async () => {
    const { bp, dressing, injection, depo, tat } = JSON.parse(
      prescription.result
    ) as any;
    switch (occupation) {
      case Occupation.Reception:
        !prescription.paid && setPaymentDialogOpen(true);
        break;
      case Occupation.Doctor:
        // prescription.new &&
        //   (await markQuickPerscriptionAsSeen({
        //     variables: { id: prescription.id }
        //   }));
        setCompletedListDialogOpen(true);
        break;
      case Occupation.Nurse:
        prescription.completed
          ? setCompletedListDialogOpen(true)
          : history.push(
              quickPrescribeQuery({
                id: prescription.id,
                name: prescription.name,
                bp,
                dressing,
                injection,
                depo,
                tat
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
          <CompletedQuickPrescriptionTestListDialog
            open={completedListDialogOpen}
            setOpen={setCompletedListDialogOpen}
            prescription={prescription}
          />
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {prescription.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {prescription.paid ? successIcon : pendingIcon}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {prescription.completed ? successIcon : pendingIcon}
          </Typography>
        </TableCell>
        <TableCell>
          {format(Number(prescription.created_at), 'dd/MM/yyyy')}
        </TableCell>
      </TableRow>
    </>
  );
};
export default SingleQuickPrescriptionTestRow;
