import React, { useState } from 'react';

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandMore } from '@mui/icons-material';
import { PlaceholderTestType } from '../../../../data/testsPlaceHolder';
import { CheckBoxField } from '../../../../components/helpers/CheckBoxField';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 'none',
    width: '100%'
  },
  textArea: { maxWidth: '100%', width: '100%', padding: '20px 10px' }
}));

interface SingleAccordionProps {
  header: string;
  fields: PlaceholderTestType[];
  validId: boolean;
  setFields: React.Dispatch<
    React.SetStateAction<PlaceholderTestType[] | undefined>
  >;
}

const SingleAccordion: React.FC<SingleAccordionProps> = ({
  header,
  fields,
  setFields,
  validId
}) => {
  const classes = useStyles();

  const [influencerChecked, setInfluencerChecked] = useState(false);

  const handleInfluencerChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined = (event, checked) => {
    setInfluencerChecked(!influencerChecked);
    setFields(fields => {
      if (!fields) return;
      const influenced = fields.map(field => {
        const selected = field.influencedBy === event.target.name;
        if (selected) {
          field.selected = checked;
        }
        return field;
      });
      return [...influenced];
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields(fields => {
      if (!fields) return;
      const clickedField = fields.find(
        field => field.name === event.currentTarget.name
      );

      if (clickedField && event.currentTarget.value) {
        clickedField.value = event.currentTarget.value;
      } else if (clickedField) {
        clickedField.selected = !clickedField.selected;
      }
      return [...fields];
    });
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
              checked={influencerChecked}
              onChange={handleInfluencerChange}
              name={header}
              color="primary"
              disabled={!validId}
            />
          }
          label={header}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        <Grid container spacing={3}>
          {fields.map(({ name, selected }, index) => {
            return (
              <Grid key={index} item md={6} xs={12} sm={4}>
                <CheckBoxField
                  handleChange={handleChange}
                  checked={selected}
                  label={name}
                  name={name}
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
