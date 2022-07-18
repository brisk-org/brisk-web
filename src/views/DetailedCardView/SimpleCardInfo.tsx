import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CardQuery } from '../../generated/graphql';
import { InfoOutlined } from '@mui/icons-material';
import LinksList from './LinksList';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 50
  },
  header: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '& .MuiCardHeader-avatar': {
      display: 'flex'
    }
  }
}));

interface SimpleCardInfoProps {
  card: NonNullable<CardQuery['card']>;
}

const SimpleCardInfo: React.FC<SimpleCardInfoProps> = ({card}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<InfoOutlined fontSize="small" />}
        title="Card Information"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Name
              </Typography>
              <Typography gutterBottom variant="body1" color="textPrimary">
                {card.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Gender
              </Typography>
              <Typography gutterBottom variant="body1" color="textPrimary">
                {card.gender}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Address
              </Typography>
              <Typography gutterBottom variant="body1" color="textPrimary">
                {card.address}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {card.phone}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6} sm={12}>
            <Box>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 14 }}
              >
                Age
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {card.age}
              </Typography>
            </Box>

            <Box>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Kebele
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {card.kebele}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Kefle Ketema
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {card.k_ketema}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="body2" color="textSecondary">
                House No
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {card.house_no}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <LinksList card={{ ...card }} />
      </CardContent>
    </Card>
  );
};

export default SimpleCardInfo;
