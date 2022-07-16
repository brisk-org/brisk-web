import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  LaboratoryTestCategoriesDocument,
  UpdateLaboratoryTestCategoryMutationVariables,
  useUpdateLaboratoryTestCategoryMutation
} from '../../../generated/graphql';

interface Props {
  submit: boolean;
  fields: UpdateLaboratoryTestCategoryMutationVariables;
}
const UpdateLaboratoryTestCategoryFields: React.FC<Props> = ({
  submit,
  fields: fieldsProps
}) => {
  const [fields, setFields] = useState(fieldsProps);
  const [
    updateLaboraotryTestCategory
  ] = useUpdateLaboratoryTestCategoryMutation({
    refetchQueries: [{ query: LaboratoryTestCategoriesDocument }]
  });

  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = e => {
    const name = e.target.name;
    const value = name !== 'name' ? parseInt(e.target.value) : e.target.value;
    setFields(prevFields => ({ ...prevFields, [name]: value }));
  };

  useEffect(() => {
    (async function() {
      if (!submit) return;
      await updateLaboraotryTestCategory({
        variables: {
          ...fields,
          trackInStock: !!fields.inStock
        }
      });
    })();
  }, [submit]);
  return (
    <Box sx={{ mt: '15px', display: 'flex' }}>
      <TextField
        required
        sx={{ mr: 1 }}
        name="name"
        label="Change Name"
        variant="outlined"
        value={fields.name}
        onChange={handleChange}
      />
      <TextField
        label="Change Price"
        variant="outlined"
        type="number"
        name="price"
        value={fields.price}
        onChange={handleChange}
      />
      <TextField
        label="Change InStock"
        variant="outlined"
        name="inStock"
        type="number"
        value={fields.inStock}
        onChange={handleChange}
      />
    </Box>
  );
};

export default UpdateLaboratoryTestCategoryFields;
