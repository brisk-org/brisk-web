import React from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';

import { CardQuery } from '../../generated/graphql';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PrintHeader from '../../components/PrintHeader';
const useStyle = makeStyles(theme =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  })
);
interface Props {
  laboratoryExamination: NonNullable<
    CardQuery['card']['laboratoryExaminations']
  >[0];
  componentToBePrinted: React.RefObject<HTMLDivElement>;
  onPrint: boolean;
}
const SingleLaboratoryTestCategory: React.FC<Props> = ({
  laboratoryExamination,
  componentToBePrinted,
  onPrint
}) => {
  const classes = useStyle();
  console.log(onPrint);
  return (
    <div ref={componentToBePrinted}>
      <Box sx={{ width: '100%' }}>{onPrint && <PrintHeader />}</Box>
      <div className={clsx({ [classes.root]: onPrint })}>
        {/* {laboratoryExamination.map((category, index) => (
          <List key={index}>
            <ListSubheader sx={{}}>{category.name}</ListSubheader>
            {category.tests.map((test, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${test.name}: ${test.value || 'uncompleted'} `}
                  secondary={
                    test.normalValue && `Normal value: ${test.normalValue}`
                  }
                />
              </ListItem>
            ))}
          </List>
        ))} */}
      </div>
    </div>
  );
};

export default SingleLaboratoryTestCategory;
