import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button
} from '@mui/material';
import { ExpandLess, ExpandMore, Add as AddIcon } from '@mui/icons-material';

interface Props {
  commonValue: string;
  setCommonValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}
const CommonValuesCollapse: React.FC<Props> = ({
  commonValue,
  setCommonValue,
  onSubmit,
  children
}) => {
  const [open, setOpen] = useState(false);

  const onSubmitImproved = () => {};
  return (
    <>
      <ListItemButton onClick={() => setOpen(prevOpen => !prevOpen)}>
        <ListItemText primary="Common Values" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          pl: 5
        }}
      >
        <List dense sx={{ px: 4 }}>
          {children}
          <FormControl required variant="standard">
            <InputLabel>new common value</InputLabel>
            <Input
              value={commonValue}
              sx={{ display: 'block' }}
              onChange={e => {
                setCommonValue(e.target.value);
              }}
            />
            <FormHelperText>usual test results</FormHelperText>
            <Button
              onClick={() => {
                onSubmit();
                setCommonValue('');
              }}
              type="submit"
              disabled={!commonValue}
              size="small"
              sx={{ textTransform: 'capitalize' }}
              endIcon={<AddIcon />}
            >
              Add Common Value
            </Button>
          </FormControl>
        </List>
      </Collapse>
    </>
  );
};

export default CommonValuesCollapse;
