import React, { useState } from 'react';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Popover,
  Typography
} from '@mui/material';
import { RequestLabTest } from '.';

interface Props {
  laboratoryTest: RequestLabTest;
  handleClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}
const LaboratoryTestGridItem: React.FC<Props> = ({
  laboratoryTest,
  handleClick
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const outOfStock = laboratoryTest.trackInStock && !laboratoryTest.inStock;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid item md={6} xs={12} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            disabled={!laboratoryTest.hasPrice || outOfStock}
            checked={laboratoryTest.selected}
            onChange={handleClick}
            name={laboratoryTest.name}
            color="primary"
          />
        }
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        label={laboratoryTest.name}
      />
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
    </Grid>
  );
};

export default LaboratoryTestGridItem;
