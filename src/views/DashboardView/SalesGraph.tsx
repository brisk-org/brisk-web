import React, { useEffect, useRef } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import * as echarts from 'echarts';
import { SalesType } from './SalesContainer';
import { salesChartOption } from '../../constants/echartOptions';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 340
  }
}));
const SalesGraph: React.FC<{ sales: SalesType[] }> = ({ sales }) => {
  const classes = useStyles();
  const chartDom = useRef<HTMLDivElement>(null);

  const cardWeeklySales = sales.find(sales => sales.name === 'card')!.inWeek;
  const testWeeklySales = sales.find(sales => sales.name === 'test')!.inWeek;
  const prescriptionWeeklySales = sales.find(
    sales => sales.name === 'prescription'
  )!.inWeek;
  const quickPrescriptionWeeklySales = sales.find(
    sales => sales.name === 'quickPrescription'
  )!.inWeek;
  const quickLabTestWeeklySales = sales.find(
    sales => sales.name === 'quickLabTest'
  )!.inWeek;

  const option = salesChartOption({
    cardWeeklySales,
    testWeeklySales,
    prescriptionWeeklySales,
    quickPrescriptionWeeklySales,
    quickLabTestWeeklySales
  });

  useEffect(() => {
    if (!chartDom.current) return;
    const chart = echarts.init(chartDom.current as HTMLElement);
    chart.setOption(option);
  }, [
    chartDom,
    cardWeeklySales,
    testWeeklySales,
    prescriptionWeeklySales,
    quickPrescriptionWeeklySales
  ]);

  return <section className={classes.chart} ref={chartDom}></section>;
};

export default SalesGraph;
