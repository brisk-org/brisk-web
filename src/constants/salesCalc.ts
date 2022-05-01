import {
  isThisWeek,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  format,
  getTime
} from 'date-fns';
import add from 'date-fns/add';

type salesDataType = { price: number; updated_at: string }[];
export const salesCalc = function(
  salesData: salesDataType,
  unixFromSelectedDays: number | undefined,
  unixIntervalFromSelectedHours: { from: number; to: number } | undefined
) {
  let amount = 0;
  const inWeek: number[] = [0, 0, 0, 0, 0, 0, 0];
  salesData
    .filter((sales, index) => {
      index === 0 && (amount = 0);
      return unixFromSelectedDays
        ? unixFromSelectedDays < Number(sales.updated_at)
        : sales;
    })
    .filter((sales, index) => {
      index === 0 && (amount = 0);
      return unixIntervalFromSelectedHours
        ? unixIntervalFromSelectedHours.from < Number(sales.updated_at) &&
            unixIntervalFromSelectedHours.to > Number(sales.updated_at)
        : sales;
    })
    .forEach(sales => {
      amount += sales.price;
    });
  salesData
    .filter((sales, index) =>
      isThisWeek(parseInt(sales.updated_at), {
        weekStartsOn: 1
      })
    )
    .forEach(({ updated_at, price }, index) => {
      // checkout what 'i' in format does... return what day it is in the week like monday = 1 tuesday = 2
      const updatedAtDateInWeekIdx =
        parseInt(format(parseInt(updated_at), 'i')) - 1;
      inWeek[updatedAtDateInWeekIdx] += price;
    });
  return { amount, inWeek };
};
