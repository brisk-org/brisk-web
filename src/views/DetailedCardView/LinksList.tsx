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
import { useDeleteCardMutation } from '../../generated/graphql';
import { FullCardType } from '../../@types/Cards';

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
  card: FullCardType;
}
const LinksList: React.FC<LinksListProps> = ({ card }) => {
  const classes = useStyles();

  const [dialogToggle, setDialogToggle] = useState(false);
  const [proceedToAction, setProceedToAction] = useState(false);

  const history = useHistory();
  const [deleteCard] = useDeleteCardMutation({
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (!proceedToAction) return;
    deleteCard({ variables: { id: card.id } });
    history.push('/app/data/card');
    setProceedToAction(false);
  }, [proceedToAction]);

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
            onClick={() => setDialogToggle(true)}
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
        dialogText={`Do you really want To delete the Card for ${card.name}`}
        state={{ dialogToggle, setDialogToggle, setProceedToAction }}
      />
    </>
  );
};

export default LinksList;
