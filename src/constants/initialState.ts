import {
  SelectDropdownType,
  SelectDailyDuration,
  SelectGeneralDuration
} from '../components/Dropdown';
import {
  SalesNameType,
  SalesType
} from '../views/DashboardView/SalesContainer';

export const initialSalesState: SalesType[] = [
  { name: 'card', label: 'Cards' },
  {
    name: 'test',
    label: 'Laboratory'
  },
  {
    name: 'prescription',
    label: 'Prescription'
  },
  {
    name: 'quickPrescription',
    label: 'Emergency Prescription'
  },
  {
    name: 'quickLabTest',
    label: 'Emergency Laboratory'
  }
].map(({ name, label }, idx) => ({
  name: name as SalesNameType,
  label: `${label} Balance`,
  order: idx,
  inWeek: [],
  amount: 0
}));

export const initialSelectDailyDurationState: SelectDropdownType<SelectDailyDuration> = [
  { order: 0, label: 'Total', active: true },
  { order: 1, label: '7:30', hours: 7, minutes: 30, active: false },
  { order: 2, label: '11:00', hours: 11, active: false },
  { order: 3, label: '2:30', hours: 14, minutes: 30, active: false }
];
export const initialSelectGeneralDurationState: SelectDropdownType<SelectGeneralDuration> = [
  { order: 1, label: 'today', days: 1, active: true },
  { order: 2, label: 'last 7 days', days: 7, active: false },
  { order: 3, label: 'last 30 days', days: 30, active: false },
  { order: 4, label: 'life time', active: false }
];
