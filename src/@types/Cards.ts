import { Maybe } from 'graphql/jsutils/Maybe';
import { Card, CardSales, History, LaboratoryTest } from '../generated/graphql';

export type CardType = { __typename?: 'Card' } & Pick<
  Card,
  | 'id'
  | 'name'
  | 'new'
  | 'phone'
  | 'age'
  | 'gender'
  | 'valid'
  | 'address'
  | 'k_ketema'
  | 'kebele'
  | 'house_no'
  | 'created_at'
  | 'updated_at'
> & {
    history?: Maybe<
      Array<{ __typename?: 'History' } & Pick<History, 'id' | 'created_at'>>
    >;
  };

export type FullCardType = { __typename?: 'Card' } & Pick<
  Card,
  | 'id'
  | 'name'
  | 'new'
  | 'phone'
  | 'age'
  | 'gender'
  | 'address'
  | 'k_ketema'
  | 'kebele'
  | 'house_no'
  | 'created_at'
  | 'updated_at'
> & {
    payment?: Maybe<
      Array<
        { __typename?: 'CardSales' } & Pick<CardSales, 'price' | 'created_at'>
      >
    >;
    tests?: Maybe<
      Array<
        { __typename?: 'LaboratoryTest' } & Pick<
          LaboratoryTest,
          | 'id'
          | 'cardId'
          | 'result'
          | 'paid'
          | 'new'
          | 'completed'
          | 'price'
          | 'created_at'
          | 'updated_at'
        >
      >
    >;
    history?: Maybe<
      Array<
        { __typename?: 'History' } & Pick<
          History,
          'id' | 'result' | 'created_at' | 'updated_at'
        >
      >
    >;
  };

export type CardsType =
  | ({
      __typename?: 'Card' | undefined;
    } & Pick<
      Card,
      | 'id'
      | 'name'
      | 'new'
      | 'phone'
      | 'age'
      | 'gender'
      | 'valid'
      | 'address'
      | 'k_ketema'
      | 'kebele'
      | 'house_no'
      | 'history'
      | 'created_at'
      | 'updated_at'
    >)[]
  | undefined;

export type HistoryFromCardQuery = {
  __typename?: 'History';
} & Pick<History, 'id' | 'cardId' | 'result' | 'created_at'>;
export type TestsFromCardQuery = {
  __typename?: 'LaboratoryTest';
} & Pick<
  LaboratoryTest,
  | 'id'
  | 'new'
  | 'result'
  | 'paid'
  | 'completed'
  | 'price'
  | 'created_at'
  | 'updated_at'
>;
