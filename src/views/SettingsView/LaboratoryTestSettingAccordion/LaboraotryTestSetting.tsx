import React, { useEffect, useState } from 'react';
import {
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  ListItemButton,
  Collapse,
  List,
  Button,
  Typography
} from '@mui/material';
import CommonValuesCollapse from './CommonValuesCollapse';
import {
  LaboratoryTestCategoriesDocument,
  LaboratoryTestCategoriesQuery,
  LaboratoryTestContentInput,
  useDeleteLaboratoryTestMutation,
  useUpdateLaboratoryTestMutation
} from '../../../generated/graphql';
import {
  Delete,
  Delete as DeleteIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import LaboraotryTestSettingContent from './LaboraotryTestSettingItems';
import { Box } from '@mui/material';
import AlertDialog from '../../../components/AlertDialog';

interface Props {
  isInSubCategory?: boolean;
  submit: boolean;
  categoryTracksStock: boolean;
  laboratoryTest: LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['laboratoryTests'][0];
  isExpanded: boolean;
  setExpandedLaboratoryTest: React.Dispatch<React.SetStateAction<string>>;
}
const LaboraotryTestSetting: React.FC<Props> = ({
  isInSubCategory,
  submit,
  categoryTracksStock,
  laboratoryTest: oldLaboraotryTest,
  isExpanded,
  setExpandedLaboratoryTest: setExpandedLaboraotryTest
}) => {
  const initialState = {
    name: oldLaboraotryTest.name,
    hasPrice: oldLaboraotryTest.hasPrice,
    isInfluencedByCategory: oldLaboraotryTest.isInfluencedByCategory,
    normalValue: oldLaboraotryTest.normalValue,
    trackInStock: oldLaboraotryTest.trackInStock,
    commonValues: oldLaboraotryTest.commonValues,
    inStock: oldLaboraotryTest.inStock,
    price: oldLaboraotryTest.price
  };
  const [laboratoryTest, setLaboraotryTest] = useState<
    LaboratoryTestContentInput
  >(initialState);
  const [newCommonValue, setNewCommonValue] = useState('');
  const [moreOptionsMenuOpen, setMoreOptionsMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [updateLaboratoryTest, { loading }] = useUpdateLaboratoryTestMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });
  const [deleteLaboraotryTest] = useDeleteLaboratoryTestMutation({
    variables: {
      id: oldLaboraotryTest.id
    },
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  useEffect(() => {
    setLaboraotryTest(initialState);
  }, [oldLaboraotryTest]);

  const handleDelete = async () => {
    await deleteLaboraotryTest();
    setDeleteDialogOpen(false);
  };
  useEffect(() => {
    (async function() {
      if (!submit) return;
      await updateLaboratoryTest({
        variables: {
          id: oldLaboraotryTest.id,
          content: { ...laboratoryTest }
        }
      });
    })();
  }, [submit]);
  return (
    <>
      <ListItemButton
        sx={{
          backgroundColor: isExpanded ? 'primary.light' : ''
        }}
        onClick={() =>
          setExpandedLaboraotryTest(prevExpanded =>
            prevExpanded === oldLaboraotryTest.name
              ? ''
              : oldLaboraotryTest.name
          )
        }
      >
        <ListItemText
          primary={oldLaboraotryTest.name}
          secondary={
            <>
              {oldLaboraotryTest.hasPrice && (
                <Typography variant="caption">
                  {oldLaboraotryTest.price} birr
                </Typography>
              )}
              {oldLaboraotryTest.trackInStock && (
                <Typography variant="caption" sx={{ display: 'block' }}>
                  {oldLaboraotryTest.inStock} in stock
                </Typography>
              )}
            </>
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
      {isExpanded && <Divider />}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ pl: 1 }}>
        <List component="div" disablePadding>
          <LaboraotryTestSettingContent
            isInSubCategory={isInSubCategory}
            categoryTracksStock={categoryTracksStock}
            laboratoryTest={laboratoryTest}
            setLaboratoryTest={setLaboraotryTest}
          />
        </List>
        <CommonValuesCollapse
          commonValue={newCommonValue}
          setCommonValue={setNewCommonValue}
          onSubmit={() => {
            // set
            // setNewCommonValue('');
          }}
        >
          {laboratoryTest.commonValues &&
            laboratoryTest.commonValues.map((commonValue, index) => (
              <>
                <ListItem
                  secondaryAction={
                    <IconButton
                      onClick={() => {
                        setLaboraotryTest(prevLabTest => ({
                          ...prevLabTest,
                          commonValues: prevLabTest.commonValues?.filter(
                            commonVal => commonVal !== commonValue
                          )
                        }));
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
        <Divider />
      </Collapse>
      <AlertDialog
        title="Are you sure?"
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleConfirm={handleDelete}
      >
        Delete {laboratoryTest.name}
      </AlertDialog>
    </>
  );
};

export default LaboraotryTestSetting;
