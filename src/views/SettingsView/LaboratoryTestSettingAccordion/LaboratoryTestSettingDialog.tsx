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
// import { LaboratorylaboratoryTestCatagories } from '../../../data/testsSeed';
import DialogExaminationCollapseListItem from './DialogExaminationCollapseListItem';
import AddNewFieldsFormDialog from './AddNewFieldsFormDialog';
import CommonValuesCollapse from './CommonValuesCollapse';
import { Delete as DeleteIcon } from '@mui/icons-material';
// import { LaboratorylaboratoryTestSettingReducerAction } from '../../../reducer/laboratoryTestSettingReducer';
import { LaboratoryTestCategoriesQuery } from '../../../generated/graphql';

interface Props {
  open: boolean;
  handleClose: () => void;
  category: LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
  dispatch: (i: any) => any;
  // handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
const LaboratorylaboratoryTestSettingDialog: React.FC<Props> = ({
  open,
  handleClose,
  category,
  dispatch
  // handleSubmit
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
    const emptyCategory = category.laboratoryTests.find(
      laboratoryTest => laboratoryTest.hasPrice && !laboratoryTest.price
    );

    if (emptyCategory) {
      setIsExaminationExpanded(emptyCategory.name);
      return;
    }
    // handleSubmit(event);
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
              {category.laboratoryTests
                .map(
                  laboratoryTest =>
                    laboratoryTest.isInfluencedByCategory && laboratoryTest.name
                )
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
            {category.laboratoryTests.map(laboratoryTest => (
              <DialogExaminationCollapseListItem
                isExpanded={isExaminationExpanded === laboratoryTest.name}
                listItemPrimaryText={laboratoryTest.name}
                listItemSecondaryText={`${laboratoryTest.price}`}
                handleClick={() =>
                  setIsExaminationExpanded(prevExpanded =>
                    prevExpanded === laboratoryTest.name ? '' : test.name
                  )
                }
                handleDelete={() => {
                  dispatch({
                    type: 'deletelaboratoryTest',
                    payload: { name: laboratoryTest.name }
                  });
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={laboratoryTest.isInfluencedByCategory}
                      onChange={(_, checked) => {
                        dispatch({
                          type: 'islaboratoryTestInfluencedByCategory',
                          payload: {
                            isInfluencedByCategory: checked,
                            laboratoryTestName: test.name
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
                      checked={laboratoryTest.hasPrice}
                      disabled={!laboratoryTest.isInfluencedByCategory}
                      onChange={(_, checked) => {
                        dispatch({
                          type: 'hasIndividualPrice',
                          payload: {
                            laboratoryTestName: test.name,
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
                    {laboratoryTest.hasPrice && (
                      <FormControl
                        required
                        error={!laboratoryTest.price}
                        variant="standard"
                      >
                        <InputLabel>{laboratoryTest.name} price</InputLabel>
                        <Input
                          autoFocus
                          sx={{ ml: '5px' }}
                          onChange={e =>
                            dispatch({
                              type: 'changelaboratoryTestPrice',
                              payload: {
                                laboratoryTestName: test.name,
                                price: parseInt(e.target.value)
                              }
                            })
                          }
                          type="number"
                          value={laboratoryTest.price}
                        />
                        {!laboratoryTest.price && (
                          <FormHelperText>cannot be empty</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Box>
                </ListItem>
                <Divider />

                <ListItem>
                  {/* <ListItemIcon>
                    <Checkbox
                      color="success"
                      checked={laboratoryTest.hasNormalValue}
                      onChange={(_, checked) => {
                        dispatch({
                          type: 'hasNormalValue',
                          payload: {
                            laboratoryTestName: test.name,
                            hasNormalValue: checked
                          }
                        });
                      }}
                    />
                  </ListItemIcon> */}
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
                    (
                    <FormControl variant="standard" sx={{ ml: 6 }}>
                      <InputLabel>
                        {laboratoryTest.name} normal value
                      </InputLabel>
                      <Input
                        autoFocus
                        sx={{ ml: '5px' }}
                        onChange={e =>
                          dispatch({
                            type: 'changelaboratoryTestNormalValue',
                            payload: {
                              laboratoryTestName: test.name,
                              normalValue: e.target.value
                            }
                          })
                        }
                        value={laboratoryTest.normalValue}
                      />
                      {!laboratoryTest.normalValue && (
                        <FormHelperText>cannot be empty</FormHelperText>
                      )}
                    </FormControl>
                    )
                  </Box>
                </ListItem>
                <CommonValuesCollapse
                  commonValue={newCommonValue}
                  setCommonValue={setNewCommonValue}
                  onSubmit={() => {
                    dispatch({
                      type: 'addNewCommonValueForlaboratoryTest',
                      payload: {
                        laboratoryTestName: test.name,
                        newCommonValue
                      }
                    });
                    setNewCommonValue('');
                  }}
                >
                  {laboratoryTest.commonValues &&
                    laboratoryTest.commonValues.map((commonValue, index) => (
                      <>
                        <ListItem
                          secondaryAction={
                            <IconButton
                              onClick={() => {
                                dispatch({
                                  type: 'deleteCommonValueForlaboratoryTest',
                                  payload: {
                                    laboratoryTestName: test.name,
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
              title="Add a Laboratory laboratoryTest"
              field={newAddedField}
              setField={setNewAddedField}
              onSubmit={() => {
                dispatch({
                  type: 'addNewlaboratoryTest',
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
                  listItemSecondaryText={`${subCategory.price}`}
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

                  {subCategory.laboratoryTests.map(laboratoryTest => (
                    <DialogExaminationCollapseListItem
                      isExpanded={isExaminationExpanded === laboratoryTest.name}
                      listItemPrimaryText={laboratoryTest.name}
                      handleClick={() =>
                        setIsExaminationExpanded(prevExpanded =>
                          prevExpanded === laboratoryTest.name ? '' : test.name
                        )
                      }
                      handleDelete={() => {
                        dispatch({
                          type: 'deleteSubCategorylaboratoryTest',
                          payload: {
                            subCategoryName: subCategory.name,
                            name: laboratoryTest.name
                          }
                        });
                      }}
                    >
                      <ListItem>
                        {/* <ListItemIcon>
                          <Checkbox
                            color="success"
                            checked={laboratoryTest.hasNormalValue}
                            onChange={(_, checked) => {
                              dispatch({
                                type: 'hasSubCategorylaboratoryTestNormalValue',
                                payload: {
                                  laboratoryTestName: test.name,
                                  subCategoryName: subCategory.name,
                                  hasNormalValue: checked
                                }
                              });
                            }}
                          />
                        </ListItemIcon> */}
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
                          <FormControl variant="standard" sx={{ ml: 6 }}>
                            <InputLabel>
                              {laboratoryTest.name} normal value
                            </InputLabel>
                            <Input
                              autoFocus
                              sx={{ ml: '5px' }}
                              onChange={e =>
                                dispatch({
                                  type:
                                    'changeSubCategorylaboratoryTestNormalValue',
                                  payload: {
                                    laboratoryTestName: test.name,
                                    subCategoryName: subCategory.name,
                                    normalValue: e.target.value
                                  }
                                })
                              }
                              value={laboratoryTest.normalValue}
                            />
                            {!laboratoryTest.normalValue && (
                              <FormHelperText>cannot be empty</FormHelperText>
                            )}
                          </FormControl>
                        </Box>
                      </ListItem>

                      <CommonValuesCollapse
                        commonValue={newCommonValue}
                        setCommonValue={setNewCommonValue}
                        onSubmit={() => {
                          dispatch({
                            type:
                              'addNewCommonValueForSubCategorylaboratoryTest',
                            payload: {
                              laboratoryTestName: test.name,
                              subCategoryName: subCategory.name,
                              newCommonValue
                            }
                          });
                        }}
                      >
                        {laboratoryTest.commonValues &&
                          laboratoryTest.commonValues.map(
                            (commonValue, index) => (
                              <>
                                <ListItem
                                  secondaryAction={
                                    <IconButton
                                      onClick={() => {
                                        dispatch({
                                          type:
                                            'deleteCommonValueForSubCategorylaboratoryTest',
                                          payload: {
                                            subCategoryName: subCategory.name,
                                            laboratoryTestName: test.name,
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
                            )
                          )}
                      </CommonValuesCollapse>
                    </DialogExaminationCollapseListItem>
                  ))}
                  <AddNewFieldsFormDialog
                    title={`Add a LaboratorylaboratoryTest under ${subCategory.name}`}
                    field={newAddedField}
                    setField={setNewAddedField}
                    onSubmit={() => {
                      dispatch({
                        type: 'addNewSubCategorylaboratoryTest',
                        payload: {
                          laboratoryTestName: newAddedField.name,
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

export default LaboratorylaboratoryTestSettingDialog;
