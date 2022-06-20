import React, { useEffect, useState } from 'react';
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
type BasicLaboratoryTest = {
  name: string;
  value: string;
  normalValue?: string;
};
type BasicCategory = {
  name: string;
  laboratoryTest: BasicLaboratoryTest[];
};
const SingleLaboratoryTestCategory: React.FC<Props> = ({
  laboratoryExamination,
  componentToBePrinted,
  onPrint
}) => {
  const classes = useStyle();
  console.log(onPrint);
  const [categories, setCategories] = useState<BasicCategory[]>();

  useEffect(() => {
    laboratoryExamination.laboratoryTestRequests?.forEach(laboratoryRequest => {
      const basicLabTest = {
        name: laboratoryRequest.laboratoryTest.name,
        value: laboratoryRequest.value || '',
        normalValue: laboratoryRequest.laboratoryTest.normalValue
      };
      setCategories(prevCategories => {
        if (!prevCategories) {
          return [
            {
              name: laboratoryRequest.laboratoryTest.category?.name || '',
              laboratoryTest: [basicLabTest]
            }
          ];
        }
        const newCategory = prevCategories?.find(
          category =>
            category.name === laboratoryRequest.laboratoryTest.category?.name
        );
        if (!newCategory) {
          return [
            ...prevCategories,
            {
              name: laboratoryRequest.laboratoryTest.category?.name || '',
              laboratoryTest: [basicLabTest]
            }
          ];
        }
        return prevCategories?.map(category => {
          if (
            category.name === laboratoryRequest.laboratoryTest.category?.name
          ) {
            return {
              ...category,
              laboratoryTest: [...category.laboratoryTest, basicLabTest]
            };
          }
          return {
            name: laboratoryRequest.laboratoryTest.category?.name || '',
            laboratoryTest: [basicLabTest]
          };
        });
      });
    });
  }, []);

  return (
    <div ref={componentToBePrinted}>
      <Box sx={{ width: '100%' }}>{onPrint && <PrintHeader />}</Box>
      <div className={clsx({ [classes.root]: onPrint })}>
        {categories?.map((category, index) => (
          <List key={index}>
            <ListSubheader sx={{}}>{category.name}</ListSubheader>
            {category.laboratoryTest.map((test, index) => (
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
      </div>
    </div>
  );
};

export default SingleLaboratoryTestCategory;
