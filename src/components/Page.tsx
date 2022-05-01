import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    minHeight: '95vh'
  }
}));

const Page: React.FC<any> = forwardRef(
  (
    { children, title = '' },
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const classes = useStyles();
    return (
      <div ref={ref} className={classes.root}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
