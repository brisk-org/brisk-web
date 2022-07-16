import React, { useState } from 'react';

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandMore } from '@mui/icons-material';
import { RequestCategories } from '.';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 'none',
    width: '100%'
  },
  textArea: { maxWidth: '100%', width: '100%', padding: '20px 10px' }
}));

interface SingleAccordionProps {
  category: RequestCategories;
  validId: boolean;
  setCategories: React.Dispatch<
    React.SetStateAction<RequestCategories[] | undefined>
  >;
}

const SingleAccordion: React.FC<SingleAccordionProps> = ({
  category,
  setCategories,
  validId
}) => {
  const classes = useStyles();

  const [categoryChecked, setCategoryChecked] = useState(false);

  const handleCategoryClick:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (event, checked) => {
    setCategoryChecked(!categoryChecked);

    setCategories(prevCategories =>
      prevCategories?.map(prevCategory => {
        if (prevCategory.name !== category.name) {
          return prevCategory;
        }
        const influenceTest = category.laboratoryTests.map(test =>
          test.isInfluencedByCategory
            ? { ...test, selected: checked }
            : { ...test }
        );
        return {
          ...prevCategory,
          selected: checked,
          laboratoryTests: influenceTest
        };
      })
    );
  };
  const handleTestChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setCategories(prevCategories => {
      return prevCategories?.map(prevCategory => {
        if (prevCategory.name !== category.name) return { ...prevCategory };
        return {
          ...prevCategory,
          laboratoryTests: prevCategory.laboratoryTests.map(test => {
            if (test.name !== event.target.name) return { ...test };
            if (test.isInfluencedByCategory && category.selected)
              return { ...test, selected: true };
            return { ...test, selected: checked };
          })
        };
      });
    });
  };
  const handleSubCategoryClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setCategories(prevCategories =>
      prevCategories?.map(prevCategory =>
        prevCategory.name === category.name
          ? {
              ...prevCategory,
              subCategories: prevCategory.subCategories.map(subCategory =>
                subCategory.name === event.target.name
                  ? { ...subCategory, selected: checked }
                  : { ...subCategory }
              )
            }
          : { ...prevCategory }
      )
    );
  };

  return (
    <Accordion disabled={!validId} className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FormControlLabel
          aria-label="Header"
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
          control={
            <Checkbox
              checked={categoryChecked}
              onChange={handleCategoryClick}
              name={category.name}
              color="primary"
              disabled={
                !validId ||
                !category.laboratoryTests.some(
                  test => test.isInfluencedByCategory
                )
              }
            />
          }
          label={category.name}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        {category.subCategories.map((subCategory, index) => (
          <Accordion
            sx={{ boxShadow: 'none', border: '1px solid lightgray' }}
            disabled={!validId}
            className={classes.root}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FormControlLabel
                aria-label="Header"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <Checkbox
                    checked={subCategory.selected}
                    onChange={handleSubCategoryClick}
                    name={subCategory.name}
                    color="primary"
                  />
                }
                label={subCategory.name}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {subCategory.laboratoryTests.map(test => (
                  <Grid key={index} item md={6} xs={12} sm={4}>
                    <Typography>{test.name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        <Grid container spacing={3}>
          {category.laboratoryTests.map((test, index) => (
            <Grid key={index} item md={6} xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!test.hasPrice}
                    checked={test.selected}
                    onChange={handleTestChange}
                    name={test.name}
                    color="primary"
                  />
                }
                label={test.name}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleAccordion;
