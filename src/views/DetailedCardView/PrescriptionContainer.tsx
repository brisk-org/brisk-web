import React from 'react';
import {
  Theme,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { WindowOutlined } from '@mui/icons-material';
import { createStyles } from '@mui/styles';
import SingleDetailedPrescription from './SingleDetailedPrescription';
import { CardQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 50
    },
    header: {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      '& .MuiCardHeader-avatar': {
        display: 'flex'
      }
    },
    sticky: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300
    },
    listSection: {
      backgroundColor: 'inherit'
    },
    iconButton: {
      marginLeft: '20px'
    },

    ul: {
      backgroundColor: 'inherit',
      padding: 0
    }
  })
);

interface Props {
  cardName: string;
  prescriptions: NonNullable<CardQuery['card']['prescriptions']>;
}
const PrescriptionContainer: React.FC<Props> = ({
  cardName,
  prescriptions
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<WindowOutlined />}
        title={`All ${cardName}'s Prescriptions`}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          {[...prescriptions]
            .sort((a, b) => parseInt(b.created_at) - parseInt(a.created_at))
            .map((prescription, index) => (
              <SingleDetailedPrescription
                key={index}
                prescription={prescription}
              />
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PrescriptionContainer;
