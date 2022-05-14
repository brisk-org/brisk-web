import { LaboratoryTestCatagories } from '../data/testsSeed';

interface State extends LaboratoryTestCatagories {
  index: number;
}

export type LaboratoryTestSettingReducerAction =
  | {
      type: 'changeCategoryName';
      payload: {
        categoryName: string;
        newName: string;
      };
    }
  | {
      type: 'changeCategoryPrice';
      payload: {
        categoryName: string;
        newPrice: number;
      };
    }
  | {
      type: 'changeSubCategoryName';
      payload: {
        subCategoryName: string;
        newName: string;
      };
    }
  | {
      type: 'changeSubCategoryPrice';
      payload: {
        subCategoryName: string;
        newPrice: number;
      };
    }
  | {
      type: 'addNewTest';
      payload: {
        name: string;
        price?: number;
      };
    }
  | {
      type: 'deleteTest';
      payload: {
        name: string;
      };
    }
  | {
      type: 'addNewSubCategory';
      payload: {
        name: string;
        price: number;
      };
    }
  | {
      type: 'deleteSubCategory';
      payload: {
        name: string;
      };
    }
  | {
      type: 'addNewSubCategoryTest';
      payload: {
        subCategoryName: string;
        testName: string;
      };
    }
  | {
      type: 'deleteSubCategoryTest';
      payload: {
        subCategoryName: string;
        name: string;
      };
    }
  | {
      type: 'changeTestNormalValue';
      payload: {
        testName: string;
        normalValue: string;
      };
    }
  | {
      type: 'changeSubCategoryTestNormalValue';
      payload: {
        testName: string;
        subCategoryName: string;
        normalValue: string;
      };
    }
  | {
      type: 'changeTestPrice';
      payload: {
        testName: string;
        price: number;
      };
    }
  | {
      type: 'addNewCommonValueForTest';
      payload: {
        testName: string;
        newCommonValue: string;
      };
    }
  | {
      type: 'deleteCommonValueForTest';
      payload: {
        testName: string;
        commonValueIndex: number;
      };
    }
  | {
      type: 'addNewCommonValueForSubCategoryTest';
      payload: {
        testName: string;
        subCategoryName: string;
        newCommonValue: string;
      };
    }
  | {
      type: 'deleteCommonValueForSubCategoryTest';
      payload: {
        testName: string;
        subCategoryName: string;
        commonValueIndex: number;
      };
    }
  | {
      type: 'changeCommonValue';
      payload: {
        testName: string;
        index: number;
        newCommonValue: string;
      };
    }
  | {
      type: 'isTestInfluencedByCategory';
      payload: {
        testName: string;
        isInfluencedByCategory: boolean;
      };
    }
  | {
      type: 'hasIndividualPrice';
      payload: {
        testName: string;
        hasIndividualPrice: boolean;
      };
    }
  | {
      type: 'hasNormalValue';
      payload: {
        testName: string;
        hasNormalValue: boolean;
      };
    }
  | {
      type: 'hasSubCategoryTestNormalValue';
      payload: {
        subCategoryName: string;
        testName: string;
        hasNormalValue: boolean;
      };
    }
  | {
      type: 'subCategoryChangePrice';
      payload: {
        subCategoryName: string;
      };
    };

type CategoryEditReducer = (
  state: State,
  action: LaboratoryTestSettingReducerAction
) => State;

export const laboaratoryTestSettingReducer: CategoryEditReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'changeCategoryName':
      return {
        ...state,
        name:
          state.name === action.payload.categoryName
            ? action.payload.newName
            : state.name
      };
    case 'changeCategoryPrice':
      return {
        ...state,
        price:
          state.name === action.payload.categoryName
            ? action.payload.newPrice
            : state.price
      };
    case 'changeSubCategoryName':
      if (!state.subCategories) {
        return { ...state };
      }
      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => ({
          ...subCategory,
          name:
            subCategory.name === action.payload.subCategoryName
              ? action.payload.newName
              : subCategory.name
        }))
      };
    case 'changeSubCategoryPrice':
      if (!state.subCategories) {
        return { ...state };
      }
      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => ({
          ...subCategory,
          price:
            subCategory.name === action.payload.subCategoryName
              ? action.payload.newPrice
              : subCategory.price
        }))
      };
    case 'addNewTest':
      return {
        ...state,
        tests: [
          ...state.tests,
          {
            name: action.payload.name,
            individualPrice: action.payload.price,
            hasIndividualPrice: true,
            hasNormalValue: false,
            value: '',
            isInfluencedByCategory: false
          }
        ]
      };
    case 'deleteTest':
      return {
        ...state,
        tests: state.tests.filter(test => test.name !== action.payload.name)
      };
    case 'addNewSubCategory':
      if (!state.subCategories) {
        return {
          ...state,
          subCategories: [
            {
              name: action.payload.name,
              price: action.payload.price,
              tests: []
            }
          ]
        };
      }
      return {
        ...state,
        subCategories: [
          ...state.subCategories,
          {
            name: action.payload.name,
            price: action.payload.price,
            tests: []
          }
        ]
      };
    case 'deleteSubCategory':
      return {
        ...state,
        subCategories: state.subCategories?.filter(
          subCategory => subCategory.name !== action.payload.name
        )
      };
    case 'addNewSubCategoryTest':
      if (!state.subCategories) {
        console.log('error check this log, isnt supposed to happen');
        return { ...state };
      }
      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => {
          if (subCategory.name !== action.payload.subCategoryName) {
            return {
              ...subCategory
            };
          }
          return {
            ...subCategory,
            tests: [
              ...subCategory.tests,
              {
                name: action.payload.testName,
                value: '',
                hasNormalValue: false
              }
            ]
          };
        })
      };
    case 'deleteSubCategoryTest':
      if (!state.subCategories) {
        console.log('error check this log, isnt supposed to happen');
        return { ...state };
      }
      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => {
          if (subCategory.name !== action.payload.subCategoryName) {
            return {
              ...subCategory
            };
          }
          return {
            ...subCategory,
            tests: subCategory.tests.filter(
              test => test.name !== action.payload.name
            )
          };
        })
      };
    case 'changeTestPrice':
      return {
        ...state,
        tests: state.tests.map(test => ({
          ...test,
          individualPrice:
            test.name === action.payload.testName
              ? action.payload.price
              : test.individualPrice
        }))
      };
    case 'changeTestNormalValue':
      return {
        ...state,
        tests: state.tests.map(test => ({
          ...test,
          normalValue:
            test.name === action.payload.testName
              ? action.payload.normalValue
              : test.normalValue
        }))
      };
    case 'changeSubCategoryTestNormalValue':
      if (!state.subCategories) {
        return { ...state };
      }
      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => ({
          ...subCategory,
          tests:
            subCategory.name === action.payload.subCategoryName
              ? subCategory.tests.map(test => ({
                  ...test,
                  normalValue:
                    test.name === action.payload.testName
                      ? action.payload.normalValue
                      : test.normalValue
                }))
              : subCategory.tests
        }))
      };
    case 'addNewCommonValueForTest':
      console.log(state);
      return {
        ...state,
        tests: state.tests.map(test => {
          if (test.name !== action.payload.testName) {
            return { ...test };
          }
          return {
            ...test,
            commonValues: !test.commonValues
              ? [action.payload.newCommonValue]
              : [...test.commonValues, action.payload.newCommonValue]
          };
        })
      };
    case 'deleteCommonValueForTest':
      return {
        ...state,
        tests: state.tests.map(test => {
          if (test.name !== action.payload.testName) {
            return { ...test };
          }

          return {
            ...test,
            commonValues: test.commonValues?.filter(
              (_, index) => index !== action.payload.commonValueIndex
            )
          };
        })
      };
    case 'addNewCommonValueForSubCategoryTest':
      if (!state.subCategories) {
        console.log('NOt supposed to happen');
        return { ...state };
      }

      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => {
          if (subCategory.name !== action.payload.subCategoryName) {
            return { ...subCategory };
          }
          return {
            ...subCategory,
            tests: subCategory.tests.map(test => {
              if (test.name !== action.payload.testName) {
                return { ...test };
              }
              return {
                ...test,
                commonValues: !test.commonValues
                  ? [action.payload.newCommonValue]
                  : [...test.commonValues, action.payload.newCommonValue]
              };
            })
          };
        })
      };

    case 'deleteCommonValueForSubCategoryTest':
      if (!state.subCategories) {
        console.log('NOt supposed to happen');
        return { ...state };
      }

      return {
        ...state,
        subCategories: state.subCategories.map(subCategory => {
          if (subCategory.name !== action.payload.subCategoryName) {
            return { ...subCategory };
          }
          return {
            ...subCategory,
            tests: subCategory.tests.map(test => {
              if (test.name !== action.payload.testName) {
                return { ...test };
              }
              return {
                ...test,

                commonValues: test.commonValues?.filter(
                  (_, index) => index !== action.payload.commonValueIndex
                )
              };
            })
          };
        })
      };

    case 'changeCommonValue':
      return {
        ...state
        // tests: state.tests.map(test => ({
        //   ...test,
        //   commonValues:
        //     test.name === action.payload.testName && test.commonValues
        //       ? test.commonValues.map((value, index) =>
        //           index === action.payload.index
        //             ? [...value, action.payload.newCommonValue]
        //             : [...value]
        //         )
        //       : test.commonValues
        // }))
      };
    case 'isTestInfluencedByCategory':
      return {
        ...state,
        tests: state.tests.map(test => {
          if (test.name === action.payload.testName) {
            return {
              ...test,
              isInfluencedByCategory: action.payload.isInfluencedByCategory,
              hasIndividualPrice: !action.payload.isInfluencedByCategory
                ? true
                : test.hasIndividualPrice
            };
          }
          return { ...test };
        })
      };
    case 'hasIndividualPrice':
      return {
        ...state,
        tests: state.tests.map(test => ({
          ...test,
          hasIndividualPrice:
            test.name === action.payload.testName
              ? action.payload.hasIndividualPrice
              : test.hasIndividualPrice
        }))
      };
    case 'hasNormalValue':
      return {
        ...state,
        tests: state.tests.map(test => ({
          ...test,
          hasNormalValue:
            test.name === action.payload.testName
              ? action.payload.hasNormalValue
              : test.hasNormalValue
        }))
      };
    case 'hasSubCategoryTestNormalValue':
      return {
        ...state,
        subCategories:
          state.subCategories &&
          state.subCategories.map(subCategory => ({
            ...subCategory,
            tests:
              subCategory.name === action.payload.subCategoryName
                ? subCategory.tests.map(test => ({
                    ...test,
                    hasNormalValue:
                      test.name === action.payload.testName
                        ? action.payload.hasNormalValue
                        : test.hasNormalValue
                  }))
                : subCategory.tests
          }))
      };
    default:
      return { ...state };
  }
};