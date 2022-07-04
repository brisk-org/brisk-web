import React, { useState } from 'react';
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { SelectablePrescription } from '.';
import { AddMedicineMutationVariables } from '../../../generated/graphql';
import PrescriptionSettingDialog from '../../SettingsView/MedicineAccordion/MedicineSettingDialog';

interface Props {
  medication: SelectablePrescription;
  setMedications: React.Dispatch<
    React.SetStateAction<SelectablePrescription[] | undefined>
  >;
}
const PrescriptionBox: React.FC<Props> = ({
  medication,
  setMedications: setMedicine
}) => {
  const [medicationEdit, setMedicationEdit] = useState<
    AddMedicineMutationVariables
  >({
    ...medication,
    name: medication.medicine.name,
    price: medication.medicine.price,
    inStock: medication.medicine.inStock
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = () => {
    if (!medication.selected) {
      setDialogOpen(true);
      return;
    }
    setMedicine(prevMedications =>
      prevMedications?.map(prevMedication =>
        prevMedication.medicine.id === medication.medicine.name
          ? { ...prevMedication, selected: false }
          : { ...prevMedication }
      )
    );
  };
  const onClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setMedicine(prevPrescriptions => {
      return prevPrescriptions!.map(prevPrescription => {
        if (medication.medicine.id === prevPrescription.medicine.id) {
          return {
            medicine: {
              ...medication.medicine,
              name: medicationEdit.name,
              price: medicationEdit.price,
              inStock: medicationEdit.inStock
            },
            forDays: medicationEdit.forDays!,
            strength: medicationEdit.strength!,
            perDay: medicationEdit.perDay!,
            selected: true
          };
        }
        return { ...prevPrescription };
      });
    });
    console.log(medication);
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
            <Checkbox checked={medication.selected} color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={medication.medicine.name}
            secondary={
              <Typography variant="caption">
                {/* {medicine.price *
                  medicineEdit.forDays *
                  (medicine.perDay === 'BID' ? 2 : 1)} */}
                birr lasjdflksdjflksdjflkjsdkl
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <PrescriptionSettingDialog
        open={dialogOpen}
        title="Prescription Info"
        type="request"
        buttonText="Request"
        onClose={() => setDialogOpen(false)}
        medicine={medicationEdit}
        setMedicine={setMedicationEdit}
        loading={false}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default PrescriptionBox;
