import React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { SetUser } from './index';

export const ExaminationCheckbox: React.FC<{
  checked: boolean;
  label: string;
  setUser: SetUser;
}> = ({ checked, label, setUser }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user: any) => {
      user.examination[event.target.name] = !user.examination[
        event.target.name
      ];
      return {
        ...user
      };
    });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name={label}
          color="primary"
        />
      }
      label={label}
    />
  );
};
