import {
  Button,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { SelectablePrescription } from '.';
import { PrescriptionSettingDataType } from '../../../context/SettingContext';
import PrescriptionSettingDialog from '../../SettingsView/PrescriptionSettingAccordion/PrescriptionSettingDialog';

interface Props {
  prescription: SelectablePrescription;
  setPrescriptions: React.Dispatch<
    React.SetStateAction<SelectablePrescription[]>
  >;
}
const SinglePresc: React.FC<Props> = ({ prescription, setPrescriptions }) => {
  const [prescriptionEdit, setPrescriptionEdit] = useState<
    PrescriptionSettingDataType
  >(prescription);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = () => {
    if (!prescription.selected) {
      setDialogOpen(true);
      return;
    }
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prevPrescription =>
        prevPrescription.name === prescription.name
          ? { ...prevPrescription, selected: false }
          : { ...prevPrescription }
      )
    );
  };
  const onClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setPrescriptions(prevPrescriptions => {
      return prevPrescriptions!.map(prevPrescription => {
        if (prescription.name === prevPrescription.name) {
          return { ...prescriptionEdit, selected: true };
        }
        return { ...prevPrescription };
      });
    });
    console.log(prescription);
    onClose();
  };
  return (
    <>
      <ListItem
        sx={{
          width: '25%',
          display: 'inline-block',
          height: '20px'
        }}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{ backgroundColor: 'gray.100' }}
        >
          <ListItemIcon>
            <Checkbox checked={prescription.selected} color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={prescription.name}
            secondary={
              <Typography variant="caption">
                {prescription.price *
                  prescription.forDays *
                  (prescription.perDay === 'bid' ? 2 : 1)}
                birr
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <PrescriptionSettingDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        prescription={prescriptionEdit}
        setPrescription={setPrescriptionEdit}
        title="Presc Info"
        handleSubmit={handleSubmit}
      >
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
    </>
  );
};

export default SinglePresc;
