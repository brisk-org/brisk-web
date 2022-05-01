import React from 'react';
import clsx from 'clsx';
import { Maybe } from '../../generated/graphql';

import { Grid, Typography, Box, colors } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentVeryDissatisfied
} from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
  success: {
    color: theme.palette.success.main
  },
  warning: {
    color: colors.yellow['900']
  },
  error: {
    color: theme.palette.error.main
  }
}));

interface GeneralDetailsProps {
  data: {
    ga: Maybe<string> | undefined;
    asst: Maybe<string> | undefined;
  };
}
const GeneralDetails: React.FC<GeneralDetailsProps> = ({
  data: { ga, asst }
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={4} xs={12}>
        <Typography variant="subtitle2" color="textSecondary">
          G/A
        </Typography>
        {ga === 'good' && (
          <Box className={clsx(classes.success)} display="flex">
            <SentimentSatisfied fontSize="small" />
            <Typography
              variant="body2"
              color="inherit"
              style={{ marginLeft: 10 }}
            >
              Good looking
            </Typography>
          </Box>
        )}
        {ga === 'acute' && (
          <Box className={clsx(classes.warning)} display="flex">
            <SentimentDissatisfied fontSize="small" />
            <Typography
              variant="body2"
              color="inherit"
              style={{ marginLeft: 10 }}
            >
              Acutely sick looking
            </Typography>
          </Box>
        )}
        {ga === 'chronical' && (
          <Box className={clsx(classes.error)} display="flex">
            <SentimentVeryDissatisfied fontSize="small" />
            <Typography
              variant="body2"
              color="inherit"
              style={{ marginLeft: 10 }}
            >
              Chronically sick looking
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="subtitle2" color="textSecondary">
          Asst
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {asst}
        </Typography>
      </Grid>
    </>
  );
};

export default GeneralDetails;
