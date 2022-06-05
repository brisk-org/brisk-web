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
import {
  CancelPresentationRounded,
  DoneAllRounded,
  MoreVert
} from '@mui/icons-material';
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthContext';
import { BallTriangle, useLoading } from '@agney/react-loading';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { cardQuery, completeTestQuery } from '../../../constants/queries';
import ConfirmationDialog from './ConfirmationDialog';
import {
  LaboratoryExaminationsQuery,
  Occupation,
  useMarkLaboratoryExaminationAsSeenMutation
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

const SingleTestRow: React.FC<{
  laboratoryExamination: LaboratoryExaminationsQuery['laboratoryExaminations'][0];
}> = ({ laboratoryExamination }) => {
  const classes = useStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle />
  });
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const [
    markLaboratoryTestAsSeen
  ] = useMarkLaboratoryExaminationAsSeenMutation();
  const { occupation } = useContext(AuthContext);

  const handleClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = event => {
    setOpen(!open);
    switch (occupation) {
      case Occupation.Reception:
        setOpen(true);
        break;
      case Occupation.Laboratory:
        history.push(completeTestQuery(laboratoryExamination.id));
        break;
      case Occupation.Doctor:
        laboratoryExamination.completed &&
          markLaboratoryTestAsSeen({
            variables: {
              id: laboratoryExamination.id
            }
          });
        history.push(
          cardQuery({
            id: laboratoryExamination.card.id,
            testId: laboratoryExamination.id
          })
        );
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
  const canceledIcon = (
    <IconButton size="small" className={classes.warningBtn}>
      <CancelPresentationRounded fontSize="small" />
    </IconButton>
  );

  return (
    <TableRow
      hover
      className={clsx(classes.root, {
        [classes.newRow]: laboratoryExamination.new
      })}
    >
      <TableCell padding="checkbox">
        <IconButton aria-label="expand row" size="small" onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <ConfirmationDialog
          open={open}
          setOpen={setOpen}
          laboraotryExamination={laboratoryExamination}
        />
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1" noWrap>
          {laboratoryExamination.card.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1" noWrap>
          {laboratoryExamination.paid ? successIcon : pendingIcon}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1" noWrap>
          {!laboratoryExamination.paid
            ? canceledIcon
            : laboratoryExamination.completed
            ? successIcon
            : pendingIcon}
        </Typography>
      </TableCell>

      <TableCell>
        {format(Number(laboratoryExamination.created_at), 'dd/MM/yyyy')}
      </TableCell>
    </TableRow>
  );
};
export default SingleTestRow;
