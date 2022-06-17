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

  const icons = [
    {
      name: 'card',
      icon: <BarChart fontSize="large" />,
      color: colors.indigo['400']
    },
    {
      name: 'test',
      icon: <AllOut fontSize="large" />,
      color: colors.green['300']
    },
    {
      name: 'prescription',
      icon: <AirlineSeatFlatAngled fontSize="large" />,
      color: colors.orange['500']
    },
    {
      name: 'quickPrescription',
      icon: <NewReleases fontSize="large" />,
      color: colors.teal['200']
    },
    {
      name: 'quickLabTest',
      icon: <AcUnit fontSize="large" />,
      color: colors.deepPurple['200']
    }
  ];

  return (
    <Grid item md={3} xs={12}>
      <Box className={classes.balanceItems}>
        {icons
          .filter(icon => icon.name === name)
          .map(({ color, icon }) => (
            <IconButton style={{ color }} size="large">
              {icon}
            </IconButton>
          ))}
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
