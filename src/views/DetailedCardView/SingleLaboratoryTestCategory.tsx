import React, { useContext, useEffect, useState } from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Box,
  Divider
} from '@mui/material';

import { CardQuery } from '../../generated/graphql';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PrintHeader from '../../components/PrintHeader';
import { SettingsContext } from '../../context/SettingContext';
import { CategorySharp } from '@mui/icons-material';
const useStyle = makeStyles(() =>
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
type BasicSubCategory = {
  name: string;
  laboratoryTests: BasicLaboratoryTest[];
};
type BasicCategory = {
  name: string;
  laboratoryTests: BasicLaboratoryTest[];
  subCategories: BasicSubCategory[];
};
const SingleLaboratoryTestCategory: React.FC<Props> = ({
  laboratoryExamination,
  componentToBePrinted,
  onPrint
}) => {
  const classes = useStyle();

  const { categories: categoriesContext } = useContext(SettingsContext);
  const [categories, setCategories] = useState<BasicCategory[] | undefined>(
    categoriesContext?.map(category => ({
      name: category.name,
      subCategories: category.subCategories.map(subCategory => ({
        ...subCategory,
        laboratoryTests: subCategory.laboratoryTests.map(laboratoryTests => ({
          name: laboratoryTests.name,
          value: '',
          normalValue: laboratoryTests.normalValue
        }))
      })),
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
          subCategories: category.subCategories.map(subCategory => {
            if (
              laboratoryExamination.laboratoryTests.find(
                laboratoryTest =>
                  subCategory.name === laboratoryTest.subCategory?.name
              )
            ) {
              return {
                ...subCategory,
                laboratoryTests: laboratoryExamination.laboratoryTests
                  .filter(test => test.subCategory?.name === subCategory.name)
                  .map(test => ({
                    name: test.name,
                    normalValue: test.normalValue,
                    value:
                      laboratoryExamination.values?.find(
                        ({ id }) => test.id === id
                      )?.value || ''
                  }))
              };
            }
            return { ...subCategory };
          }),
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
        .filter(
          category =>
            category.laboratoryTests.length > 0 ||
            category.subCategories.length > 0
        )
    );
  }, []);
  useEffect(() => {
    console.log(onPrint);
  }, [onPrint]);

  return (
    <div ref={componentToBePrinted}>
      {console.log(onPrint, 'ksldjfksd')}
      <Box sx={{ width: '100%' }}>{onPrint && <PrintHeader />}</Box>
      <div className={clsx({ [classes.root]: onPrint })}>
        {categories?.map((category, index) => (
          <List key={index}>
            <ListSubheader sx={{}}>{category.name}</ListSubheader>
            {category.subCategories.map((subCategory, index) => (
              <List sx={{ ml: 1 }} key={index}>
                <ListSubheader sx={{}}>{subCategory.name}</ListSubheader>
                {subCategory.laboratoryTests.map((test, index) => (
                  <ListItem
                    sx={{ ml: 1, borderLeft: '1px solid lightgray' }}
                    key={index}
                  >
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
            {category.laboratoryTests.map((test, index) => (
              <ListItem
                key={index}
                sx={{ ml: 1, borderLeft: '1px solid lightgray' }}
              >
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
