import React, { useContext, useEffect, useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  colors,
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { UnfoldMore } from '@mui/icons-material';
import clsx from 'clsx';
import { format, isBefore, sub } from 'date-fns';
import FieldShortner from '../../../components/helpers/TextShortner';
import {
  CardsQuery,
  Occupation,
  useInvalidateCardMutation
} from '../../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { SettingsContext } from '../../../context/SettingContext';
import ConfirmationDialog from './ConfirmationDialog';
import { cardQuery, createHistoryQuery } from '../../../constants/queries';

const useStyles = makeStyles(theme => ({
  root: {
    '& *': {
      textAlign: 'center'
    }
  },
  newRow: {
    backgroundColor: colors.green[100],
    '&:hover': {
      backgroundColor: `${colors.green[200]}!important`
    }
  },
  popover: {
    border: '1px solid grey',
    padding: '10px 15px'
  },
  valid: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  expired: {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText
  }
}));

const SingleRow: React.FC<{ card: CardsQuery['cards'][0] }> = ({ card }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const history = useHistory();
  const { occupation } = useContext(AuthContext);
  const { cardExpirationDate } = useContext(SettingsContext);

  const [expireCard] = useInvalidateCardMutation({
    onError: err => console.log(err)
  });
  useEffect(() => {
    console.log('yoo', cardExpirationDate);
    if (!card.valid) return;
    const cardExpires = isBefore(
      Number(card.updated_at),
      sub(new Date(), { days: cardExpirationDate })
    );
    cardExpires && expireCard({ variables: { id: card.id } });
  }, [card]);

  const handleMoreClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (occupation === Occupation.Reception) {
      setOpen(true);
      return;
    }

    if (occupation === Occupation.Doctor) {
      setMenuAnchorEl(event.currentTarget);
      return;
    }
  };

  const addHistory = function() {
    history.push(
      createHistoryQuery(card.id, {
        age: card.age,
        gender: card.gender,
        name: card.name
      })
    );
  };
  const viewHistory = function() {
    history.push(cardQuery({ id: card.id }));
  };

  return (
    <>
      <TableRow
        hover
        key={card.id}
        className={clsx(classes.root, {
          [classes.newRow]: card.new
        })}
      >
        <TableCell>
          <IconButton
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            name="more"
            onClick={handleMoreClick}
            size="medium"
          >
            <UnfoldMore />
          </IconButton>
          <ConfirmationDialog open={open} setOpen={setOpen} card={card} />
          <Menu
            id="basic-menu"
            anchorEl={menuAnchorEl}
            open={!!menuAnchorEl}
            onClose={() => setMenuAnchorEl(null)}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            {card.history && !card.history[0] && !card.new && (
              <MenuItem onClick={() => setMenuAnchorEl(null)}>
                No History! Ask Registral to Mark it as New
              </MenuItem>
            )}
            {card.history && card.history[0] && (
              <MenuItem onClick={viewHistory}>
                View {card.name}'s History
              </MenuItem>
            )}
            {card.new && <MenuItem onClick={addHistory}>Add History</MenuItem>}
          </Menu>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            {card.id}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textPrimary" variant="body1" noWrap>
            <FieldShortner text={card.name} amount={15} />
          </Typography>
        </TableCell>
        <TableCell>
          <FieldShortner text={card.gender} amount={8} />
        </TableCell>
        <TableCell>
          <FieldShortner text={card.age} amount={3} />
        </TableCell>
        <TableCell>
          <FieldShortner text={card.phone} amount={15} />
        </TableCell>
        <TableCell>
          <Chip
            className={clsx({
              [classes.valid]: card.valid,
              [classes.expired]: !card.valid
            })}
            label={card.valid ? 'Valid Card' : 'Card Expired'}
          />
        </TableCell>
        <TableCell>{format(Number(card.created_at), 'dd/MM/yyyy')}</TableCell>
      </TableRow>
    </>
  );
};
export default SingleRow;
