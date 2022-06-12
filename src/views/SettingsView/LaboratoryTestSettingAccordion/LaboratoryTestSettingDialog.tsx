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
import {
  LaboratoryTestCategoriesDocument,
  LaboratoryTestCategoriesQuery,
  useCreateLaboratoryTestSubCategoryMutation
} from '../../../generated/graphql';
import UpdateLaboratoryTestCategoryFields from './UpdateLaboratoryTestCategoryFields';
import LaboraotryTestSetting from './LaboraotryTestSetting';
import CreateNewLaboraotryTestDialog from './CreateNewLaboraotryTestDialog';
import LaboratoryTestSubCategorySetting from './LaboratoryTestSubCategorySetting';

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
  const [expandedLaboratoryTest, setExpandedLaboratoryTest] = useState('');
  const [expandedSubCategory, setExpandedSubCategory] = useState('');
  const [addLabTestDialogOpen, setAddLabTestDialogOpen] = useState(false);

  const [newAddedField, setNewAddedField] = useState<
    LaboratorySettingEnteryFields
  >({
    name: '',
    price: 0
  });

  const [createSubCategory] = useCreateLaboratoryTestSubCategoryMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const createSubCategorySubmit = async () => {
    await createSubCategory({
      variables: {
        id: category.id,
        ...newAddedField,
        price: newAddedField.price || 0,
        trackInStock: !!newAddedField.inStock
      }
    });
  };

  const preSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const emptyCategory = category.laboratoryTests.find(
      laboratoryTest => laboratoryTest.hasPrice && !laboratoryTest.price
    );

    if (emptyCategory) {
      setExpandedLaboratoryTest(emptyCategory.name);
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
                  isExpanded={expandedLaboratoryTest === laboratoryTest.name}
                  setExpandedLaboratoryTest={setExpandedLaboratoryTest}
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
                <LaboratoryTestSubCategorySetting
                  categoryId={category.id}
                  subCategory={subCategory}
                  isExpanded={expandedSubCategory === subCategory.name}
                  setExpandedSubCategory={setExpandedSubCategory}
                />
              ))}
            </List>
          )}
          {/* <Button
            sx={{ mt: 2, width: '100%' }}
            onClick={() => setAddSubCategoryDialog(true)}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add New Sub Category
          </Button> */}
          <AddNewFieldsFormDialog
            title="Add a Sub Category"
            hasPrice={true}
            field={newAddedField}
            setField={setNewAddedField}
            onSubmit={createSubCategorySubmit}
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
