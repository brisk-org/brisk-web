import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Popover,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AuthContext } from '../../context/AuthContext';
import {
  Menu,
  NotificationsOutlined,
  Input,
  DeleteOutlined
} from '@mui/icons-material';
import Logo from '../../components/Logo';
import { NotificationContext } from '../../context/NotificationContext';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.paper
  },
  list: {
    // minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  popover: {},
  loneType: {
    padding: theme.spacing(3)
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar: React.FC<{ onMobileNavOpen: () => void }> = ({
  onMobileNavOpen
}) => {
  const classes = useStyles();

  const { logout: contextLogout } = useContext(AuthContext);
  const {
    count,
    notifications,
    handleClearNotifications,
    handleDeleteNotification
  } = useContext(NotificationContext);

  const history = useHistory();

  // useEffect(() => {
  //   console.log(notifications);
  // }, [notifications]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleNotiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logout:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = event => {
    contextLogout();
    history.push('/login');
  };
  return (
    <AppBar className={clsx(classes.root)} elevation={0}>
      <Toolbar>
        <Logo type="company" />
        <Box flexGrow={1} />
        <IconButton onClick={handleNotiClick} size="large">
          <Badge badgeContent={count} color="secondary" variant="standard">
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.popover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {count === 0 ? (
            <Typography className={classes.loneType}>
              You are all Clear!
            </Typography>
          ) : (
            <List className={classes.list}>
              {notifications.map(({ id, desc, action }, index) => {
                return (
                  <ListItem
                    style={{ borderTop: index !== 0 ? '1px solid gray' : '' }}
                    key={index}
                  >
                    <ListItemText
                      primary={desc}
                      secondary={action}
                      style={{
                        minWidth: 300,
                        marginRight: 25
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => handleDeleteNotification(id)}
                        edge="end"
                        aria-label="delete"
                        size="large"
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </ListItemSecondaryAction>
                    <Divider />
                  </ListItem>
                );
              })}
              {count && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: 'auto' }}
                  onClick={() => handleClearNotifications()}
                >
                  Clear All Notifications
                </Button>
              )}
            </List>
          )}
        </Popover>
        <Hidden lgDown>
          <IconButton onClick={logout} size="large">
            <Input />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton onClick={onMobileNavOpen} size="large">
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
