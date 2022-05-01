import { getTime, startOfToday, startOfTomorrow, sub } from 'date-fns';
import add from 'date-fns/add';
import {
  SelectDailyDuration,
  SelectDropdownType,
  SelectGeneralDuration
} from '../components/Dropdown';

export const getTimeSubbedFromSelectedDay = function(
  selectDuration: SelectDropdownType<SelectGeneralDuration>
) {
  const activeDuration = selectDuration.find(item => item.active === true);

  if (!activeDuration) return;
  if (activeDuration.label === 'life time') return;

  return getTime(
    sub(startOfTomorrow(), {
      days: activeDuration.days,
      hours: activeDuration.hours,
      minutes: activeDuration.minutes
    })
  );
};

export const getTimeSubbedFromSelectedHour = function(
  selectDuration: SelectDropdownType<SelectDailyDuration>
) {
  const activeDuration = selectDuration.find(item => item.active === true);

  if (!activeDuration) return;
  if (activeDuration.label === 'Total') return;

  const previousCheckpoint = selectDuration.find(
    item => item.order === activeDuration.order - 1
  );

  const from = getTime(
    add(startOfToday(), {
      hours: previousCheckpoint?.hours,
      minutes: previousCheckpoint?.minutes
    })
  );
  const to = getTime(
    add(startOfToday(), {
      hours: activeDuration.hours,
      minutes: activeDuration.minutes
    })
  );

  return {
    from,
    to
  };
};
