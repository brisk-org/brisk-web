import React, { useState, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { AuthContext } from '../../context/AuthContext';

import { Switch, Route } from 'react-router-dom';
import { useRoutes } from '../../routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));
const DashboardLayout: React.FC = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const routes = useRoutes();

  const { occupation } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              {routes.map(route => {
                const occupationMatches = route.routeOccupation.find(
                  routeOccupation => routeOccupation === occupation
                );
                return (
                  // occupationMatches && (
                  <Route exact path={route.path} component={route.component} />
                  // )
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
