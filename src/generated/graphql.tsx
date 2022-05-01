import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  laboratory_tests?: Maybe<Array<LaboratoryTest>>;
  prescription_tests?: Maybe<Array<PrescriptionTest>>;
  name: Scalars['String'];
  phone: Scalars['String'];
  age: Scalars['String'];
  new: Scalars['Boolean'];
  valid: Scalars['Boolean'];
  visited_count: Scalars['Float'];
  gender: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  k_ketema?: Maybe<Scalars['String']>;
  kebele?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  payment?: Maybe<Array<CardSales>>;
  history?: Maybe<Array<History>>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type CardProfileInput = {
  name: Scalars['String'];
  phone: Scalars['String'];
  gender: Scalars['String'];
  age: Scalars['String'];
  kebele?: Maybe<Scalars['String']>;
  k_ketema?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type CardSales = {
  __typename?: 'CardSales';
  id: Scalars['ID'];
  card: Card;
  price: Scalars['Float'];
  created_at: Scalars['String'];
};

export type ChangeSettingsInput = {
  card_price: Scalars['Float'];
  card_expiration_date: Scalars['Float'];
  laboratory_tests_data: Array<LaboratoryTestSettingInput>;
  prescription_tests_data: Array<PrescriptionInput>;
};

export type CompleteQuickLabTestInput = {
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
};

export type CompleteQuickPrescriptionTestInput = {
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
};

export type CreateLaboratoryTestInput = {
  cardId: Scalars['ID'];
  price: Scalars['Float'];
  result: Array<LaboratoryTestInput>;
};

export type CreatePrescriptionTestInput = {
  cardId: Scalars['ID'];
  price: Scalars['Float'];
  result: Array<PrescriptionInput>;
};

export type CreateProductInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  desc: Scalars['String'];
};

export type CreateQuickLabTestInput = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  result: Scalars['String'];
  other?: Maybe<Scalars['String']>;
};

export type CreateQuickPrescriptionTestInput = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  result: QuickPrescriptionTestResults;
  other?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type History = {
  __typename?: 'History';
  id: Scalars['ID'];
  cardId: Scalars['Float'];
  card: Card;
  result: Scalars['String'];
  file_path?: Maybe<Array<Scalars['String']>>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type LaboratoryTest = {
  __typename?: 'LaboratoryTest';
  id: Scalars['ID'];
  cardId: Scalars['Float'];
  card: Card;
  result: Scalars['String'];
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type LaboratoryTestInput = {
  name: Scalars['String'];
  category: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type LaboratoryTestSettingInput = {
  name: Scalars['String'];
  category: Scalars['String'];
  price: Scalars['Float'];
  normalValue?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  changeUserDetail: UserResponse;
  uploadPhoto: User;
  deleteUser: Scalars['Float'];
  createLaboratoryTest: LaboratoryTest;
  completeLaboratoryTest: LaboratoryTest;
  completeLaterLaboratoryTest: LaboratoryTest;
  payForLaboratoryTest: LaboratoryTest;
  deleteLaboratoryTest: Scalars['Boolean'];
  markLaboratoryTestAsSeen: LaboratoryTest;
  changeSetting: Settings;
  createCard: Card;
  updateCard: Card;
  deleteCard: Scalars['Boolean'];
  markCardAsNew: Card;
  markCardAsSeen: Card;
  invalidateCard: Card;
  createHistory: History;
  updateHistory: History;
  deleteHistory: Scalars['Boolean'];
  createPrescriptionTest: PrescriptionTest;
  markPrescriptionTestAsCompleted: PrescriptionTest;
  markPrescriptionTestAsPaid: PrescriptionTest;
  deletePrescriptionTest: Scalars['Boolean'];
  markPrescriptionTestAsSeen: PrescriptionTest;
  createQuickPrescriptionTest: QuickPrescriptionTest;
  completeQuickPrescriptionTest: QuickPrescriptionTest;
  markQuickPrescriptionTestAsPaid: QuickPrescriptionTest;
  markQuickPrescriptionTestAsSeen: QuickPrescriptionTest;
  createQuickLaboratoryTest: QuickLaboratoryTest;
  completeQuickLaboratoryTest: QuickLaboratoryTest;
  markQuickLaboratoryTestAsPaid: QuickLaboratoryTest;
  markQuickLaboratoryTestAsSeen: QuickLaboratoryTest;
  deleteNotification: Scalars['Boolean'];
  clearNotification: Scalars['Boolean'];
  createProduct: Product;
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  occupation: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangeUserDetailArgs = {
  newName?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLaboratoryTestArgs = {
  input: CreateLaboratoryTestInput;
};


export type MutationCompleteLaboratoryTestArgs = {
  result: Array<LaboratoryTestInput>;
  id: Scalars['ID'];
};


export type MutationCompleteLaterLaboratoryTestArgs = {
  result: Array<LaboratoryTestInput>;
  id: Scalars['ID'];
};


export type MutationPayForLaboratoryTestArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLaboratoryTestArgs = {
  id: Scalars['ID'];
};


export type MutationMarkLaboratoryTestAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationChangeSettingArgs = {
  setting: ChangeSettingsInput;
};


export type MutationCreateCardArgs = {
  profile: CardProfileInput;
};


export type MutationUpdateCardArgs = {
  id: Scalars['ID'];
  profile: CardProfileInput;
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID'];
};


export type MutationMarkCardAsNewArgs = {
  id: Scalars['ID'];
};


export type MutationMarkCardAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationInvalidateCardArgs = {
  id: Scalars['ID'];
};


export type MutationCreateHistoryArgs = {
  result: Scalars['String'];
  id: Scalars['ID'];
};


export type MutationUpdateHistoryArgs = {
  result: Scalars['String'];
  id: Scalars['ID'];
};


export type MutationDeleteHistoryArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePrescriptionTestArgs = {
  rx: Scalars['String'];
  main: CreatePrescriptionTestInput;
};


export type MutationMarkPrescriptionTestAsCompletedArgs = {
  id: Scalars['ID'];
};


export type MutationMarkPrescriptionTestAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePrescriptionTestArgs = {
  id: Scalars['ID'];
};


export type MutationMarkPrescriptionTestAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationCreateQuickPrescriptionTestArgs = {
  input: CreateQuickPrescriptionTestInput;
};


export type MutationCompleteQuickPrescriptionTestArgs = {
  id: Scalars['String'];
  input: CompleteQuickPrescriptionTestInput;
};


export type MutationMarkQuickPrescriptionTestAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationMarkQuickPrescriptionTestAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationCreateQuickLaboratoryTestArgs = {
  input: CreateQuickLabTestInput;
};


export type MutationCompleteQuickLaboratoryTestArgs = {
  id: Scalars['String'];
  input: CompleteQuickLabTestInput;
};


export type MutationMarkQuickLaboratoryTestAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationMarkQuickLaboratoryTestAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProductArgs = {
  product: CreateProductInput;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  desc: Scalars['String'];
  card_id?: Maybe<Scalars['Float']>;
  laboratory_test_id?: Maybe<Scalars['Float']>;
  prescription_test_id?: Maybe<Scalars['Float']>;
  quick_prescription_test_id?: Maybe<Scalars['Float']>;
  quick_laboratory_test_id?: Maybe<Scalars['Float']>;
  action: Scalars['String'];
  created_at: Scalars['String'];
};

export type PrescriptionInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity?: Maybe<Scalars['String']>;
  perDay: Scalars['String'];
  forDays: Scalars['Float'];
  other?: Maybe<Scalars['String']>;
};

export type PrescriptionTest = {
  __typename?: 'PrescriptionTest';
  id: Scalars['ID'];
  cardId: Scalars['Float'];
  card: Card;
  result: Scalars['String'];
  rx: Scalars['String'];
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  desc: Scalars['String'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  me?: Maybe<User>;
  laboratoryTestsCount: Scalars['Float'];
  laboratoryTests: Array<LaboratoryTest>;
  laboratoryTest: LaboratoryTest;
  searchLaboratoryTests: Array<LaboratoryTest>;
  setting: Settings;
  cardsCount: Scalars['Float'];
  cards: Array<Card>;
  card: Card;
  searchCards: Array<Card>;
  cardSales: Array<CardSales>;
  histories: Array<History>;
  weeklyHistory: Array<History>;
  history: History;
  prescriptionTestsCount: Scalars['Float'];
  prescriptionTests: Array<PrescriptionTest>;
  prescriptionTest: PrescriptionTest;
  searchPrescriptionTests: Array<PrescriptionTest>;
  quickPrescriptionTestsCount: Scalars['Float'];
  quickPrescriptionTests: Array<QuickPrescriptionTest>;
  quickLaboratoryTestsCount: Scalars['Float'];
  quickLaboratoryTests: Array<QuickLaboratoryTest>;
  notifications: Array<Notification>;
  productsCount: Scalars['Float'];
  products: Array<Product>;
  product: Product;
  searchProducts: Array<Product>;
};


export type QueryLaboratoryTestsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryLaboratoryTestArgs = {
  id: Scalars['ID'];
};


export type QuerySearchLaboratoryTestsArgs = {
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryCardsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryCardArgs = {
  id: Scalars['ID'];
};


export type QuerySearchCardsArgs = {
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryWeeklyHistoryArgs = {
  endingDate: Scalars['String'];
  startingDate: Scalars['String'];
};


export type QueryHistoryArgs = {
  id: Scalars['ID'];
};


export type QueryPrescriptionTestsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryPrescriptionTestArgs = {
  id: Scalars['ID'];
};


export type QuerySearchPrescriptionTestsArgs = {
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryQuickPrescriptionTestsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryQuickLaboratoryTestsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QuerySearchProductsArgs = {
  name?: Maybe<Scalars['String']>;
  skip: Scalars['Float'];
  take: Scalars['Float'];
};

export type QuickLaboratoryTest = {
  __typename?: 'QuickLaboratoryTest';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  paid: Scalars['Boolean'];
  result: Scalars['String'];
  other?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type QuickPrescriptionTest = {
  __typename?: 'QuickPrescriptionTest';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  paid: Scalars['Boolean'];
  result: Scalars['String'];
  other?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type QuickPrescriptionTestResults = {
  bp: Scalars['Boolean'];
  dressing: Scalars['Boolean'];
  injection: Scalars['Boolean'];
  tat: Scalars['Boolean'];
  depo: Scalars['Boolean'];
  other?: Maybe<Scalars['String']>;
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  card_price: Scalars['Float'];
  laboratory_tests_data: Scalars['String'];
  prescription_tests_data: Scalars['String'];
  card_expiration_date: Scalars['Float'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newCreatedLaboratoryTest: LaboratoryTest;
  newCreatedCard: Card;
  newCreatedPrescriptionTest: PrescriptionTest;
  newCreatedQuickPrescriptionTest: QuickPrescriptionTest;
  newCreatedQuickLaboratoryTest: QuickLaboratoryTest;
  newNotificationSubscription: Notification;
  deleteNotificationSubscription: Notification;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  occupation: Scalars['String'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type CreateCardMutationVariables = Exact<{
  name: Scalars['String'];
  phone: Scalars['String'];
  age: Scalars['String'];
  gender: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  k_ketema?: Maybe<Scalars['String']>;
  kebele?: Maybe<Scalars['String']>;
}>;


export type CreateCardMutation = (
  { __typename?: 'Mutation' }
  & { createCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'phone' | 'age' | 'gender' | 'valid' | 'address' | 'k_ketema' | 'kebele' | 'house_no' | 'created_at' | 'updated_at'>
  ) }
);

export type DeleteCardMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCard'>
);

export type InvalidateCardMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type InvalidateCardMutation = (
  { __typename?: 'Mutation' }
  & { invalidateCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'valid'>
  ) }
);

export type MarkCardAsNewMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkCardAsNewMutation = (
  { __typename?: 'Mutation' }
  & { markCardAsNew: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'valid'>
  ) }
);

export type MarkCardAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkCardAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markCardAsSeen: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'new' | 'name'>
  ) }
);

export type UpdateCardMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
  age: Scalars['String'];
  gender: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  house_no?: Maybe<Scalars['String']>;
  k_ketema?: Maybe<Scalars['String']>;
  kebele?: Maybe<Scalars['String']>;
}>;


export type UpdateCardMutation = (
  { __typename?: 'Mutation' }
  & { updateCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'phone' | 'age' | 'gender' | 'valid' | 'address' | 'k_ketema' | 'kebele' | 'house_no' | 'created_at' | 'updated_at'>
  ) }
);

export type CreateHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
  result: Scalars['String'];
}>;


export type CreateHistoryMutation = (
  { __typename?: 'Mutation' }
  & { createHistory: (
    { __typename?: 'History' }
    & Pick<History, 'id' | 'result' | 'created_at'>
  ) }
);

export type DeleteHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteHistoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHistory'>
);

export type UpdateHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
  result: Scalars['String'];
}>;


export type UpdateHistoryMutation = (
  { __typename?: 'Mutation' }
  & { updateHistory: (
    { __typename?: 'History' }
    & Pick<History, 'id' | 'result' | 'created_at'>
  ) }
);

export type CompleteLaboratoryTestMutationVariables = Exact<{
  result: Array<LaboratoryTestInput> | LaboratoryTestInput;
  id: Scalars['ID'];
}>;


export type CompleteLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { completeLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'result' | 'paid' | 'completed' | 'new' | 'price' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'phone'>
    ) }
  ) }
);

export type CompleteLaterLaboratoryTestMutationVariables = Exact<{
  result: Array<LaboratoryTestInput> | LaboratoryTestInput;
  id: Scalars['ID'];
}>;


export type CompleteLaterLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { completeLaterLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'result' | 'paid' | 'completed' | 'new' | 'price' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'phone'>
    ) }
  ) }
);

export type CreateLaboratoryTestMutationVariables = Exact<{
  cardId: Scalars['ID'];
  result: Array<LaboratoryTestInput> | LaboratoryTestInput;
  price: Scalars['Float'];
}>;


export type CreateLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { createLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'price'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name'>
    ) }
  ) }
);

export type DeleteLaboratoryTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLaboratoryTest'>
);

export type MarkLaboratoryTestAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkLaboratoryTestAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markLaboratoryTestAsSeen: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name'>
    ) }
  ) }
);

export type PayForLaboratoryTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PayForLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { payForLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id'>
  ) }
);

export type ClearNotificationMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clearNotification'>
);

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNotification'>
);

export type CreatePrescriptionTestMutationVariables = Exact<{
  cardId: Scalars['ID'];
  result: Array<PrescriptionInput> | PrescriptionInput;
  price: Scalars['Float'];
  rx: Scalars['String'];
}>;


export type CreatePrescriptionTestMutation = (
  { __typename?: 'Mutation' }
  & { createPrescriptionTest: (
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'price' | 'result' | 'rx'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name'>
    ) }
  ) }
);

export type DeletePrescriptionTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePrescriptionTestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePrescriptionTest'>
);

export type MarkPrescriptionTestAsCompletedMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkPrescriptionTestAsCompletedMutation = (
  { __typename?: 'Mutation' }
  & { markPrescriptionTestAsCompleted: (
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'new'>
  ) }
);

export type MarkPrescriptionTestAsPaidMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkPrescriptionTestAsPaidMutation = (
  { __typename?: 'Mutation' }
  & { markPrescriptionTestAsPaid: (
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'paid'>
  ) }
);

export type MarkPrescriptionTestAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkPrescriptionTestAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markPrescriptionTestAsSeen: (
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'new'>
  ) }
);

export type CompleteQuickLaboratoryTestMutationVariables = Exact<{
  id: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
}>;


export type CompleteQuickLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { completeQuickLaboratoryTest: (
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
  ) }
);

export type CreateQuickLaboratoryTestMutationVariables = Exact<{
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  result: Scalars['String'];
  other?: Maybe<Scalars['String']>;
}>;


export type CreateQuickLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { createQuickLaboratoryTest: (
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
  ) }
);

export type MarkQuickLaboratoryTestAsPaidMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickLaboratoryTestAsPaidMutation = (
  { __typename?: 'Mutation' }
  & { markQuickLaboratoryTestAsPaid: (
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'paid'>
  ) }
);

export type MarkQuickLaboratoryTestAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickLaboratoryTestAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markQuickLaboratoryTestAsSeen: (
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'new'>
  ) }
);

export type CompleteQuickPrescriptionTestMutationVariables = Exact<{
  id: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
}>;


export type CompleteQuickPrescriptionTestMutation = (
  { __typename?: 'Mutation' }
  & { completeQuickPrescriptionTest: (
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'name' | 'price' | 'result' | 'other' | 'created_at'>
  ) }
);

export type CreateQuickPrescriptionTestMutationVariables = Exact<{
  name: Scalars['String'];
  result: QuickPrescriptionTestResults;
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
}>;


export type CreateQuickPrescriptionTestMutation = (
  { __typename?: 'Mutation' }
  & { createQuickPrescriptionTest: (
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'name' | 'price' | 'result' | 'other' | 'created_at'>
  ) }
);

export type MarkQuickPrescriptionTestAsPaidMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickPrescriptionTestAsPaidMutation = (
  { __typename?: 'Mutation' }
  & { markQuickPrescriptionTestAsPaid: (
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'paid'>
  ) }
);

export type MarkQuickPrescriptionTestAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickPrescriptionTestAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markQuickPrescriptionTestAsSeen: (
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'new'>
  ) }
);

export type ChangeSettingMutationVariables = Exact<{
  card_price: Scalars['Float'];
  card_expiration_date: Scalars['Float'];
  laboratory_tests_data: Array<LaboratoryTestSettingInput> | LaboratoryTestSettingInput;
  prescription_tests_data: Array<PrescriptionInput> | PrescriptionInput;
}>;


export type ChangeSettingMutation = (
  { __typename?: 'Mutation' }
  & { changeSetting: (
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'card_price' | 'card_expiration_date' | 'laboratory_tests_data' | 'prescription_tests_data'>
  ) }
);

export type ChangeUserDetailMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  newName?: Maybe<Scalars['String']>;
}>;


export type ChangeUserDetailMutation = (
  { __typename?: 'Mutation' }
  & { changeUserDetail: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'occupation'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'occupation'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  occupation: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'occupation'>
    )> }
  ) }
);

export type CardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CardQuery = (
  { __typename?: 'Query' }
  & { card: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'phone' | 'age' | 'gender' | 'address' | 'k_ketema' | 'kebele' | 'house_no' | 'created_at' | 'updated_at'>
    & { payment?: Maybe<Array<(
      { __typename?: 'CardSales' }
      & Pick<CardSales, 'price' | 'created_at'>
    )>>, prescription_tests?: Maybe<Array<(
      { __typename?: 'PrescriptionTest' }
      & Pick<PrescriptionTest, 'id' | 'cardId' | 'result' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    )>>, laboratory_tests?: Maybe<Array<(
      { __typename?: 'LaboratoryTest' }
      & Pick<LaboratoryTest, 'id' | 'cardId' | 'result' | 'paid' | 'new' | 'completed' | 'price' | 'created_at' | 'updated_at'>
    )>>, history?: Maybe<Array<(
      { __typename?: 'History' }
      & Pick<History, 'id' | 'result' | 'cardId' | 'created_at' | 'updated_at'>
    )>> }
  ) }
);

export type CardsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type CardsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'cardsCount'>
);

export type CardsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
}>;


export type CardsQuery = (
  { __typename?: 'Query' }
  & { cards: Array<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'phone' | 'age' | 'gender' | 'valid' | 'address' | 'k_ketema' | 'kebele' | 'house_no' | 'created_at' | 'updated_at'>
    & { history?: Maybe<Array<(
      { __typename?: 'History' }
      & Pick<History, 'id' | 'created_at'>
    )>> }
  )> }
);

export type CardsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
}>;


export type CardsForDashboardQuery = (
  { __typename?: 'Query' }
  & { cards: Array<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'age' | 'gender' | 'created_at'>
    & { payment?: Maybe<Array<(
      { __typename?: 'CardSales' }
      & Pick<CardSales, 'id' | 'created_at' | 'price'>
    )>> }
  )> }
);

export type SearchCardsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type SearchCardsQuery = (
  { __typename?: 'Query' }
  & { searchCards: Array<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'phone' | 'age' | 'gender' | 'valid' | 'address' | 'k_ketema' | 'kebele' | 'house_no' | 'created_at' | 'updated_at'>
    & { history?: Maybe<Array<(
      { __typename?: 'History' }
      & Pick<History, 'id' | 'created_at'>
    )>> }
  )> }
);

export type HistoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type HistoryQuery = (
  { __typename?: 'Query' }
  & { history: (
    { __typename?: 'History' }
    & Pick<History, 'id' | 'result' | 'created_at'>
  ) }
);

export type HistoryAsstQueryVariables = Exact<{
  startingDate: Scalars['String'];
  endingDate: Scalars['String'];
}>;


export type HistoryAsstQuery = (
  { __typename?: 'Query' }
  & { weeklyHistory: Array<(
    { __typename?: 'History' }
    & Pick<History, 'result' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age'>
    ) }
  )> }
);

export type LaboratoryTestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LaboratoryTestQuery = (
  { __typename?: 'Query' }
  & { laboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'paid' | 'completed' | 'new' | 'price' | 'result' | 'cardId' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'phone' | 'age' | 'gender'>
    ) }
  ) }
);

export type LaboratoryTestsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type LaboratoryTestsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'laboratoryTestsCount'>
);

export type LaboratoryTestsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type LaboratoryTestsQuery = (
  { __typename?: 'Query' }
  & { laboratoryTests: Array<(
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'paid' | 'price' | 'new' | 'completed' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  )> }
);

export type LaboratoryTestsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type LaboratoryTestsForDashboardQuery = (
  { __typename?: 'Query' }
  & { laboratoryTests: Array<(
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'result' | 'price' | 'paid' | 'updated_at' | 'created_at'>
  )> }
);

export type SearchLaboratoryTestsQueryVariables = Exact<{
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type SearchLaboratoryTestsQuery = (
  { __typename?: 'Query' }
  & { searchLaboratoryTests: Array<(
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'paid' | 'price' | 'new' | 'completed' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  )> }
);

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: Array<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'desc' | 'card_id' | 'laboratory_test_id' | 'prescription_test_id' | 'quick_laboratory_test_id' | 'quick_prescription_test_id' | 'action' | 'created_at'>
  )> }
);

export type PrescriptionTestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PrescriptionTestQuery = (
  { __typename?: 'Query' }
  & { prescriptionTest: (
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'result' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ) }
  ) }
);

export type PrescriptionTestsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type PrescriptionTestsQuery = (
  { __typename?: 'Query' }
  & { prescriptionTests: Array<(
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ) }
  )> }
);

export type PrescriptionTestsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PrescriptionTestsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'prescriptionTestsCount'>
);

export type PrescriptionTestsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type PrescriptionTestsForDashboardQuery = (
  { __typename?: 'Query' }
  & { prescriptionTests: Array<(
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'paid' | 'price' | 'updated_at'>
  )> }
);

export type SearchPrescriptionTestsQueryVariables = Exact<{
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type SearchPrescriptionTestsQuery = (
  { __typename?: 'Query' }
  & { searchPrescriptionTests: Array<(
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'result' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ) }
  )> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'desc' | 'price' | 'created_at' | 'updated_at'>
  ) }
);

export type ProductsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'productsCount'>
);

export type ProductsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'desc' | 'price' | 'created_at' | 'updated_at'>
  )> }
);

export type SearchProductsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type SearchProductsQuery = (
  { __typename?: 'Query' }
  & { searchProducts: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'desc' | 'price' | 'created_at' | 'updated_at'>
  )> }
);

export type QuickLaboratoryTestsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickLaboratoryTestsQuery = (
  { __typename?: 'Query' }
  & { quickLaboratoryTests: Array<(
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'other' | 'created_at' | 'updated_at'>
  )> }
);

export type QuickLaboratoryTestsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type QuickLaboratoryTestsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'quickLaboratoryTestsCount'>
);

export type QuickLaboratoryTestsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickLaboratoryTestsForDashboardQuery = (
  { __typename?: 'Query' }
  & { quickLaboratoryTests: Array<(
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'price' | 'paid' | 'updated_at'>
  )> }
);

export type QuickPrescriptionTestsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickPrescriptionTestsQuery = (
  { __typename?: 'Query' }
  & { quickPrescriptionTests: Array<(
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'other' | 'created_at' | 'updated_at'>
  )> }
);

export type QuickPrescriptionTestsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type QuickPrescriptionTestsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'quickPrescriptionTestsCount'>
);

export type QuickPrescriptionTestsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickPrescriptionTestsForDashboardQuery = (
  { __typename?: 'Query' }
  & { quickPrescriptionTests: Array<(
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'price' | 'paid' | 'updated_at'>
  )> }
);

export type SettingQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingQuery = (
  { __typename?: 'Query' }
  & { setting: (
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'card_price' | 'card_expiration_date' | 'laboratory_tests_data' | 'prescription_tests_data'>
  ) }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'occupation' | 'created_at'>
  )> }
);

export type NewCreatedCardSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedCardSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'new' | 'phone' | 'age' | 'gender' | 'valid' | 'address' | 'k_ketema' | 'kebele' | 'house_no' | 'created_at' | 'updated_at'>
    & { payment?: Maybe<Array<(
      { __typename?: 'CardSales' }
      & Pick<CardSales, 'id' | 'created_at' | 'price'>
    )>>, history?: Maybe<Array<(
      { __typename?: 'History' }
      & Pick<History, 'id' | 'created_at'>
    )>> }
  ) }
);

export type NewCreatedLaboratoryTestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedLaboratoryTestSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'paid' | 'price' | 'new' | 'result' | 'completed' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  ) }
);

export type DeleteNotificationSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DeleteNotificationSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { deleteNotificationSubscription: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id'>
  ) }
);

export type NewNotificationSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newNotificationSubscription: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'desc' | 'card_id' | 'laboratory_test_id' | 'prescription_test_id' | 'quick_laboratory_test_id' | 'quick_prescription_test_id' | 'action' | 'created_at'>
  ) }
);

export type NewCreatedPrescriptionTestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedPrescriptionTestSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedPrescriptionTest: (
    { __typename?: 'PrescriptionTest' }
    & Pick<PrescriptionTest, 'id' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  ) }
);

export type NewCreatedQuickLaboratoryTestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedQuickLaboratoryTestSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedQuickLaboratoryTest: (
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
  ) }
);

export type NewCreatedQuickPrescriptionTestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedQuickPrescriptionTestSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedQuickPrescriptionTest: (
    { __typename?: 'QuickPrescriptionTest' }
    & Pick<QuickPrescriptionTest, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
  ) }
);


export const CreateCardDocument = gql`
    mutation CreateCard($name: String!, $phone: String!, $age: String!, $gender: String!, $address: String, $house_no: String, $k_ketema: String, $kebele: String) {
  createCard(
    profile: {name: $name, phone: $phone, gender: $gender, age: $age, kebele: $kebele, k_ketema: $k_ketema, house_no: $house_no, address: $address}
  ) {
    id
    name
    new
    phone
    age
    gender
    valid
    address
    k_ketema
    kebele
    house_no
    created_at
    updated_at
  }
}
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *      address: // value for 'address'
 *      house_no: // value for 'house_no'
 *      k_ketema: // value for 'k_ketema'
 *      kebele: // value for 'kebele'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const DeleteCardDocument = gql`
    mutation DeleteCard($id: ID!) {
  deleteCard(id: $id)
}
    `;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const InvalidateCardDocument = gql`
    mutation InvalidateCard($id: ID!) {
  invalidateCard(id: $id) {
    id
    name
    valid
  }
}
    `;
export type InvalidateCardMutationFn = Apollo.MutationFunction<InvalidateCardMutation, InvalidateCardMutationVariables>;

/**
 * __useInvalidateCardMutation__
 *
 * To run a mutation, you first call `useInvalidateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvalidateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invalidateCardMutation, { data, loading, error }] = useInvalidateCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvalidateCardMutation(baseOptions?: Apollo.MutationHookOptions<InvalidateCardMutation, InvalidateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvalidateCardMutation, InvalidateCardMutationVariables>(InvalidateCardDocument, options);
      }
export type InvalidateCardMutationHookResult = ReturnType<typeof useInvalidateCardMutation>;
export type InvalidateCardMutationResult = Apollo.MutationResult<InvalidateCardMutation>;
export type InvalidateCardMutationOptions = Apollo.BaseMutationOptions<InvalidateCardMutation, InvalidateCardMutationVariables>;
export const MarkCardAsNewDocument = gql`
    mutation MarkCardAsNew($id: ID!) {
  markCardAsNew(id: $id) {
    id
    name
    new
    valid
  }
}
    `;
export type MarkCardAsNewMutationFn = Apollo.MutationFunction<MarkCardAsNewMutation, MarkCardAsNewMutationVariables>;

/**
 * __useMarkCardAsNewMutation__
 *
 * To run a mutation, you first call `useMarkCardAsNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCardAsNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCardAsNewMutation, { data, loading, error }] = useMarkCardAsNewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkCardAsNewMutation(baseOptions?: Apollo.MutationHookOptions<MarkCardAsNewMutation, MarkCardAsNewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkCardAsNewMutation, MarkCardAsNewMutationVariables>(MarkCardAsNewDocument, options);
      }
export type MarkCardAsNewMutationHookResult = ReturnType<typeof useMarkCardAsNewMutation>;
export type MarkCardAsNewMutationResult = Apollo.MutationResult<MarkCardAsNewMutation>;
export type MarkCardAsNewMutationOptions = Apollo.BaseMutationOptions<MarkCardAsNewMutation, MarkCardAsNewMutationVariables>;
export const MarkCardAsSeenDocument = gql`
    mutation MarkCardAsSeen($id: ID!) {
  markCardAsSeen(id: $id) {
    id
    new
    name
  }
}
    `;
export type MarkCardAsSeenMutationFn = Apollo.MutationFunction<MarkCardAsSeenMutation, MarkCardAsSeenMutationVariables>;

/**
 * __useMarkCardAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkCardAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCardAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCardAsSeenMutation, { data, loading, error }] = useMarkCardAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkCardAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkCardAsSeenMutation, MarkCardAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkCardAsSeenMutation, MarkCardAsSeenMutationVariables>(MarkCardAsSeenDocument, options);
      }
export type MarkCardAsSeenMutationHookResult = ReturnType<typeof useMarkCardAsSeenMutation>;
export type MarkCardAsSeenMutationResult = Apollo.MutationResult<MarkCardAsSeenMutation>;
export type MarkCardAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkCardAsSeenMutation, MarkCardAsSeenMutationVariables>;
export const UpdateCardDocument = gql`
    mutation UpdateCard($id: ID!, $name: String!, $phone: String!, $age: String!, $gender: String!, $address: String, $house_no: String, $k_ketema: String, $kebele: String) {
  updateCard(
    id: $id
    profile: {name: $name, phone: $phone, gender: $gender, age: $age, kebele: $kebele, k_ketema: $k_ketema, house_no: $house_no, address: $address}
  ) {
    id
    name
    new
    phone
    age
    gender
    valid
    address
    k_ketema
    kebele
    house_no
    created_at
    updated_at
  }
}
    `;
export type UpdateCardMutationFn = Apollo.MutationFunction<UpdateCardMutation, UpdateCardMutationVariables>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *      address: // value for 'address'
 *      house_no: // value for 'house_no'
 *      k_ketema: // value for 'k_ketema'
 *      kebele: // value for 'kebele'
 *   },
 * });
 */
export function useUpdateCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardMutation, UpdateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, options);
      }
export type UpdateCardMutationHookResult = ReturnType<typeof useUpdateCardMutation>;
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<UpdateCardMutation, UpdateCardMutationVariables>;
export const CreateHistoryDocument = gql`
    mutation CreateHistory($id: ID!, $result: String!) {
  createHistory(id: $id, result: $result) {
    id
    result
    created_at
  }
}
    `;
export type CreateHistoryMutationFn = Apollo.MutationFunction<CreateHistoryMutation, CreateHistoryMutationVariables>;

/**
 * __useCreateHistoryMutation__
 *
 * To run a mutation, you first call `useCreateHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHistoryMutation, { data, loading, error }] = useCreateHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      result: // value for 'result'
 *   },
 * });
 */
export function useCreateHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateHistoryMutation, CreateHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHistoryMutation, CreateHistoryMutationVariables>(CreateHistoryDocument, options);
      }
export type CreateHistoryMutationHookResult = ReturnType<typeof useCreateHistoryMutation>;
export type CreateHistoryMutationResult = Apollo.MutationResult<CreateHistoryMutation>;
export type CreateHistoryMutationOptions = Apollo.BaseMutationOptions<CreateHistoryMutation, CreateHistoryMutationVariables>;
export const DeleteHistoryDocument = gql`
    mutation DeleteHistory($id: ID!) {
  deleteHistory(id: $id)
}
    `;
export type DeleteHistoryMutationFn = Apollo.MutationFunction<DeleteHistoryMutation, DeleteHistoryMutationVariables>;

/**
 * __useDeleteHistoryMutation__
 *
 * To run a mutation, you first call `useDeleteHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHistoryMutation, { data, loading, error }] = useDeleteHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHistoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHistoryMutation, DeleteHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHistoryMutation, DeleteHistoryMutationVariables>(DeleteHistoryDocument, options);
      }
export type DeleteHistoryMutationHookResult = ReturnType<typeof useDeleteHistoryMutation>;
export type DeleteHistoryMutationResult = Apollo.MutationResult<DeleteHistoryMutation>;
export type DeleteHistoryMutationOptions = Apollo.BaseMutationOptions<DeleteHistoryMutation, DeleteHistoryMutationVariables>;
export const UpdateHistoryDocument = gql`
    mutation UpdateHistory($id: ID!, $result: String!) {
  updateHistory(id: $id, result: $result) {
    id
    result
    created_at
  }
}
    `;
export type UpdateHistoryMutationFn = Apollo.MutationFunction<UpdateHistoryMutation, UpdateHistoryMutationVariables>;

/**
 * __useUpdateHistoryMutation__
 *
 * To run a mutation, you first call `useUpdateHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHistoryMutation, { data, loading, error }] = useUpdateHistoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      result: // value for 'result'
 *   },
 * });
 */
export function useUpdateHistoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHistoryMutation, UpdateHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHistoryMutation, UpdateHistoryMutationVariables>(UpdateHistoryDocument, options);
      }
export type UpdateHistoryMutationHookResult = ReturnType<typeof useUpdateHistoryMutation>;
export type UpdateHistoryMutationResult = Apollo.MutationResult<UpdateHistoryMutation>;
export type UpdateHistoryMutationOptions = Apollo.BaseMutationOptions<UpdateHistoryMutation, UpdateHistoryMutationVariables>;
export const CompleteLaboratoryTestDocument = gql`
    mutation CompleteLaboratoryTest($result: [LaboratoryTestInput!]!, $id: ID!) {
  completeLaboratoryTest(result: $result, id: $id) {
    id
    result
    paid
    completed
    new
    price
    card {
      name
      phone
    }
    created_at
  }
}
    `;
export type CompleteLaboratoryTestMutationFn = Apollo.MutationFunction<CompleteLaboratoryTestMutation, CompleteLaboratoryTestMutationVariables>;

/**
 * __useCompleteLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useCompleteLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeLaboratoryTestMutation, { data, loading, error }] = useCompleteLaboratoryTestMutation({
 *   variables: {
 *      result: // value for 'result'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompleteLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<CompleteLaboratoryTestMutation, CompleteLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteLaboratoryTestMutation, CompleteLaboratoryTestMutationVariables>(CompleteLaboratoryTestDocument, options);
      }
export type CompleteLaboratoryTestMutationHookResult = ReturnType<typeof useCompleteLaboratoryTestMutation>;
export type CompleteLaboratoryTestMutationResult = Apollo.MutationResult<CompleteLaboratoryTestMutation>;
export type CompleteLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<CompleteLaboratoryTestMutation, CompleteLaboratoryTestMutationVariables>;
export const CompleteLaterLaboratoryTestDocument = gql`
    mutation CompleteLaterLaboratoryTest($result: [LaboratoryTestInput!]!, $id: ID!) {
  completeLaterLaboratoryTest(result: $result, id: $id) {
    id
    result
    paid
    completed
    new
    price
    card {
      name
      phone
    }
    created_at
  }
}
    `;
export type CompleteLaterLaboratoryTestMutationFn = Apollo.MutationFunction<CompleteLaterLaboratoryTestMutation, CompleteLaterLaboratoryTestMutationVariables>;

/**
 * __useCompleteLaterLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useCompleteLaterLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteLaterLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeLaterLaboratoryTestMutation, { data, loading, error }] = useCompleteLaterLaboratoryTestMutation({
 *   variables: {
 *      result: // value for 'result'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompleteLaterLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<CompleteLaterLaboratoryTestMutation, CompleteLaterLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteLaterLaboratoryTestMutation, CompleteLaterLaboratoryTestMutationVariables>(CompleteLaterLaboratoryTestDocument, options);
      }
export type CompleteLaterLaboratoryTestMutationHookResult = ReturnType<typeof useCompleteLaterLaboratoryTestMutation>;
export type CompleteLaterLaboratoryTestMutationResult = Apollo.MutationResult<CompleteLaterLaboratoryTestMutation>;
export type CompleteLaterLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<CompleteLaterLaboratoryTestMutation, CompleteLaterLaboratoryTestMutationVariables>;
export const CreateLaboratoryTestDocument = gql`
    mutation CreateLaboratoryTest($cardId: ID!, $result: [LaboratoryTestInput!]!, $price: Float!) {
  createLaboratoryTest(input: {cardId: $cardId, result: $result, price: $price}) {
    id
    card {
      name
    }
    price
  }
}
    `;
export type CreateLaboratoryTestMutationFn = Apollo.MutationFunction<CreateLaboratoryTestMutation, CreateLaboratoryTestMutationVariables>;

/**
 * __useCreateLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useCreateLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLaboratoryTestMutation, { data, loading, error }] = useCreateLaboratoryTestMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      result: // value for 'result'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useCreateLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<CreateLaboratoryTestMutation, CreateLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLaboratoryTestMutation, CreateLaboratoryTestMutationVariables>(CreateLaboratoryTestDocument, options);
      }
export type CreateLaboratoryTestMutationHookResult = ReturnType<typeof useCreateLaboratoryTestMutation>;
export type CreateLaboratoryTestMutationResult = Apollo.MutationResult<CreateLaboratoryTestMutation>;
export type CreateLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<CreateLaboratoryTestMutation, CreateLaboratoryTestMutationVariables>;
export const DeleteLaboratoryTestDocument = gql`
    mutation DeleteLaboratoryTest($id: ID!) {
  deleteLaboratoryTest(id: $id)
}
    `;
export type DeleteLaboratoryTestMutationFn = Apollo.MutationFunction<DeleteLaboratoryTestMutation, DeleteLaboratoryTestMutationVariables>;

/**
 * __useDeleteLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useDeleteLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLaboratoryTestMutation, { data, loading, error }] = useDeleteLaboratoryTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLaboratoryTestMutation, DeleteLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLaboratoryTestMutation, DeleteLaboratoryTestMutationVariables>(DeleteLaboratoryTestDocument, options);
      }
export type DeleteLaboratoryTestMutationHookResult = ReturnType<typeof useDeleteLaboratoryTestMutation>;
export type DeleteLaboratoryTestMutationResult = Apollo.MutationResult<DeleteLaboratoryTestMutation>;
export type DeleteLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<DeleteLaboratoryTestMutation, DeleteLaboratoryTestMutationVariables>;
export const MarkLaboratoryTestAsSeenDocument = gql`
    mutation MarkLaboratoryTestAsSeen($id: ID!) {
  markLaboratoryTestAsSeen(id: $id) {
    id
    card {
      name
    }
  }
}
    `;
export type MarkLaboratoryTestAsSeenMutationFn = Apollo.MutationFunction<MarkLaboratoryTestAsSeenMutation, MarkLaboratoryTestAsSeenMutationVariables>;

/**
 * __useMarkLaboratoryTestAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkLaboratoryTestAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkLaboratoryTestAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markLaboratoryTestAsSeenMutation, { data, loading, error }] = useMarkLaboratoryTestAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkLaboratoryTestAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkLaboratoryTestAsSeenMutation, MarkLaboratoryTestAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkLaboratoryTestAsSeenMutation, MarkLaboratoryTestAsSeenMutationVariables>(MarkLaboratoryTestAsSeenDocument, options);
      }
export type MarkLaboratoryTestAsSeenMutationHookResult = ReturnType<typeof useMarkLaboratoryTestAsSeenMutation>;
export type MarkLaboratoryTestAsSeenMutationResult = Apollo.MutationResult<MarkLaboratoryTestAsSeenMutation>;
export type MarkLaboratoryTestAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkLaboratoryTestAsSeenMutation, MarkLaboratoryTestAsSeenMutationVariables>;
export const PayForLaboratoryTestDocument = gql`
    mutation PayForLaboratoryTest($id: ID!) {
  payForLaboratoryTest(id: $id) {
    id
  }
}
    `;
export type PayForLaboratoryTestMutationFn = Apollo.MutationFunction<PayForLaboratoryTestMutation, PayForLaboratoryTestMutationVariables>;

/**
 * __usePayForLaboratoryTestMutation__
 *
 * To run a mutation, you first call `usePayForLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayForLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payForLaboratoryTestMutation, { data, loading, error }] = usePayForLaboratoryTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePayForLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<PayForLaboratoryTestMutation, PayForLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PayForLaboratoryTestMutation, PayForLaboratoryTestMutationVariables>(PayForLaboratoryTestDocument, options);
      }
export type PayForLaboratoryTestMutationHookResult = ReturnType<typeof usePayForLaboratoryTestMutation>;
export type PayForLaboratoryTestMutationResult = Apollo.MutationResult<PayForLaboratoryTestMutation>;
export type PayForLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<PayForLaboratoryTestMutation, PayForLaboratoryTestMutationVariables>;
export const ClearNotificationDocument = gql`
    mutation ClearNotification {
  clearNotification
}
    `;
export type ClearNotificationMutationFn = Apollo.MutationFunction<ClearNotificationMutation, ClearNotificationMutationVariables>;

/**
 * __useClearNotificationMutation__
 *
 * To run a mutation, you first call `useClearNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearNotificationMutation, { data, loading, error }] = useClearNotificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ClearNotificationMutation, ClearNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearNotificationMutation, ClearNotificationMutationVariables>(ClearNotificationDocument, options);
      }
export type ClearNotificationMutationHookResult = ReturnType<typeof useClearNotificationMutation>;
export type ClearNotificationMutationResult = Apollo.MutationResult<ClearNotificationMutation>;
export type ClearNotificationMutationOptions = Apollo.BaseMutationOptions<ClearNotificationMutation, ClearNotificationMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($id: ID!) {
  deleteNotification(id: $id)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const CreatePrescriptionTestDocument = gql`
    mutation CreatePrescriptionTest($cardId: ID!, $result: [PrescriptionInput!]!, $price: Float!, $rx: String!) {
  createPrescriptionTest(
    main: {cardId: $cardId, result: $result, price: $price}
    rx: $rx
  ) {
    id
    card {
      name
    }
    price
    result
    rx
  }
}
    `;
export type CreatePrescriptionTestMutationFn = Apollo.MutationFunction<CreatePrescriptionTestMutation, CreatePrescriptionTestMutationVariables>;

/**
 * __useCreatePrescriptionTestMutation__
 *
 * To run a mutation, you first call `useCreatePrescriptionTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePrescriptionTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPrescriptionTestMutation, { data, loading, error }] = useCreatePrescriptionTestMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      result: // value for 'result'
 *      price: // value for 'price'
 *      rx: // value for 'rx'
 *   },
 * });
 */
export function useCreatePrescriptionTestMutation(baseOptions?: Apollo.MutationHookOptions<CreatePrescriptionTestMutation, CreatePrescriptionTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePrescriptionTestMutation, CreatePrescriptionTestMutationVariables>(CreatePrescriptionTestDocument, options);
      }
export type CreatePrescriptionTestMutationHookResult = ReturnType<typeof useCreatePrescriptionTestMutation>;
export type CreatePrescriptionTestMutationResult = Apollo.MutationResult<CreatePrescriptionTestMutation>;
export type CreatePrescriptionTestMutationOptions = Apollo.BaseMutationOptions<CreatePrescriptionTestMutation, CreatePrescriptionTestMutationVariables>;
export const DeletePrescriptionTestDocument = gql`
    mutation DeletePrescriptionTest($id: ID!) {
  deletePrescriptionTest(id: $id)
}
    `;
export type DeletePrescriptionTestMutationFn = Apollo.MutationFunction<DeletePrescriptionTestMutation, DeletePrescriptionTestMutationVariables>;

/**
 * __useDeletePrescriptionTestMutation__
 *
 * To run a mutation, you first call `useDeletePrescriptionTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePrescriptionTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePrescriptionTestMutation, { data, loading, error }] = useDeletePrescriptionTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePrescriptionTestMutation(baseOptions?: Apollo.MutationHookOptions<DeletePrescriptionTestMutation, DeletePrescriptionTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePrescriptionTestMutation, DeletePrescriptionTestMutationVariables>(DeletePrescriptionTestDocument, options);
      }
export type DeletePrescriptionTestMutationHookResult = ReturnType<typeof useDeletePrescriptionTestMutation>;
export type DeletePrescriptionTestMutationResult = Apollo.MutationResult<DeletePrescriptionTestMutation>;
export type DeletePrescriptionTestMutationOptions = Apollo.BaseMutationOptions<DeletePrescriptionTestMutation, DeletePrescriptionTestMutationVariables>;
export const MarkPrescriptionTestAsCompletedDocument = gql`
    mutation MarkPrescriptionTestAsCompleted($id: ID!) {
  markPrescriptionTestAsCompleted(id: $id) {
    id
    new
  }
}
    `;
export type MarkPrescriptionTestAsCompletedMutationFn = Apollo.MutationFunction<MarkPrescriptionTestAsCompletedMutation, MarkPrescriptionTestAsCompletedMutationVariables>;

/**
 * __useMarkPrescriptionTestAsCompletedMutation__
 *
 * To run a mutation, you first call `useMarkPrescriptionTestAsCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPrescriptionTestAsCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPrescriptionTestAsCompletedMutation, { data, loading, error }] = useMarkPrescriptionTestAsCompletedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPrescriptionTestAsCompletedMutation(baseOptions?: Apollo.MutationHookOptions<MarkPrescriptionTestAsCompletedMutation, MarkPrescriptionTestAsCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPrescriptionTestAsCompletedMutation, MarkPrescriptionTestAsCompletedMutationVariables>(MarkPrescriptionTestAsCompletedDocument, options);
      }
export type MarkPrescriptionTestAsCompletedMutationHookResult = ReturnType<typeof useMarkPrescriptionTestAsCompletedMutation>;
export type MarkPrescriptionTestAsCompletedMutationResult = Apollo.MutationResult<MarkPrescriptionTestAsCompletedMutation>;
export type MarkPrescriptionTestAsCompletedMutationOptions = Apollo.BaseMutationOptions<MarkPrescriptionTestAsCompletedMutation, MarkPrescriptionTestAsCompletedMutationVariables>;
export const MarkPrescriptionTestAsPaidDocument = gql`
    mutation MarkPrescriptionTestAsPaid($id: ID!) {
  markPrescriptionTestAsPaid(id: $id) {
    id
    paid
  }
}
    `;
export type MarkPrescriptionTestAsPaidMutationFn = Apollo.MutationFunction<MarkPrescriptionTestAsPaidMutation, MarkPrescriptionTestAsPaidMutationVariables>;

/**
 * __useMarkPrescriptionTestAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkPrescriptionTestAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPrescriptionTestAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPrescriptionTestAsPaidMutation, { data, loading, error }] = useMarkPrescriptionTestAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPrescriptionTestAsPaidMutation(baseOptions?: Apollo.MutationHookOptions<MarkPrescriptionTestAsPaidMutation, MarkPrescriptionTestAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPrescriptionTestAsPaidMutation, MarkPrescriptionTestAsPaidMutationVariables>(MarkPrescriptionTestAsPaidDocument, options);
      }
export type MarkPrescriptionTestAsPaidMutationHookResult = ReturnType<typeof useMarkPrescriptionTestAsPaidMutation>;
export type MarkPrescriptionTestAsPaidMutationResult = Apollo.MutationResult<MarkPrescriptionTestAsPaidMutation>;
export type MarkPrescriptionTestAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkPrescriptionTestAsPaidMutation, MarkPrescriptionTestAsPaidMutationVariables>;
export const MarkPrescriptionTestAsSeenDocument = gql`
    mutation MarkPrescriptionTestAsSeen($id: ID!) {
  markPrescriptionTestAsSeen(id: $id) {
    id
    new
  }
}
    `;
export type MarkPrescriptionTestAsSeenMutationFn = Apollo.MutationFunction<MarkPrescriptionTestAsSeenMutation, MarkPrescriptionTestAsSeenMutationVariables>;

/**
 * __useMarkPrescriptionTestAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkPrescriptionTestAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPrescriptionTestAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPrescriptionTestAsSeenMutation, { data, loading, error }] = useMarkPrescriptionTestAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPrescriptionTestAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkPrescriptionTestAsSeenMutation, MarkPrescriptionTestAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPrescriptionTestAsSeenMutation, MarkPrescriptionTestAsSeenMutationVariables>(MarkPrescriptionTestAsSeenDocument, options);
      }
export type MarkPrescriptionTestAsSeenMutationHookResult = ReturnType<typeof useMarkPrescriptionTestAsSeenMutation>;
export type MarkPrescriptionTestAsSeenMutationResult = Apollo.MutationResult<MarkPrescriptionTestAsSeenMutation>;
export type MarkPrescriptionTestAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkPrescriptionTestAsSeenMutation, MarkPrescriptionTestAsSeenMutationVariables>;
export const CompleteQuickLaboratoryTestDocument = gql`
    mutation CompleteQuickLaboratoryTest($id: String!, $price: Float, $other: String) {
  completeQuickLaboratoryTest(id: $id, input: {price: $price, other: $other}) {
    id
    name
    price
    paid
    completed
    new
    result
    created_at
    updated_at
  }
}
    `;
export type CompleteQuickLaboratoryTestMutationFn = Apollo.MutationFunction<CompleteQuickLaboratoryTestMutation, CompleteQuickLaboratoryTestMutationVariables>;

/**
 * __useCompleteQuickLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useCompleteQuickLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteQuickLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeQuickLaboratoryTestMutation, { data, loading, error }] = useCompleteQuickLaboratoryTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCompleteQuickLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<CompleteQuickLaboratoryTestMutation, CompleteQuickLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteQuickLaboratoryTestMutation, CompleteQuickLaboratoryTestMutationVariables>(CompleteQuickLaboratoryTestDocument, options);
      }
export type CompleteQuickLaboratoryTestMutationHookResult = ReturnType<typeof useCompleteQuickLaboratoryTestMutation>;
export type CompleteQuickLaboratoryTestMutationResult = Apollo.MutationResult<CompleteQuickLaboratoryTestMutation>;
export type CompleteQuickLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<CompleteQuickLaboratoryTestMutation, CompleteQuickLaboratoryTestMutationVariables>;
export const CreateQuickLaboratoryTestDocument = gql`
    mutation CreateQuickLaboratoryTest($name: String!, $price: Float, $result: String!, $other: String) {
  createQuickLaboratoryTest(
    input: {name: $name, price: $price, result: $result, other: $other}
  ) {
    id
    name
    price
    paid
    completed
    new
    result
    created_at
    updated_at
  }
}
    `;
export type CreateQuickLaboratoryTestMutationFn = Apollo.MutationFunction<CreateQuickLaboratoryTestMutation, CreateQuickLaboratoryTestMutationVariables>;

/**
 * __useCreateQuickLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useCreateQuickLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickLaboratoryTestMutation, { data, loading, error }] = useCreateQuickLaboratoryTestMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      result: // value for 'result'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCreateQuickLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuickLaboratoryTestMutation, CreateQuickLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuickLaboratoryTestMutation, CreateQuickLaboratoryTestMutationVariables>(CreateQuickLaboratoryTestDocument, options);
      }
export type CreateQuickLaboratoryTestMutationHookResult = ReturnType<typeof useCreateQuickLaboratoryTestMutation>;
export type CreateQuickLaboratoryTestMutationResult = Apollo.MutationResult<CreateQuickLaboratoryTestMutation>;
export type CreateQuickLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<CreateQuickLaboratoryTestMutation, CreateQuickLaboratoryTestMutationVariables>;
export const MarkQuickLaboratoryTestAsPaidDocument = gql`
    mutation MarkQuickLaboratoryTestAsPaid($id: ID!) {
  markQuickLaboratoryTestAsPaid(id: $id) {
    id
    paid
  }
}
    `;
export type MarkQuickLaboratoryTestAsPaidMutationFn = Apollo.MutationFunction<MarkQuickLaboratoryTestAsPaidMutation, MarkQuickLaboratoryTestAsPaidMutationVariables>;

/**
 * __useMarkQuickLaboratoryTestAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkQuickLaboratoryTestAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickLaboratoryTestAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickLaboratoryTestAsPaidMutation, { data, loading, error }] = useMarkQuickLaboratoryTestAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickLaboratoryTestAsPaidMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickLaboratoryTestAsPaidMutation, MarkQuickLaboratoryTestAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickLaboratoryTestAsPaidMutation, MarkQuickLaboratoryTestAsPaidMutationVariables>(MarkQuickLaboratoryTestAsPaidDocument, options);
      }
export type MarkQuickLaboratoryTestAsPaidMutationHookResult = ReturnType<typeof useMarkQuickLaboratoryTestAsPaidMutation>;
export type MarkQuickLaboratoryTestAsPaidMutationResult = Apollo.MutationResult<MarkQuickLaboratoryTestAsPaidMutation>;
export type MarkQuickLaboratoryTestAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkQuickLaboratoryTestAsPaidMutation, MarkQuickLaboratoryTestAsPaidMutationVariables>;
export const MarkQuickLaboratoryTestAsSeenDocument = gql`
    mutation MarkQuickLaboratoryTestAsSeen($id: ID!) {
  markQuickLaboratoryTestAsSeen(id: $id) {
    id
    new
  }
}
    `;
export type MarkQuickLaboratoryTestAsSeenMutationFn = Apollo.MutationFunction<MarkQuickLaboratoryTestAsSeenMutation, MarkQuickLaboratoryTestAsSeenMutationVariables>;

/**
 * __useMarkQuickLaboratoryTestAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkQuickLaboratoryTestAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickLaboratoryTestAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickLaboratoryTestAsSeenMutation, { data, loading, error }] = useMarkQuickLaboratoryTestAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickLaboratoryTestAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickLaboratoryTestAsSeenMutation, MarkQuickLaboratoryTestAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickLaboratoryTestAsSeenMutation, MarkQuickLaboratoryTestAsSeenMutationVariables>(MarkQuickLaboratoryTestAsSeenDocument, options);
      }
export type MarkQuickLaboratoryTestAsSeenMutationHookResult = ReturnType<typeof useMarkQuickLaboratoryTestAsSeenMutation>;
export type MarkQuickLaboratoryTestAsSeenMutationResult = Apollo.MutationResult<MarkQuickLaboratoryTestAsSeenMutation>;
export type MarkQuickLaboratoryTestAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkQuickLaboratoryTestAsSeenMutation, MarkQuickLaboratoryTestAsSeenMutationVariables>;
export const CompleteQuickPrescriptionTestDocument = gql`
    mutation CompleteQuickPrescriptionTest($id: String!, $price: Float, $other: String) {
  completeQuickPrescriptionTest(id: $id, input: {price: $price, other: $other}) {
    id
    name
    price
    result
    other
    created_at
  }
}
    `;
export type CompleteQuickPrescriptionTestMutationFn = Apollo.MutationFunction<CompleteQuickPrescriptionTestMutation, CompleteQuickPrescriptionTestMutationVariables>;

/**
 * __useCompleteQuickPrescriptionTestMutation__
 *
 * To run a mutation, you first call `useCompleteQuickPrescriptionTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteQuickPrescriptionTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeQuickPrescriptionTestMutation, { data, loading, error }] = useCompleteQuickPrescriptionTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCompleteQuickPrescriptionTestMutation(baseOptions?: Apollo.MutationHookOptions<CompleteQuickPrescriptionTestMutation, CompleteQuickPrescriptionTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteQuickPrescriptionTestMutation, CompleteQuickPrescriptionTestMutationVariables>(CompleteQuickPrescriptionTestDocument, options);
      }
export type CompleteQuickPrescriptionTestMutationHookResult = ReturnType<typeof useCompleteQuickPrescriptionTestMutation>;
export type CompleteQuickPrescriptionTestMutationResult = Apollo.MutationResult<CompleteQuickPrescriptionTestMutation>;
export type CompleteQuickPrescriptionTestMutationOptions = Apollo.BaseMutationOptions<CompleteQuickPrescriptionTestMutation, CompleteQuickPrescriptionTestMutationVariables>;
export const CreateQuickPrescriptionTestDocument = gql`
    mutation CreateQuickPrescriptionTest($name: String!, $result: QuickPrescriptionTestResults!, $price: Float, $other: String) {
  createQuickPrescriptionTest(
    input: {name: $name, price: $price, result: $result, other: $other}
  ) {
    id
    name
    price
    result
    other
    created_at
  }
}
    `;
export type CreateQuickPrescriptionTestMutationFn = Apollo.MutationFunction<CreateQuickPrescriptionTestMutation, CreateQuickPrescriptionTestMutationVariables>;

/**
 * __useCreateQuickPrescriptionTestMutation__
 *
 * To run a mutation, you first call `useCreateQuickPrescriptionTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickPrescriptionTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickPrescriptionTestMutation, { data, loading, error }] = useCreateQuickPrescriptionTestMutation({
 *   variables: {
 *      name: // value for 'name'
 *      result: // value for 'result'
 *      price: // value for 'price'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCreateQuickPrescriptionTestMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuickPrescriptionTestMutation, CreateQuickPrescriptionTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuickPrescriptionTestMutation, CreateQuickPrescriptionTestMutationVariables>(CreateQuickPrescriptionTestDocument, options);
      }
export type CreateQuickPrescriptionTestMutationHookResult = ReturnType<typeof useCreateQuickPrescriptionTestMutation>;
export type CreateQuickPrescriptionTestMutationResult = Apollo.MutationResult<CreateQuickPrescriptionTestMutation>;
export type CreateQuickPrescriptionTestMutationOptions = Apollo.BaseMutationOptions<CreateQuickPrescriptionTestMutation, CreateQuickPrescriptionTestMutationVariables>;
export const MarkQuickPrescriptionTestAsPaidDocument = gql`
    mutation MarkQuickPrescriptionTestAsPaid($id: ID!) {
  markQuickPrescriptionTestAsPaid(id: $id) {
    id
    paid
  }
}
    `;
export type MarkQuickPrescriptionTestAsPaidMutationFn = Apollo.MutationFunction<MarkQuickPrescriptionTestAsPaidMutation, MarkQuickPrescriptionTestAsPaidMutationVariables>;

/**
 * __useMarkQuickPrescriptionTestAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkQuickPrescriptionTestAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickPrescriptionTestAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickPrescriptionTestAsPaidMutation, { data, loading, error }] = useMarkQuickPrescriptionTestAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickPrescriptionTestAsPaidMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickPrescriptionTestAsPaidMutation, MarkQuickPrescriptionTestAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickPrescriptionTestAsPaidMutation, MarkQuickPrescriptionTestAsPaidMutationVariables>(MarkQuickPrescriptionTestAsPaidDocument, options);
      }
export type MarkQuickPrescriptionTestAsPaidMutationHookResult = ReturnType<typeof useMarkQuickPrescriptionTestAsPaidMutation>;
export type MarkQuickPrescriptionTestAsPaidMutationResult = Apollo.MutationResult<MarkQuickPrescriptionTestAsPaidMutation>;
export type MarkQuickPrescriptionTestAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkQuickPrescriptionTestAsPaidMutation, MarkQuickPrescriptionTestAsPaidMutationVariables>;
export const MarkQuickPrescriptionTestAsSeenDocument = gql`
    mutation MarkQuickPrescriptionTestAsSeen($id: ID!) {
  markQuickPrescriptionTestAsSeen(id: $id) {
    id
    new
  }
}
    `;
export type MarkQuickPrescriptionTestAsSeenMutationFn = Apollo.MutationFunction<MarkQuickPrescriptionTestAsSeenMutation, MarkQuickPrescriptionTestAsSeenMutationVariables>;

/**
 * __useMarkQuickPrescriptionTestAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkQuickPrescriptionTestAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickPrescriptionTestAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickPrescriptionTestAsSeenMutation, { data, loading, error }] = useMarkQuickPrescriptionTestAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickPrescriptionTestAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickPrescriptionTestAsSeenMutation, MarkQuickPrescriptionTestAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickPrescriptionTestAsSeenMutation, MarkQuickPrescriptionTestAsSeenMutationVariables>(MarkQuickPrescriptionTestAsSeenDocument, options);
      }
export type MarkQuickPrescriptionTestAsSeenMutationHookResult = ReturnType<typeof useMarkQuickPrescriptionTestAsSeenMutation>;
export type MarkQuickPrescriptionTestAsSeenMutationResult = Apollo.MutationResult<MarkQuickPrescriptionTestAsSeenMutation>;
export type MarkQuickPrescriptionTestAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkQuickPrescriptionTestAsSeenMutation, MarkQuickPrescriptionTestAsSeenMutationVariables>;
export const ChangeSettingDocument = gql`
    mutation ChangeSetting($card_price: Float!, $card_expiration_date: Float!, $laboratory_tests_data: [LaboratoryTestSettingInput!]!, $prescription_tests_data: [PrescriptionInput!]!) {
  changeSetting(
    setting: {card_price: $card_price, card_expiration_date: $card_expiration_date, laboratory_tests_data: $laboratory_tests_data, prescription_tests_data: $prescription_tests_data}
  ) {
    id
    card_price
    card_expiration_date
    laboratory_tests_data
    prescription_tests_data
  }
}
    `;
export type ChangeSettingMutationFn = Apollo.MutationFunction<ChangeSettingMutation, ChangeSettingMutationVariables>;

/**
 * __useChangeSettingMutation__
 *
 * To run a mutation, you first call `useChangeSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSettingMutation, { data, loading, error }] = useChangeSettingMutation({
 *   variables: {
 *      card_price: // value for 'card_price'
 *      card_expiration_date: // value for 'card_expiration_date'
 *      laboratory_tests_data: // value for 'laboratory_tests_data'
 *      prescription_tests_data: // value for 'prescription_tests_data'
 *   },
 * });
 */
export function useChangeSettingMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSettingMutation, ChangeSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSettingMutation, ChangeSettingMutationVariables>(ChangeSettingDocument, options);
      }
export type ChangeSettingMutationHookResult = ReturnType<typeof useChangeSettingMutation>;
export type ChangeSettingMutationResult = Apollo.MutationResult<ChangeSettingMutation>;
export type ChangeSettingMutationOptions = Apollo.BaseMutationOptions<ChangeSettingMutation, ChangeSettingMutationVariables>;
export const ChangeUserDetailDocument = gql`
    mutation ChangeUserDetail($username: String!, $password: String!, $newName: String) {
  changeUserDetail(username: $username, password: $password, newName: $newName) {
    errors {
      field
      message
    }
    user {
      id
      username
      occupation
    }
    token
  }
}
    `;
export type ChangeUserDetailMutationFn = Apollo.MutationFunction<ChangeUserDetailMutation, ChangeUserDetailMutationVariables>;

/**
 * __useChangeUserDetailMutation__
 *
 * To run a mutation, you first call `useChangeUserDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserDetailMutation, { data, loading, error }] = useChangeUserDetailMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useChangeUserDetailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserDetailMutation, ChangeUserDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserDetailMutation, ChangeUserDetailMutationVariables>(ChangeUserDetailDocument, options);
      }
export type ChangeUserDetailMutationHookResult = ReturnType<typeof useChangeUserDetailMutation>;
export type ChangeUserDetailMutationResult = Apollo.MutationResult<ChangeUserDetailMutation>;
export type ChangeUserDetailMutationOptions = Apollo.BaseMutationOptions<ChangeUserDetailMutation, ChangeUserDetailMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      username
      occupation
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $occupation: String!) {
  register(username: $username, password: $password, occupation: $occupation) {
    errors {
      field
      message
    }
    user {
      id
      username
      occupation
    }
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      occupation: // value for 'occupation'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CardDocument = gql`
    query Card($id: ID!) {
  card(id: $id) {
    id
    name
    new
    phone
    age
    gender
    address
    k_ketema
    kebele
    house_no
    payment {
      price
      created_at
    }
    prescription_tests {
      id
      cardId
      result
      paid
      price
      completed
      new
      rx
      created_at
      updated_at
    }
    laboratory_tests {
      id
      cardId
      result
      paid
      new
      completed
      price
      created_at
      updated_at
    }
    history {
      id
      result
      cardId
      created_at
      updated_at
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useCardQuery__
 *
 * To run a query within a React component, call `useCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCardQuery(baseOptions: Apollo.QueryHookOptions<CardQuery, CardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardQuery, CardQueryVariables>(CardDocument, options);
      }
export function useCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardQuery, CardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardQuery, CardQueryVariables>(CardDocument, options);
        }
export type CardQueryHookResult = ReturnType<typeof useCardQuery>;
export type CardLazyQueryHookResult = ReturnType<typeof useCardLazyQuery>;
export type CardQueryResult = Apollo.QueryResult<CardQuery, CardQueryVariables>;
export const CardsCountDocument = gql`
    query CardsCount {
  cardsCount
}
    `;

/**
 * __useCardsCountQuery__
 *
 * To run a query within a React component, call `useCardsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardsCountQuery(baseOptions?: Apollo.QueryHookOptions<CardsCountQuery, CardsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsCountQuery, CardsCountQueryVariables>(CardsCountDocument, options);
      }
export function useCardsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsCountQuery, CardsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsCountQuery, CardsCountQueryVariables>(CardsCountDocument, options);
        }
export type CardsCountQueryHookResult = ReturnType<typeof useCardsCountQuery>;
export type CardsCountLazyQueryHookResult = ReturnType<typeof useCardsCountLazyQuery>;
export type CardsCountQueryResult = Apollo.QueryResult<CardsCountQuery, CardsCountQueryVariables>;
export const CardsDocument = gql`
    query Cards($skip: Float!, $take: Float!, $from: String, $to: String) {
  cards(skip: $skip, take: $take, from: $from, to: $to) {
    id
    name
    new
    phone
    age
    gender
    valid
    address
    k_ketema
    kebele
    house_no
    history {
      id
      created_at
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useCardsQuery(baseOptions: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsQueryResult = Apollo.QueryResult<CardsQuery, CardsQueryVariables>;
export const CardsForDashboardDocument = gql`
    query CardsForDashboard($skip: Float!, $take: Float!, $from: String, $to: String) {
  cards(skip: $skip, take: $take, from: $from, to: $to) {
    id
    age
    gender
    payment {
      id
      created_at
      price
    }
    created_at
  }
}
    `;

/**
 * __useCardsForDashboardQuery__
 *
 * To run a query within a React component, call `useCardsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useCardsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<CardsForDashboardQuery, CardsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsForDashboardQuery, CardsForDashboardQueryVariables>(CardsForDashboardDocument, options);
      }
export function useCardsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsForDashboardQuery, CardsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsForDashboardQuery, CardsForDashboardQueryVariables>(CardsForDashboardDocument, options);
        }
export type CardsForDashboardQueryHookResult = ReturnType<typeof useCardsForDashboardQuery>;
export type CardsForDashboardLazyQueryHookResult = ReturnType<typeof useCardsForDashboardLazyQuery>;
export type CardsForDashboardQueryResult = Apollo.QueryResult<CardsForDashboardQuery, CardsForDashboardQueryVariables>;
export const SearchCardsDocument = gql`
    query SearchCards($name: String, $phone: String, $skip: Float!, $take: Float!) {
  searchCards(name: $name, phone: $phone, skip: $skip, take: $take) {
    id
    name
    new
    phone
    age
    gender
    valid
    address
    k_ketema
    kebele
    house_no
    history {
      id
      created_at
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useSearchCardsQuery__
 *
 * To run a query within a React component, call `useSearchCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCardsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchCardsQuery(baseOptions: Apollo.QueryHookOptions<SearchCardsQuery, SearchCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCardsQuery, SearchCardsQueryVariables>(SearchCardsDocument, options);
      }
export function useSearchCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCardsQuery, SearchCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCardsQuery, SearchCardsQueryVariables>(SearchCardsDocument, options);
        }
export type SearchCardsQueryHookResult = ReturnType<typeof useSearchCardsQuery>;
export type SearchCardsLazyQueryHookResult = ReturnType<typeof useSearchCardsLazyQuery>;
export type SearchCardsQueryResult = Apollo.QueryResult<SearchCardsQuery, SearchCardsQueryVariables>;
export const HistoryDocument = gql`
    query History($id: ID!) {
  history(id: $id) {
    id
    result
    created_at
  }
}
    `;

/**
 * __useHistoryQuery__
 *
 * To run a query within a React component, call `useHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHistoryQuery(baseOptions: Apollo.QueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, options);
      }
export function useHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, options);
        }
export type HistoryQueryHookResult = ReturnType<typeof useHistoryQuery>;
export type HistoryLazyQueryHookResult = ReturnType<typeof useHistoryLazyQuery>;
export type HistoryQueryResult = Apollo.QueryResult<HistoryQuery, HistoryQueryVariables>;
export const HistoryAsstDocument = gql`
    query HistoryAsst($startingDate: String!, $endingDate: String!) {
  weeklyHistory(startingDate: $startingDate, endingDate: $endingDate) {
    result
    card {
      id
      name
      age
    }
    created_at
  }
}
    `;

/**
 * __useHistoryAsstQuery__
 *
 * To run a query within a React component, call `useHistoryAsstQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryAsstQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryAsstQuery({
 *   variables: {
 *      startingDate: // value for 'startingDate'
 *      endingDate: // value for 'endingDate'
 *   },
 * });
 */
export function useHistoryAsstQuery(baseOptions: Apollo.QueryHookOptions<HistoryAsstQuery, HistoryAsstQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoryAsstQuery, HistoryAsstQueryVariables>(HistoryAsstDocument, options);
      }
export function useHistoryAsstLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoryAsstQuery, HistoryAsstQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoryAsstQuery, HistoryAsstQueryVariables>(HistoryAsstDocument, options);
        }
export type HistoryAsstQueryHookResult = ReturnType<typeof useHistoryAsstQuery>;
export type HistoryAsstLazyQueryHookResult = ReturnType<typeof useHistoryAsstLazyQuery>;
export type HistoryAsstQueryResult = Apollo.QueryResult<HistoryAsstQuery, HistoryAsstQueryVariables>;
export const LaboratoryTestDocument = gql`
    query LaboratoryTest($id: ID!) {
  laboratoryTest(id: $id) {
    id
    paid
    completed
    new
    price
    result
    cardId
    card {
      name
      phone
      age
      gender
    }
    created_at
  }
}
    `;

/**
 * __useLaboratoryTestQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLaboratoryTestQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryTestQuery, LaboratoryTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestQuery, LaboratoryTestQueryVariables>(LaboratoryTestDocument, options);
      }
export function useLaboratoryTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestQuery, LaboratoryTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestQuery, LaboratoryTestQueryVariables>(LaboratoryTestDocument, options);
        }
export type LaboratoryTestQueryHookResult = ReturnType<typeof useLaboratoryTestQuery>;
export type LaboratoryTestLazyQueryHookResult = ReturnType<typeof useLaboratoryTestLazyQuery>;
export type LaboratoryTestQueryResult = Apollo.QueryResult<LaboratoryTestQuery, LaboratoryTestQueryVariables>;
export const LaboratoryTestsCountDocument = gql`
    query LaboratoryTestsCount {
  laboratoryTestsCount
}
    `;

/**
 * __useLaboratoryTestsCountQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useLaboratoryTestsCountQuery(baseOptions?: Apollo.QueryHookOptions<LaboratoryTestsCountQuery, LaboratoryTestsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestsCountQuery, LaboratoryTestsCountQueryVariables>(LaboratoryTestsCountDocument, options);
      }
export function useLaboratoryTestsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestsCountQuery, LaboratoryTestsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestsCountQuery, LaboratoryTestsCountQueryVariables>(LaboratoryTestsCountDocument, options);
        }
export type LaboratoryTestsCountQueryHookResult = ReturnType<typeof useLaboratoryTestsCountQuery>;
export type LaboratoryTestsCountLazyQueryHookResult = ReturnType<typeof useLaboratoryTestsCountLazyQuery>;
export type LaboratoryTestsCountQueryResult = Apollo.QueryResult<LaboratoryTestsCountQuery, LaboratoryTestsCountQueryVariables>;
export const LaboratoryTestsDocument = gql`
    query LaboratoryTests($skip: Float!, $take: Float!) {
  laboratoryTests(skip: $skip, take: $take) {
    id
    paid
    price
    new
    completed
    card {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useLaboratoryTestsQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useLaboratoryTestsQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryTestsQuery, LaboratoryTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestsQuery, LaboratoryTestsQueryVariables>(LaboratoryTestsDocument, options);
      }
export function useLaboratoryTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestsQuery, LaboratoryTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestsQuery, LaboratoryTestsQueryVariables>(LaboratoryTestsDocument, options);
        }
export type LaboratoryTestsQueryHookResult = ReturnType<typeof useLaboratoryTestsQuery>;
export type LaboratoryTestsLazyQueryHookResult = ReturnType<typeof useLaboratoryTestsLazyQuery>;
export type LaboratoryTestsQueryResult = Apollo.QueryResult<LaboratoryTestsQuery, LaboratoryTestsQueryVariables>;
export const LaboratoryTestsForDashboardDocument = gql`
    query LaboratoryTestsForDashboard($skip: Float!, $take: Float!) {
  laboratoryTests(skip: $skip, take: $take) {
    id
    result
    price
    paid
    updated_at
    created_at
  }
}
    `;

/**
 * __useLaboratoryTestsForDashboardQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useLaboratoryTestsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryTestsForDashboardQuery, LaboratoryTestsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestsForDashboardQuery, LaboratoryTestsForDashboardQueryVariables>(LaboratoryTestsForDashboardDocument, options);
      }
export function useLaboratoryTestsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestsForDashboardQuery, LaboratoryTestsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestsForDashboardQuery, LaboratoryTestsForDashboardQueryVariables>(LaboratoryTestsForDashboardDocument, options);
        }
export type LaboratoryTestsForDashboardQueryHookResult = ReturnType<typeof useLaboratoryTestsForDashboardQuery>;
export type LaboratoryTestsForDashboardLazyQueryHookResult = ReturnType<typeof useLaboratoryTestsForDashboardLazyQuery>;
export type LaboratoryTestsForDashboardQueryResult = Apollo.QueryResult<LaboratoryTestsForDashboardQuery, LaboratoryTestsForDashboardQueryVariables>;
export const SearchLaboratoryTestsDocument = gql`
    query SearchLaboratoryTests($term: String!, $skip: Float!, $take: Float!) {
  searchLaboratoryTests(term: $term, skip: $skip, take: $take) {
    id
    paid
    price
    new
    completed
    card {
      id
      name
    }
    created_at
  }
}
    `;

/**
 * __useSearchLaboratoryTestsQuery__
 *
 * To run a query within a React component, call `useSearchLaboratoryTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLaboratoryTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLaboratoryTestsQuery({
 *   variables: {
 *      term: // value for 'term'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchLaboratoryTestsQuery(baseOptions: Apollo.QueryHookOptions<SearchLaboratoryTestsQuery, SearchLaboratoryTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchLaboratoryTestsQuery, SearchLaboratoryTestsQueryVariables>(SearchLaboratoryTestsDocument, options);
      }
export function useSearchLaboratoryTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLaboratoryTestsQuery, SearchLaboratoryTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchLaboratoryTestsQuery, SearchLaboratoryTestsQueryVariables>(SearchLaboratoryTestsDocument, options);
        }
export type SearchLaboratoryTestsQueryHookResult = ReturnType<typeof useSearchLaboratoryTestsQuery>;
export type SearchLaboratoryTestsLazyQueryHookResult = ReturnType<typeof useSearchLaboratoryTestsLazyQuery>;
export type SearchLaboratoryTestsQueryResult = Apollo.QueryResult<SearchLaboratoryTestsQuery, SearchLaboratoryTestsQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    id
    desc
    card_id
    laboratory_test_id
    prescription_test_id
    quick_laboratory_test_id
    quick_prescription_test_id
    action
    created_at
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const PrescriptionTestDocument = gql`
    query PrescriptionTest($id: ID!) {
  prescriptionTest(id: $id) {
    id
    card {
      id
      name
      age
      gender
    }
    result
    paid
    price
    completed
    new
    rx
    created_at
  }
}
    `;

/**
 * __usePrescriptionTestQuery__
 *
 * To run a query within a React component, call `usePrescriptionTestQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionTestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePrescriptionTestQuery(baseOptions: Apollo.QueryHookOptions<PrescriptionTestQuery, PrescriptionTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionTestQuery, PrescriptionTestQueryVariables>(PrescriptionTestDocument, options);
      }
export function usePrescriptionTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionTestQuery, PrescriptionTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionTestQuery, PrescriptionTestQueryVariables>(PrescriptionTestDocument, options);
        }
export type PrescriptionTestQueryHookResult = ReturnType<typeof usePrescriptionTestQuery>;
export type PrescriptionTestLazyQueryHookResult = ReturnType<typeof usePrescriptionTestLazyQuery>;
export type PrescriptionTestQueryResult = Apollo.QueryResult<PrescriptionTestQuery, PrescriptionTestQueryVariables>;
export const PrescriptionTestsDocument = gql`
    query PrescriptionTests($skip: Float!, $take: Float!) {
  prescriptionTests(skip: $skip, take: $take) {
    id
    card {
      id
      name
      age
      gender
    }
    paid
    price
    completed
    new
    rx
    created_at
    updated_at
  }
}
    `;

/**
 * __usePrescriptionTestsQuery__
 *
 * To run a query within a React component, call `usePrescriptionTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionTestsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePrescriptionTestsQuery(baseOptions: Apollo.QueryHookOptions<PrescriptionTestsQuery, PrescriptionTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionTestsQuery, PrescriptionTestsQueryVariables>(PrescriptionTestsDocument, options);
      }
export function usePrescriptionTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionTestsQuery, PrescriptionTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionTestsQuery, PrescriptionTestsQueryVariables>(PrescriptionTestsDocument, options);
        }
export type PrescriptionTestsQueryHookResult = ReturnType<typeof usePrescriptionTestsQuery>;
export type PrescriptionTestsLazyQueryHookResult = ReturnType<typeof usePrescriptionTestsLazyQuery>;
export type PrescriptionTestsQueryResult = Apollo.QueryResult<PrescriptionTestsQuery, PrescriptionTestsQueryVariables>;
export const PrescriptionTestsCountDocument = gql`
    query PrescriptionTestsCount {
  prescriptionTestsCount
}
    `;

/**
 * __usePrescriptionTestsCountQuery__
 *
 * To run a query within a React component, call `usePrescriptionTestsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionTestsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionTestsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrescriptionTestsCountQuery(baseOptions?: Apollo.QueryHookOptions<PrescriptionTestsCountQuery, PrescriptionTestsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionTestsCountQuery, PrescriptionTestsCountQueryVariables>(PrescriptionTestsCountDocument, options);
      }
export function usePrescriptionTestsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionTestsCountQuery, PrescriptionTestsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionTestsCountQuery, PrescriptionTestsCountQueryVariables>(PrescriptionTestsCountDocument, options);
        }
export type PrescriptionTestsCountQueryHookResult = ReturnType<typeof usePrescriptionTestsCountQuery>;
export type PrescriptionTestsCountLazyQueryHookResult = ReturnType<typeof usePrescriptionTestsCountLazyQuery>;
export type PrescriptionTestsCountQueryResult = Apollo.QueryResult<PrescriptionTestsCountQuery, PrescriptionTestsCountQueryVariables>;
export const PrescriptionTestsForDashboardDocument = gql`
    query PrescriptionTestsForDashboard($skip: Float!, $take: Float!) {
  prescriptionTests(skip: $skip, take: $take) {
    id
    paid
    price
    updated_at
  }
}
    `;

/**
 * __usePrescriptionTestsForDashboardQuery__
 *
 * To run a query within a React component, call `usePrescriptionTestsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionTestsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionTestsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePrescriptionTestsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<PrescriptionTestsForDashboardQuery, PrescriptionTestsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionTestsForDashboardQuery, PrescriptionTestsForDashboardQueryVariables>(PrescriptionTestsForDashboardDocument, options);
      }
export function usePrescriptionTestsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionTestsForDashboardQuery, PrescriptionTestsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionTestsForDashboardQuery, PrescriptionTestsForDashboardQueryVariables>(PrescriptionTestsForDashboardDocument, options);
        }
export type PrescriptionTestsForDashboardQueryHookResult = ReturnType<typeof usePrescriptionTestsForDashboardQuery>;
export type PrescriptionTestsForDashboardLazyQueryHookResult = ReturnType<typeof usePrescriptionTestsForDashboardLazyQuery>;
export type PrescriptionTestsForDashboardQueryResult = Apollo.QueryResult<PrescriptionTestsForDashboardQuery, PrescriptionTestsForDashboardQueryVariables>;
export const SearchPrescriptionTestsDocument = gql`
    query SearchPrescriptionTests($term: String!, $skip: Float!, $take: Float!) {
  searchPrescriptionTests(term: $term, skip: $skip, take: $take) {
    id
    card {
      id
      name
      age
      gender
    }
    result
    paid
    price
    completed
    new
    rx
    created_at
  }
}
    `;

/**
 * __useSearchPrescriptionTestsQuery__
 *
 * To run a query within a React component, call `useSearchPrescriptionTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPrescriptionTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPrescriptionTestsQuery({
 *   variables: {
 *      term: // value for 'term'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchPrescriptionTestsQuery(baseOptions: Apollo.QueryHookOptions<SearchPrescriptionTestsQuery, SearchPrescriptionTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPrescriptionTestsQuery, SearchPrescriptionTestsQueryVariables>(SearchPrescriptionTestsDocument, options);
      }
export function useSearchPrescriptionTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPrescriptionTestsQuery, SearchPrescriptionTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPrescriptionTestsQuery, SearchPrescriptionTestsQueryVariables>(SearchPrescriptionTestsDocument, options);
        }
export type SearchPrescriptionTestsQueryHookResult = ReturnType<typeof useSearchPrescriptionTestsQuery>;
export type SearchPrescriptionTestsLazyQueryHookResult = ReturnType<typeof useSearchPrescriptionTestsLazyQuery>;
export type SearchPrescriptionTestsQueryResult = Apollo.QueryResult<SearchPrescriptionTestsQuery, SearchPrescriptionTestsQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    id
    name
    desc
    price
    created_at
    updated_at
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsCountDocument = gql`
    query ProductsCount {
  productsCount
}
    `;

/**
 * __useProductsCountQuery__
 *
 * To run a query within a React component, call `useProductsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsCountQuery(baseOptions?: Apollo.QueryHookOptions<ProductsCountQuery, ProductsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsCountQuery, ProductsCountQueryVariables>(ProductsCountDocument, options);
      }
export function useProductsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsCountQuery, ProductsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsCountQuery, ProductsCountQueryVariables>(ProductsCountDocument, options);
        }
export type ProductsCountQueryHookResult = ReturnType<typeof useProductsCountQuery>;
export type ProductsCountLazyQueryHookResult = ReturnType<typeof useProductsCountLazyQuery>;
export type ProductsCountQueryResult = Apollo.QueryResult<ProductsCountQuery, ProductsCountQueryVariables>;
export const ProductsDocument = gql`
    query Products($skip: Float!, $take: Float!) {
  products(skip: $skip, take: $take) {
    id
    name
    desc
    price
    created_at
    updated_at
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useProductsQuery(baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const SearchProductsDocument = gql`
    query SearchProducts($name: String, $skip: Float!, $take: Float!) {
  searchProducts(name: $name, skip: $skip, take: $take) {
    id
    name
    desc
    price
    created_at
    updated_at
  }
}
    `;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchProductsQuery(baseOptions: Apollo.QueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
      }
export function useSearchProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
        }
export type SearchProductsQueryHookResult = ReturnType<typeof useSearchProductsQuery>;
export type SearchProductsLazyQueryHookResult = ReturnType<typeof useSearchProductsLazyQuery>;
export type SearchProductsQueryResult = Apollo.QueryResult<SearchProductsQuery, SearchProductsQueryVariables>;
export const QuickLaboratoryTestsDocument = gql`
    query QuickLaboratoryTests($skip: Float!, $take: Float!) {
  quickLaboratoryTests(skip: $skip, take: $take) {
    id
    name
    price
    paid
    completed
    new
    result
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useQuickLaboratoryTestsQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryTestsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickLaboratoryTestsQuery(baseOptions: Apollo.QueryHookOptions<QuickLaboratoryTestsQuery, QuickLaboratoryTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryTestsQuery, QuickLaboratoryTestsQueryVariables>(QuickLaboratoryTestsDocument, options);
      }
export function useQuickLaboratoryTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryTestsQuery, QuickLaboratoryTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryTestsQuery, QuickLaboratoryTestsQueryVariables>(QuickLaboratoryTestsDocument, options);
        }
export type QuickLaboratoryTestsQueryHookResult = ReturnType<typeof useQuickLaboratoryTestsQuery>;
export type QuickLaboratoryTestsLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryTestsLazyQuery>;
export type QuickLaboratoryTestsQueryResult = Apollo.QueryResult<QuickLaboratoryTestsQuery, QuickLaboratoryTestsQueryVariables>;
export const QuickLaboratoryTestsCountDocument = gql`
    query QuickLaboratoryTestsCount {
  quickLaboratoryTestsCount
}
    `;

/**
 * __useQuickLaboratoryTestsCountQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryTestsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryTestsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryTestsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuickLaboratoryTestsCountQuery(baseOptions?: Apollo.QueryHookOptions<QuickLaboratoryTestsCountQuery, QuickLaboratoryTestsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryTestsCountQuery, QuickLaboratoryTestsCountQueryVariables>(QuickLaboratoryTestsCountDocument, options);
      }
export function useQuickLaboratoryTestsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryTestsCountQuery, QuickLaboratoryTestsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryTestsCountQuery, QuickLaboratoryTestsCountQueryVariables>(QuickLaboratoryTestsCountDocument, options);
        }
export type QuickLaboratoryTestsCountQueryHookResult = ReturnType<typeof useQuickLaboratoryTestsCountQuery>;
export type QuickLaboratoryTestsCountLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryTestsCountLazyQuery>;
export type QuickLaboratoryTestsCountQueryResult = Apollo.QueryResult<QuickLaboratoryTestsCountQuery, QuickLaboratoryTestsCountQueryVariables>;
export const QuickLaboratoryTestsForDashboardDocument = gql`
    query QuickLaboratoryTestsForDashboard($skip: Float!, $take: Float!) {
  quickLaboratoryTests(skip: $skip, take: $take) {
    id
    price
    paid
    updated_at
  }
}
    `;

/**
 * __useQuickLaboratoryTestsForDashboardQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryTestsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryTestsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryTestsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickLaboratoryTestsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<QuickLaboratoryTestsForDashboardQuery, QuickLaboratoryTestsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryTestsForDashboardQuery, QuickLaboratoryTestsForDashboardQueryVariables>(QuickLaboratoryTestsForDashboardDocument, options);
      }
export function useQuickLaboratoryTestsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryTestsForDashboardQuery, QuickLaboratoryTestsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryTestsForDashboardQuery, QuickLaboratoryTestsForDashboardQueryVariables>(QuickLaboratoryTestsForDashboardDocument, options);
        }
export type QuickLaboratoryTestsForDashboardQueryHookResult = ReturnType<typeof useQuickLaboratoryTestsForDashboardQuery>;
export type QuickLaboratoryTestsForDashboardLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryTestsForDashboardLazyQuery>;
export type QuickLaboratoryTestsForDashboardQueryResult = Apollo.QueryResult<QuickLaboratoryTestsForDashboardQuery, QuickLaboratoryTestsForDashboardQueryVariables>;
export const QuickPrescriptionTestsDocument = gql`
    query QuickPrescriptionTests($skip: Float!, $take: Float!) {
  quickPrescriptionTests(skip: $skip, take: $take) {
    id
    name
    price
    paid
    completed
    new
    result
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useQuickPrescriptionTestsQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionTestsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickPrescriptionTestsQuery(baseOptions: Apollo.QueryHookOptions<QuickPrescriptionTestsQuery, QuickPrescriptionTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionTestsQuery, QuickPrescriptionTestsQueryVariables>(QuickPrescriptionTestsDocument, options);
      }
export function useQuickPrescriptionTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionTestsQuery, QuickPrescriptionTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionTestsQuery, QuickPrescriptionTestsQueryVariables>(QuickPrescriptionTestsDocument, options);
        }
export type QuickPrescriptionTestsQueryHookResult = ReturnType<typeof useQuickPrescriptionTestsQuery>;
export type QuickPrescriptionTestsLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionTestsLazyQuery>;
export type QuickPrescriptionTestsQueryResult = Apollo.QueryResult<QuickPrescriptionTestsQuery, QuickPrescriptionTestsQueryVariables>;
export const QuickPrescriptionTestsCountDocument = gql`
    query QuickPrescriptionTestsCount {
  quickPrescriptionTestsCount
}
    `;

/**
 * __useQuickPrescriptionTestsCountQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionTestsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionTestsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionTestsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuickPrescriptionTestsCountQuery(baseOptions?: Apollo.QueryHookOptions<QuickPrescriptionTestsCountQuery, QuickPrescriptionTestsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionTestsCountQuery, QuickPrescriptionTestsCountQueryVariables>(QuickPrescriptionTestsCountDocument, options);
      }
export function useQuickPrescriptionTestsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionTestsCountQuery, QuickPrescriptionTestsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionTestsCountQuery, QuickPrescriptionTestsCountQueryVariables>(QuickPrescriptionTestsCountDocument, options);
        }
export type QuickPrescriptionTestsCountQueryHookResult = ReturnType<typeof useQuickPrescriptionTestsCountQuery>;
export type QuickPrescriptionTestsCountLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionTestsCountLazyQuery>;
export type QuickPrescriptionTestsCountQueryResult = Apollo.QueryResult<QuickPrescriptionTestsCountQuery, QuickPrescriptionTestsCountQueryVariables>;
export const QuickPrescriptionTestsForDashboardDocument = gql`
    query QuickPrescriptionTestsForDashboard($skip: Float!, $take: Float!) {
  quickPrescriptionTests(skip: $skip, take: $take) {
    id
    price
    paid
    updated_at
  }
}
    `;

/**
 * __useQuickPrescriptionTestsForDashboardQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionTestsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionTestsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionTestsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickPrescriptionTestsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<QuickPrescriptionTestsForDashboardQuery, QuickPrescriptionTestsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionTestsForDashboardQuery, QuickPrescriptionTestsForDashboardQueryVariables>(QuickPrescriptionTestsForDashboardDocument, options);
      }
export function useQuickPrescriptionTestsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionTestsForDashboardQuery, QuickPrescriptionTestsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionTestsForDashboardQuery, QuickPrescriptionTestsForDashboardQueryVariables>(QuickPrescriptionTestsForDashboardDocument, options);
        }
export type QuickPrescriptionTestsForDashboardQueryHookResult = ReturnType<typeof useQuickPrescriptionTestsForDashboardQuery>;
export type QuickPrescriptionTestsForDashboardLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionTestsForDashboardLazyQuery>;
export type QuickPrescriptionTestsForDashboardQueryResult = Apollo.QueryResult<QuickPrescriptionTestsForDashboardQuery, QuickPrescriptionTestsForDashboardQueryVariables>;
export const SettingDocument = gql`
    query Setting {
  setting {
    id
    card_price
    card_expiration_date
    laboratory_tests_data
    prescription_tests_data
  }
}
    `;

/**
 * __useSettingQuery__
 *
 * To run a query within a React component, call `useSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingQuery(baseOptions?: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
export type SettingQueryResult = Apollo.QueryResult<SettingQuery, SettingQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    id
    username
    occupation
    created_at
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const NewCreatedCardDocument = gql`
    subscription NewCreatedCard {
  newCreatedCard {
    id
    name
    new
    phone
    age
    gender
    valid
    address
    k_ketema
    kebele
    house_no
    payment {
      id
      created_at
      price
    }
    history {
      id
      created_at
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedCardSubscription__
 *
 * To run a query within a React component, call `useNewCreatedCardSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedCardSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedCardSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedCardSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedCardSubscription, NewCreatedCardSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedCardSubscription, NewCreatedCardSubscriptionVariables>(NewCreatedCardDocument, options);
      }
export type NewCreatedCardSubscriptionHookResult = ReturnType<typeof useNewCreatedCardSubscription>;
export type NewCreatedCardSubscriptionResult = Apollo.SubscriptionResult<NewCreatedCardSubscription>;
export const NewCreatedLaboratoryTestDocument = gql`
    subscription NewCreatedLaboratoryTest {
  newCreatedLaboratoryTest {
    id
    paid
    price
    new
    result
    completed
    card {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedLaboratoryTestSubscription__
 *
 * To run a query within a React component, call `useNewCreatedLaboratoryTestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedLaboratoryTestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedLaboratoryTestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedLaboratoryTestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedLaboratoryTestSubscription, NewCreatedLaboratoryTestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedLaboratoryTestSubscription, NewCreatedLaboratoryTestSubscriptionVariables>(NewCreatedLaboratoryTestDocument, options);
      }
export type NewCreatedLaboratoryTestSubscriptionHookResult = ReturnType<typeof useNewCreatedLaboratoryTestSubscription>;
export type NewCreatedLaboratoryTestSubscriptionResult = Apollo.SubscriptionResult<NewCreatedLaboratoryTestSubscription>;
export const DeleteNotificationSubscriptionDocument = gql`
    subscription DeleteNotificationSubscription {
  deleteNotificationSubscription {
    id
  }
}
    `;

/**
 * __useDeleteNotificationSubscriptionSubscription__
 *
 * To run a query within a React component, call `useDeleteNotificationSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeleteNotificationSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDeleteNotificationSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DeleteNotificationSubscriptionSubscription, DeleteNotificationSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<DeleteNotificationSubscriptionSubscription, DeleteNotificationSubscriptionSubscriptionVariables>(DeleteNotificationSubscriptionDocument, options);
      }
export type DeleteNotificationSubscriptionSubscriptionHookResult = ReturnType<typeof useDeleteNotificationSubscriptionSubscription>;
export type DeleteNotificationSubscriptionSubscriptionResult = Apollo.SubscriptionResult<DeleteNotificationSubscriptionSubscription>;
export const NewNotificationSubscriptionDocument = gql`
    subscription NewNotificationSubscription {
  newNotificationSubscription {
    id
    desc
    card_id
    laboratory_test_id
    prescription_test_id
    quick_laboratory_test_id
    quick_prescription_test_id
    action
    created_at
  }
}
    `;

/**
 * __useNewNotificationSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewNotificationSubscriptionSubscription, NewNotificationSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewNotificationSubscriptionSubscription, NewNotificationSubscriptionSubscriptionVariables>(NewNotificationSubscriptionDocument, options);
      }
export type NewNotificationSubscriptionSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscriptionSubscription>;
export type NewNotificationSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NewNotificationSubscriptionSubscription>;
export const NewCreatedPrescriptionTestDocument = gql`
    subscription NewCreatedPrescriptionTest {
  newCreatedPrescriptionTest {
    id
    card {
      id
      name
    }
    paid
    price
    completed
    new
    rx
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedPrescriptionTestSubscription__
 *
 * To run a query within a React component, call `useNewCreatedPrescriptionTestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedPrescriptionTestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedPrescriptionTestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedPrescriptionTestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedPrescriptionTestSubscription, NewCreatedPrescriptionTestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedPrescriptionTestSubscription, NewCreatedPrescriptionTestSubscriptionVariables>(NewCreatedPrescriptionTestDocument, options);
      }
export type NewCreatedPrescriptionTestSubscriptionHookResult = ReturnType<typeof useNewCreatedPrescriptionTestSubscription>;
export type NewCreatedPrescriptionTestSubscriptionResult = Apollo.SubscriptionResult<NewCreatedPrescriptionTestSubscription>;
export const NewCreatedQuickLaboratoryTestDocument = gql`
    subscription NewCreatedQuickLaboratoryTest {
  newCreatedQuickLaboratoryTest {
    id
    name
    price
    paid
    completed
    new
    result
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedQuickLaboratoryTestSubscription__
 *
 * To run a query within a React component, call `useNewCreatedQuickLaboratoryTestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedQuickLaboratoryTestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedQuickLaboratoryTestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedQuickLaboratoryTestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedQuickLaboratoryTestSubscription, NewCreatedQuickLaboratoryTestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedQuickLaboratoryTestSubscription, NewCreatedQuickLaboratoryTestSubscriptionVariables>(NewCreatedQuickLaboratoryTestDocument, options);
      }
export type NewCreatedQuickLaboratoryTestSubscriptionHookResult = ReturnType<typeof useNewCreatedQuickLaboratoryTestSubscription>;
export type NewCreatedQuickLaboratoryTestSubscriptionResult = Apollo.SubscriptionResult<NewCreatedQuickLaboratoryTestSubscription>;
export const NewCreatedQuickPrescriptionTestDocument = gql`
    subscription NewCreatedQuickPrescriptionTest {
  newCreatedQuickPrescriptionTest {
    id
    name
    price
    paid
    completed
    new
    result
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedQuickPrescriptionTestSubscription__
 *
 * To run a query within a React component, call `useNewCreatedQuickPrescriptionTestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedQuickPrescriptionTestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedQuickPrescriptionTestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedQuickPrescriptionTestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedQuickPrescriptionTestSubscription, NewCreatedQuickPrescriptionTestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedQuickPrescriptionTestSubscription, NewCreatedQuickPrescriptionTestSubscriptionVariables>(NewCreatedQuickPrescriptionTestDocument, options);
      }
export type NewCreatedQuickPrescriptionTestSubscriptionHookResult = ReturnType<typeof useNewCreatedQuickPrescriptionTestSubscription>;
export type NewCreatedQuickPrescriptionTestSubscriptionResult = Apollo.SubscriptionResult<NewCreatedQuickPrescriptionTestSubscription>;