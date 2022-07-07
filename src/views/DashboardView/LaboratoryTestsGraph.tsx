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
import { laboratoryTestChartOption } from '../../constants/echartOptions';
import { init } from 'echarts';
import { getTimeSubbedFromSelectedDay } from '../../constants/getUnixFromSelectedDay';
import { laboratoryTestsCount } from '../../utils/laboratoryTestsCount';
import { Link } from 'react-router-dom';
import { LaboratoryTestResultType } from './LaboratoryTestsCategoryGraph';
import { useLaboratoryTestsForCategoryQuery } from '../../generated/graphql';

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
type LaboratoryTestsStat = {
  name: string;
  value: number;
};

interface Props {
  categories: { id: string; name: string }[];
  selectDuration: SelectDropdownType<SelectGeneralDuration>;
}
const LaboratoryTestsGraph: React.FC<Props> = ({
  categories,
  selectDuration
}) => {
  const classes = useStyles();
  const testsChartDom = useRef<HTMLDivElement>(null);

  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState<
    SelectDropdownType<string>
  >(
    categories.map((category, idx) => ({
      order: idx,
      label: category.name,
      active: idx === 0
    }))
  );
  const [laboratoryTestStats, setLaboratoryTestsStat] = useState<
    LaboratoryTestsStat[]
  >([]);

  const testsOption = laboratoryTestChartOption({ stats: laboratoryTestStats });

  const { data } = useLaboratoryTestsForCategoryQuery({
    variables: {
      categoryId:
        categories.find(
          category =>
            selectedCategoryDropdown.find(({ active }) => active)?.label ===
            category.name
        )?.id || ''
    },
    skip: !selectedCategoryDropdown[0]
  });

  useEffect(() => {
    if (!data) return;
    setLaboratoryTestsStat(
      data.laboratoryTestsForCategory.map(labTest => ({
        name: labTest.name,
        value: 0
      }))
    );

    const unixFromSelectedDays = getTimeSubbedFromSelectedDay(selectDuration);

    setLaboratoryTestsStat(prevLabTestStat =>
      prevLabTestStat?.map(labTest => {
        const selectedLaboratoryTestExaminationsLength = data.laboratoryTestsForCategory
          .find(({ name }) => name === labTest.name)
          ?.laboratoryTestExaminations?.filter(examination => {
            return unixFromSelectedDays
              ? unixFromSelectedDays < parseInt(examination.created_at)
              : labTest;
          }).length;
        console.log(selectedLaboratoryTestExaminationsLength);
        return {
          name: labTest.name,
          value: selectedLaboratoryTestExaminationsLength || 0
        };
      })
    );
  }, [data, selectDuration, selectedCategoryDropdown]);

  useEffect(() => {
    if (!testsChartDom) return;
    const chart = init(testsChartDom.current as HTMLElement);
    const zoomSize = 6;
    chart.on('click', function(params) {
      console.log(
        laboratoryTestStats.map(STAT => STAT.name)[
          Math.max(params.dataIndex - zoomSize / 2, 0)
        ]
      );
      chart.dispatchAction({
        type: 'dataZoom',
        startValue: laboratoryTestStats.map(STAT => STAT.name)[
          Math.max(params.dataIndex - zoomSize / 2, 0)
        ],
        endValue: laboratoryTestStats.map(STAT => STAT.name)[
          Math.min(
            params.dataIndex + zoomSize / 2,
            laboratoryTestStats.map(STAT => STAT.value).length - 1
          )
        ]
      });
    });
    chart.setOption(testsOption);
  }, [testsChartDom, testsOption]);

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        action={
          <Dropdown
            selectDropdownState={{
              selectDropdown: selectedCategoryDropdown,
              setSelectDropdown: setSelectedCategoryDropdown
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
