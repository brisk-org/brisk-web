import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Logo from '../../components/Logo';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: '7vh'
  }
});

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root)} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Logo type="brisk" />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
