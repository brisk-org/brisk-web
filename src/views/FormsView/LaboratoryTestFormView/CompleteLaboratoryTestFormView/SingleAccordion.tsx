import React from 'react';

import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

// import { LabReport, SetLabReport } from './index';
import { ExpandMore } from '@mui/icons-material';
import { PlaceholderTestType } from '../../../../data/testsPlaceHolder';
import { TextBoxField } from './TextBoxField';

const useStyles = makeStyles(() => ({
  accordion: {
    borderRadius: 'none'
  },
  textArea: { maxWidth: '100%', width: '100%', padding: '20px 10px' }
}));

interface SingleAccordionProps {
  category: string;
  testsState: {
    tests: PlaceholderTestType[] | undefined;
    setTests: React.Dispatch<
      React.SetStateAction<PlaceholderTestType[] | undefined>
    >;
  };
}

const SingleAccordion: React.FC<SingleAccordionProps> = ({
  category,
  testsState: { tests, setTests }
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTests(prevTests => {
      if (!prevTests) return;
      const changedTests = prevTests
        .filter(test => test.name === event.target.name)
        .map(test => {
          test.value = event.target.value;
          return test;
        });
      // Atleast it works !!!!
      return [...new Set([...prevTests, ...changedTests])];
    });
    console.log(tests);
  };

  return (
    <Accordion disabled={!category} className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{category}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordion}>
        <Grid container spacing={3}>
          {tests &&
            tests.map((test, index) => {
              if (test.category === category)
                return (
                  <Grid key={index} item md={6} xs={12} sm={4}>
                    <TextBoxField
                      label={test.name}
                      value={test.value}
                      handleChange={handleChange}
                      normalValue={test.normalValue}
                    />
                  </Grid>
                );
            })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleAccordion;
