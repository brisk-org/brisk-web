import React, { useContext } from 'react';
import { Container, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from '../../../components/Page';
import { AuthContext } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import HistoryForm from './HistoryForm';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CardFormView = () => {
  const classes = useStyles();

  const query = new URLSearchParams(useLocation().search);
  const { occupation } = useContext(AuthContext);
  const history = query.get('history') === 'true';

  return (
    <Page title="Add Card">
      <Container className={classes.root} maxWidth="lg">
        {!history ? (
          <ProfileForm />
        ) : (
          occupation === 'DOCTOR' && <HistoryForm />
        )}
        <Divider />
      </Container>
    </Page>
  );
};

export default CardFormView;
