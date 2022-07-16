import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CategoryOptions } from '../../data/testsPlaceHolder';
import Dropdown, {
  SelectDropdownType,
  SelectGeneralDuration
} from '../../components/Dropdown';
import { laboratoryTestCategoryChartOption } from '../../constants/echartOptions';
import { init } from 'echarts';
import { getTimeSubbedFromSelectedDay } from '../../constants/getUnixFromSelectedDay';
import { laboratoryTestsCount } from '../../utils/laboratoryTestsCount';
import { Link } from 'react-router-dom';
import LaboratoryTestsGraph from './LaboratoryTestsGraph';
import {
  useLaboratoryTestCategoriesForGraphQuery,
  useLaboratoryTestCategoriesQuery
} from '../../generated/graphql';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiCardHeader-action': {
      alignSelf: 'center'
    }
  },
  chart: {
    height: 500
  }
}));
type CategoryCount = {
  name: string;
  value: number;
};
export type LaboratoryTestResultType =
  | { result: string; created_at: string }[]
  | undefined;

const LaboratoryTestsCategoryGraph = () => {
  const classes = useStyles();
  const categoryChartDom = useRef<HTMLDivElement>(null);

  const [selectDuration, setSelectDuration] = useState<
    SelectDropdownType<SelectGeneralDuration>
  >([
    { order: 1, label: 'today', days: 1, active: true },
    { order: 2, label: 'last 7 days', days: 7, active: false },
    { order: 3, label: 'last 30 days', days: 30, active: false },
    { order: 4, label: 'life time', active: false }
  ]);
  const [categoriesCount, setCategoriesCount] = useState<CategoryCount[]>([]);
  const { data } = useLaboratoryTestCategoriesForGraphQuery();

  const categoryOption = laboratoryTestCategoryChartOption({
    stats: categoriesCount
  });

  useEffect(() => {
    if (!data) return;
    setCategoriesCount(
      data.laboratoryTestCategories.map(({ name }) => ({ name, value: 0 }))
    );

    const unixFromSelectedDays = getTimeSubbedFromSelectedDay(selectDuration);

    setCategoriesCount(prevCategories =>
      prevCategories?.map(category => {
        const selectedLaboratoryTestCategoriesExaminationLength = data.laboratoryTestCategories
          .find(({ name }) => name === category.name)
          ?.laboratoryTests.reduce(
            (prevValue, currentValue) =>
              prevValue +
              (currentValue.laboratoryTestExaminations?.filter(examination =>
                unixFromSelectedDays
                  ? unixFromSelectedDays < parseInt(examination.created_at)
                  : category
              )?.length || 0),
            0
          );

        return {
          name: category.name,
          value: selectedLaboratoryTestCategoriesExaminationLength || 0
        };
      })
    );
  }, [data, selectDuration]);

  useEffect(() => {
    if (!categoryChartDom) return;
    const chart = init(categoryChartDom.current as HTMLElement);
    chart.setOption(categoryOption);
  }, [categoryChartDom, categoryOption]);

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        action={
          <Dropdown
            selectDropdownState={{
              selectDropdown: selectDuration,
              setSelectDropdown: setSelectDuration
            }}
          />
        }
        title="Todays Report"
      />
      <Divider />
      <CardContent>
        <section className={classes.chart} ref={categoryChartDom}></section>
        {data && (
          <LaboratoryTestsGraph
            categories={data.laboratoryTestCategories.map(({ id, name }) => ({
              id,
              name
            }))}
            selectDuration={selectDuration}
          />
        )}
      </CardContent>
      <Divider />
    </Card>
  );
};

export default LaboratoryTestsCategoryGraph;
