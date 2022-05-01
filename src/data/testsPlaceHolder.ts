export type CategoryOptions =
  | 'Hematology'
  | 'STOOL TEST'
  | 'Hormone Test'
  | 'Urinalysis'
  | 'Microscopy'
  | 'Serology'
  | 'Bacteriology'
  | 'Clinical Chemistry';
export type CategoryType = {
  Hematology: boolean;
  'STOOL TEST': boolean;
  Urinalysis: boolean;
  Microscopy: boolean;
  Serology: boolean;
  'Hormone Test': boolean;
  Bacteriology: boolean;
  'Clinical Chemistry': boolean;
};
export type PlaceholderTestType = {
  name: string;
  category: CategoryOptions;
  value: string;
  normalValue?: string;
  price: number;
  selected: boolean;
  influencedBy?: CategoryOptions | 'Differential';
};

export const categories: CategoryType = {
  Hematology: false,
  'STOOL TEST': false,
  Urinalysis: false,
  Microscopy: false,
  Serology: false,
  Bacteriology: false,
  'Hormone Test': false,
  'Clinical Chemistry': false
};

export const testsPlaceHolder: PlaceholderTestType[] = [
  {
    name: 'WBC',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Differential(N%)',
    category: 'Hematology',
    influencedBy: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Differential(L%)',
    category: 'Hematology',
    influencedBy: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Differential(M)',
    category: 'Hematology',
    influencedBy: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Differential(B)',
    category: 'Hematology',
    influencedBy: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Differential(E)',
    category: 'Hematology',
    influencedBy: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Hct',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Hgb',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Platelet',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'ESR',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'BG & RH',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Blood Film',
    category: 'Hematology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Consistency',
    influencedBy: 'STOOL TEST',
    category: 'STOOL TEST',
    selected: false,
    price: 50,
    value: ''
  },

  {
    name: 'O/P',
    influencedBy: 'STOOL TEST',
    category: 'STOOL TEST',
    selected: false,
    price: 50,
    value: ''
  },

  {
    name: 'Occult Blood',
    influencedBy: 'STOOL TEST',
    category: 'STOOL TEST',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'ASO',
    category: 'STOOL TEST',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'H.Pylori Stool Ag',
    category: 'STOOL TEST',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Color',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Appearance',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'PH',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'SpG',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Protein',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Glucose',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Ketrone',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Bilirubin',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Urobilirogen',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Leucocyte',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Nitrite',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },

  {
    name: 'Blood',
    category: 'Urinalysis',
    influencedBy: 'Urinalysis',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Epi cells',
    category: 'Microscopy',
    influencedBy: 'Microscopy',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Wbc',
    category: 'Microscopy',
    influencedBy: 'Microscopy',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'RBC',
    category: 'Microscopy',
    influencedBy: 'Microscopy',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Cast',
    category: 'Microscopy',
    influencedBy: 'Microscopy',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Parasite',
    category: 'Microscopy',
    influencedBy: 'Microscopy',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Urine HCG',
    category: 'Microscopy',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Inflammation(CRP)',
    category: 'Hormone Test',
    influencedBy: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Inflammation(PCT)',
    category: 'Hormone Test',
    influencedBy: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Diabetes(HbAlc)',
    category: 'Hormone Test',
    influencedBy: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Tyyroid Function(T3)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Tyyroid Function(T4)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Tyyroid Function(TSH)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Cardiac Markers(cTaI)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Cardiac Markers(NT-proBNP)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Cardiac Markers(CK-MB)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Congulation(D-Dimer)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Tumor Markers(PSA)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Tumor Markers(AFP)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Tumor Markers(CEA)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Fertility(B-HCG)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Fertility(LH)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Fertility(FSH)',
    category: 'Hormone Test',
    selected: false,
    price: 50,
    normalValue: '',
    value: ''
  },
  {
    name: 'Widal O',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Widal H',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Welflex',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'VDRL',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'RPR',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'HbSAg',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'HCV',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Rheum. F',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'H.Pylori',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'HIV Test',
    category: 'Serology',
    influencedBy: 'Serology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Gram Stain',
    category: 'Bacteriology',
    influencedBy: 'Bacteriology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'AFB',
    category: 'Bacteriology',
    influencedBy: 'Bacteriology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'KOH',
    category: 'Bacteriology',
    influencedBy: 'Bacteriology',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'FBS',
    category: 'Clinical Chemistry',
    normalValue: '70 - 110 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'RBS',
    category: 'Clinical Chemistry',
    normalValue: '70 - 200 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'SGOT/ AST',
    category: 'Clinical Chemistry',
    normalValue: '0 - 40 U/L',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'SGPT/ALT',
    category: 'Clinical Chemistry',
    normalValue: '0 - 40 U/L',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'ALP',
    category: 'Clinical Chemistry',
    normalValue: '0 - 800 U/L',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Total Protein',
    category: 'Clinical Chemistry',
    normalValue: '5.8 - 9.0 g/l',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Albumin',
    category: 'Clinical Chemistry',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Bilirubin T',
    category: 'Clinical Chemistry',
    normalValue: '0 - 1 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Bilirubin D',
    category: 'Clinical Chemistry',
    normalValue: '0 - 0.2 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'BUN',
    category: 'Clinical Chemistry',
    normalValue: '15 - 53.5 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Creatinine',
    category: 'Clinical Chemistry',
    normalValue: '0.5 - 1.2 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Cholesterol',
    category: 'Clinical Chemistry',
    normalValue: 'M < 70 - 165 mg/dl, F < 71 - 164 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'LDL',
    category: 'Clinical Chemistry',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'HDL',
    category: 'Clinical Chemistry',
    normalValue: 'M < 31 - 63 mg/dl, F < 37 - 83 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'TG',
    category: 'Clinical Chemistry',
    normalValue: '<150 mg/dl',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Uric Acid',
    category: 'Clinical Chemistry',
    normalValue: '',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Na+',
    category: 'Clinical Chemistry',
    normalValue: '',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'K+',
    category: 'Clinical Chemistry',
    normalValue: '',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  },
  {
    name: 'Cl+',
    category: 'Clinical Chemistry',
    normalValue: '',
    influencedBy: 'Clinical Chemistry',
    selected: false,
    price: 50,
    value: ''
  }
];
