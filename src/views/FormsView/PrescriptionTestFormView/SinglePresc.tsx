import { Checkbox, FormControlLabel, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { CurrentPrescription } from '.';
import NumberTextField from '../../../components/helpers/NumberTextField';
import SelectTextField from '../../../components/helpers/SelectTextField';
import StringTextField from '../../../components/helpers/StringTextField';
import { perDayOption } from '../../SettingsView/SinglePrescriptionRate';

interface SinglePrescProps {
  presc: CurrentPrescription;

  handleChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => void;
}
const SinglePresc: React.FC<SinglePrescProps> = ({
  presc: {
    name,
    forDays,
    perDay,
    price,
    quantity,
    selected,
    changeDetails,
    other
  },
  handleChange
}) => {
  return (
    <div>
      <FormControlLabel
        control={
          <>
            <Checkbox
              checked={selected}
              onChange={handleChange}
              name={JSON.stringify([name, 'checkbox'])}
              color="primary"
            />

            <Checkbox
              checked={changeDetails}
              indeterminate
              onChange={handleChange}
              name={JSON.stringify([name, 'changeDetails'])}
              color="secondary"
            />
          </>
        }
        label={name}
      />

      {changeDetails && (
        <>
          {quantity && (
            <StringTextField
              handleChange={handleChange}
              label="By Amount:"
              name={JSON.stringify([name, 'quantity'])}
              value={quantity}
            />
          )}
          <SelectTextField
            handleChange={handleChange}
            label="Per Day:"
            name={JSON.stringify([name, 'perDay'])}
            value={perDay}
            options={perDayOption}
          />
          <NumberTextField
            handleChange={handleChange}
            label="By Price:"
            name={JSON.stringify([name, 'price'])}
            value={price}
          />
          <NumberTextField
            handleChange={handleChange}
            label="For Days:"
            name={JSON.stringify([name, 'forDays'])}
            value={forDays}
          />
          <StringTextField
            handleChange={handleChange}
            label="Others: "
            name={JSON.stringify([name, 'other'])}
            value={other || ''}
            required={false}
          />
        </>
      )}
    </div>
  );
};

export default SinglePresc;
