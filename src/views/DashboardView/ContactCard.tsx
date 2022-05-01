import React from 'react';
import { Card, Typography, Button } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    position: 'relative',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  lowerCase: {
    textTransform: 'lowercase'
  }
}));

const ContactCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <img src="/images/contact.svg" alt="contact" />
      <Typography variant="body1" color="textSecondary" gutterBottom>
        If you have <b>any</b> ideas <br /> feel free to Share
      </Typography>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = 'tel:0923274198')}
      >
        Call The Developer
      </Button>
      <Button
        className={classes.lowerCase}
        size="small"
        color="secondary"
        onClick={() => (window.location.href = 'mailto:kranz.aklilu@gmail.com')}
      >
        kranz.aklilu@gmail.com
      </Button>
    </Card>
  );
};

export default ContactCard;
