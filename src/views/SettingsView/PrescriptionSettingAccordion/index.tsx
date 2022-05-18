import React, { useState } from 'react';
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
import SinglePrescriptionRate from './SinglePrescriptionRate';
import { PrescriptionSettingDataType } from '../../../context/SettingContext';
import PrescriptionSettingDialog from './PrescriptionSettingDialog';

const initialState: PrescriptionSettingDataType = {
  name: '',
  forDays: 1,
  perDay: 'stat',
  price: 0,
  quantity: '',
  other: ''
};
interface Props {
  prescription: PrescriptionSettingDataType[] | undefined;
  setPrescription: React.Dispatch<
    React.SetStateAction<PrescriptionSettingDataType[] | undefined>
  >;
}
const PrescriptionRate: React.FC<Props> = ({
  prescription,
  setPrescription
}) => {
  const [open, setOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState(initialState);
  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setPrescription(prevPrescription =>
      prevPrescription
        ? [...prevPrescription, newPrescription]
        : [newPrescription]
    );
    setNewPrescription(initialState);
    onClose();
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Change Prescription Default Rate</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ width: '100%' }}>
          <List dense sx={{ width: '100%' }}>
            {prescription &&
              prescription.map((prescription, index) => (
                <SinglePrescriptionRate
                  key={index}
                  prescription={prescription}
                  setPrescription={setPrescription}
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
        title="Add new Prescription"
        open={open}
        prescription={newPrescription}
        setPrescription={setNewPrescription}
        onClose={onClose}
        handleSubmit={handleSubmit}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Add
        </Button>
      </PrescriptionSettingDialog>
    </>
  );
};

export default PrescriptionRate;