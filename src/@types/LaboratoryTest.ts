import { Card, LaboratoryTest } from '../generated/graphql';

export type LaboratoryTestType = {
  __typename?: 'LaboratoryTest' | undefined;
} & Pick<
  LaboratoryTest,
  'id' | 'paid' | 'completed' | 'price' | 'new' | 'created_at'
> & {
    card: {
      __typename?: 'Card';
    } & Pick<Card, 'id' | 'name'>;
  };
