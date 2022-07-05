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
import { quickLabTest } from '../../../constants/queries';
import ConfirmationDialog from './ConfirmationDialog';
import { useHistory } from 'react-router';
import CompletedQuickLaboratoryTestListDialog from './CompletedQuickLaboratoryTestListDialog';
import {
  Occupation,
  QuickLaboratoryExaminationsQuery
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

const SingleQuickLaboratoryTestRow: React.FC<{
  laboratoryTest: QuickLaboratoryExaminationsQuery['quickLaboratoryExaminations'][0];
}> = ({ laboratoryTest }) => {
  const classes = useStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle />
  });
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [completedListDialogOpen, setCompletedListDialogOpen] = useState(false);

  const history = useHistory();
  const { occupation } = useContext(AuthContext);

  const handleClick = () => {
    switch (occupation) {
      case Occupation.Reception:
        setPaymentDialogOpen(true);
        break;
      case Occupation.Laboratory:
        laboratoryTest.completed
          ? setCompletedListDialogOpen(true)
          : history.push(
              quickLabTest({
                id: laboratoryTest.id
              })
            );
        break;
      case Occupation.Doctor:
        setCompletedListDialogOpen(true);
        break;
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
          [classes.newRow]: laboratoryTest.new
        })}
      >
        <TableCell padding="checkbox">
          <IconButton onClick={handleClick} size="medium">
            <UnfoldMore />
          </IconButton>
          <ConfirmationDialog
            open={paymentDialogOpen}
            setOpen={setPaymentDialogOpen}
            labTest={laboratoryTest}
          />
          <CompletedQuickLaboratoryTestListDialog
            open={completedListDialogOpen}
            setOpen={setCompletedListDialogOpen}
            laboratoryTest={laboratoryTest}
          />
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {laboratoryTest.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {laboratoryTest.paid ? successIcon : pendingIcon}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {laboratoryTest.completed ? successIcon : pendingIcon}
          </Typography>
        </TableCell>
        <TableCell>
          {format(Number(laboratoryTest.created_at), 'dd/MM/yyyy')}
        </TableCell>
      </TableRow>
    </>
  );
};
export default SingleQuickLaboratoryTestRow;
