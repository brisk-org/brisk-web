import React from 'react';

import { Box, Typography, colors, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import { format } from 'date-fns';
import { User } from '.';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  section: {
    marginTop: 25
  },
  avatarChip: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    alignSelf: 'flex-start',
    padding: '0px 2px',
    margin: '10px'
  },
  textArea: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px 10px'
  },
  typeCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  input: {
    textDecoration: 'underline'
  },
  iconButton: {
    marginLeft: '20px'
  },
  female: {
    backgroundColor: colors.red[600]
  },
  male: {
    backgroundColor: colors.green[600]
  },
  danger: {
    color: colors.red[600]
  }
}));

interface ProfileI {
  user: User;
}

const PrintTemplate: React.FC<ProfileI> = ({ user }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} px={5}>
      <Box width="100%" className={classes.spaceBetween}>
        <Typography color="textPrimary" gutterBottom variant="h4">
          {user.card_no}
        </Typography>
        <Box className={classes.spaceBetween}>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Card NO: {''}
            <Typography color="textPrimary" variant="h5">
              {user.card_no}
            </Typography>
          </Typography>
          <Typography color="textPrimary" gutterBottom variant="h4">
            Date: {''}
            <Typography color="textPrimary" variant="h5">
              {format(new Date(), 'MM/dd/yyyy')}
            </Typography>
          </Typography>
        </Box>
      </Box>

      <Grid className={classes.section} container spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography
            className={classes.typeCont}
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Name: {''}
            <Typography
              className={classes.input}
              color="textPrimary"
              variant="h5"
            >
              {user.name}
            </Typography>
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography
            className={classes.typeCont}
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Sex: {''}
            <Typography
              className={classes.input}
              color="textPrimary"
              variant="h5"
            >
              {user.gender}
            </Typography>
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography
            className={classes.typeCont}
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Age: {''}
            <Typography
              className={classes.input}
              color="textPrimary"
              variant="h5"
            >
              {user.age}
            </Typography>
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography
            className={classes.typeCont}
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            LMP: {''}
            <Typography
              className={classes.input}
              color="textPrimary"
              variant="h5"
            >
              {user.lmp}
            </Typography>
          </Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <Typography
            className={classes.typeCont}
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            LMP: {''}
            <Typography
              className={classes.input}
              color="textPrimary"
              variant="h5"
            >
              {user.lmp}
            </Typography>
          </Typography>
        </Grid>
      </Grid>

      <Typography color="textPrimary" gutterBottom variant="h4">
        Name:
        <Typography color="textSecondary" display="inline" variant="h4">
          {user.name}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        Age:
        <Typography color="textSecondary" display="inline">
          {user.age}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        Gender:
        <Typography color="textSecondary" display="inline">
          {user.gender}
        </Typography>
      </Typography>

      <Typography color="textPrimary" variant="body1" gutterBottom>
        Phone:
        <Typography color="textSecondary" display="inline">
          {user.clinical_note}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        Adress:
        <Typography color="textSecondary" display="inline">
          {/* {user.address} */}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        House No:
        <Typography color="textSecondary" display="inline">
          {/* {user.house_no} */}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        Kifle Ketema:
        <Typography color="textSecondary" display="inline">
          {/* {user.k_ketema} */}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        Kebele:
        <Typography color="textSecondary" display="inline">
          {/* {user.kebele} */}
        </Typography>
      </Typography>
      <Typography color="textPrimary" variant="body1" gutterBottom>
        Date:
        <Typography color="textSecondary" display="inline">
          {/* {moment().fromNow(false)} */}
        </Typography>
      </Typography>
    </Box>
  );
};

export default PrintTemplate;
