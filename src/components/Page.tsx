import React, { forwardRef, ReactChildren } from 'react';
import { Helmet } from 'react-helmet';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    minHeight: '95vh'
  }
}));

// eslint-disable-next-line react/display-name
const Page: React.FC<any> = forwardRef(
  (
    { children, title = '' }: any,
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
