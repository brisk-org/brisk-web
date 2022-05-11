import React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  List,
  ListItemText,
  Divider,
  Collapse,
  ListItemButton
} from '@mui/material';

interface Props {
  isExpanded: boolean;
  listItemPrimaryText: string;
  listItemSecondaryText?: string | number;
  handleClick: () => void;
}
const DialogExaminationCollapseListItem: React.FC<Props> = ({
  isExpanded,
  listItemPrimaryText,
  listItemSecondaryText,
  handleClick,
  children
}) => {
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
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List
          // sx={{ borderLeft: '1px solid lightgray' }}
          component="div"
          disablePadding
        >
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default DialogExaminationCollapseListItem;
