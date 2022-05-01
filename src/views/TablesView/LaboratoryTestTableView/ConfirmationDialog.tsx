import React from 'react';
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
import { AttachMoney, Close } from '@mui/icons-material';
import {
  LaboratoryTestDocument,
  usePayForLaboratoryTestMutation
} from '../../../generated/graphql';
import { LaboratoryTestType } from '../../../@types/LaboratoryTest';

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
  test: LaboratoryTestType;
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  test
}) => {
  const classes = useStyles();

  const [laboratoryPaymentSuccess] = usePayForLaboratoryTestMutation({
    variables: {
      id: test.id
    },
    onError: err => {
      console.log(err);
    },
    refetchQueries: [
      {
        query: LaboratoryTestDocument,
        variables: {
          id: test.id
        }
      }
    ]
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = async () => {
    laboratoryPaymentSuccess();
    setOpen(false);
  };

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle>
        <Typography variant="h6">
          Verify Labratory Payment for {test.card.name}
        </Typography>
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
            <AttachMoney fontSize="large" />
          </IconButton>
        </Box>
        <Typography gutterBottom>
          The Laboratory Tests Price Is {test.price} birr before you Continue!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSuccess} color="primary">
          Payment Successful
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
