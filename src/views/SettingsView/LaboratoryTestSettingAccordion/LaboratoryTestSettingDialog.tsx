import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  TextField,
  Checkbox,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@mui/material';
import { LaboratoryTestCatagories } from '../../../data/testsSeed';
import { Action } from './LaboratoryCategoriesAccordion';
import DialogExaminationCollapseListItem from './DialogExaminationCollapseListItem';
import AddNewFieldsFormDialog from './AddNewFieldsFormDialog';
import CommonValuesCollapse from './CommonValuesCollapse';

interface Props {
  open: boolean;
  handleClose: () => void;
  category: LaboratoryTestCatagories;
  dispatch: React.Dispatch<Action>;
  handleSuccess: () => void;
}
const LaboratoryTestSettingDialog: React.FC<Props> = ({
  open,
  handleClose,
  category,
  dispatch,
  handleSuccess
}) => {
  const [isExaminationExpanded, setIsExaminationExpanded] = useState('');
  const [isSubCategoryExpanded, setIsSubCategoryExpanded] = useState('');
  const [newCommonValue, setNewCommonValue] = useState('');
  const [newSubCategoryDetails, setNewSubCategoryDetails] = useState({
    name: ''
  });
  const [newAddedField, setNewAddedField] = useState<{
    name: string;
    price?: number;
  }>({ name: '', price: 0 });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`alert-dialog-title`}
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5">
          {category.name}
          <Typography sx={{ ml: 1 }} variant="caption">
            (
            {category.tests
              .map(test => test.isInfluencedByCategory && test.name)
              .filter(value => !!value)
              .join(', ')}
            )
          </Typography>
        </Typography>
        <Typography variant="body2">price: {category.price}etb</Typography>
      </DialogTitle>{' '}
      <DialogContent>
        <Box sx={{ mt: '15px', display: 'flex' }}>
          <TextField
            sx={{ mr: 1 }}
            label="Change Name"
            variant="outlined"
            value={category.name}
            onChange={e =>
              dispatch({
                type: 'changeCategoryName',
                payload: {
                  categoryName: category.name,
                  newName: e.target.value
                }
              })
            }
          />
          <TextField
            label="Change Price"
            variant="outlined"
            type="number"
            value={category.price}
            onChange={e =>
              dispatch({
                type: 'changeCategoryPrice',
                payload: {
                  categoryName: category.name,
                  newPrice: parseInt(e.target.value)
                }
              })
            }
          />
        </Box>
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Examinations
            </ListSubheader>
          }
        >
          {category.tests.map(test => (
            <DialogExaminationCollapseListItem
              isExpanded={isExaminationExpanded === test.name}
              listItemPrimaryText={test.name}
              listItemSecondaryText={test.individualPrice}
              handleClick={() =>
                setIsExaminationExpanded(prevExpanded =>
                  prevExpanded === test.name ? '' : test.name
                )
              }
            >
              <ListItem sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox
                    checked={test.isInfluencedByCategory}
                    onChange={(_, checked) => {
                      dispatch({
                        type: 'isTestInfluencedByCategory',
                        payload: {
                          isInfluencedByCategory: checked,
                          testName: test.name
                        }
                      });
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`is ordered with ${category.name}?`}
                  secondary="this item can't be requested individually"
                />
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox
                    color="secondary"
                    checked={test.hasIndividualPrice}
                    disabled={!test.isInfluencedByCategory}
                    onChange={(_, checked) => {
                      dispatch({
                        type: 'hasIndividualPrice',
                        payload: {
                          testName: test.name,
                          hasIndividualPrice: checked
                        }
                      });
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 400
                  }}
                >
                  <ListItemText
                    primary="has individual price"
                    secondary="can be requested individually"
                  />
                  {test.hasIndividualPrice && (
                    <FormControl
                      error={!test.individualPrice}
                      variant="standard"
                    >
                      <InputLabel>{test.name} price</InputLabel>
                      <Input
                        sx={{ ml: '5px' }}
                        onChange={e =>
                          dispatch({
                            type: 'changeTestPrice',
                            payload: {
                              testName: test.name,
                              price: parseInt(e.target.value)
                            }
                          })
                        }
                        type="number"
                        value={test.individualPrice}
                      />
                      {!test.individualPrice && (
                        <FormHelperText>cannot be empty</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Box>
              </ListItem>
              <Divider />

              <ListItem sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox
                    color="success"
                    checked={test.hasNormalValue}
                    onChange={(_, checked) => {
                      dispatch({
                        type: 'hasNormalValue',
                        payload: {
                          testName: test.name,
                          hasNormalValue: checked
                        }
                      });
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 400
                  }}
                >
                  <ListItemText
                    primary="has normal value"
                    secondary="a constant reference"
                  />
                  {test.hasNormalValue && (
                    <FormControl
                      error={!test.normalValue}
                      variant="standard"
                      sx={{ ml: 6 }}
                    >
                      <InputLabel>{test.name} normal value</InputLabel>
                      <Input
                        sx={{ ml: '5px' }}
                        onChange={e =>
                          dispatch({
                            type: 'changeTestNormalValue',
                            payload: {
                              testName: test.name,
                              normalValue: e.target.value
                            }
                          })
                        }
                        value={test.normalValue}
                      />
                      {!test.normalValue && (
                        <FormHelperText>cannot be empty</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Box>
              </ListItem>
              <CommonValuesCollapse
                commonValue={newCommonValue}
                setCommonValue={setNewCommonValue}
                onSubmit={() => {
                  dispatch({
                    type: 'addNewCommonValueForTest',
                    payload: {
                      testName: test.name,
                      newCommonValue
                    }
                  });
                  setNewCommonValue('');
                }}
              >
                {test.commonValues &&
                  test.commonValues.map(commonValue => (
                    <>
                      <ListItemText primary={commonValue} />
                      <Divider />
                    </>
                  ))}
              </CommonValuesCollapse>
            </DialogExaminationCollapseListItem>
          ))}

          <AddNewFieldsFormDialog
            title="Add a Laboratory Test"
            field={newAddedField}
            setField={setNewAddedField}
            onSubmit={() => {
              dispatch({
                type: 'addNewTest',
                payload: {
                  name: newAddedField.name,
                  price: newAddedField.price
                }
              });
            }}
          />
        </List>
        {category.subCategories && (
          <List
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Sub Categories
              </ListSubheader>
            }
          >
            {category.subCategories.map(subCategory => (
              <DialogExaminationCollapseListItem
                isExpanded={isSubCategoryExpanded === subCategory.name}
                listItemPrimaryText={subCategory.name.toUpperCase()}
                listItemSecondaryText={subCategory.price}
                handleClick={() =>
                  setIsSubCategoryExpanded(prevExpanded =>
                    prevExpanded === subCategory.name ? '' : subCategory.name
                  )
                }
              >
                <Box sx={{ my: '15px', display: 'flex' }}>
                  <TextField
                    sx={{ mr: 1 }}
                    label="Change Name"
                    variant="outlined"
                    value={subCategory.name}
                    onChange={e => {
                      // avoid collapse from closing
                      setIsSubCategoryExpanded(e.target.value);
                      dispatch({
                        type: 'changeSubCategoryName',
                        payload: {
                          subCategoryName: subCategory.name,
                          newName: e.target.value
                        }
                      });
                    }}
                  />
                  <TextField
                    label="Change Price"
                    variant="outlined"
                    type="number"
                    value={subCategory.price}
                    onChange={e =>
                      dispatch({
                        type: 'changeSubCategoryPrice',
                        payload: {
                          subCategoryName: subCategory.name,
                          newPrice: parseInt(e.target.value)
                        }
                      })
                    }
                  />
                </Box>

                {subCategory.tests.map(test => (
                  <DialogExaminationCollapseListItem
                    isExpanded={isExaminationExpanded === test.name}
                    listItemPrimaryText={test.name}
                    handleClick={() =>
                      setIsExaminationExpanded(prevExpanded =>
                        prevExpanded === test.name ? '' : test.name
                      )
                    }
                  >
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <Checkbox
                          color="success"
                          checked={test.hasNormalValue}
                          onChange={(_, checked) => {
                            dispatch({
                              type: 'hasSubCategoryTestNormalValue',
                              payload: {
                                testName: test.name,
                                subCategoryName: subCategory.name,
                                hasNormalValue: checked
                              }
                            });
                          }}
                        />
                      </ListItemIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          maxWidth: 400
                        }}
                      >
                        <ListItemText
                          primary="has normal value"
                          secondary="a constant reference"
                        />
                        {test.hasNormalValue && (
                          <FormControl
                            error={!test.normalValue}
                            variant="standard"
                            sx={{ ml: 6 }}
                          >
                            <InputLabel>{test.name} normal value</InputLabel>
                            <Input
                              sx={{ ml: '5px' }}
                              onChange={e =>
                                dispatch({
                                  type: 'changeSubCategoryTestNormalValue',
                                  payload: {
                                    testName: test.name,
                                    subCategoryName: subCategory.name,
                                    normalValue: e.target.value
                                  }
                                })
                              }
                              value={test.normalValue}
                            />
                            {!test.normalValue && (
                              <FormHelperText>cannot be empty</FormHelperText>
                            )}
                          </FormControl>
                        )}
                      </Box>
                    </ListItem>

                    <CommonValuesCollapse
                      commonValue={newCommonValue}
                      setCommonValue={setNewCommonValue}
                      onSubmit={() => {
                        dispatch({
                          type: 'addNewCommonValueForSubCategoryTest',
                          payload: {
                            testName: test.name,
                            subCategoryName: subCategory.name,
                            newCommonValue
                          }
                        });
                      }}
                    >
                      {test.commonValues &&
                        test.commonValues.map(commonValue => (
                          <>
                            <ListItemText primary={commonValue} />
                            <Divider />
                          </>
                        ))}
                    </CommonValuesCollapse>
                  </DialogExaminationCollapseListItem>
                ))}
                <AddNewFieldsFormDialog
                  title={`Add a LaboratoryTest under ${subCategory.name}`}
                  field={newAddedField}
                  setField={setNewAddedField}
                  onSubmit={() => {
                    dispatch({
                      type: 'addNewSubCategoryTest',
                      payload: {
                        testName: newAddedField.name,
                        subCategoryName: subCategory.name
                      }
                    });
                  }}
                />
              </DialogExaminationCollapseListItem>
            ))}
            <AddNewFieldsFormDialog
              title="Add a SubCategory"
              field={newAddedField}
              setField={setNewAddedField}
              hasPrice={true}
              onSubmit={() => {
                dispatch({
                  type: 'addNewSubCategory',
                  payload: {
                    name: newAddedField.name,
                    price: newAddedField.price || 0
                  }
                });
              }}
            />
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSuccess} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LaboratoryTestSettingDialog;