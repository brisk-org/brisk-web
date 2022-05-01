import { Card, PrescriptionTest } from '../generated/graphql';

export type PrescriptionTestType = {
  __typename?: 'PrescriptionTest' | undefined;
} & Pick<
  PrescriptionTest,
  'id' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at'
> & {
    card: { __typename?: 'Card' } & Pick<
      Card,
      'id' | 'name' | 'age' | 'gender'
    >;
  };
