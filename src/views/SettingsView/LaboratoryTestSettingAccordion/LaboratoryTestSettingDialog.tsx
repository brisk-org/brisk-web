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
  InputLabel,
  IconButton
} from '@mui/material';
import { LaboratoryTestCatagories } from '../../../data/testsSeed';
import DialogExaminationCollapseListItem from './DialogExaminationCollapseListItem';
import AddNewFieldsFormDialog from './AddNewFieldsFormDialog';
import CommonValuesCollapse from './CommonValuesCollapse';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { LaboratoryTestSettingReducerAction } from '../../../reducer/laboratoryTestSettingReducer';

interface Props {
  open: boolean;
  handleClose: () => void;
  category: LaboratoryTestCatagories;
  dispatch: React.Dispatch<LaboratoryTestSettingReducerAction>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
const LaboratoryTestSettingDialog: React.FC<Props> = ({
  open,
  handleClose,
  category,
  dispatch,
  handleSubmit
}) => {
  const [isExaminationExpanded, setIsExaminationExpanded] = useState('');
  const [isSubCategoryExpanded, setIsSubCategoryExpanded] = useState('');
  const [newCommonValue, setNewCommonValue] = useState('');
  const [newAddedField, setNewAddedField] = useState<{
    name: string;
    price?: number;
  }>({ name: '', price: 0 });

  const preSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const emptyCategory = category.tests.find(
      test =>
        (test.hasIndividualPrice && !test.individualPrice) ||
        (test.hasNormalValue && !test.normalValue)
    );
    const emptySubCategory = category.subCategories
      ?.filter(subCategory =>
        subCategory.tests?.find(
          test => test.hasNormalValue && !test.normalValue
        )
      )
      .map(subCategory => {
        return {
          ...subCategory,
          tests: subCategory.tests.filter(
            test => test.hasNormalValue && !test.normalValue
          )
        };
      });

    console.log(emptyCategory, emptySubCategory);
    if (emptyCategory) {
      setIsExaminationExpanded(emptyCategory.name);
    } else if (emptySubCategory && emptySubCategory[0]) {
      setIsSubCategoryExpanded(emptySubCategory[0].name);
      setIsExaminationExpanded(emptySubCategory[0].tests[0].name);
    } else {
      handleSubmit(event);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`alert-dialog-title`}
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={preSubmit}>
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
              required
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
                handleDelete={() => {
                  dispatch({
                    type: 'deleteTest',
                    payload: { name: test.name }
                  });
                }}
              >
                <ListItem>
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
                <ListItem>
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
                        required
                        error={!test.individualPrice}
                        variant="standard"
                      >
                        <InputLabel>{test.name} price</InputLabel>
                        <Input
                          autoFocus
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

                <ListItem>
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
                          autoFocus
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
                    test.commonValues.map((commonValue, index) => (
                      <>
                        <ListItem
                          secondaryAction={
                            <IconButton
                              onClick={() => {
                                dispatch({
                                  type: 'deleteCommonValueForTest',
                                  payload: {
                                    testName: test.name,
                                    commonValueIndex: index
                                  }
                                });
                              }}
                              color="secondary"
                              size="small"
                              edge="end"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemText primary={commonValue} />
                        </ListItem>
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
                  handleDelete={() => {
                    dispatch({
                      type: 'deleteSubCategory',
                      payload: { name: subCategory.name }
                    });
                  }}
                >
                  <Box sx={{ my: '15px', display: 'flex' }}>
                    <TextField
                      required
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
                      required
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
                      handleDelete={() => {
                        dispatch({
                          type: 'deleteSubCategoryTest',
                          payload: {
                            subCategoryName: subCategory.name,
                            name: test.name
                          }
                        });
                      }}
                    >
                      <ListItem>
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
                                autoFocus
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
                          test.commonValues.map((commonValue, index) => (
                            <>
                              <ListItem
                                secondaryAction={
                                  <IconButton
                                    onClick={() => {
                                      dispatch({
                                        type:
                                          'deleteCommonValueForSubCategoryTest',
                                        payload: {
                                          subCategoryName: subCategory.name,
                                          testName: test.name,
                                          commonValueIndex: index
                                        }
                                      });
                                    }}
                                    color="secondary"
                                    size="small"
                                    edge="end"
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                }
                              >
                                <ListItemText primary={commonValue} />
                              </ListItem>
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
          <Button type="submit" color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LaboratoryTestSettingDialog;
