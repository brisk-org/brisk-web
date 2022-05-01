import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import TopBar from './TopBar';
import LoginView from '../../views/AuthView/LoginView';
import { Switch, Route } from 'react-router-dom';
import OnboardingView from '../../views/OnboardingView';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100vh',
    overflow: 'auto'
  }
}));

const MainLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/onboarding" component={OnboardingView} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
