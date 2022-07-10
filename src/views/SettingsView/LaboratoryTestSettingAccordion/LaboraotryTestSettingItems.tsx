import {
  Box,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Divider,
  TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import { LaboratoryTestContentInput } from '../../../generated/graphql';

interface Props {
  categoryTracksStock: boolean;
  laboratoryTest: LaboratoryTestContentInput;
  setLaboratoryTest: React.Dispatch<
    React.SetStateAction<LaboratoryTestContentInput>
  >;
}
const LaboraotryTestSettingContent: React.FC<Props> = ({
  categoryTracksStock,
  laboratoryTest,
  setLaboratoryTest
}) => {
  useEffect(() => {
    setLaboratoryTest(prevLabTest => ({
      ...prevLabTest,
      hasPrice:
        !prevLabTest.hasPrice && !prevLabTest.isInfluencedByCategory
          ? true
          : prevLabTest.hasPrice,
      trackInStock:
        categoryTracksStock && laboratoryTest.isInfluencedByCategory
          ? false
          : prevLabTest.trackInStock
    }));
  }, [categoryTracksStock, laboratoryTest.isInfluencedByCategory]);

  return (
    <>
      <ListItem>
        <Box sx={{ my: '15px', display: 'flex' }}>
          <TextField
            required
            autoFocus
            sx={{ mr: 1 }}
            label="Laboraotry Test Name"
            variant="outlined"
            value={laboratoryTest.name}
            onChange={e => {
              setLaboratoryTest(prevLabTest => ({
                ...prevLabTest,
                name: e.target.value
              }));
            }}
          />
        </Box>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            checked={laboratoryTest.isInfluencedByCategory}
            onChange={(_, checked) => {
              setLaboratoryTest(prevLabTest => ({
                ...prevLabTest,
                isInfluencedByCategory: checked
              }));
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={`Is selected with parent Category`}
          secondary="if selected the item can't be requested individually"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            color="secondary"
            checked={laboratoryTest.hasPrice}
            disabled={!laboratoryTest.isInfluencedByCategory}
            onChange={(_, checked) => {
              setLaboratoryTest(prevLabTest => ({
                ...prevLabTest,
                hasPrice: checked
              }));
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
            sx={{ width: 250 }}
            primary="has individual price"
            secondary="can be requested individually"
          />
          {laboratoryTest.hasPrice && (
            <FormControl required variant="standard">
              <InputLabel required>price</InputLabel>
              <Input
                required
                sx={{ ml: '5px' }}
                onChange={e =>
                  setLaboratoryTest(prevLabTest => ({
                    ...prevLabTest,
                    price: parseInt(e.target.value)
                  }))
                }
                type="number"
                value={laboratoryTest.price}
              />
            </FormControl>
          )}
        </Box>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            color="success"
            checked={
              categoryTracksStock && laboratoryTest.isInfluencedByCategory
                ? false
                : laboratoryTest.trackInStock
            }
            disabled={
              laboratoryTest.isInfluencedByCategory && categoryTracksStock
            }
            onChange={(_, checked) => {
              setLaboratoryTest(prevLabTest => ({
                ...prevLabTest,
                trackInStock: checked
              }));
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
            sx={{ width: 250 }}
            primary="Track Stock"
            secondary="Stock count decreases while Laboratory Request"
          />
          {laboratoryTest.trackInStock && (
            <FormControl required variant="standard">
              <InputLabel>In Stock</InputLabel>
              <Input
                required
                sx={{ ml: '5px' }}
                onChange={e =>
                  setLaboratoryTest(prevLabTest => ({
                    ...prevLabTest,
                    inStock: parseInt(e.target.value)
                  }))
                }
                type="number"
                value={laboratoryTest.inStock}
              />
            </FormControl>
          )}
        </Box>
      </ListItem>

      <Divider />

      <ListItem>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: 400
          }}
        >
          <FormControl variant="standard" sx={{ ml: 6 }}>
            <InputLabel>normal value</InputLabel>
            <Input
              sx={{ ml: '5px' }}
              onChange={e =>
                setLaboratoryTest(prevLabTest => ({
                  ...prevLabTest,
                  normalValue: e.target.value
                }))
              }
              value={laboratoryTest.normalValue}
            />
            <FormHelperText>Optional normal value for reference</FormHelperText>
          </FormControl>
        </Box>
      </ListItem>
    </>
  );
};

export default LaboraotryTestSettingContent;
