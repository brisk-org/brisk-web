import React, { useState, useEffect } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  Button
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import SinglePrescriptionRate from './SingleMedicine';
import PrescriptionSettingDialog from './MedicineSettingDialog';
import {
  MedicinesDocument,
  AddMedicineMutationVariables,
  PerDay,
  useAddMedicineMutation,
  useMedicinesQuery
} from '../../../generated/graphql';
import { useSnackbar } from 'notistack';

const inititalMedicine: AddMedicineMutationVariables = {
  name: '',
  forDays: 1,
  perDay: PerDay.Stat,
  price: 0,
  inStock: 0,
  strength: ''
};
const MedicineAccordion = () => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useMedicinesQuery();
  const [newMedicine, setNewMedicine] = useState(inititalMedicine);
  const { enqueueSnackbar } = useSnackbar();

  const [addMedicine, { loading: addMedicineLoading }] = useAddMedicineMutation(
    {
      refetchQueries: [{ query: MedicinesDocument }]
    }
  );
  useEffect(() => {
    console.log('data', data?.medicines);
  }, [data]);

  const onClose = () => {
    setNewMedicine(inititalMedicine);
    setOpen(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    try {
      const addedMedicine = await addMedicine({
        variables: { ...newMedicine }
      });
      if (!addedMedicine.data) return;
      enqueueSnackbar(`Successfully added ${newMedicine.name}`, {
        variant: 'success'
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Change Prescription Default Rate</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ width: '100%' }}>
          <List dense sx={{ width: '100%' }}>
            {loading && '...Loading'}
            {!data?.medicines
              ? 'No results Add New Medicines'
              : data.medicines.map((medicine, index) => (
                  <SinglePrescriptionRate
                    key={index}
                    medicine={{ ...medicine }}
                  />
                ))}
          </List>
        </AccordionDetails>
        <AccordionSummary>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpen(true)}
              endIcon={<AddIcon />}
            >
              Add Prescription
            </Button>
          </Box>
        </AccordionSummary>
      </Accordion>
      <PrescriptionSettingDialog
        type="add"
        buttonText="Add"
        handleSubmit={handleSubmit}
        loading={addMedicineLoading}
        title="Add new Medicine"
        open={open}
        medicine={newMedicine}
        setMedicine={setNewMedicine}
        onClose={onClose}
      />
    </>
  );
};

export default MedicineAccordion;
