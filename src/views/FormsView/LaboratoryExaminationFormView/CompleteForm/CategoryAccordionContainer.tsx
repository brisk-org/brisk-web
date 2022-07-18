import React from 'react';
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { CategoryTestsWithValueProps } from '.';
import SubCategoryAccordionContainer from './SubCategoryAccordionContainer';

interface Props {
  category: CategoryTestsWithValueProps;
  setCategories: React.Dispatch<
    React.SetStateAction<CategoryTestsWithValueProps[] | undefined>
  >;
}
const AccordionContainer: React.FC<Props> = ({ category, setCategories }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories(prevCategories =>
      prevCategories?.map(prevCategory => {
        if (category.name === prevCategory.name) {
          return {
            ...prevCategory,
            laboratoryTests: prevCategory.laboratoryTests.map(test =>
              test.name === event.target.name
                ? { ...test, value: event.target.value }
                : { ...test }
            )
          };
        }
        return { ...prevCategory };
      })
    );
  };
  return (
    <Grid item md={6} xs={12}>
      <Accordion disabled={!category} sx={{ borderRadius: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{category.name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderRadius: 'none' }}>
          {category.subCategories.some(
            ({ laboratoryTests }) => laboratoryTests.length > 0
          ) &&
            category.subCategories.map(subCategory => (
              <SubCategoryAccordionContainer
                subCategory={subCategory}
                setCategories={setCategories}
                categoryName={category.name}
              />
            ))}
          <Grid container spacing={3}>
            {category.laboratoryTests.map(laboratoryTest => (
              <Grid item md={6} xs={12} sm={4} px={4}>
                <TextField
                  fullWidth
                  label={laboratoryTest.name}
                  value={laboratoryTest.value}
                  onChange={handleChange}
                  name={laboratoryTest.name}
                  helperText={laboratoryTest.normalValue}
                  required
                  variant="standard"
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default AccordionContainer;
