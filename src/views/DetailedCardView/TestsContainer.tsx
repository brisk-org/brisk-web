import React from 'react';
import {
  Theme,
  Card,
  CardHeader,
  Divider,
  CardContent,
  List
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { WindowOutlined } from '@mui/icons-material';
import { createStyles } from '@mui/styles';
import { TestsFromCardQuery } from '../../@types/Cards';
import SingleDetailedTest from './SingleDetailedTest';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    list: {
      display: 'none'
    },
    header: {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      '& .MuiCardHeader-avatar': {
        display: 'flex'
      }
    },
    sticky: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300
    },
    listSection: {
      backgroundColor: 'inherit'
    },
    iconButton: {
      marginLeft: '20px'
    },

    ul: {
      backgroundColor: 'inherit',
      padding: 0
    }
  })
);

interface TestsContainerProps {
  name: string;
  tests: TestsFromCardQuery[];
}
const TestsContainer: React.FC<TestsContainerProps> = ({ name, tests }) => {
  const classes = useStyles();

  // Helps while Sorting
  const mutableTests = [...tests];
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<WindowOutlined />}
        title={`All ${name}'s Laboratory Report`}
      />
      <Divider />
      <CardContent>
        <List>
          {mutableTests
            .sort((a, b) => parseInt(b.id) - parseInt(a.id))
            .map((test, index) => (
              <SingleDetailedTest key={index} test={test} />
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TestsContainer;
