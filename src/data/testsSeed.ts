export type SubCategoryLaboratoryTestDetails = {
  name: string;
  value: string;
  commonValues?: string[];
  hasNormalValue: boolean;
  normalValue?: string;
};
export interface LaboratoryTestDetails
  extends SubCategoryLaboratoryTestDetails {
  individualPrice?: number;
  isInfluencedByCategory: boolean;
  hasIndividualPrice: boolean;
}
export type LaboratoryTestCatagories = {
  name: string;
  price?: number;
  subCategories?: {
    name: string;
    price: number;
    tests: SubCategoryLaboratoryTestDetails[];
  }[];
  tests: LaboratoryTestDetails[];
};
export const defaultLaboratoryTestSeed: LaboratoryTestCatagories[] = [
  {
    name: 'Hematology',
    subCategories: [
      {
        name: 'cbc',
        price: 50,
        tests: [
          {
            name: 'wbc',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Differential(L%)',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Differential(N%)',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Differential(M)',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Differential(B)',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Differential(E))',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Hct',
            value: '',
            hasNormalValue: false
          },
          {
            name: 'Hgb',
            value: '',
            hasNormalValue: false
          }
        ]
      }
    ],
    tests: [
      {
        name: 'Platelet',
        isInfluencedByCategory: false,
        hasIndividualPrice: false,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'ESR',
        isInfluencedByCategory: true,
        hasIndividualPrice: false,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'BG & RH',
        value: '',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        hasNormalValue: false
      },
      {
        name: 'Blood Film',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        individualPrice: 50,
        value: '',
        hasNormalValue: false
      }
    ]
  },
  {
    name: 'Bacteriology',
    tests: [
      {
        name: 'Gram Stain',
        isInfluencedByCategory: false,
        hasIndividualPrice: false,
        individualPrice: 50,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'AFB',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        individualPrice: 50,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'KOH',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        individualPrice: 50,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'Blood Film',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        individualPrice: 50,
        value: '',
        hasNormalValue: false
      }
    ]
  },
  {
    name: 'STOOL TEST',
    price: 400,
    tests: [
      {
        name: 'Consistency',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'O/P',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'Occult Blood',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'ASO',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        value: '',
        hasNormalValue: false
      },
      {
        name: 'H.Pylori Stool Ag',
        isInfluencedByCategory: true,
        hasIndividualPrice: true,
        value: '',
        hasNormalValue: false
      }
    ]
  }
];
