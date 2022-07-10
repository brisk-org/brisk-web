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

interface Props {
  categoryTracksStock: boolean;
  laboratoryTest: LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0]['laboratoryTests'][0];
  isExpanded: boolean;
  setExpandedLaboratoryTest: React.Dispatch<React.SetStateAction<string>>;
}
const LaboraotryTestSetting: React.FC<Props> = ({
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

  useEffect(() => {
    setLaboraotryTest(initialState);
  }, [oldLaboraotryTest]);

  const [newCommonValue, setNewCommonValue] = useState('');

  const [updateLaboratoryTest, { loading }] = useUpdateLaboratoryTestMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });
  const [deleteLaboraotryTest] = useDeleteLaboratoryTestMutation({
    variables: {
      id: oldLaboraotryTest.id
    },
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const handleDelete = async () => {
    await deleteLaboraotryTest();
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    await updateLaboratoryTest({
      variables: {
        id: oldLaboraotryTest.id,
        content: { ...laboratoryTest }
      }
    });
  };
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
            handleDelete();
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {isExpanded && <Divider />}
      <form onSubmit={handleSubmit}>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ pl: 1 }}>
          <List
            // sx={{ borderLeft: '1px solid lightgray' }}
            component="div"
            disablePadding
          >
            <LaboraotryTestSettingContent
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
          <Box
            sx={{
              mt: 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Button variant="outlined" type="submit">
              {loading ? '...Loading' : 'Submit Updates'}
            </Button>
          </Box>
        </Collapse>
      </form>
    </>
  );
};

export default LaboraotryTestSetting;
