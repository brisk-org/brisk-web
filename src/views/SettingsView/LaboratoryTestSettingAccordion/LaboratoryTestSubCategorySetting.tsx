import React, { useEffect, useState } from 'react';
import {
  List,
  Box,
  Collapse,
  Divider,
  ListItemButton,
  ListItemText,
  TextField,
  IconButton,
  Button,
  Typography
} from '@mui/material';
import {
  LaboratoryTestCategoriesDocument,
  LaboratoryTestCategoriesQuery,
  UpdateLaboratoryTestSubCategoryMutationVariables,
  useDeleteLaboratoryTestSubCategoryMutation,
  useUpdateLaboratoryTestSubCategoryMutation
} from '../../../generated/graphql';

import LaboraotryTestSetting from './LaboraotryTestSetting';
import { Add, Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import CreateNewLaboraotryTestDialog from './CreateNewLaboraotryTestDialog';
import AlertDialog from '../../../components/AlertDialog';

interface Props {
  submit: boolean;
  categoryId: string;
  subCategory: LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['subCategories'][0];
  isExpanded: boolean;
  setExpandedSubCategory: React.Dispatch<React.SetStateAction<string>>;
}
const LaboratoryTestSubCategorySetting: React.FC<Props> = ({
  submit,
  categoryId,
  subCategory: oldSubCategory,
  isExpanded,
  setExpandedSubCategory
}) => {
  const initialState = {
    id: oldSubCategory.id,
    name: oldSubCategory.name,
    price: oldSubCategory.price,
    trackInStock: oldSubCategory.trackInStock,
    inStock: oldSubCategory.inStock
  };
  const [expandedLaboratoryTest, setExpandedLaboratoryTest] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subCategory, setSubCategory] = useState<
    UpdateLaboratoryTestSubCategoryMutationVariables
  >(initialState);

  const [createLabTestDialogOpen, setCreateLabTestDialogOpen] = useState(false);

  const [
    updateSubCategory,
    { loading }
  ] = useUpdateLaboratoryTestSubCategoryMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const [deleteSubCategory] = useDeleteLaboratoryTestSubCategoryMutation({
    variables: {
      id: oldSubCategory.id
    },
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const handleDelete = async () => {
    await deleteSubCategory();
  };
  useEffect(() => {
    if (!submit) return;

    handleSubmit();
  }, [submit]);
  const handleSubmit = async () => {
    await updateSubCategory({
      variables: {
        ...subCategory
      }
    });
    setSubCategory(initialState);
  };

  return (
    <>
      <ListItemButton
        sx={{ backgroundColor: isExpanded ? 'primary.light' : '' }}
        onClick={() =>
          setExpandedSubCategory(prevExpanded =>
            prevExpanded === oldSubCategory.name ? '' : oldSubCategory.name
          )
        }
      >
        <ListItemText
          primary={oldSubCategory.name}
          secondary={
            <Typography variant="body2">
              {oldSubCategory.price} etb &bull;{' '}
              {oldSubCategory.laboratoryTests.length} tests
            </Typography>
          }
        />
        <IconButton
          onClick={e => {
            e.stopPropagation();
            setDeleteDialogOpen(true);
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {!isExpanded && <Divider />}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ pl: 1 }}>
        <List component="div" disablePadding>
          <Box sx={{ my: '15px', display: 'flex' }}>
            <TextField
              required
              sx={{ mr: 1 }}
              label="Change Name"
              variant="outlined"
              value={subCategory.name}
              onChange={e => {
                setSubCategory(prevSubCategory => ({
                  ...prevSubCategory,
                  name: e.target.value
                }));
              }}
            />
            <TextField
              required
              label="Change Price"
              variant="outlined"
              type="number"
              value={subCategory.price}
              onChange={e => {
                setSubCategory(prevSubCategory => ({
                  ...prevSubCategory,
                  price: parseInt(e.target.value)
                }));
              }}
            />
            <TextField
              label="In Stock"
              variant="outlined"
              type="number"
              value={subCategory.inStock}
              onChange={e => {
                setSubCategory(prevSubCategory => ({
                  ...prevSubCategory,
                  inStock: parseInt(e.target.value)
                }));
              }}
            />
          </Box>

          {oldSubCategory.laboratoryTests?.map(laboratoryTest => (
            <LaboraotryTestSetting
              isInSubCategory={true}
              submit={submit}
              categoryTracksStock={true}
              laboratoryTest={laboratoryTest}
              isExpanded={expandedLaboratoryTest === laboratoryTest.name}
              setExpandedLaboratoryTest={setExpandedLaboratoryTest}
            />
          ))}
          <Button
            sx={{ mt: 2, width: '100%' }}
            onClick={() => setCreateLabTestDialogOpen(true)}
            variant="contained"
            endIcon={<Add />}
          >
            Add Test
          </Button>
          <CreateNewLaboraotryTestDialog
            categoryTracksStock={true}
            categoryId={categoryId}
            subCategoryId={oldSubCategory.id}
            open={createLabTestDialogOpen}
            onClose={() => setCreateLabTestDialogOpen(false)}
          />
        </List>
      </Collapse>
      <AlertDialog
        title="Delete Sub Category"
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleConfirm={handleDelete}
      >
        You can't revert this Action {subCategory.name}
      </AlertDialog>
    </>
  );
};

export default LaboratoryTestSubCategorySetting;
