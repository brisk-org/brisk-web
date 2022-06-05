import { LaboratoryTestCategoriesQuery } from '../generated/graphql';

type Category = LaboratoryTestCategoriesQuery['laboratoryTestCategories'][0];
interface State extends Omit<Category, '__typename'> {
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
      type: 'hasPrice';
      payload: {
        testName: string;
        hasPrice: boolean;
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

// export const laboaratoryTestSettingReducer: CategoryEditReducer = (
//   state,
//   action
// ) => {
//   switch (action.type) {
//     case 'changeCategoryName':
//       return {
//         ...state,

//         name:
//           state.name === action.payload.categoryName
//             ? action.payload.newName
//             : state.name
//       };
//     case 'changeCategoryPrice':
//       return {
//         ...state,
//         price:
//           state.name === action.payload.categoryName
//             ? action.payload.newPrice
//             : state.price
//       };
//     case 'changeSubCategoryName':
//       if (!state.subCategories) {
//         return { ...state };
//       }
//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => ({
//           ...subCategory,
//           name:
//             subCategory.name === action.payload.subCategoryName
//               ? action.payload.newName
//               : subCategory.name
//         }))
//       };
//     case 'changeSubCategoryPrice':
//       if (!state.subCategories) {
//         return { ...state };
//       }
//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => ({
//           ...subCategory,
//           price:
//             subCategory.name === action.payload.subCategoryName
//               ? action.payload.newPrice
//               : subCategory.price
//         }))
//       };
//     case 'addNewTest':
//       return {
//         ...state,
//         laboratoryTests: [
//           ...state.laboratoryTests,
//           {
//             name: action.payload.name,
//             price: action.payload.price,
//             hasPrice: true,
//             value: '',
//             isInfluencedByCategory: false
//           }
//         ]
//       };
//     case 'deleteTest':
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.filter(
//           test => test.name !== action.payload.name
//         )
//       };
//     case 'addNewSubCategory':
//       if (!state.subCategories) {
//         return {
//           ...state,
//           subCategories: [
//             {
//               name: action.payload.name,
//               price: action.payload.price,
//               laboratoryTests: []
//             }
//           ]
//         };
//       }
//       return {
//         ...state,
//         subCategories: [
//           ...state.subCategories,
//           {
//             name: action.payload.name,
//             price: action.payload.price,
//             laboratoryTests: []
//           }
//         ]
//       };
//     case 'deleteSubCategory':
//       return {
//         ...state,
//         subCategories: state.subCategories?.filter(
//           subCategory => subCategory.name !== action.payload.name
//         )
//       };
//     case 'addNewSubCategoryTest':
//       if (!state.subCategories) {
//         console.log('error check this log, isnt supposed to happen');
//         return { ...state };
//       }
//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => {
//           if (subCategory.name !== action.payload.subCategoryName) {
//             return {
//               ...subCategory
//             };
//           }
//           return {
//             ...subCategory,
//             laboratoryTests: [
//               ...subCategory.laboratoryTests,
//               {
//                 name: action.payload.testName,
//                 value: ''
//               }
//             ]
//           };
//         })
//       };
//     case 'deleteSubCategoryTest':
//       if (!state.subCategories) {
//         console.log('error check this log, isnt supposed to happen');
//         return { ...state };
//       }
//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => {
//           if (subCategory.name !== action.payload.subCategoryName) {
//             return {
//               ...subCategory
//             };
//           }
//           return {
//             ...subCategory,
//             laboratoryTests: subCategory.laboratoryTests.filter(
//               test => test.name !== action.payload.name
//             )
//           };
//         })
//       };
//     case 'changeTestPrice':
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.map(test => ({
//           ...test,
//           price:
//             test.name === action.payload.testName
//               ? action.payload.price
//               : test.price
//         }))
//       };
//     case 'changeTestNormalValue':
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.map(test => ({
//           ...test,
//           normalValue:
//             test.name === action.payload.testName
//               ? action.payload.normalValue
//               : test.normalValue
//         }))
//       };
//     case 'changeSubCategoryTestNormalValue':
//       if (!state.subCategories) {
//         return { ...state };
//       }
//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => ({
//           ...subCategory,
//           laboratoryTests:
//             subCategory.name === action.payload.subCategoryName
//               ? subCategory.laboratoryTests.map(test => ({
//                   ...test,
//                   normalValue:
//                     test.name === action.payload.testName
//                       ? action.payload.normalValue
//                       : test.normalValue
//                 }))
//               : subCategory.laboratoryTests
//         }))
//       };
//     case 'addNewCommonValueForTest':
//       console.log(state);
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.map(test => {
//           if (test.name !== action.payload.testName) {
//             return { ...test };
//           }
//           return {
//             ...test,
//             commonValues: !test.commonValues
//               ? [action.payload.newCommonValue]
//               : [...test.commonValues, action.payload.newCommonValue]
//           };
//         })
//       };
//     case 'deleteCommonValueForTest':
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.map(test => {
//           if (test.name !== action.payload.testName) {
//             return { ...test };
//           }

//           return {
//             ...test,
//             commonValues: test.commonValues?.filter(
//               (_, index) => index !== action.payload.commonValueIndex
//             )
//           };
//         })
//       };
//     case 'addNewCommonValueForSubCategoryTest':
//       if (!state.subCategories) {
//         console.log('NOt supposed to happen');
//         return { ...state };
//       }

//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => {
//           if (subCategory.name !== action.payload.subCategoryName) {
//             return { ...subCategory };
//           }
//           return {
//             ...subCategory,
//             laboratoryTests: subCategory.laboratoryTests.map(test => {
//               if (test.name !== action.payload.testName) {
//                 return { ...test };
//               }
//               return {
//                 ...test,
//                 commonValues: !test.commonValues
//                   ? [action.payload.newCommonValue]
//                   : [...test.commonValues, action.payload.newCommonValue]
//               };
//             })
//           };
//         })
//       };

//     case 'deleteCommonValueForSubCategoryTest':
//       if (!state.subCategories) {
//         console.log('NOt supposed to happen');
//         return { ...state };
//       }

//       return {
//         ...state,
//         subCategories: state.subCategories.map(subCategory => {
//           if (subCategory.name !== action.payload.subCategoryName) {
//             return { ...subCategory };
//           }
//           return {
//             ...subCategory,
//             laboratoryTests: subCategory.laboratoryTests.map(test => {
//               if (test.name !== action.payload.testName) {
//                 return { ...test };
//               }
//               return {
//                 ...test,

//                 commonValues: test.commonValues?.filter(
//                   (_, index) => index !== action.payload.commonValueIndex
//                 )
//               };
//             })
//           };
//         })
//       };

//     case 'changeCommonValue':
//       return {
//         ...state
//         // tests: state.tests.map(test => ({
//         //   ...test,
//         //   commonValues:
//         //     test.name === action.payload.testName && test.commonValues
//         //       ? test.commonValues.map((value, index) =>
//         //           index === action.payload.index
//         //             ? [...value, action.payload.newCommonValue]
//         //             : [...value]
//         //         )
//         //       : test.commonValues
//         // }))
//       };
//     case 'isTestInfluencedByCategory':
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.map(test => {
//           if (test.name === action.payload.testName) {
//             return {
//               ...test,
//               isInfluencedByCategory: action.payload.isInfluencedByCategory,
//               hasPrice: !action.payload.isInfluencedByCategory
//                 ? true
//                 : test.hasPrice
//             };
//           }
//           return { ...test };
//         })
//       };
//     case 'hasPrice':
//       return {
//         ...state,
//         laboratoryTests: state.laboratoryTests.map(test => ({
//           ...test,
//           hasPrice:
//             test.name === action.payload.testName
//               ? action.payload.hasPrice
//               : test.hasPrice
//         }))
//       };

//     default:
//       return { ...state };
//   }
// };
