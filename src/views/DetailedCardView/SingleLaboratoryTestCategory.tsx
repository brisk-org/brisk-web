import React from 'react';
import { ListSubheader, ListItem, ListItemText } from '@mui/material';
import { TestsFromCardQuery } from '../../@types/Cards';

import { categories, PlaceholderTestType } from '../../data/testsPlaceHolder';
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
const SingleLaboratoryTestCategory: React.FC<{
  test: TestsFromCardQuery;
  componentToBePrinted: React.RefObject<HTMLDivElement>;
  onPrint: boolean;
}> = ({ test, componentToBePrinted, onPrint }) => {
  const classes = useStyle();
  console.log(onPrint);
  return (
    <div ref={componentToBePrinted}>
      <div style={{ width: '100%' }}>{onPrint && <PrintHeader />}</div>
      <div className={clsx({ [classes.root]: onPrint })}>
        {Object.keys(categories)
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
          .filter(a => a.props.children[0])}
      </div>
    </div>
  );
};

export default SingleLaboratoryTestCategory;
