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
  Grid
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Close,
  DoneAllRounded,
  LocalHospitalOutlined
} from '@mui/icons-material';
import {
  useMarkPrescriptionTestAsCompletedMutation,
  usePrescriptionTestQuery
} from '../../../generated/graphql';
import { PrescriptionTest } from '.';
import { PrescriptionSettingDataType } from '../../../context/SettingContext';

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
  prescription: PrescriptionTest;
}
const CompletePrescDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  prescription
}) => {
  const classes = useStyles();

  const { data, loading } = usePrescriptionTestQuery({
    variables: { id: prescription.id }
  });
  const [
    markPrescriptionTestAsCompleted
  ] = useMarkPrescriptionTestAsCompletedMutation({
    onError: err => console.error
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = async () => {
    // markPrescriptionTestAsCompleted({
    //   variables: { id: prescription.id }
    // });
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
            Prescription test for {prescription.card?.name}
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
              This is a Prescription for {prescription.card?.name}
              <Typography variant="body2" gutterBottom>
                Age {prescription.card?.age} | Gender{' '}
                {prescription.card?.gender}
              </Typography>
            </Typography>

            <Grid container>
              {loading && 'Loading...'}
              {data &&
                (JSON.parse(
                  data.prescriptionTest.result
                ) as PrescriptionSettingDataType[]).map(
                  ({ name, strength, forDays, perDay, other }, index) => (
                    <Grid item md={6} sm={12} key={index}>
                      <Fab className={classes.doneAllIcon} size="large">
                        <DoneAllRounded />
                      </Fab>
                      <Typography>
                        {name} {strength && ` - ${strength}`}
                      </Typography>
                      <Typography>{perDay}</Typography>
                      <Typography>For {forDays} days</Typography>
                      <Typography>{other}</Typography>
                    </Grid>
                  )
                )}
            </Grid>
          </Box>
        </DialogContent>
        {!prescription.completed && (
          <DialogActions>
            <Button autoFocus onClick={handleSuccess} color="primary">
              Completed
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default CompletePrescDialog;
