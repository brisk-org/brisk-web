import React, { useReducer, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import {
  defaultLaboratoryTestSeed,
  LaboratoryTestCatagories
} from '../../../data/testsSeed';
import { LaboratorySettingDataType } from '../../../context/SettingContext';
import LaboratoryCategoriesAccordion from './LaboratoryCategoriesAccordion';

interface LabRatesProps {
  testsState: {
    tests: LaboratorySettingDataType[] | undefined;
    setTests: React.Dispatch<React.SetStateAction<LaboratorySettingDataType[]>>;
  };
}
const LabRates: React.FC<LabRatesProps> = ({
  testsState: { tests, setTests }
}) => {
  const [laboratoryTestCategories, setLaboratoryTestCategories] = useState(
    defaultLaboratoryTestSeed
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Laboratory Test Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {laboratoryTestCategories.map((category, index) => (
            <LaboratoryCategoriesAccordion
              category={category}
              index={index}
              setCategory={setLaboratoryTestCategories}
            />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default LabRates;
