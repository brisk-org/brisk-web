import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import LaboratoryCategoriesAccordion from './LaboratoryCategoriesAccordion';
// import { LaboratoryTestCatagories } from '../../../data/testsSeed';
import { useLaboratoryTestCategoriesQuery } from '../../../generated/graphql';

const LaboratoryTestSettingMainAccordion = () => {
  // const [laboratoryTestCategories, setLaboratoryTestCategories] = useState<LaboraotryTestCategoriesQuery['laboratoryTestCategories']>(
  //   );
  const { data, loading } = useLaboratoryTestCategoriesQuery();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Laboratory Test Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {loading && 'Loading...'}
          {data &&
            !loading &&
            data.laboratoryTestCategories &&
            'No Categories Found'}
          {data &&
            data.laboratoryTestCategories?.map(category => (
              <LaboratoryCategoriesAccordion category={category} />
            ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default LaboratoryTestSettingMainAccordion;
