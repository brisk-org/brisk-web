import React from 'react';
import {
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Dialog,
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
import { QuickLabTestType } from '../../../@types/QuickLaboratoryTests';

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
  laboratoryTest: QuickLabTestType;
}
const CompletedQuickLaboratoryTestListDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  laboratoryTest
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
            Laboratory Test for {laboratoryTest.name}
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
              This is a Laboratory Test for {laboratoryTest.name}
            </Typography>
            <Grid container>
              {Object.entries(
                JSON.parse(laboratoryTest.result) as Record<string, boolean>
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
            <Typography gutterBottom>price: {laboratoryTest.price}</Typography>
            {laboratoryTest.other && (
              <Typography gutterBottom>
                Other: {laboratoryTest.other}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CompletedQuickLaboratoryTestListDialog;
