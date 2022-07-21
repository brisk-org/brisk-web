import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Grid,
  Typography,
  Popover
} from '@mui/material';
import React, { useState } from 'react';
import { SubCategory } from '.';

interface Props {
  subCategory: SubCategory;
  handleClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}
const SubCategoryAccordionContainer: React.FC<Props> = ({
  subCategory,
  handleClick
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const outOfStock = subCategory.trackInStock && !subCategory.inStock;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <Accordion sx={{ boxShadow: 'none', border: '1px solid lightgray' }}>
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
              onChange={handleClick}
              disabled={outOfStock}
              name={subCategory.name}
              color="primary"
            />
          }
          label={subCategory.name}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          {subCategory.laboratoryTests.map((laboratoryTest, index) => (
            <Grid key={index} item md={6} xs={12} sm={4}>
              <Typography>{laboratoryTest.name}</Typography>
            </Grid>
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

export default SubCategoryAccordionContainer;
