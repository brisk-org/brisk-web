import React, { useState } from 'react';
import { Button, Popover, List, ListItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { CategoryOptions } from '../data/testsPlaceHolder';

export type SelectDailyDuration = '7:30' | '11:00' | '2:30' | 'Total';
export type SelectGeneralDuration =
  | 'today'
  | 'last 7 days'
  | 'last 30 days'
  | 'life time';
export type SelectDropdownType<T> = {
  label: T;
  order: number;
  active: boolean;
  days?: number;
  hours?: number;
  minutes?: number;
}[];

interface DurationDropdownProps {
  selectDropdownState: {
    selectDropdown: SelectDropdownType<
      SelectGeneralDuration | string | SelectDailyDuration
    >;
    setSelectDropdown: React.Dispatch<
      React.SetStateAction<SelectDropdownType<any>>
    >;
  };
}
const Dropdown: React.FC<DurationDropdownProps> = ({
  selectDropdownState: { selectDropdown, setSelectDropdown }
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleDurationChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const label = event.currentTarget.name;
    setSelectDropdown(prevItems => {
      const prevActive = prevItems.find(item => item.active === true);
      const toBeActive = prevItems.find(item => item.label === label);
      if (!prevActive || !toBeActive) return prevItems;
      const nowInactive = prevItems
        .filter(item => item.label !== label)
        .map(item => ({
          ...item,
          active: false
        }));
      return [...nowInactive, { ...toBeActive, active: true }];
    });
  };

  return (
    <>
      <Button
        endIcon={<ArrowDropDown />}
        onClick={handleOpenPopover}
        color="primary"
        size="small"
      >
        {selectDropdown.find(item => item.active === true)?.label}
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <List>
          {selectDropdown
            .sort((a, b) => a.order - b.order)
            .filter(item => item.active === false)
            .map(item => (
              <ListItem>
                <Button
                  fullWidth
                  name={item.label}
                  onClick={handleDurationChange}
                  color="primary"
                  size="small"
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
        </List>
      </Popover>
    </>
  );
};

export default Dropdown;
