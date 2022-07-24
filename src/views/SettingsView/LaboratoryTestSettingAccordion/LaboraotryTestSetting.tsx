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
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Select
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
  DeleteOutline,
  DirectionsOutlined,
  ExpandLess,
  ExpandMore,
  MoreVert
} from '@mui/icons-material';
import LaboraotryTestSettingContent from './LaboraotryTestSettingItems';
import { Box } from '@mui/material';
import AlertDialog from '../../../components/AlertDialog';
import LaboratoryTestVentMenu from './LaboratoryTestVentMenu';

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
  const [moreVentAnchorEl, setMoreVentAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const [updateLaboratoryTest, { loading }] = useUpdateLaboratoryTestMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });
  useEffect(() => {
    setLaboraotryTest(initialState);
  }, [oldLaboraotryTest]);
  const handleCloseMoreVent = () => {
    setMoreVentAnchorEl(null);
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
        <LaboratoryTestVentMenu
          laboratoryTestId={oldLaboraotryTest.id}
          anchorEl={moreVentAnchorEl}
          handleClose={handleCloseMoreVent}
        />
        <IconButton
          onClick={e => {
            e.stopPropagation();
            setMoreVentAnchorEl(e.currentTarget);
          }}
        >
          <MoreVert fontSize="small" />
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
          onSubmit={() => {}}
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
    </>
  );
};

export default LaboraotryTestSetting;
