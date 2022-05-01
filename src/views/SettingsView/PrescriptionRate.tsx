import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails, List } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandMore } from '@mui/icons-material';
import SinglePrescriptionRate from './SinglePrescriptionRate';
import { PrescriptionSettingDataType } from '../../context/SettingContext';

const useStyles = makeStyles(theme => ({
  root: {},
  items: {
    backgroundColor: theme.palette.background.default
  },
  list: {
    width: '100%'
  },
  details: {
    display: 'inline-block',
    width: '50%'
  }
}));

interface LabRatesProps {
  prescriptionState: {
    prescription: PrescriptionSettingDataType[] | undefined;
    setPrescription: React.Dispatch<
      React.SetStateAction<PrescriptionSettingDataType[]>
    >;
  };
}
const PrescriptionRate: React.FC<LabRatesProps> = ({
  prescriptionState: { prescription, setPrescription }
}) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Change Prescription Price Rate</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionDetails style={{ width: '100%' }}>
          <List dense className={classes.list}>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default PrescriptionRate;
