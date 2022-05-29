import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  ListItemText,
  Divider,
  Typography,
  ListItemButton,
  IconButton,
  ListItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Delete as DeleteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import PrescriptionSettingDialog from './MedicineSettingDialog';
import {
  AddMedicineMutationVariables,
  MedicinesDocument,
  MedicinesQuery,
  useDeleteMedicineMutation,
  useUpdateMedicineMutation
} from '../../../generated/graphql';
import { useSnackbar } from 'notistack';
import AlertDialog from '../../../components/AlertDialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '33.3%',
    display: 'inline-block'
  },
  lowInStock: {
    backgroundColor: 'yellow'
  }
}));
export const perDayOption = [
  {
    label: 'STAT',
    value: 'STAT'
  },
  {
    label: 'BID',
    value: 'BID'
  }
];
interface SingleRateProps {
  medicine: MedicinesQuery['medicines'][0];
}
const SinglePrescriptionRate: React.FC<SingleRateProps> = ({ medicine }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const [openSettingDialog, setOpenSettingDialog] = useState(false);
  const [medicineEdit, setMedicineEdit] = useState<
    AddMedicineMutationVariables
  >(medicine);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [updateMedicine, { loading }] = useUpdateMedicineMutation({
    onError(err) {
      console.log(err);
    }
  });
  const [deleteMedicine] = useDeleteMedicineMutation({
    refetchQueries: [{ query: MedicinesDocument }]
  });

  useEffect(() => {
    setMedicineEdit(medicine);
  }, [medicine]);

  useEffect(() => {
    console.log(confirmDelete);
    if (!confirmDelete) return;
    deleteMedicine({ variables: { id: medicine.id } })
      .then(res => {
        console.log(res);
        if (!res.data?.deleteMedicine) {
          throw new Error(`Failed deleting ${medicine.name}`);
        }
        onClose();
        enqueueSnackbar(`Successfully Deleted ${medicine.name}`, {
          variant: 'success'
        });
        setMedicineEdit(medicine);
      })
      .catch(err => enqueueSnackbar(err, { variant: 'error' }));
    setConfirmDelete(false);
  }, [confirmDelete]);

  const onClose = () => {
    setOpenSettingDialog(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    await updateMedicine({
      variables: { ...medicineEdit, id: medicine.id }
    });
    setMedicineEdit(medicine);
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
          <>
            <IconButton size="small" edge="end">
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              onClick={e => {
                e.stopPropagation();
                setDeleteDialogOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemText
            primary={medicine.name}
            secondary={
              <>
                <Typography variant="caption">
                  {medicine.inStock} in stock
                </Typography>
              </>
            }
          />
          <Divider />
        </ListItemButton>
      </ListItem>
      <></>
      <PrescriptionSettingDialog
        type="update"
        title={`Change Settings For ${medicine.name}`}
        open={openSettingDialog}
        medicine={medicineEdit}
        setMedicine={setMedicineEdit}
        loading={loading}
        buttonText="Update"
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
      <AlertDialog
        dialogText={`Delete ${medicine.name}? Can't be reversed`}
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
