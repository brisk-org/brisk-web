import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import NavItem from './NavItem';
import { AuthContext } from '../../../context/AuthContext';
import { useRoutes } from '../../../routes';
const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default
  },
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

interface NavBarI {
  onMobileClose: () => void;
  openMobile: boolean;
}

const NavBar: React.FC<NavBarI> = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { username, occupation, logout } = useContext(AuthContext);
  const history = useHistory();
  const routes = useRoutes();

  const user = {
    avatar: '/images/logo.jpg',
    name: username,
    jobTitle: `Newlife ${occupation}`
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const handleLogout:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    logout();
    history.push('/login');
  };

  const content = (
    <Box
      className={classes.root}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {routes.map((route, index) => {
            if (!route.label || !route.icon) return null;
            if (
              route.linkOccupation?.find(linkOccup => linkOccup === occupation)
            ) {
              return (
                <NavItem
                  key={index}
                  href={route.path}
                  label={route.label}
                  icon={route.icon}
                />
              );
            }
            if (
              !route.linkOccupation &&
              route.routeOccupation.find(
                routeOccup => routeOccup === occupation
              )
            ) {
              return (
                <NavItem
                  key={index}
                  href={route.path}
                  label={route.label}
                  icon={route.icon}
                />
              );
            }
          })}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2} m={2} bgcolor="background.dark">
        <Typography align="center" gutterBottom variant="h4">
          Need more?
        </Typography>
        <Typography align="center" variant="body2">
          Contact the WebMaster
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography align="center" variant="body2">
            0923274198
          </Typography>
        </Box>
      </Box>
      <Hidden lgUp>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Hidden>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};
export default NavBar;
