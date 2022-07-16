import React, { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  List,
  ListItemText,
  Divider,
  Collapse,
  ListItemButton,
  Button,
  ListItem
} from '@mui/material';
import AlertDialog from '../../../components/AlertDialog';

interface Props {
  isExpanded: boolean;
  listItemPrimaryText: string;
  listItemSecondaryText?: string | number;
  handleClick: () => void;
  handleDelete: () => void;
}
const DialogExaminationCollapseListItem: React.FC<Props> = ({
  isExpanded,
  listItemPrimaryText,
  listItemSecondaryText,
  handleClick,
  handleDelete,
  children
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <ListItemButton
        sx={{ backgroundColor: isExpanded ? 'primary.light' : '' }}
        onClick={handleClick}
      >
        <ListItemText
          primary={listItemPrimaryText}
          secondary={
            listItemSecondaryText ? `${listItemSecondaryText} etb` : ''
          }
        />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {!isExpanded && <Divider />}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ pl: 1 }}>
        <List
          // sx={{ borderLeft: '1px solid lightgray' }}
          component="div"
          disablePadding
        >
          {children}
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete {listItemPrimaryText}
            </Button>
          </ListItem>
        </List>
      </Collapse>
      <AlertDialog
        title="Are you sure?"
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleConfirm={handleDelete}
      >
        Delete ${listItemPrimaryText}
      </AlertDialog>
      {isExpanded && <Divider sx={{ mt: 3 }} />}
    </>
  );
};

export default DialogExaminationCollapseListItem;
