import React from 'react';
import clsx from 'clsx';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  Grid,
  Box
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandMore } from '@mui/icons-material';
import { categories } from '../../data/testsPlaceHolder';
import SingleLabTestRate from './SingleLabTestRate';
import { LaboratorySettingDataType } from '../../context/SettingContext';

const useStyles = makeStyles(theme => ({
  root: {},
  items: {
    backgroundColor: theme.palette.background.default
  },
  list: {
    border: '1px solid grey'
  },
  details: {
    display: 'inline-block',
    width: '50%'
  }
}));

interface LabRatesProps {
  testsState: {
    tests: LaboratorySettingDataType[] | undefined;
    setTests: React.Dispatch<React.SetStateAction<LaboratorySettingDataType[]>>;
  };
}
const LabRates: React.FC<LabRatesProps> = ({
  testsState: { tests, setTests }
}) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Change Laboratory Price Rate</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {Object.keys(categories).map(category => (
            <Grid
              item
              md={
                category === 'Clinical Chemistry' || category === 'Hormone Test'
                  ? 6
                  : 4
              }
              sm={6}
              xs={12}
            >
              <Box className={classes.items}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">{category}</Typography>
                  </AccordionSummary>
                  <List dense>
                    {tests &&
                      tests.map(
                        (test, index) =>
                          test.category === category && (
                            <AccordionDetails
                              className={clsx({
                                [classes.details]:
                                  category === 'Clinical Chemistry'
                              })}
                            >
                              <SingleLabTestRate
                                key={index}
                                name={test.name}
                                price={test.price}
                                normalValue={test.normalValue}
                                setTests={setTests}
                              />
                            </AccordionDetails>
                          )
                      )}
                  </List>
                </Accordion>
              </Box>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default LabRates;
