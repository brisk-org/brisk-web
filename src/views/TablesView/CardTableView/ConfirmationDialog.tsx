import React, { useContext, useEffect } from 'react';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Dialog,
  Button,
  Box,
  colors,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  AttachMoney,
  Close,
  MoneyOff,
  OpenInNewOutlined
} from '@mui/icons-material';
import { useMarkCardAsNewMutation } from '../../../generated/graphql';
import { CardType } from '../../../@types/Cards';
import { formatDistanceToNow, getTime, startOfTomorrow, sub } from 'date-fns';
import { SettingsContext } from '../../../context/SettingContext';
import { useHistory } from 'react-router-dom';
import { editCardQuery } from '../../../constants/queries';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  moneyIcon: {
    margin: '10px auto',
    color: theme.palette.success.main,
    background: colors.green[100]
  }
}));
interface ConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  card: CardType;
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  card
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { cardPrice } = useContext(SettingsContext);

  const [markCardAsNew, { loading }] = useMarkCardAsNewMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = async () => {
    await markCardAsNew({ variables: { id: card.id } });
    setOpen(false);
  };
  const handleEdit = async () => {
    history.push(editCardQuery({ ...card }));
  };
  useEffect(() => {}, [open]);

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle>
        <Typography variant="h6">Verify Payment for {card.name}</Typography>
        <IconButton
          className={classes.closeButton}
          size="medium"
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box textAlign="center">
          <IconButton
            className={classes.moneyIcon}
            size="medium"
            onClick={handleClose}
          >
            {!card.valid ? (
              <AttachMoney fontSize="large" />
            ) : (
              <MoneyOff fontSize="large" color="secondary" />
            )}
          </IconButton>
        </Box>
        {!card.valid ? (
          <Typography gutterBottom>
            The Card has Expired Charge {cardPrice} birr before you Continue!
          </Typography>
        ) : (
          <>
            <Typography gutterBottom>
              The Card is Still Valid Don't Charge {card.name}.
            </Typography>
            <Typography gutterBottom>
              {card.name}'s last visit was{' '}
              {formatDistanceToNow(parseInt(card.updated_at), {
                addSuffix: true
              })}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSuccess} color="primary">
          {!loading
            ? !card.valid
              ? 'Payment Successful'
              : 'Mark As New'
            : 'Submitting...'}
        </Button>
        <Button
          onClick={handleEdit}
          endIcon={<OpenInNewOutlined />}
          color="secondary"
          size="medium"
        >
          Edit Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
