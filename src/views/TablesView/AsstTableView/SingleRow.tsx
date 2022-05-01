import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { HistoryType } from '../../../@types/History';
import { format } from 'date-fns';

const SingleRow: React.FC<{ history: HistoryType }> = ({ history }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {history.card.id}
      </TableCell>
      <TableCell align="center">{history.card.name}</TableCell>
      <TableCell align="center">{history.card.age}</TableCell>
      <TableCell align="center">{JSON.parse(history.result).asst}</TableCell>
      <TableCell align="right">
        {format(Number(history.created_at), 'dd/MM/yyyy')}
      </TableCell>
    </TableRow>
  );
};
export default SingleRow;
