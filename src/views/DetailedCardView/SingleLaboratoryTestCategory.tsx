import React from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import { TestsFromCardQuery } from '../../@types/Cards';

import { categories, PlaceholderTestType } from '../../data/testsPlaceHolder';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PrintHeader from '../../components/PrintHeader';
import { LaboratoryTestCatagories } from '../../data/testsSeed';
const useStyle = makeStyles(theme =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  })
);
interface Props {
  test: TestsFromCardQuery;
  componentToBePrinted: React.RefObject<HTMLDivElement>;
  onPrint: boolean;
}
const SingleLaboratoryTestCategory: React.FC<Props> = ({
  test,
  componentToBePrinted,
  onPrint
}) => {
  const classes = useStyle();
  console.log(onPrint);
  const labCategories = JSON.parse(test.result) as LaboratoryTestCatagories[];
  return (
    <div ref={componentToBePrinted}>
      <Box sx={{ width: '100%' }}>{onPrint && <PrintHeader />}</Box>
      <div className={clsx({ [classes.root]: onPrint })}>
        {labCategories.map((category, index) => (
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
        ))}
        {/* {Object.keys(categories)
          .map((name, index) => (
            <ul key={index}>
              {(JSON.parse(test.result) as PlaceholderTestType[]).find(
                test => test.category === name
              ) && (
                <ListSubheader style={{ background: 'white', padding: 0 }}>
                  {name}
                </ListSubheader>
              )}
              {(JSON.parse(test.result) as PlaceholderTestType[]).map(
                (test, index) =>
                  name === test.category && (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${test.name}: ${test.value ||
                          'uncompleted'} `}
                        secondary={
                          test.normalValue &&
                          `Normal value: ${test.normalValue}`
                        }
                      />
                    </ListItem>
                  )
              )}
            </ul>
          ))
          .filter(a => a.props.children[0])} */}
      </div>
    </div>
  );
};

export default SingleLaboratoryTestCategory;
