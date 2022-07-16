import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  TextField
} from '@mui/material';
import React from 'react';
import { CategoryTestsWithValueProps, SubCategoryTestsWithValueProps } from '.';

interface Props {
  categoryName: string;
  subCategory: SubCategoryTestsWithValueProps;
  setCategories: React.Dispatch<
    React.SetStateAction<CategoryTestsWithValueProps[] | undefined>
  >;
}
const SubCategoryAccordionContainer: React.FC<Props> = ({
  subCategory,
  categoryName,
  setCategories
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories(prevCategories =>
      prevCategories?.map(prevCategory => {
        if (categoryName === prevCategory.name) {
          return {
            ...prevCategory,
            subCategories: prevCategory.subCategories.map(prevSubCategory => {
              if (subCategory.name === prevSubCategory.name) {
                return {
                  ...prevSubCategory,
                  laboratoryTests: prevSubCategory.laboratoryTests.map(test =>
                    test.name === event.target.name
                      ? { ...test, value: event.target.value }
                      : { ...test }
                  )
                };
              }
              return { ...prevSubCategory };
            })
          };
        }
        return { ...prevCategory };
      })
    );
  };

  return (
    <Accordion
      disabled={!subCategory}
      sx={{
        border: '1px solid lightgray',
        boxShadow: 'none'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{subCategory.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {subCategory.laboratoryTests.map(laboratoryTest => (
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
      </AccordionDetails>
    </Accordion>
  );
};

export default SubCategoryAccordionContainer;
