import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  LaboratoryTestCategoriesDocument,
  UpdateLaboratoryTestCategoryMutationVariables,
  useUpdateLaboratoryTestCategoryMutation
} from '../../../generated/graphql';

interface Props {
  fields: UpdateLaboratoryTestCategoryMutationVariables;
}
const UpdateLaboratoryTestCategoryFields: React.FC<Props> = ({
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    await updateLaboraotryTestCategory({
      variables: {
        ...fields,
        trackInStock: !!fields.inStock
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <Box
        sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'end' }}
      >
        <Button variant="outlined" type="submit">
          Submit Update
        </Button>
      </Box>
    </form>
  );
};

export default UpdateLaboratoryTestCategoryFields;
