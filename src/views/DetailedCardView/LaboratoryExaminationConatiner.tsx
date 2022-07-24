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
import LaboratoryExaminationItem from './LaboratoryExaminationItem';
import { CardQuery } from '../../generated/graphql';

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

interface Props {
  cardName: string;
  cardAge: string;
  cardGender: string;
  laboratoryExaminations: NonNullable<
    CardQuery['card']['laboratoryExaminations']
  >;
}
const LaboratoryExaminationConatiner: React.FC<Props> = ({
  cardName,
  cardAge,
  cardGender,
  laboratoryExaminations
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<WindowOutlined />}
        title={`All ${cardName}'s Laboratory Report`}
      />
      <Divider />
      <CardContent>
        <List>
          {[...laboratoryExaminations]
            .sort((a, b) => parseInt(b.id) - parseInt(a.id))
            .map((laboratoryExamination, index) => (
              <LaboratoryExaminationItem
                key={index}
                cardName={cardName}
                cardAge={cardAge}
                cardGender={cardGender}
                laboratoryExaminations={laboratoryExamination}
              />
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LaboratoryExaminationConatiner;
