import React, { useContext, useEffect, useState } from 'react';
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
import { SettingsContext } from '../../context/SettingContext';
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
  laboratoryTests: BasicLaboratoryTest[];
};
const SingleLaboratoryTestCategory: React.FC<Props> = ({
  laboratoryExamination,
  componentToBePrinted,
  onPrint
}) => {
  const classes = useStyle();
  console.log(onPrint);
  const { categories: categoriesContext } = useContext(SettingsContext);
  const [categories, setCategories] = useState<BasicCategory[] | undefined>(
    categoriesContext?.map(category => ({
      name: category.name,
      laboratoryTests: category.laboratoryTests.map(test => ({
        name: test.name,
        value: '',
        normalValue: test.normalValue
      }))
    }))
  );

  useEffect(() => {
    setCategories(prevCategories =>
      prevCategories
        ?.map(category => ({
          name: category.name,
          laboratoryTests: laboratoryExamination.laboratoryTests
            .filter(test => test.category?.name === category.name)
            .map(test => ({
              name: test.name,
              normalValue: test.normalValue,
              value:
                laboratoryExamination.values?.find(({ id }) => test.id === id)
                  ?.value || ''
            }))
        }))
        .filter(category => category.laboratoryTests.length > 0)
    );
  }, []);

  return (
    <div ref={componentToBePrinted}>
      <Box sx={{ width: '100%' }}>{onPrint && <PrintHeader />}</Box>
      <div className={clsx({ [classes.root]: onPrint })}>
        {categories?.map((category, index) => (
          <List key={index}>
            <ListSubheader sx={{}}>{category.name}</ListSubheader>
            {category.laboratoryTests.map((test, index) => (
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
