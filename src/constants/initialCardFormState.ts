import { GridSize } from '@mui/material';

export type CardFormInfoValueType = {
  inputSizeMd?: GridSize;
  inputSizeSm?: GridSize;
  inputSizeXs: GridSize;
  label: string;
  helperText?: string;
  type: 'string' | 'number' | 'select' | 'textArea';
  required?: boolean;
};
interface CardProfileFormInfoType {
  name: CardFormInfoValueType;
  phone: CardFormInfoValueType;
  age: CardFormInfoValueType;
  gender: CardFormInfoValueType;
  address: CardFormInfoValueType;
  house_no: CardFormInfoValueType;
  k_ketema: CardFormInfoValueType;
  kebele: CardFormInfoValueType;
}
interface CardHistoryFormInfoType {
  bp: CardFormInfoValueType;
  temp: CardFormInfoValueType;
  spo2: CardFormInfoValueType;
  plus: CardFormInfoValueType;
  rr: CardFormInfoValueType;
  weight: CardFormInfoValueType;
  heent: CardFormInfoValueType;
  chest: CardFormInfoValueType;
  cvs: CardFormInfoValueType;
  abd: CardFormInfoValueType;
  ga: CardFormInfoValueType;
  asst: CardFormInfoValueType;
  cc: CardFormInfoValueType;
  rx: CardFormInfoValueType;
  hpi: CardFormInfoValueType;
  other: CardFormInfoValueType;
}

export interface CardProfileFormStateType {
  name: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
  house_no?: string;
  k_ketema: string;
  kebele: string;
}
export interface CardHistoryStateType {
  bp: string;
  temp: string;
  spo2: string;
  plus: string;
  rr: string;
  weight: string;
  heent: string;
  chest: string;
  cvs: string;
  abd: string;
  ga: string;
  asst: string;
  cc: string;
  rx: string;
  hpi: string;
  other: string;
}
type InitialCardHistoryStateType = (
  query: URLSearchParams
) => CardHistoryStateType;

type InitialCardFormStateType = (
  query: URLSearchParams
) => CardProfileFormStateType;

export const allCardProfileFormInfo: CardProfileFormInfoType = {
  name: {
    label: 'Full Name',
    inputSizeMd: 12,
    inputSizeSm: 12,
    inputSizeXs: 12,
    type: 'string',
    helperText: 'Please specify the Full Name',
    required: true
  },
  age: {
    label: 'Age',
    inputSizeMd: 4,
    inputSizeSm: 12,
    inputSizeXs: 12,
    type: 'number',
    required: true
  },
  gender: {
    label: 'Select Gender',
    inputSizeMd: 4,
    inputSizeXs: 12,
    type: 'select',
    required: true
  },
  phone: {
    label: 'Phone No',
    inputSizeMd: 4,
    inputSizeXs: 12,
    type: 'number',
    required: true
  },
  address: {
    label: 'Specify Full adress',
    inputSizeMd: 12,
    inputSizeXs: 12,
    type: 'string'
  },
  house_no: {
    label: 'House No',
    inputSizeMd: 4,
    inputSizeXs: 12,
    type: 'number'
  },
  k_ketema: {
    label: 'Kefle Ketema',
    inputSizeMd: 4,
    inputSizeXs: 12,
    type: 'string'
  },
  kebele: {
    label: 'Kebele',
    inputSizeMd: 4,
    inputSizeXs: 12,
    type: 'string'
  }
};

export const allCardHistoryFormInfo: CardHistoryFormInfoType = {
  bp: {
    label: 'BP',
    inputSizeMd: 3,
    inputSizeSm: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },
  temp: {
    label: 'T',
    inputSizeMd: 3,
    inputSizeSm: 6,
    inputSizeXs: 12,
    type: 'number',
    required: false
  },
  spo2: {
    label: 'SPO2',
    inputSizeMd: 3,
    inputSizeSm: 6,
    inputSizeXs: 12,
    type: 'number',
    required: false
  },
  plus: {
    label: 'puls',
    inputSizeMd: 3,
    inputSizeSm: 6,
    inputSizeXs: 12,
    type: 'number',
    required: false
  },
  rr: {
    label: 'RR',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },
  weight: {
    label: 'Weight',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'number',
    required: false
  },
  cc: {
    label: 'C/c',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'textArea',
    required: false
  },
  hpi: {
    label: 'HPI',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'textArea',
    required: false
  },
  heent: {
    label: 'HEENT',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },
  chest: {
    label: 'Chest',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },
  cvs: {
    label: 'CVS',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },

  abd: {
    label: 'ABD',
    inputSizeMd: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },
  ga: {
    label: 'G/A',
    inputSizeMd: 3,
    inputSizeSm: 6,
    inputSizeXs: 12,
    type: 'select',
    required: true
  },
  asst: {
    label: 'ASST',
    inputSizeMd: 9,
    inputSizeSm: 6,
    inputSizeXs: 12,
    type: 'string',
    required: false
  },
  rx: {
    label: 'Rx',
    inputSizeXs: 12,
    type: 'textArea',
    required: false
  },
  other: {
    label: 'Other',
    inputSizeXs: 12,
    type: 'textArea',
    required: false
  }
};

export const initialCardFormState: InitialCardFormStateType = query => ({
  name: query.get('name') || '',
  age: query.get('age') || '',
  gender: query.get('gender') || 'male',
  phone: query.get('phone') || '09',
  address: query.get('address') || '',
  house_no: query.get('house_no') || '',
  k_ketema: query.get('address') || '',
  kebele: query.get('kebele') || ''
});
export const initialCardHistoryState: InitialCardHistoryStateType = query => ({
  bp: query.get('bp') || '',
  plus: query.get('plus') || '',
  temp: query.get('temp') || '',
  spo2: query.get('spo2') || '',
  rr: query.get('rr') || '',
  weight: query.get('weight') || '',
  heent: query.get('heent') || '',
  chest: query.get('chest') || '',
  cvs: query.get('cvs') || '',
  abd: query.get('abd') || '',
  ga: query.get('ga') || '',
  asst: query.get('asst') || '',
  cc: query.get('cc') || '',
  rx: query.get('rx') || '',
  hpi: query.get('hpi') || '',
  other: query.get('other') || ''
});

export const nullCardValue: CardProfileFormStateType = {
  name: '',
  gender: 'male',
  age: '',
  phone: '09',
  house_no: '',
  address: '',
  kebele: '',
  k_ketema: ''
};

export const nullHistoryValue: CardHistoryStateType = {
  bp: '',
  plus: '',
  temp: '',
  spo2: '',
  rr: '',
  weight: '',
  heent: '',
  chest: '',
  cvs: '',
  abd: '',
  ga: '',
  asst: '',
  cc: '',
  rx: '',
  hpi: '',
  other: ''
};
