import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  ListItemText,
  Divider,
  Typography,
  ListItemButton,
  IconButton,
  ListItem,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PrescriptionSettingDataType } from '../../../context/SettingContext';
import {
  Delete as DeleteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import PrescriptionSettingDialog from './PrescriptionSettingDialog';
import AlertDialog from '../../../components/AlertDialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '33.3%',
    display: 'inline-block'
  }
}));
export const perDayOption = [
  {
    label: 'Stat',
    value: 'stat'
  },
  {
    label: 'Bid',
    value: 'bid'
  }
];
interface SingleRateProps {
  prescription: PrescriptionSettingDataType;
  setPrescription: React.Dispatch<
    React.SetStateAction<PrescriptionSettingDataType[]>
  >;
}
const SinglePrescriptionRate: React.FC<SingleRateProps> = ({
  prescription,
  setPrescription
}) => {
  const classes = useStyles();

  const [openSettingDialog, setOpenSettingDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [prescriptionEdit, setPrescriptionEdit] = useState(prescription);
  const onClose = () => {
    setOpenSettingDialog(false);
  };

  useEffect(() => {
    if (confirmDelete) {
      onClose();
      setPrescription(prevPrescriptions =>
        prevPrescriptions.filter(
          prevPrescription => prevPrescription.name !== prescription.name
        )
      );
    }
  }, [confirmDelete]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setPrescription(prevTests => {
      return prevTests.map(test => {
        if (test.name === prescription.name) {
          return { ...prescriptionEdit };
        }
        return { ...test };
      }) as PrescriptionSettingDataType[];
    });
    onClose();
  };

  return (
    <>
      <ListItem
        className={clsx(classes.root)}
        onClick={() => {
          setOpenSettingDialog(true);
        }}
        secondaryAction={
          <IconButton size="small" edge="end" aria-label="comments">
            <SettingsIcon fontSize="small" />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemText
            primary={prescription.name}
            secondary={
              <>
                <Typography variant="caption">9 in stock</Typography>
              </>
            }
          />
          <Divider />
        </ListItemButton>
      </ListItem>
      <></>
      <PrescriptionSettingDialog
        title={`Change Settings For ${prescription.name}`}
        open={openSettingDialog}
        prescription={prescriptionEdit}
        setPrescription={setPrescriptionEdit}
        onClose={onClose}
        handleSubmit={handleSubmit}
      >
        <Button
          variant="contained"
          endIcon={<DeleteIcon fontSize="small" />}
          color="error"
          onClick={() => {
            setDeleteDialogOpen(true);
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            onClose();
            setPrescriptionEdit(prescription);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Done
        </Button>
      </PrescriptionSettingDialog>
      <AlertDialog
        dialogText={`Delete ${prescription.name}? Can't be reversed`}
        state={{
          dialogToggle: deleteDialogOpen,
          setDialogToggle: setDeleteDialogOpen,
          setProceedToAction: setConfirmDelete
        }}
      />
    </>
  );
};

export default SinglePrescriptionRate;
