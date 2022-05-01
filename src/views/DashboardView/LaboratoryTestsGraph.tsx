import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Box, Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CategoryOptions } from '../../data/testsPlaceHolder';
import Dropdown, {
  SelectDropdownType,
  SelectGeneralDuration
} from '../../components/Dropdown';
import { laboratoryTestChartOption } from '../../constants/echartOptions';
import { init } from 'echarts';
import { getTimeSubbedFromSelectedDay } from '../../constants/getUnixFromSelectedDay';
import { laboratoryTestsCount } from '../../utils/laboratoryTestsCount';
import { Link } from 'react-router-dom';
import { categories } from '../../data/testsPlaceHolder';
import { LaboratoryTestResultType } from './LaboratoryTestsCategoryGraph';

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
  name: string;
};

interface Props {
  laboratoryTests: LaboratoryTestResultType;
  selectDuration: SelectDropdownType<SelectGeneralDuration>;
}
const LaboratoryTestsGraph: React.FC<Props> = ({
  laboratoryTests,
  selectDuration
}) => {
  const classes = useStyles();
  const testsChartDom = useRef<HTMLDivElement>(null);

  const [selectLabOptionDropdown, setSelectLabOptionsDropdown] = useState<
    SelectDropdownType<CategoryOptions>
  >(
    Object.keys(categories).map((category, idx) => ({
      order: idx,
      label: category as CategoryOptions,
      active: idx === 0
    }))
  );
  const [testStats, setTestStats] = useState<TestStats[]>([]);

  const testsOption = laboratoryTestChartOption({ stats: testStats });

  useEffect(() => {
    if (!laboratoryTests) return;

    const unixFromSelectedDays = getTimeSubbedFromSelectedDay(selectDuration);

    const activeCategoryOption = selectLabOptionDropdown.find(
      content => content.active
    )?.label;
    const { testsCount } = laboratoryTestsCount(
      laboratoryTests,
      unixFromSelectedDays,
      activeCategoryOption
    );

    console.log(testsCount, testStats);
    setTestStats(
      Object.entries(testsCount).map(([name, value]) => ({
        value,
        name
      }))
    );
  }, [laboratoryTests, selectDuration, selectLabOptionDropdown]);

  useEffect(() => {
    if (!testsChartDom) return;
    const chart = init(testsChartDom.current as HTMLElement);
    const zoomSize = 6;
    chart.on('click', function(params) {
      console.log(
        testStats.map(stat => stat.name)[
          Math.max(params.dataIndex - zoomSize / 2, 0)
        ]
      );
      chart.dispatchAction({
        type: 'dataZoom',
        startValue: testStats.map(stat => stat.name)[
          Math.max(params.dataIndex - zoomSize / 2, 0)
        ],
        endValue: testStats.map(stat => stat.name)[
          Math.min(
            params.dataIndex + zoomSize / 2,
            testStats.map(stat => stat.value).length - 1
          )
        ]
      });
    });
    chart.setOption(testsOption);
    console.log('1');
  }, [testsChartDom, testsOption]);

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        action={
          <Dropdown
            selectDropdownState={{
              selectDropdown: selectLabOptionDropdown,
              setSelectDropdown: setSelectLabOptionsDropdown
            }}
          />
        }
        title="Todays Report"
      />
      <Divider />
      <CardContent>
        <section className={classes.chart} ref={testsChartDom}></section>
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

export default LaboratoryTestsGraph;
