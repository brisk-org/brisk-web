import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Grid
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import LaboratoryCategoriesAccordion from './LaboratoryCategoriesAccordion';
// import { LaboratoryTestCatagories } from '../../../data/testsSeed';
import {
  LaboratoryTestCategoriesDocument,
  useCreateLaboratoryTestCategoryMutation,
  useLaboratoryTestCategoriesQuery
} from '../../../generated/graphql';
import AddNewFieldsFormDialog, {
  LaboratorySettingEnteryFields
} from './AddNewFieldsFormDialog';

const LaboratoryTestSettingMainAccordion = () => {
  const [newCategoryField, setNewCategoryField] = useState<
    LaboratorySettingEnteryFields
  >({ name: '' });
  // const [laboratoryTestCategories, setLaboratoryTestCategories] = useState<LaboraotryTestCategoriesQuery['laboratoryTestCategories']>(
  //   );
  const { data, loading } = useLaboratoryTestCategoriesQuery({
    fetchPolicy: 'network-only'
  });

  const [addLaboratoryTestCategory] = useCreateLaboratoryTestCategoryMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const onSubmit = async () => {
    await addLaboratoryTestCategory({
      variables: {
        ...newCategoryField,
        price: newCategoryField.price || 0,
        trackInStock: !!newCategoryField.inStock
      }
    });
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Laboratory Test Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading && 'Loading...'}
          <Typography>
            {data &&
              !loading &&
              !data.laboratoryTestCategories &&
              'No Categories Found'}
          </Typography>
          <Grid container>
            {data &&
              data.laboratoryTestCategories?.map(category => (
                <LaboratoryCategoriesAccordion category={category} />
              ))}
          </Grid>
        </AccordionDetails>
        <AccordionSummary>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <AddNewFieldsFormDialog
              field={newCategoryField}
              setField={setNewCategoryField}
              onSubmit={onSubmit}
              title="Create Category"
              description="Settings for the New laboratory category can be editer later on"
              hasPrice={true}
            />
          </Box>
        </AccordionSummary>
      </Accordion>
    </>
  );
};

export default LaboratoryTestSettingMainAccordion;
