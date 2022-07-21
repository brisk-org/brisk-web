import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Maybe } from '../../generated/graphql';

interface VSHistoryProps {
  data: {
    bp: Maybe<string> | undefined;
    temp: Maybe<string> | undefined;
    spo2: Maybe<string> | undefined;
    plus: Maybe<string> | undefined;
    rr: Maybe<string> | undefined;
    weight: Maybe<string> | undefined;
  };
}
const VSHistory: React.FC<VSHistoryProps> = ({
  data: { bp, temp, spo2, plus, rr, weight }
}) => {
  return (
    <>
      <Grid item md={3} sm={6} xs={12}>
        <Typography variant="body2" color="textSecondary">
          BP <Typography variant="caption">(MMHG)</Typography>
        </Typography>
        <Typography variant="h4" color="primary">
          {bp?.replace('MMHG', ' ')}
          <Typography variant="h4" color="primary">
            {/* (MMHG) */}
          </Typography>
        </Typography>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Typography variant="body2" color="textSecondary">
          T &#186;
        </Typography>
        <Typography variant="h4" color="primary">
          {temp}
        </Typography>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Typography variant="body2" color="textSecondary">
          SPO2%
        </Typography>
        <Typography variant="h4" color="primary">
          {spo2}
        </Typography>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Typography variant="body2" color="textSecondary">
          Plus
        </Typography>
        <Typography variant="h4" color="primary">
          {plus}
        </Typography>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Typography variant="body2" color="textSecondary">
          R/R
        </Typography>
        <Typography variant="h4" color="primary">
          {rr}
        </Typography>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Typography variant="body2" color="textSecondary">
          Weight
        </Typography>
        <Typography variant="h4" color="primary">
          {weight}
        </Typography>
      </Grid>
    </>
  );
};
export default VSHistory;
