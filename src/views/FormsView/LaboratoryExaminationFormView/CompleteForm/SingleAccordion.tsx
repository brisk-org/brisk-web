import React from 'react';

import { Grid, TextField } from '@mui/material';

import { LaboratoryCategoriesWithTestValue, LaboratoryTestWithValue } from '.';

interface Props {
  categoryName: string;
  laboratoryTest: LaboratoryTestWithValue;
  setLabCategories: React.Dispatch<
    React.SetStateAction<LaboratoryCategoriesWithTestValue[] | undefined>
  >;
}

const SingleAccordion: React.FC<Props> = ({
  categoryName,
  laboratoryTest,
  setLabCategories
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabCategories(prevCategories =>
      prevCategories?.map(category =>
        categoryName === category.name
          ? {
              ...category,
              laboratoryTests: category.laboratoryTests.map(test =>
                test.name === event.target.name
                  ? { ...test, value: event.target.value }
                  : { ...test }
              )
            }
          : { ...category }
      )
    );
  };
  return (
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
  );
};

export default SingleAccordion;