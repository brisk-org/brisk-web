import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { SelectablePrescription } from '.';
import {
  AddMedicineMutationVariables,
  PerDay
} from '../../../generated/graphql';
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
  const initialMedicationState = {
    ...medication,
    name: medication.medicine.name,
    price: medication.medicine.price,
    strength: medication.strength || '',
    inStock: medication.medicine.inStock
  };
  const [error, setError] = useState('');
  const [medicationEdit, setMedicationEdit] = useState<
    AddMedicineMutationVariables
  >(initialMedicationState);
  useEffect(() => {
    setMedicationEdit(initialMedicationState);
  }, [medication]);
  useEffect(() => {
    if (!medicationEdit.forDays) return;
    if (medicationEdit.perDay === PerDay['Stat']) {
      if (medicationEdit.forDays > medication.medicine.inStock) {
        setError(`We only have ${medication.medicine.inStock} inStock`);
        return;
      }
    } else {
      if (medicationEdit.forDays * 2 > medication.medicine.inStock) {
        setError(`We only have ${medication.medicine.inStock} inStock`);
        return;
      }
    }
    setError('');
  }, [medicationEdit, medication.medicine.inStock]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = () => {
    if (!medication.selected) {
      setDialogOpen(true);
      return;
    }
    setMedicine(prevMedications =>
      prevMedications?.map(prevMedication =>
        prevMedication.medicine.id === medication.medicine.id
          ? { ...prevMedication, selected: false }
          : { ...prevMedication }
      )
    );
  };
  const onClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    if (error) return;
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
            strength: medicationEdit.strength || '',
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
            <Checkbox
              checked={medication.selected}
              disabled={medication.medicine.inStock === 0}
              color="primary"
            />
          </ListItemIcon>
          <ListItemText primary={medication.medicine.name} />
        </ListItemButton>
      </ListItem>
      <PrescriptionSettingDialog
        error={error}
        open={dialogOpen}
        title={medication.medicine.name}
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
