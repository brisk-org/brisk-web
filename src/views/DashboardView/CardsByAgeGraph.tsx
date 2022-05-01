import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { init } from 'echarts';
import { ageFilter } from '../../constants/ageFilter';
import { ageChartOption } from '../../constants/echartOptions';
import { getTimeSubbedFromSelectedDay } from '../../constants/getUnixFromSelectedDay';
import Dropdown, {
  SelectDropdownType,
  SelectGeneralDuration
} from '../../components/Dropdown';

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

type AgeStats = {
  value: number;
  name: '<10' | '10 - 25' | '25 - 45' | '40 - 65' | '>65';
}[];

interface CardsByAgeGraphProps {
  cards: { age: string; created_at: string }[] | undefined;
}
const CardsByAgeGraph: React.FC<CardsByAgeGraphProps> = ({ cards }) => {
  const classes = useStyles();
  const chartDom = useRef<HTMLDivElement>(null);

  const [selectDuration, setSelectDuration] = useState<
    SelectDropdownType<SelectGeneralDuration>
  >([
    { order: 1, label: 'today', days: 1, active: true },
    { order: 2, label: 'last 7 days', days: 7, active: false },
    { order: 3, label: 'last 30 days', days: 30, active: false },
    { order: 4, label: 'life time', active: false }
  ]);
  const [ageStats, setAgeStats] = useState<AgeStats>([
    { name: '<10', value: 0 },
    { name: '10 - 25', value: 0 },
    { name: '25 - 45', value: 0 },
    { name: '40 - 65', value: 0 },
    { name: '>65', value: 0 }
  ]);

  const option = ageChartOption(ageStats);

  useEffect(() => {
    if (!cards) return;
    const unixFromSelectedDays = getTimeSubbedFromSelectedDay(selectDuration);
    const { below10, bn1025, bn2540, bn4065, above65 } = ageFilter(
      cards,
      unixFromSelectedDays
    );

    setAgeStats([
      {
        name: '<10',
        value: below10
      },
      {
        name: '10 - 25',
        value: bn1025
      },
      {
        name: '25 - 45',
        value: bn2540
      },
      {
        name: '40 - 65',
        value: bn4065
      },
      {
        name: '>65',
        value: above65
      }
    ]);
  }, [cards, selectDuration]);

  useEffect(() => {
    if (!chartDom) return;
    const chart = init(chartDom.current as HTMLElement);
    chart.setOption(option);
  }, [chartDom, option]);

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
        title={
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Age Data Pie-Chart
            <Typography variant="body2" color="textSecondary">
              Overview of Latest Month
            </Typography>
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <section className={classes.chart} ref={chartDom}></section>
      </CardContent>
    </Card>
  );
};

export default CardsByAgeGraph;
