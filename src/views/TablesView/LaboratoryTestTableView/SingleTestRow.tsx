import React, { useContext, useState } from 'react';

import { TableRow, TableCell, IconButton, Typography, Box, colors } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  CancelPresentationRounded,
  DoneAllRounded,
  MoreVert
} from '@mui/icons-material';
import { format } from 'date-fns';
import { LaboratoryTestType } from '../../../@types/LaboratoryTest';
import { AuthContext } from '../../../context/AuthContext';
import { BallTriangle, useLoading } from '@agney/react-loading';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { cardQuery, completeTestQuery } from '../../../constants/queries';
import ConfirmationDialog from './ConfirmationDialog';
import { useMarkLaboratoryTestAsSeenMutation } from '../../../generated/graphql';

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

const SingleTestRow: React.FC<{ test: LaboratoryTestType }> = ({ test }) => {
  const classes = useStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle />
  });
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const [markLaboratoryTestAsSeen] = useMarkLaboratoryTestAsSeenMutation();
  const { occupation } = useContext(AuthContext);

  const handleClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = event => {
    setOpen(!open);
    switch (occupation) {
      case 'RECEPTION':
        setOpen(true);
        break;
      case 'LABORATORIAN':
        history.push(completeTestQuery(test.id));
        break;
      case 'DOCTOR':
        test.completed &&
          markLaboratoryTestAsSeen({
            variables: {
              id: test.id
            }
          });
        history.push(cardQuery({ id: test.card.id, testId: test.id }));
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
        [classes.newRow]: test.new
      })}
    >
      <TableCell padding="checkbox">
        <IconButton aria-label="expand row" size="small" onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <ConfirmationDialog open={open} setOpen={setOpen} test={test} />
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1" noWrap>
          {test.card.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1" noWrap>
          {test.paid ? successIcon : pendingIcon}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1" noWrap>
          {!test.paid
            ? canceledIcon
            : test.completed
            ? successIcon
            : pendingIcon}
        </Typography>
      </TableCell>

      <TableCell>{format(Number(test.created_at), 'dd/MM/yyyy')}</TableCell>
    </TableRow>
  );
};
export default SingleTestRow;
