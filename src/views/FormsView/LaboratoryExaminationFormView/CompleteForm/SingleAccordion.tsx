import React from 'react';

import { Grid, TextField } from '@mui/material';

import {
  // LaboratoryTestCatagories,
  LaboratoryTestDetails
} from '../../../../data/testsSeed';

import { LaboratoryTestCategory } from '../../../../generated/graphql';

interface Props {
  test: LaboratoryTestCategory;
  setLabCategories: React.Dispatch<
    React.SetStateAction<LaboratoryTestCategory[] | undefined>
  >;
}

const SingleAccordion: React.FC<Props> = ({ test, setLabCategories }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabCategories(prevCategories =>
      prevCategories?.map(category => ({
        ...category,
        tests: category.laboratoryTests.map(test =>
          test.name === event.target.name
            ? { ...test, value: event.target.value }
            : { ...test }
        )
      }))
    );
  };
  return (
    <Grid item md={6} xs={12} sm={4} px={4}>
      <TextField
        fullWidth
        label={test.name}
        // value={test.value}
        onChange={handleChange}
        name={test.name}
        // helperText={test.normalValue}
        required
        variant="standard"
      />
    </Grid>
  );
};

export default SingleAccordion;
