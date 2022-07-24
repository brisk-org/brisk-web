import {
  DirectionsOutlined,
  DeleteOutline,
  ArrowRightAltOutlined
} from '@mui/icons-material';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Select,
  Button,
  SelectChangeEvent,
  FormControl,
  InputLabel
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AlertDialog from '../../../components/AlertDialog';
import { SettingsContext } from '../../../context/SettingContext';
import {
  LaboratoryTestCategoriesDocument,
  useDeleteLaboratoryTestMutation,
  useMoveLaboratoryTestMutation,
  useUpdateLaboratoryTestMutation
} from '../../../generated/graphql';

type SelectCategries = { id: string; name: string; active: boolean };
interface Props {
  laboratoryTestId: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}
const LaboratoryTestVentMenu: React.FC<Props> = ({
  laboratoryTestId,
  anchorEl,
  handleClose
}) => {
  const [moveCollapse, setMoveCollapse] = useState(false);
  const [categories, setCategories] = useState<SelectCategries[]>();
  const [subCategories, setSubCategories] = useState<SelectCategries[]>();
  const { categories: categoriesContext } = useContext(SettingsContext);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [moveLaboratoryTest] = useMoveLaboratoryTestMutation({
    onError: err => console.log(err),
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });
  const [deleteLaboraotryTest] = useDeleteLaboratoryTestMutation({
    variables: {
      id: laboratoryTestId
    },
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }],
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (!categoriesContext) return;

    setCategories(
      categoriesContext.map(({ id, name, laboratoryTests }) => ({
        id,
        name,
        active: laboratoryTests.some(({ id }) => id === laboratoryTestId)
      }))
    );
    setSubCategories(
      categoriesContext
        .map(category =>
          category.subCategories.map(({ id, name, laboratoryTests }) => ({
            id,
            name,
            active: laboratoryTests.some(({ id }) => id === laboratoryTestId)
          }))
        )
        .flat()
    );
    console.log('effect', categories, subCategories);
  }, [categoriesContext]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    if (event.target.name === 'category') {
      setCategories(prevCategories =>
        prevCategories?.map(category =>
          category.id === event.target.value
            ? { ...category, active: true }
            : { ...category, active: false }
        )
      );
      setSubCategories(prevSubCategories =>
        prevSubCategories?.map(prevCategories => ({
          ...prevCategories,
          active: false
        }))
      );
    }
    if (event.target.name === 'subCategory') {
      setSubCategories(prevSubCategories =>
        prevSubCategories?.map(subCategory =>
          subCategory.id === event.target.value
            ? { ...subCategory, active: true }
            : { ...subCategory, active: false }
        )
      );
      setCategories(prevCategories =>
        prevCategories?.map(prevCategories => ({
          ...prevCategories,
          active: false
        }))
      );
    }
  };
  const handleDelete = async () => {
    await deleteLaboraotryTest();
    setDeleteDialogOpen(false);
  };

  const handleMove = async () => {
    await moveLaboratoryTest({
      variables: {
        id: laboratoryTestId,
        categoryId: categories?.find(({ active }) => active)?.id,
        subCategoryId: subCategories?.find(({ active }) => active)?.id
      }
    });
    setMoveDialogOpen(false);
  };

  return (
    <>
      <Menu
        sx={{ width: '350px' }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClick={e => {
          e.stopPropagation();
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem onClick={() => setMoveCollapse(collapsed => !collapsed)}>
          <ListItemIcon>
            <DirectionsOutlined fontSize="small" />
          </ListItemIcon>
          <Typography>Move Laboratory Test</Typography>
        </MenuItem>
        <Collapse in={moveCollapse}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              label="Category"
              fullWidth
              onChange={handleSelectChange}
              value={categories?.find(({ active }) => active)?.id || ''}
              required
            >
              {categories?.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 1 }} fullWidth>
            <InputLabel>Sub Categories</InputLabel>
            <Select
              name="subCategory"
              label="Sub Categories"
              fullWidth
              onChange={handleSelectChange}
              value={subCategories?.find(({ active }) => active)?.id || ''}
              required
            >
              {subCategories?.map(subCategory => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => setMoveDialogOpen(true)} fullWidth>
            Move
          </Button>
        </Collapse>
        <MenuItem onClick={() => setDeleteDialogOpen(true)}>
          <ListItemIcon>
            <DeleteOutline fontSize="small" />
          </ListItemIcon>
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
      <AlertDialog
        title="Are you sure?"
        open={moveDialogOpen}
        handleClose={() => setMoveDialogOpen(false)}
        handleConfirm={handleMove}
      >
        Transfer From{' '}
        {categoriesContext?.find(category =>
          category.laboratoryTests.some(({ id }) => id === laboratoryTestId)
        )?.name ||
          categoriesContext
            ?.map(category =>
              category.subCategories.find(subCategory =>
                subCategory.laboratoryTests.some(
                  ({ id }) => id === laboratoryTestId
                )
              )
            )
            .filter(category => category)[0]?.name}
        <ArrowRightAltOutlined sx={{ height: '100%' }} />{' '}
        {categories?.find(({ active }) => active)?.name ||
          subCategories?.find(({ active }) => active)?.name}
      </AlertDialog>
      <AlertDialog
        title="Are you sure?"
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleConfirm={handleDelete}
      >
        This Action Can't be reversed
      </AlertDialog>
    </>
  );
};
export default LaboratoryTestVentMenu;
