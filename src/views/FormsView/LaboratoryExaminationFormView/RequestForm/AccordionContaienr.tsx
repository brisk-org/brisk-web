import React, { useState } from 'react';

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Popover
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandMore } from '@mui/icons-material';
import { RequestCategories } from '.';
import LaboratoryTestGridItem from './LaboratoryTestGridItem';
import SubCategoryAccordionContainer from './SubCategoryAccordionContainer';

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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const outOfStock = category.trackInStock && !category.inStock;

  const handleCategoryClick:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (_, checked) => {
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
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
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
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
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
                ) ||
                outOfStock
              }
            />
          }
          label={category.name}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        {category.subCategories.map(subCategory => (
          <SubCategoryAccordionContainer
            key={subCategory.id}
            subCategory={subCategory}
            handleClick={handleSubCategoryClick}
          />
        ))}
        <Grid container spacing={3}>
          {category.laboratoryTests.map(laboratoryTest => (
            <LaboratoryTestGridItem
              key={laboratoryTest.id}
              laboratoryTest={laboratoryTest}
              handleClick={handleTestChange}
            />
          ))}
        </Grid>
        <Popover
          sx={{
            pointerEvents: 'none'
          }}
          open={Boolean(anchorEl) && outOfStock}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ px: 2, py: 1 }}>Out of Stock!</Typography>
        </Popover>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleAccordion;
