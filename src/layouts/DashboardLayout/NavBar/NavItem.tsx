import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button, ListItem, SvgIconTypeMap } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  label: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItem: React.FC<{
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  label: string;
}> = ({ href, icon: Icon, label }) => {
  const classes = useStyles();

  return (
    <ListItem className={clsx(classes.item)} disableGutters>
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        exact
        to={href}
      >
        {Icon && <Icon className={classes.icon} />}
        <span className={classes.label}>{label}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
