import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListSubheader,
  IconButton
} from '@mui/material';
// import { LaboratorylaboratoryTestCatagories } from '../../../data/testsSeed';
import AddNewFieldsFormDialog, {
  LaboratorySettingEnteryFields
} from './AddNewFieldsFormDialog';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
// import { LaboratorylaboratoryTestSettingReducerAction } from '../../../reducer/laboratoryTestSettingReducer';
import {
  LaboratoryTestCategoriesDocument,
  LaboratoryTestCategoriesQuery,
  useCreateLaboratoryTestSubCategoryMutation,
  useDeleteLaboratoryTestCategoryMutation
} from '../../../generated/graphql';
import UpdateLaboratoryTestCategoryFields from './UpdateLaboratoryTestCategoryFields';
import LaboraotryTestSetting from './LaboraotryTestSetting';
import CreateNewLaboraotryTestDialog from './CreateNewLaboraotryTestDialog';
import LaboratoryTestSubCategorySetting from './LaboratoryTestSubCategorySetting';
import AlertDialog from '../../../components/AlertDialog';

interface Props {
  open: boolean;
  handleClose: () => void;
  category: LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
}
const LaboratorylaboratoryTestSettingDialog: React.FC<Props> = ({
  open,
  handleClose,
  category
}) => {
  const [expandedLaboratoryTest, setExpandedLaboratoryTest] = useState('');
  const [expandedSubCategory, setExpandedSubCategory] = useState('');
  const [addLabTestDialogOpen, setAddLabTestDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (confirmDelete) {
      (async function() {
        await deleteCategory();
      })();
    }
  }, [confirmDelete]);

  const [newAddedField, setNewAddedField] = useState<
    LaboratorySettingEnteryFields
  >({
    name: '',
    price: 0
  });

  const [createSubCategory] = useCreateLaboratoryTestSubCategoryMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });
  const [deleteCategory] = useDeleteLaboratoryTestCategoryMutation({
    variables: { id: category.id },
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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`alert-dialog-title`}
        aria-describedby="alert-dialog-description"
      >
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
                  .join(', ') || `No Tests are Influenced By ${category.name}`}
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
                  categoryTracksStock={category.trackInStock}
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
            categoryTracksStock={category.trackInStock}
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
          <AddNewFieldsFormDialog
            title="Add a Sub Category"
            hasPrice={true}
            field={newAddedField}
            setField={setNewAddedField}
            onSubmit={createSubCategorySubmit}
          />
          <Button
            sx={{ mt: 2, width: '100%' }}
            onClick={() => setDeleteDialogOpen(true)}
            variant="contained"
            color="error"
            endIcon={<DeleteIcon />}
          >
            Delete Category
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" autoFocus onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        dialogText={`Delete ${category.name}`}
        state={{
          dialogToggle: deleteDialogOpen,
          setDialogToggle: setDeleteDialogOpen,
          setProceedToAction: setConfirmDelete
        }}
      />
    </>
  );
};

export default LaboratorylaboratoryTestSettingDialog;
