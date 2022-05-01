import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Maybe } from '../../generated/graphql';

interface OrganHistoryProps {
  data: {
    heent: Maybe<string> | undefined;
    chest: Maybe<string> | undefined;
    cvs: Maybe<string> | undefined;
    abd: Maybe<string> | undefined;
  };
}
const OrganHistory: React.FC<OrganHistoryProps> = ({
  data: { heent, chest, cvs, abd }
}) => {
  return (
    <>
      <Grid item md={6} xs={12}>
        <Typography variant="subtitle2" color="textSecondary">
          HEENT
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {heent}
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="subtitle2" color="textSecondary">
          Chest
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {chest}
        </Typography>
      </Grid>
      <Grid item md={6} xs={12} style={{ border: 'none' }}>
        <Typography variant="subtitle2" color="textSecondary">
          CVS
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {cvs}
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="subtitle2" color="textSecondary">
          Abd
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary">
          {abd}
        </Typography>
      </Grid>
    </>
  );
};

export default OrganHistory;
