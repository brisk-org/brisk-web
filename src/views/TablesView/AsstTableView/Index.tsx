import React, { useEffect, useRef, useState } from 'react';

import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistoryAsstQuery } from '../../../generated/graphql';
import { useReactToPrint } from 'react-to-print';

import SingleRow from './SingleRow';
import { format, endOfWeek, startOfWeek, add, sub } from 'date-fns';
import { HistoryType } from '../../../@types/History';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    margin: '50px auto'
  },
  toolBar: {
    width: '80%',
    margin: '15px auto',
    display: 'flex',
    justifyContent: 'space-around'
  },
  table: {
    minWidth: 650
  },
  tableHead: {
    fontSize: '26px'
  }
}));

const AsstTableView = () => {
  const classes = useStyles();
  const table = useRef(null);

  const [histories, setHistories] = useState<HistoryType[]>();
  const [date, setDate] = useState({
    startingDay: startOfWeek(new Date()).toISOString(),
    endingDay: endOfWeek(new Date()).toISOString()
  });

  const { data } = useHistoryAsstQuery({
    variables: {
      startingDate: date.startingDay,
      endingDate: date.endingDay
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
    const filteredData = data.weeklyHistory.filter(
      history => JSON.parse(history.result).asst
    );

    setHistories(filteredData);
  }, [data, date]);
  const handlePrint = useReactToPrint({
    content: () => table.current
  });
  const handleDateChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = event => {
    if (!event.target.value) {
      setDate({
        startingDay: startOfWeek(new Date()).toISOString(),
        endingDay: endOfWeek(new Date()).toISOString()
      });
      return;
    }
    setDate(date => ({
      ...date,
      [event.target.name]: add(new Date(event.target.value), {
        days: 1
      }).toISOString()
    }));
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Box px={2} mb={2}>
        <Typography variant="h4">Asst History</Typography>
        <Typography gutterBottom variant="body2">
          Filter Between Dates
        </Typography>
        <Divider />
      </Box>
      <Box className={classes.toolBar}>
        <input
          type="date"
          onChange={handleDateChange}
          name="startingDay"
          value={format(new Date(date.startingDay), 'yyyy-MM-dd')}
          max={format(sub(new Date(date.endingDay), { days: 1 }), 'yyyy-MM-dd')}
          defaultValue={format(new Date(date.startingDay), 'yyyy-MM-dd')}
        />
        <input
          type="date"
          onChange={handleDateChange}
          name="endingDay"
          value={format(new Date(date.endingDay), 'yyyy-MM-dd')}
          max={format(new Date(), 'yyyy-MM-dd')}
          min={format(
            add(new Date(date.startingDay), { days: 1 }),
            'yyyy-MM-dd'
          )}
        />
      </Box>
      <Table ref={table} className={classes.table} size="small">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Id</Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography variant="h6">Age</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Asst</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Issued At</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {histories &&
            histories.map(history => <SingleRow history={history} />)}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button onClick={handlePrint} color="primary" variant="contained">
          Print
        </Button>
      </Box>
    </TableContainer>
  );
};
export default AsstTableView;
