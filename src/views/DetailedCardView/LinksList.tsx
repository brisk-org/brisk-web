import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useHistory } from 'react-router-dom';
import {
  medicalCertificateQuery,
  prescribeQuery,
  requestTestQuery,
  editCardQuery
} from '../../constants/queries';
import AlertDialog from '../../components/AlertDialog';
import { CardQuery, useDeleteCardMutation } from '../../generated/graphql';

const useStyles = makeStyles(theme => ({
  btn: {
    display: 'inline-block',
    width: '100%',
    margin: '3px 5px',
    textTransform: 'capitalize',
    '& > *': {
      textTransform: 'capitalize'
    }
  }
}));

interface LinksListProps {
  card: CardQuery['card'];
}
const LinksList: React.FC<LinksListProps> = ({ card }) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const history = useHistory();
  const [deleteCard] = useDeleteCardMutation({
    onError: err => console.log(err)
  });

  const handleDeleteCard = async () => {
    await deleteCard({ variables: { id: card.id } });
    history.push('/app/data/card');
  };

  return (
    <>
      <Box>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          Mutate Card
        </Typography>
        <Box
          width="100%"
          mt="10px"
          display="flex"
          justifyContent="space-evenly"
        >
          <Link className={classes.btn} to={editCardQuery({ ...card })}>
            <Button fullWidth variant="contained" color="primary" size="small">
              Edit Card Profile
            </Button>
          </Link>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setDialogOpen(true)}
          >
            Delete Card
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          Request Test
        </Typography>
        <Box mt="10px">
          <Link
            className={classes.btn}
            to={requestTestQuery({ id: card.id, name: card.name })}
          >
            <Button variant="contained" color="primary" fullWidth size="small">
              Laboratory
            </Button>
          </Link>
          <Link
            className={classes.btn}
            to={prescribeQuery({
              id: card.id,
              name: card.name,
              gender: card.gender,
              age: card.age
            })}
          >
            <Button variant="contained" color="primary" fullWidth size="small">
              Prescription
            </Button>
          </Link>
          <Link
            className={classes.btn}
            to={medicalCertificateQuery(
              card.id,
              card.name,
              card.gender,
              card.age
            )}
          >
            <Button variant="contained" color="primary" fullWidth size="small">
              Medication
            </Button>
          </Link>
        </Box>
      </Box>
      <AlertDialog
        title="Are you sure?"
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleConfirm={handleDeleteCard}
      >
        Do you really want To delete the Card for ${card.name}
      </AlertDialog>
    </>
  );
};

export default LinksList;
