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
  Fab,
  Grid,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Close,
  DoneAllRounded,
  LocalHospitalOutlined
} from '@mui/icons-material';
import { useMarkQuickPrescriptionTestAsSeenMutation } from '../../../generated/graphql';
import { QuickPrescriptionType } from '../../../@types/QuickLaboratoryTests';

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
  listItem: {
    width: '50%'
  },
  doneAllIcon: {
    margin: '10px auto',
    fontSize: 4,
    color: theme.palette.success.main,
    background: colors.green[100]
  }
}));
interface ConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prescription: QuickPrescriptionType;
}
const CompletedQuickPrescriptionTestListDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  prescription
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box maxWidth={700}>
      <Dialog
        fullWidth
        className={classes.root}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>
          <Typography variant="h6">
            Quick Prescription test for {prescription.name}
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
            <Box textAlign="center">
              <IconButton
                className={classes.doneAllIcon}
                size="medium"
                onClick={handleClose}
              >
                <LocalHospitalOutlined fontSize="large" />
              </IconButton>
            </Box>
            <Typography gutterBottom>
              This is a Quick Prescription for {prescription.name}
            </Typography>
            <Grid container>
              {Object.entries(
                JSON.parse(prescription.result) as Record<string, boolean>
              ).map(
                ([key, value], index) =>
                  value && (
                    <Grid item md={6} sm={12} key={index}>
                      <Fab className={classes.doneAllIcon} size="large">
                        <DoneAllRounded />
                      </Fab>
                      <Typography>{key}</Typography>
                    </Grid>
                  )
              )}
            </Grid>
            <Typography gutterBottom>price: {prescription.price}</Typography>
            {prescription.other && (
              <Typography gutterBottom>Other: {prescription.other}</Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CompletedQuickPrescriptionTestListDialog;
