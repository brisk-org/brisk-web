import { EChartsOption, graphic } from 'echarts';

type salesChartOptionType = (stats: {
  cardWeeklySales: number[];
  testWeeklySales: number[];
  prescriptionWeeklySales: number[];
  quickPrescriptionWeeklySales: number[];
  quickLabTestWeeklySales: number[];
}) => EChartsOption;

type ageChartOptionType = (
  stats: { value: number; name: string }[]
) => EChartsOption;

type laboratoryTestCategoryChartOptionType = (stats: {
  stats: { value: number; name: string }[];
}) => EChartsOption;

export const salesChartOption: salesChartOptionType = function({
  cardWeeklySales,
  testWeeklySales,
  prescriptionWeeklySales,
  quickPrescriptionWeeklySales,
  quickLabTestWeeklySales
}) {
  return {
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: [
        'cards',
        'laboratory-tests',
        'prescription',
        'emergency-prescription',
        'emergency-lab-test'
      ],
      itemGap: 20,
      top: -4
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'cards',
        data: cardWeeklySales,
        type: 'line',
        smooth: true
      },
      {
        name: 'laboratory-tests',
        type: 'line',
        data: testWeeklySales,
        smooth: true
      },
      {
        name: 'prescription',
        type: 'line',
        data: prescriptionWeeklySales,
        smooth: true
      },
      {
        name: 'emergency-prescription',
        type: 'line',
        data: quickPrescriptionWeeklySales,
        smooth: true
      },
      {
        name: 'emergency-lab-test',
        type: 'line',
        data: quickLabTestWeeklySales,
        smooth: true
      }
    ]
  };
};

export const ageChartOption: ageChartOptionType = function(stats) {
  return {
    legend: {
      bottom: 0
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    axisPointer: {
      show: false,
      handle: {
        show: false
      }
    },
    stateAnimation: {
      duration: 300,
      easing: 'cubicOut'
    },
    series: [
      {
        name: 'Age Variation',
        type: 'pie',
        radius: [25, 250],
        label: {
          position: 'inside'
        },
        emphasis: {
          label: {
            show: true
          }
        },
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: stats
      }
    ]
  };
};

export const laboratoryTestCategoryChartOption: laboratoryTestCategoryChartOptionType = function({
  stats
}) {
  const name = stats.map(STAT => STAT.name);
  const values = stats.map(STAT => STAT.value);
  return {
    xAxis: {
      type: 'category',
      data: name,
      interval: 0,
      show: true,
      axisTick: {
        interval: 0
      },
      axisLabel: {
        interval: 0
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Laboratory Tests Overview',
        data: values,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
};

export const laboratoryTestChartOption: laboratoryTestCategoryChartOptionType = function({
  stats
}) {
  const name = stats.map(STAT => STAT.name);
  const values = stats.map(STAT => STAT.value);
  return {
    title: {
      text: 'lab test',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      type: 'category',
      data: name,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: values
      }
    ]
  };
};
