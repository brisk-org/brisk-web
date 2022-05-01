import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { MoreHorizRounded } from '@mui/icons-material';
import { defaultTableHeads } from '../constants/tableHeads';

const useStyles = makeStyles(theme => ({
  root: {},
  headRow: {
    '& *': {
      borderLeft: `1px solid ${theme.palette.grey['600']}`,
      borderBottom: `1px solid ${theme.palette.grey['600']}`,
      textAlign: 'center'
    },
    '& :nth-child(1)': {
      borderLeft: 'none',
      marginLeft: 10,
      width: 20
    },
    '& :nth-child(2)': {
      minWidth: 30
    },
    '& :nth-child(3)': {
      width: 175
    },
    '& :nth-child(4)': {
      minWidth: 30
    },
    '& :nth-child(5)': {
      minWidth: 30
    },
    '& :nth-child(6)': {
      minWidth: 60
    },
    '& :nth-child(7)': {
      minWidth: 40,
      width: 50
    }
  }
}));

interface MainContainerTableProps {
  tableHead?: string[];
  count?: number;
  skipState: {
    skip: number;
    setSkip: React.Dispatch<React.SetStateAction<number>>;
  };
  takeState: {
    take: number;
    setTake: React.Dispatch<React.SetStateAction<number>>;
  };
}

const MainContainerTable: React.FC<MainContainerTableProps> = ({
  tableHead = defaultTableHeads,
  count,
  skipState: { skip, setSkip },
  takeState: { take, setTake },
  children
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);

  const handleLimitChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = event => {
    setTake(Number(event.target.value));
  };

  const handlePageChange = (_: any, newPage: number) => {
    setPage(newPage);
  };
  const handleLable = ({ from, to }: any) => {
    setSkip(from - 1);
    return `${from} -${skip + take}`;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className={clsx(classes.root)}>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow className={classes.headRow}>
                  <TableCell>
                    <MoreHorizRounded />
                  </TableCell>
                  {tableHead.map((title, index) => (
                    <TableCell key={index}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{children}</TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={count || 0}
            labelDisplayedRows={handleLable}
            onRowsPerPageChange={handleLimitChange}
            onPageChange={handlePageChange}
            page={page}
            rowsPerPage={take}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default MainContainerTable;
