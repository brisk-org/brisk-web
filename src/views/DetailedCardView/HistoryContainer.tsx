import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import { DeleteOutline, EditOutlined, GraphicEq } from '@mui/icons-material';

import { CardQuery, useDeleteHistoryMutation } from '../../generated/graphql';
import VSHistory from './VSHistory';
import GeneralDetails from './GeneralDetails';
import OrganHistory from './OrganHistory';
import DetailedHistory from './DetailedHistory';
import { format } from 'date-fns';
import AlertDialog from '../../components/AlertDialog';
import { editHistoryQuery } from '../../constants/queries';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 50
  },
  option: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  header: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '& .MuiCardHeader-avatar': {
      display: 'flex'
    }
  },
  grid: {
    margin: '15px 0',
    '& > *': {
      borderLeft: '1px solid',
      borderColor: theme.palette.grey[300]
    },
    '& :nth-child(1)': {
      border: 'none'
    }
  }
}));

interface HistoryContainerProps {
  history: NonNullable<CardQuery['card']['history']>;
}

const HistoryContainer: React.FC<HistoryContainerProps> = ({ history }) => {
  const classes = useStyles();

  const [viewedHistoryIndex, setViewedHistoryIndex] = useState(
    history.length - 1
  );
  const [dialogToggle, setDialogToggle] = useState(false);
  const [proceedToAction, setProceedToAction] = useState(false);

  const result = JSON.parse(history[viewedHistoryIndex].result);
  const vsHistoryProps = {
    bp: result.bp,
    temp: result.temp,
    spo2: result.spo2,
    plus: result.plus,
    rr: result.rr,
    weight: result.weight
  };
  const organProps = {
    heent: result.heent,
    chest: result.chest,
    cvs: result.cvs,
    abd: result.abd
  };
  const generalProps = {
    ga: result.ga,
    asst: result.asst
  };
  const detailedProps = {
    cc: result.cc,
    hpu: result.hpi,
    rx: result.rx,
    other: result.other
  };

  const locationHistory = useHistory();
  const [deleteCard] = useDeleteHistoryMutation({
    onError: err => console.log(err)
  });

  useEffect(() => {
    if (!proceedToAction) return;
    deleteCard({ variables: { id: history[viewedHistoryIndex].id } });
    locationHistory.push('/app/cards');
    setProceedToAction(false);
  }, [proceedToAction]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedHistory = history.find(
      history => history.created_at === event.target.value
    );
    const index = history.indexOf(selectedHistory!);
    setViewedHistoryIndex(index);
  };
  const handleEdit = () => {
    history[viewedHistoryIndex] &&
      locationHistory.push(
        editHistoryQuery({
          ...history[viewedHistoryIndex],
          id: `${history[viewedHistoryIndex].cardId}`,
          historyId: history[viewedHistoryIndex].id
        })
      );
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<GraphicEq fontSize="small" />}
        title={<Typography>Patient History</Typography>}
        action={
          <Select
            fullWidth
            onChange={handleChange}
            value={history[viewedHistoryIndex].created_at}
            color="secondary"
          >
            {history.map((history, index) => (
              <MenuItem
                className={classes.option}
                key={index}
                value={history.created_at}
              >
                {format(Number(history.created_at), 'MM/dd/yyyy')}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <CardContent>
        <Grid className={classes.grid} container spacing={3}>
          <VSHistory data={vsHistoryProps} />
        </Grid>
        <Divider />
        <Grid className={classes.grid} container spacing={3}>
          <OrganHistory data={organProps} />
        </Grid>
        <Divider />
        <Grid
          className={classes.grid}
          container
          spacing={3}
          alignItems="center"
        >
          <GeneralDetails data={generalProps} />
        </Grid>
        <Divider />
        <DetailedHistory data={detailedProps} />
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<EditOutlined />}
          onClick={handleEdit}
          variant="contained"
          style={{ marginRight: 5 }}
        >
          Edit History
        </Button>
        <Button
          color="secondary"
          endIcon={<DeleteOutline />}
          onClick={() => setDialogToggle(true)}
        >
          Delete History
        </Button>
      </Box>
      <AlertDialog
        dialogText={`Do you really want To delete History #${history[viewedHistoryIndex].id}`}
        state={{ dialogToggle, setDialogToggle, setProceedToAction }}
      />
    </Card>
  );
};

export default HistoryContainer;
