import React from 'react';

import { Avatar, Box, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCont: {
    textAlign: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: '50%'
  },
  small: {
    fontSize: 10
  }
}));

const PrintHeader = function() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar className={classes.logo} alt="Logo" src="/images/logo.jpg" />
      <Box className={classes.textCont}>
        <Typography variant="h3">New life Medium Clinic PLC</Typography>
        <Typography className={classes.small} variant="subtitle1">
          +251925959219/+251913718524 Addis Ababa Ethiopia
        </Typography>

        <Typography className={classes.small} variant="subtitle1">
          www.newlifemediumclinic.com
        </Typography>
      </Box>
    </Box>
  );
};
export default PrintHeader;
