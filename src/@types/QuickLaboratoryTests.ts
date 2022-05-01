import {
  QuickLaboratoryTest,
  QuickPrescriptionTest
} from '../generated/graphql';

export type QuickPrescriptionType = {
  __typename?: 'QuickPrescriptionTest' | undefined;
} & Pick<
  QuickPrescriptionTest,
  | 'id'
  | 'price'
  | 'paid'
  | 'result'
  | 'completed'
  | 'new'
  | 'name'
  | 'other'
  | 'created_at'
  | 'updated_at'
>;
export type QuickLabTestType = {
  __typename?: 'QuickLaboratoryTest' | undefined;
} & Pick<
  QuickLaboratoryTest,
  | 'id'
  | 'price'
  | 'paid'
  | 'result'
  | 'completed'
  | 'new'
  | 'name'
  | 'other'
  | 'created_at'
>;
