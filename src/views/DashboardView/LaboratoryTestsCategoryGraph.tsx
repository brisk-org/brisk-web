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
type TestStats = {
  value: number;
  name: CategoryOptions;
};
export type LaboratoryTestResultType =
  | { result: string; created_at: string }[]
  | undefined;
interface Props {
  laboratoryTests: LaboratoryTestResultType;
}
const LaboratoryTestsCategoryGraph: React.FC<Props> = ({ laboratoryTests }) => {
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
  const [testStats, setTestStats] = useState<TestStats[]>([
    { name: 'Hematology', value: 0 },
    { name: 'STOOL TEST', value: 0 },
    { name: 'Urinalysis', value: 0 },
    { name: 'Microscopy', value: 0 },
    { name: 'Serology', value: 0 },
    { name: 'Bacteriology', value: 0 },
    { name: 'Hormone Test', value: 0 },
    { name: 'Clinical Chemistry', value: 0 }
  ]);

  const categoryOption = laboratoryTestCategoryChartOption({
    stats: testStats
  });

  useEffect(() => {
    if (!laboratoryTests) return;

    const unixFromSelectedDays = getTimeSubbedFromSelectedDay(selectDuration);

    const { categoryCount } = laboratoryTestsCount(
      laboratoryTests,
      unixFromSelectedDays
    );

    setTestStats(
      Object.entries(categoryCount).map(([key, value]) => ({
        value,
        name: key as CategoryOptions
      }))
    );
  }, [laboratoryTests, selectDuration]);

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
        <LaboratoryTestsGraph
          laboratoryTests={laboratoryTests}
          selectDuration={selectDuration}
        />
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Link to="/app/lab/request">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Create Laboratory Test
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default LaboratoryTestsCategoryGraph;
