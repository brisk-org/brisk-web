import { Card, History } from '../generated/graphql';

export type HistoryType = {
  __typename?: 'History' | undefined;
} & Pick<History, 'result' | 'created_at'> & {
    card: {
      __typename?: 'Card' | undefined;
    } & Pick<Card, 'name' | 'id' | 'age'>;
  };
