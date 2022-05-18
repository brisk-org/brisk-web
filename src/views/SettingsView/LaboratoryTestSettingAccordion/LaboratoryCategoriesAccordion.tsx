import React, { useReducer, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  IconButton,
  AccordionDetails,
  List
} from '@mui/material';
import { ExpandMore, Settings } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import { LaboratoryTestCatagories } from '../../../data/testsSeed';
import SingleLabTestRate from './SingleLabTestRate';
import LaboratoryTestSettingDialog from './LaboratoryTestSettingDialog';
import { laboaratoryTestSettingReducer } from '../../../reducer/laboratoryTestSettingReducer';

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

interface Props {
  index: number;
  category: LaboratoryTestCatagories;
  setCategory: React.Dispatch<
    React.SetStateAction<LaboratoryTestCatagories[] | undefined>
  >;
}
const LaboratoryCategoriesAccordion: React.FC<Props> = ({
  index,
  category,
  setCategory
}) => {
  const classes = useStyles();
  const [duplicateCategory, dispatch] = useReducer(
    laboaratoryTestSettingReducer,
    {
      ...category,
      index
    }
  );
  const [parentAccordionDialogOpen, setParentAccordionDialogOpen] = useState(
    false
  );
  const handleParentAccordionDialogClose = () => {
    setParentAccordionDialogOpen(false);
  };

  const handleDuplicateCategoryToMain: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setCategory(prevCategories => {
      if (!prevCategories) return;
      return [
        ...prevCategories.map((prevCategory, prevCategoryIndex) => {
          if (prevCategoryIndex !== index) {
            return { ...prevCategory };
          }
          return { ...duplicateCategory };
        })
      ];
    });
    setParentAccordionDialogOpen(false);
  };

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Box className={classes.items}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box
              width="100%"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="body2">{category.price}</Typography>
              </Box>
              <IconButton
                onClick={() => {
                  setParentAccordionDialogOpen(true);
                }}
              >
                <Settings />
              </IconButton>
            </Box>
          </AccordionSummary>
          <List dense>
            {category.subCategories &&
              category.subCategories.map(subCategory => (
                <Accordion key={subCategory.name}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">{subCategory.name}</Typography>
                  </AccordionSummary>
                  <List dense>
                    {subCategory &&
                      subCategory.tests.map((test, index) => (
                        <AccordionDetails
                          className={clsx({
                            [classes.details]: false
                            // category === 'Clinical Chemistry'
                          })}
                        >
                          <SingleLabTestRate
                            key={index}
                            testDetails={{ ...test }}
                            categoryName={category.name}
                            subCategoryName={subCategory.name}
                            dispatch={dispatch}
                          />
                        </AccordionDetails>
                      ))}
                  </List>
                </Accordion>
              ))}
            {category.tests &&
              category.tests.map((test, index) => (
                <AccordionDetails
                  className={clsx({
                    [classes.details]: false
                    // category === 'Clinical Chemistry'
                  })}
                >
                  <SingleLabTestRate
                    key={index}
                    testDetails={{ ...test }}
                    categoryName={category.name}
                    dispatch={dispatch}
                  />
                </AccordionDetails>
              ))}
          </List>
        </Accordion>
      </Box>
      <LaboratoryTestSettingDialog
        open={parentAccordionDialogOpen}
        handleClose={handleParentAccordionDialogClose}
        handleSubmit={handleDuplicateCategoryToMain}
        category={duplicateCategory}
        dispatch={dispatch}
      />
    </Grid>
  );
};

export default LaboratoryCategoriesAccordion;
