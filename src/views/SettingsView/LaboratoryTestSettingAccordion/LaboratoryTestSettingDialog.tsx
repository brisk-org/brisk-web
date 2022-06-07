import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  List,
  ListItem,
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
import AddNewFieldsFormDialog, {
  LaboratorySettingEnteryFields
} from './AddNewFieldsFormDialog';
import CommonValuesCollapse from './CommonValuesCollapse';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
// import { LaboratorylaboratoryTestSettingReducerAction } from '../../../reducer/laboratoryTestSettingReducer';
import { LaboratoryTestCategoriesQuery } from '../../../generated/graphql';
import UpdateLaboratoryTestCategoryFields from './UpdateLaboratoryTestCategoryFields';
import LaboraotryTestSetting from './LaboraotryTestSetting';
import CreateNewLaboraotryTestDialog from './CreateNewLaboraotryTestDialog';

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
  const [addLabTestDialogOpen, setAddLabTestDialogOpen] = useState(false);
  const [addNewSubCategoryDialog, setAddSubCategoryDialog] = useState(false);

  const [newAddedField, setNewAddedField] = useState<
    LaboratorySettingEnteryFields
  >({
    name: '',
    price: 0
  });

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
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`alert-dialog-title`}
        aria-describedby="alert-dialog-description"
      >
        {/* <form onSubmit={preSubmit}> */}
        <DialogTitle>
          <Typography variant="h5">
            {category.name}
            {category.laboratoryTests[0] && (
              <Typography sx={{ ml: 1 }} variant="caption">
                (
                {category.laboratoryTests
                  .map(
                    laboratoryTest =>
                      laboratoryTest.isInfluencedByCategory &&
                      laboratoryTest.name
                  )
                  .filter(value => !!value)
                  .join(', ')}
                )
              </Typography>
            )}
          </Typography>
          <Typography variant="body2">price: {category.price}etb</Typography>
          <IconButton
            sx={{ position: 'absolute', top: 20, right: 20 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UpdateLaboratoryTestCategoryFields fields={{ ...category }} />
          {category.laboratoryTests[0] && (
            <List
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Examinations
                </ListSubheader>
              }
            >
              {category.laboratoryTests.map(laboratoryTest => (
                <LaboraotryTestSetting
                  laboratoryTest={laboratoryTest}
                  isExpanded={isExaminationExpanded === laboratoryTest.name}
                  setExpandedLaboraotryTest={setIsExaminationExpanded}
                />
              ))}
            </List>
          )}
          <Button
            sx={{ mt: 2, width: '100%' }}
            onClick={() => setAddLabTestDialogOpen(true)}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add New Laboratory Test
          </Button>
          <CreateNewLaboraotryTestDialog
            open={addLabTestDialogOpen}
            onClose={() => setAddLabTestDialogOpen(false)}
            categoryId={category.id}
          />
          {category.subCategories[0] && (
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
                    <LaboraotryTestSetting
                      laboratoryTest={laboratoryTest}
                      isExpanded={isExaminationExpanded === laboratoryTest.name}
                      setExpandedLaboraotryTest={setIsExaminationExpanded}
                    />
                    // <DialogExaminationCollapseListItem
                    //   isExpanded={isExaminationExpanded === laboratoryTest.name}
                    //   listItemPrimaryText={laboratoryTest.name}
                    //   handleClick={() =>
                    //     setIsExaminationExpanded(prevExpanded =>
                    //       prevExpanded === laboratoryTest.name ? '' : test.name
                    //     )
                    //   }
                    //   handleDelete={() => {
                    //     dispatch({
                    //       type: 'deleteSubCategorylaboratoryTest',
                    //       payload: {
                    //         subCategoryName: subCategory.name,
                    //         name: laboratoryTest.name
                    //       }
                    //     });
                    //   }}
                    // >
                    //   <ListItem>
                    //     {/* <ListItemIcon>
                    //       <Checkbox
                    //         color="success"
                    //         checked={laboratoryTest.hasNormalValue}
                    //         onChange={(_, checked) => {
                    //           dispatch({
                    //             type: 'hasSubCategorylaboratoryTestNormalValue',
                    //             payload: {
                    //               laboratoryTestName: test.name,
                    //               subCategoryName: subCategory.name,
                    //               hasNormalValue: checked
                    //             }
                    //           });
                    //         }}
                    //       />
                    //     </ListItemIcon> */}
                    //     <Box
                    //       sx={{
                    //         display: 'flex',
                    //         alignItems: 'center',
                    //         maxWidth: 400
                    //       }}
                    //     >
                    //       <ListItemText
                    //         primary="has normal value"
                    //         secondary="a constant reference"
                    //       />
                    //       <FormControl variant="standard" sx={{ ml: 6 }}>
                    //         <InputLabel>
                    //           {laboratoryTest.name} normal value
                    //         </InputLabel>
                    //         <Input
                    //           autoFocus
                    //           sx={{ ml: '5px' }}
                    //           onChange={e =>
                    //             dispatch({
                    //               type:
                    //                 'changeSubCategorylaboratoryTestNormalValue',
                    //               payload: {
                    //                 laboratoryTestName: test.name,
                    //                 subCategoryName: subCategory.name,
                    //                 normalValue: e.target.value
                    //               }
                    //             })
                    //           }
                    //           value={laboratoryTest.normalValue}
                    //         />
                    //         {!laboratoryTest.normalValue && (
                    //           <FormHelperText>cannot be empty</FormHelperText>
                    //         )}
                    //       </FormControl>
                    //     </Box>
                    //   </ListItem>

                    //   <CommonValuesCollapse
                    //     commonValue={newCommonValue}
                    //     setCommonValue={setNewCommonValue}
                    //     onSubmit={() => {
                    //       dispatch({
                    //         type:
                    //           'addNewCommonValueForSubCategorylaboratoryTest',
                    //         payload: {
                    //           laboratoryTestName: test.name,
                    //           subCategoryName: subCategory.name,
                    //           newCommonValue
                    //         }
                    //       });
                    //     }}
                    //   >
                    //     {laboratoryTest.commonValues &&
                    //       laboratoryTest.commonValues.map(
                    //         (commonValue, index) => (
                    //           <>
                    //             <ListItem
                    //               secondaryAction={
                    //                 <IconButton
                    //                   onClick={() => {
                    //                     dispatch({
                    //                       type:
                    //                         'deleteCommonValueForSubCategorylaboratoryTest',
                    //                       payload: {
                    //                         subCategoryName: subCategory.name,
                    //                         laboratoryTestName: test.name,
                    //                         commonValueIndex: index
                    //                       }
                    //                     });
                    //                   }}
                    //                   color="secondary"
                    //                   size="small"
                    //                   edge="end"
                    //                 >
                    //                   <DeleteIcon fontSize="small" />
                    //                 </IconButton>
                    //               }
                    //             >
                    //               <ListItemText primary={commonValue} />
                    //             </ListItem>
                    //             <Divider />
                    //           </>
                    //         )
                    //       )}
                    //   </CommonValuesCollapse>
                    // </DialogExaminationCollapseListItem>
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
          <Button
            sx={{ mt: 2, width: '100%' }}
            onClick={() => setAddSubCategoryDialog(true)}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add New Sub Category
          </Button>
          <AddNewFieldsFormDialog
            title="Add a Sub Category"
            field={newAddedField}
            setField={setNewAddedField}
            onSubmit={() => {}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LaboratorylaboratoryTestSettingDialog;
