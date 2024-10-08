import React, { useState } from 'react';
import clsx from 'clsx';
import {
  ListItem,
  ListItemText,
  Box,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  TextField
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Close, Edit } from '@mui/icons-material';
import {
  LaboratoryTestDetails,
  SubCategoryLaboratoryTestDetails
} from '../../../data/testsSeed';
import { LaboratoryTestSettingReducerAction } from '../../../reducer/laboratoryTestSettingReducer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  fieldContainer: {
    maxWidth: '100px',
    marginRight: '16px'
  }
}));

interface SingleRateProps {
  testDetails: LaboratoryTestDetails | SubCategoryLaboratoryTestDetails;
  categoryName: string;
  subCategoryName?: string;
  dispatch: React.Dispatch<LaboratoryTestSettingReducerAction>;
}
const SingleRate: React.FC<SingleRateProps> = ({
  testDetails,
  categoryName,
  subCategoryName,
  dispatch
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <ListItem className={clsx({ [classes.root]: testDetails.hasNormalValue })}>
      {/* <ListItemText primary={testDetails.name} secondary={testDetails.} /> */}
      {open && (
        <Box
          display="flex"
          className={clsx({
            [classes.fieldContainer]: !testDetails.hasNormalValue
          })}
        >
          <TextField
            name="price"
            type="number"
            label="New Price"
            onChange={e => {
              console.log('lkjsdf');
              dispatch({
                type: 'changeTestPrice',
                payload: {
                  testName: testDetails.name,
                  price: parseInt(e.target.value) || 0
                }
              });
            }}
          />
          {testDetails.hasNormalValue && (
            <TextField
              name="normalValue"
              value={testDetails.normalValue}
              label="New Normal value"
              onChange={() => {}}
            />
          )}
        </Box>
      )}
      <ListItemSecondaryAction>
        <IconButton
          name={testDetails.name}
          onClick={() => {
            setOpen(prevOpen => !prevOpen);
          }}
          edge="end"
          size="large"
        >
          {open ? <Close fontSize="small" /> : <Edit fontSize="small" />}
        </IconButton>
      </ListItemSecondaryAction>
      <Divider />
    </ListItem>
  );
};

export default SingleRate;
