import React, { useState } from 'react';
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText
} from '@mui/material';
import { ExpandMore, Settings } from '@mui/icons-material';
import LaboratoryTestSettingDialog from './LaboratoryTestSettingDialog';
// import { laboaratoryTestSettingReducer } from '../../../reducer/laboratoryTestSettingReducer';
import { LaboratoryTestCategoriesQuery } from '../../../generated/graphql';

interface Props {
  // category: LaboratoryTestCatagories;
  category: LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
}
const LaboratoryCategoriesAccordion: React.FC<Props> = ({ category }) => {
  const [parentAccordionDialogOpen, setParentAccordionDialogOpen] = useState(
    false
  );
  const handleParentAccordionDialogClose = () => {
    setParentAccordionDialogOpen(false);
  };

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box
              width="100%"
              height="60px"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="h6">{category.name}</Typography>
                {!!category.price && (
                  <Typography variant="body2">
                    {console.log(category.price)}
                    {category.price} birr
                  </Typography>
                )}
                {category.trackInStock && (
                  <Typography variant="body2">
                    {category.inStock} in stock
                  </Typography>
                )}
              </Box>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
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
                    {subCategory.laboratoryTests &&
                      subCategory.laboratoryTests?.map(laboratoryTest => (
                        <ListItem>
                          <ListItemText
                            primary={laboratoryTest.name}
                            secondary={
                              <>
                                {laboratoryTest.hasPrice && (
                                  <Typography
                                    sx={{ display: 'block' }}
                                    variant="caption"
                                  >
                                    {laboratoryTest.price}
                                  </Typography>
                                )}
                                {laboratoryTest.normalValue && (
                                  <Typography
                                    sx={{ display: 'block' }}
                                    variant="caption"
                                  >
                                    nv: {laboratoryTest.normalValue}
                                  </Typography>
                                )}
                              </>
                            }
                          />

                          <Divider />
                        </ListItem>
                      ))}
                  </List>
                </Accordion>
              ))}
            {category.laboratoryTests &&
              [...category.laboratoryTests]
                .sort((a, b) => parseInt(a.created_at) - parseInt(b.created_at))
                .map(laboratoryTest => (
                  <>
                    <Divider />
                    <ListItem sx={{ mt: 1 }}>
                      <ListItemText
                        primary={
                          <Typography variant="body1">
                            {laboratoryTest.name}{' '}
                            {laboratoryTest.hasPrice && (
                              <Typography variant="caption">
                                ({laboratoryTest.price}birr)
                              </Typography>
                            )}
                          </Typography>
                        }
                        secondary={
                          laboratoryTest.normalValue && (
                            <Typography
                              sx={{ display: 'block' }}
                              variant="caption"
                            >
                              normal value: {laboratoryTest.normalValue}
                            </Typography>
                          )
                        }
                      />
                    </ListItem>
                  </>
                ))}
          </List>
        </Accordion>
      </Box>
      <LaboratoryTestSettingDialog
        open={parentAccordionDialogOpen}
        handleClose={handleParentAccordionDialogClose}
        category={category}
      />
    </Grid>
  );
};

export default LaboratoryCategoriesAccordion;
