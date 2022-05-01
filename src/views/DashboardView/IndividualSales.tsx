import React from 'react';
import { Grid, Box, IconButton, Typography, colors } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  AcUnit,
  AirlineSeatFlatAngled,
  AllOut,
  BarChart,
  EuroSymbol,
  NewReleases
} from '@mui/icons-material';
import { SalesType } from './SalesContainer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainTypos: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  btn: {
    display: 'inline-block',
    width: '70%',
    margin: '20px auto',
    textTransform: 'capitalize',
    fontSize: '16px'
  },
  chart: {
    height: 270
  },
  balanceItems: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}));

interface IndividualSalesProps {
  sales: SalesType;
}
const IndividualSales: React.FC<IndividualSalesProps> = ({
  sales: { amount, name, label }
}) => {
  const classes = useStyles();

  return (
    <Grid item md={3} xs={12}>
      <Box className={classes.balanceItems}>
        {name === 'card' && (
          <IconButton style={{ color: colors.indigo['400'] }} size="large">
            <BarChart fontSize="large" />
          </IconButton>
        )}
        {name === 'test' && (
          <IconButton style={{ color: colors.green['300'] }} size="large">
            <AllOut fontSize="large" />
          </IconButton>
        )}
        {name === 'prescription' && (
          <IconButton style={{ color: colors.orange['500'] }} size="large">
            <AirlineSeatFlatAngled fontSize="large" />
          </IconButton>
        )}
        {name === 'quickPrescription' && (
          <IconButton style={{ color: colors.teal['200'] }} size="large">
            <NewReleases fontSize="large" />
          </IconButton>
        )}
        {name === 'quickLabTest' && (
          <IconButton style={{ color: colors.deepPurple['200'] }} size="large">
            <AcUnit fontSize="large" />
          </IconButton>
        )}
        <Typography variant="body2" className={classes.mainTypos}>
          {label}
          <Typography variant="h4" color="textSecondary">
            <EuroSymbol fontSize="small" />
            {amount}
          </Typography>
        </Typography>
      </Box>
    </Grid>
  );
};

export default IndividualSales;
