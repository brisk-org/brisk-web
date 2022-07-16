import React, { useState } from 'react';
import {
  List,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import {
  LaboratoryTestCategoriesDocument,
  LaboratoryTestContentInput,
  useCreateLaboratoryTestMutation
} from '../../../generated/graphql';
import LaboraotryTestSettingContent from './LaboraotryTestSettingItems';
import { Close as CloseIcon } from '@mui/icons-material';

interface Props {
  open: boolean;
  categoryTracksStock: boolean;
  onClose: () => void;
  categoryId: string;
  subCategoryId?: string;
}
const initialState = {
  name: '',
  hasPrice: true,
  isInfluencedByCategory: false,
  normalValue: '',
  trackInStock: true
};

const CreateNewLaboraotryTestDialog: React.FC<Props> = ({
  categoryTracksStock,
  open,
  onClose,
  categoryId,
  subCategoryId
}) => {
  const [newLaboratoryTest, setNewLaboratoryTest] = useState<
    LaboratoryTestContentInput
  >(initialState);

  const [createLaboratoryTest, { loading }] = useCreateLaboratoryTestMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    await createLaboratoryTest({
      variables: { categoryId, subCategoryId, content: newLaboratoryTest }
    });
    setNewLaboratoryTest(initialState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Create Laboratory Test
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        {' '}
        <Divider />
        <DialogContent sx={{ width: '500px' }}>
          <List>
            <LaboraotryTestSettingContent
              isInSubCategory={true}
              categoryTracksStock={categoryTracksStock}
              laboratoryTest={newLaboratoryTest}
              setLaboratoryTest={setNewLaboratoryTest}
            />
          </List>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="outlined">
            {loading ? '...loading' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateNewLaboraotryTestDialog;
