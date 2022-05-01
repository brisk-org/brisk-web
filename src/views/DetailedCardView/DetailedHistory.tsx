import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Maybe } from '../../generated/graphql';

interface DetailedHistoryProps {
  data: {
    cc: Maybe<string> | undefined;
    hpu: Maybe<string> | undefined;
    rx: Maybe<string> | undefined;
    other: Maybe<string> | undefined;
  };
}

const DetailedHistory: React.FC<DetailedHistoryProps> = ({
  data: { cc, hpu, rx, other }
}) => {
  return (
    <>
      <Box my="15px">
        <Typography variant="body2" color="textSecondary">
          c/C
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {cc}
        </Typography>
      </Box>
      <Divider />
      <Box my="15px">
        <Typography variant="body2" color="textSecondary">
          HPU
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {hpu}
        </Typography>
      </Box>
      <Divider />
      <Box my="15px">
        <Typography variant="body2" color="textSecondary">
          Rx
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {rx}
        </Typography>
      </Box>
      <Divider />
      {other && (
        <Box mt="15px">
          <Typography variant="body2" color="textSecondary">
            Other
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {other}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default DetailedHistory;
