import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import LaboratoryCategoriesAccordion from './LaboratoryCategoriesAccordion';
import { LaboratoryTestCatagories } from '../../../data/testsSeed';

interface LabRatesProps {
  laboratoryTestCategories: LaboratoryTestCatagories[] | undefined;
  setLaboratoryTestCategories: React.Dispatch<
    React.SetStateAction<LaboratoryTestCatagories[] | undefined>
  >;
}
const LaboratoryTestSettingMainAccordion: React.FC<LabRatesProps> = ({
  laboratoryTestCategories,
  setLaboratoryTestCategories
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Laboratory Test Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {laboratoryTestCategories?.map((category, index) => (
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

export default LaboratoryTestSettingMainAccordion;
