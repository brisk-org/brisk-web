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
  laboratoryExaminations?: Maybe<Array<LaboratoryExamination>>;
  prescriptions?: Maybe<Array<Prescription>>;
  notifications?: Maybe<Array<Notification>>;
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
};

export type CheckIn = {
  __typename?: 'CheckIn';
  date: Scalars['String'];
  price: Scalars['Float'];
  status: Array<CheckInStatus>;
};

export type CheckInInput = {
  date: Scalars['String'];
  price: Scalars['Float'];
  status: Array<CheckInStatusInput>;
};

export type CheckInStatus = {
  __typename?: 'CheckInStatus';
  isPaid: Scalars['Boolean'];
  paidAt: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type CheckInStatusInput = {
  isPaid: Scalars['Boolean'];
  paidAt: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type CompleteLaboratoryExaminationInput = {
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type CompleteQuickLabTestInput = {
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
};

export type CompleteQuickPrescriptionTestInput = {
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
};

export type CreateMedicationsInput = {
  medicineId: Scalars['ID'];
  strength?: Maybe<Scalars['String']>;
  perDay: PerDay;
  /** getting this array from the client and stringify it  */
  checkIn: Array<CheckInInput>;
  forDays: Scalars['Float'];
  other?: Maybe<Scalars['String']>;
};

export type CreateQuickLabTestInput = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  testIds: Array<Scalars['ID']>;
  result?: Maybe<QuickLaboratoryExaminationResult>;
  other?: Maybe<Scalars['String']>;
};

export type CreateQuickPrescriptionTestInput = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  medicineIds: Array<Scalars['ID']>;
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
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type LaboratoryExamination = {
  __typename?: 'LaboratoryExamination';
  id: Scalars['ID'];
  cardId: Scalars['Float'];
  card: Card;
  notifications?: Maybe<Array<Notification>>;
  laboratoryTests: Array<LaboratoryTest>;
  values?: Maybe<Array<LaboratoryExaminationValue>>;
  paid: Scalars['Boolean'];
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type LaboratoryExaminationValue = {
  __typename?: 'LaboratoryExaminationValue';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type LaboratoryTest = {
  __typename?: 'LaboratoryTest';
  id: Scalars['ID'];
  name: Scalars['String'];
  normalValue: Scalars['String'];
  commonValues?: Maybe<Array<Scalars['String']>>;
  category?: Maybe<LaboratoryTest>;
  subCategory?: Maybe<LaboratoryTestSubCategory>;
  laboratoryTestExaminations?: Maybe<Array<LaboratoryExamination>>;
  price?: Maybe<Scalars['Float']>;
  hasPrice: Scalars['Boolean'];
  isInfluencedByCategory: Scalars['Boolean'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type LaboratoryTestCategory = {
  __typename?: 'LaboratoryTestCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  laboratoryTests: Array<LaboratoryTest>;
  subCategories: Array<LaboratoryTestSubCategory>;
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type LaboratoryTestContentInput = {
  name: Scalars['String'];
  normalValue: Scalars['String'];
  commonValues?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['Float']>;
  hasPrice: Scalars['Boolean'];
  isInfluencedByCategory: Scalars['Boolean'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
};

export type LaboratoryTestIdInput = {
  id: Scalars['String'];
};

export type LaboratoryTestSubCategory = {
  __typename?: 'LaboratoryTestSubCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
  laboratoryTests: Array<LaboratoryTest>;
  category: LaboratoryTestCategory;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Medication = {
  __typename?: 'Medication';
  id: Scalars['ID'];
  medicine: Medicine;
  medicineId: Scalars['String'];
  prescription: Prescription;
  strength?: Maybe<Scalars['String']>;
  perDay: PerDay;
  checkIn: Array<CheckIn>;
  forDays: Scalars['Float'];
  other?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type MedicationsCheckInInput = {
  name: Scalars['String'];
  checkIn: Array<CheckInInput>;
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['ID'];
  name: Scalars['String'];
  medications: Medication;
  price: Scalars['Float'];
  inStock: Scalars['Float'];
  strength?: Maybe<Scalars['String']>;
  perDay?: Maybe<PerDay>;
  forDays?: Maybe<Scalars['Float']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  changeUserDetail: UserResponse;
  uploadPhoto: User;
  deleteUser: Scalars['Float'];
  createLaboratoryExamination: LaboratoryExamination;
  completeLaboratoryExamination: LaboratoryExamination;
  saveLaboratoryExamination: LaboratoryExamination;
  payForLaboratoryExamination: LaboratoryExamination;
  deleteLaboratoryExamination: Scalars['Boolean'];
  markLaboratoryExaminationAsSeen: LaboratoryExamination;
  createLaboratoryTest: LaboratoryTest;
  updateLaboratoryTest: LaboratoryTest;
  moveLaboratoryTest: LaboratoryTest;
  deleteLaboratoryTest: Scalars['Boolean'];
  createLaboratoryTestCategory: LaboratoryTestCategory;
  updateLaboratoryTestCategory: LaboratoryTestCategory;
  deleteLaboratoryTestCategory: Scalars['Boolean'];
  createLaboratoryTestSubCategory: LaboratoryTestSubCategory;
  updateLaboratoryTestSubCategory: LaboratoryTestSubCategory;
  deleteLaboratoryTestSubCategory: Scalars['Boolean'];
  changeSetting: Settings;
  createCard: Card;
  updateCard: Card;
  deleteCard: Scalars['Boolean'];
  markCardAsNew: Card;
  markCardAsSeen: Card;
  invalidateCard: Card;
  addMedicine: Medicine;
  updateMedicine: Medicine;
  deleteMedicine: Scalars['Boolean'];
  createHistory: History;
  updateHistory: History;
  deleteHistory: Scalars['Boolean'];
  createPrescription: Prescription;
  markPrescriptionAsCompleted: Prescription;
  updatePrescriptionCheckIn: Prescription;
  markPrescriptionAsPaid: Prescription;
  deletePrescription: Scalars['Boolean'];
  markPrescriptionAsSeen: Prescription;
  deleteMedication: Scalars['Boolean'];
  createQuickPrescription: QuickPrescription;
  completeQuickPrescription: QuickPrescription;
  markQuickPrescriptionAsPaid: QuickPrescription;
  markQuickPrescriptionAsSeen: QuickPrescription;
  createQuickLaboratoryExamination: QuickLaboratoryExamination;
  completeQuickLaboratoryExamination: QuickLaboratoryExamination;
  markQuickLaboratoryExaminationAsPaid: QuickLaboratoryExamination;
  markQuickLaboratoryExaminationAsSeen: QuickLaboratoryExamination;
  deleteNotification: Scalars['Boolean'];
  clearNotification: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  occupation: Occupation;
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


export type MutationCreateLaboratoryExaminationArgs = {
  cardId: Scalars['ID'];
  price: Scalars['Float'];
  laboratoryTest: Array<LaboratoryTestIdInput>;
  selectedCategories?: Maybe<Array<Scalars['ID']>>;
  selectedSubCategories?: Maybe<Array<Scalars['ID']>>;
};


export type MutationCompleteLaboratoryExaminationArgs = {
  content: Array<CompleteLaboratoryExaminationInput>;
  id: Scalars['ID'];
};


export type MutationSaveLaboratoryExaminationArgs = {
  content: Array<CompleteLaboratoryExaminationInput>;
  id: Scalars['ID'];
};


export type MutationPayForLaboratoryExaminationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLaboratoryExaminationArgs = {
  id: Scalars['ID'];
};


export type MutationMarkLaboratoryExaminationAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLaboratoryTestArgs = {
  content: LaboratoryTestContentInput;
  subCategoryId?: Maybe<Scalars['ID']>;
  categoryId: Scalars['ID'];
};


export type MutationUpdateLaboratoryTestArgs = {
  content: LaboratoryTestContentInput;
  id: Scalars['ID'];
};


export type MutationMoveLaboratoryTestArgs = {
  id: Scalars['ID'];
  categoryId?: Maybe<Scalars['ID']>;
  subCategoryId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteLaboratoryTestArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLaboratoryTestCategoryArgs = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
};


export type MutationUpdateLaboratoryTestCategoryArgs = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
  id: Scalars['ID'];
};


export type MutationDeleteLaboratoryTestCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLaboratoryTestSubCategoryArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
  id: Scalars['ID'];
};


export type MutationUpdateLaboratoryTestSubCategoryArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
  id: Scalars['ID'];
};


export type MutationDeleteLaboratoryTestSubCategoryArgs = {
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


export type MutationAddMedicineArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock: Scalars['Float'];
  forDays?: Maybe<Scalars['Float']>;
  perDay?: Maybe<PerDay>;
  strength?: Maybe<Scalars['String']>;
};


export type MutationUpdateMedicineArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock: Scalars['Float'];
  forDays?: Maybe<Scalars['Float']>;
  perDay?: Maybe<PerDay>;
  strength?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};


export type MutationDeleteMedicineArgs = {
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


export type MutationCreatePrescriptionArgs = {
  cardId: Scalars['ID'];
  medications: Array<CreateMedicationsInput>;
  price: Scalars['Float'];
  rx: Scalars['String'];
};


export type MutationMarkPrescriptionAsCompletedArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePrescriptionCheckInArgs = {
  medicationsCheckIn: Array<MedicationsCheckInInput>;
  id: Scalars['ID'];
};


export type MutationMarkPrescriptionAsPaidArgs = {
  paid: Scalars['Boolean'];
  id: Scalars['ID'];
};


export type MutationDeletePrescriptionArgs = {
  id: Scalars['ID'];
};


export type MutationMarkPrescriptionAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMedicationArgs = {
  id: Scalars['ID'];
};


export type MutationCreateQuickPrescriptionArgs = {
  input: CreateQuickPrescriptionTestInput;
};


export type MutationCompleteQuickPrescriptionArgs = {
  id: Scalars['String'];
  input: CompleteQuickPrescriptionTestInput;
};


export type MutationMarkQuickPrescriptionAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationMarkQuickPrescriptionAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationCreateQuickLaboratoryExaminationArgs = {
  input: CreateQuickLabTestInput;
};


export type MutationCompleteQuickLaboratoryExaminationArgs = {
  id: Scalars['String'];
  input: CompleteQuickLabTestInput;
};


export type MutationMarkQuickLaboratoryExaminationAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationMarkQuickLaboratoryExaminationAsSeenArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  for: Array<Occupation>;
  message: Scalars['String'];
  action: NotificationAction;
  card?: Maybe<Card>;
  laboratory_test?: Maybe<LaboratoryExamination>;
  prescription?: Maybe<Prescription>;
  quick_prescription_test?: Maybe<QuickPrescription>;
  quick_laboratory_test?: Maybe<QuickLaboratoryExamination>;
  created_at: Scalars['String'];
};

export enum NotificationAction {
  Payment = 'PAYMENT',
  Create = 'CREATE',
  MarkAsNew = 'MARK_AS_NEW',
  Complete = 'COMPLETE',
  CheckIn = 'CHECK_IN'
}

export enum Occupation {
  Admin = 'ADMIN',
  Reception = 'RECEPTION',
  Doctor = 'DOCTOR',
  Nurse = 'NURSE',
  Laboratory = 'LABORATORY'
}

export enum PerDay {
  Bid = 'BID',
  Stat = 'STAT'
}

export type Prescription = {
  __typename?: 'Prescription';
  id: Scalars['ID'];
  cardId: Scalars['Float'];
  card: Card;
  medications?: Maybe<Array<Medication>>;
  notifications?: Maybe<Array<Notification>>;
  rx: Scalars['String'];
  paid: Scalars['Boolean'];
  inrolled: Scalars['Boolean'];
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  me?: Maybe<User>;
  laboratoryExaminationCount: Scalars['Float'];
  laboratoryExaminations: Array<LaboratoryExamination>;
  laboratoryExamination: LaboratoryExamination;
  searchLaboratoryExamination: Array<LaboratoryExamination>;
  laboratoryTests: Array<LaboratoryTest>;
  laboratoryTestsForCategory: Array<LaboratoryTest>;
  laboratoryTestCategories: Array<LaboratoryTestCategory>;
  laboratoryTestSubCategories: Array<LaboratoryTestSubCategory>;
  setting: Settings;
  cardsCount: Scalars['Float'];
  cards: Array<Card>;
  card: Card;
  searchCards: Array<Card>;
  medicineCount: Scalars['Float'];
  medicines: Array<Medicine>;
  medicine: Medicine;
  cardSales: Array<CardSales>;
  histories: Array<History>;
  weeklyHistory: Array<History>;
  history: History;
  prescriptionCount: Scalars['Float'];
  prescriptions: Array<Prescription>;
  prescription: Prescription;
  searchPrescriptions: Array<Prescription>;
  medicationCount: Scalars['Float'];
  medications: Array<Medication>;
  medication: Medication;
  quickPrescriptionCount: Scalars['Float'];
  quickPrescription: QuickPrescription;
  quickPrescriptions: Array<QuickPrescription>;
  quickLaboratoryExaminationCount: Scalars['Float'];
  quickLaboratoryExaminations: Array<QuickLaboratoryExamination>;
  quickLaboratoryExamination: QuickLaboratoryExamination;
  quickLaboratoryTests: Array<QuickLaboratoryTest>;
  quickMedicines: Array<QuickMedicine>;
  notifications: Array<Notification>;
};


export type QueryLaboratoryExaminationsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryLaboratoryExaminationArgs = {
  id: Scalars['ID'];
};


export type QuerySearchLaboratoryExaminationArgs = {
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryLaboratoryTestsForCategoryArgs = {
  categoryId: Scalars['ID'];
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


export type QueryMedicineArgs = {
  id: Scalars['ID'];
};


export type QueryWeeklyHistoryArgs = {
  endingDate: Scalars['String'];
  startingDate: Scalars['String'];
};


export type QueryHistoryArgs = {
  id: Scalars['ID'];
};


export type QueryPrescriptionsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryPrescriptionArgs = {
  id: Scalars['ID'];
};


export type QuerySearchPrescriptionsArgs = {
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryMedicationArgs = {
  id: Scalars['ID'];
};


export type QueryQuickPrescriptionArgs = {
  id: Scalars['ID'];
};


export type QueryQuickPrescriptionsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryQuickLaboratoryExaminationsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};


export type QueryQuickLaboratoryExaminationArgs = {
  id: Scalars['ID'];
};

export type QuickLaboratoryExamination = {
  __typename?: 'QuickLaboratoryExamination';
  id: Scalars['ID'];
  name: Scalars['String'];
  notifications?: Maybe<Array<Notification>>;
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  paid: Scalars['Boolean'];
  tests: Array<QuickLaboratoryTest>;
  result?: Maybe<QuickLaboratoryExaminationResult>;
  other?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export enum QuickLaboratoryExaminationResult {
  Positive = 'POSITIVE',
  Negative = 'NEGATIVE'
}

export type QuickLaboratoryTest = {
  __typename?: 'QuickLaboratoryTest';
  id: Scalars['ID'];
  name: Scalars['String'];
  examinations?: Maybe<Array<QuickLaboratoryExamination>>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type QuickMedicine = {
  __typename?: 'QuickMedicine';
  id: Scalars['ID'];
  name: Scalars['String'];
  prescription: Array<QuickPrescription>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type QuickPrescription = {
  __typename?: 'QuickPrescription';
  id: Scalars['ID'];
  name: Scalars['String'];
  notifications?: Maybe<Array<Notification>>;
  price: Scalars['Float'];
  completed: Scalars['Boolean'];
  new: Scalars['Boolean'];
  paid: Scalars['Boolean'];
  medicines: Array<QuickMedicine>;
  other?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  card_price: Scalars['Float'];
  card_expiration_date: Scalars['Float'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newCreatedLaboratoryExamination: LaboratoryExamination;
  newCreatedCard: Card;
  newMedicationUpdate: Prescription;
  newCreatedPrescription: Prescription;
  newCreatedQuickPrescription: QuickPrescription;
  newCreatedQuickLaboratoryExamination: QuickLaboratoryExamination;
  newNotificationSubscription: Notification;
  deleteNotificationSubscription: Notification;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  occupation: Occupation;
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

export type CreateLaboratoryTestMutationVariables = Exact<{
  categoryId: Scalars['ID'];
  subCategoryId?: Maybe<Scalars['ID']>;
  content: LaboratoryTestContentInput;
}>;


export type CreateLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { createLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id'>
  ) }
);

export type DeleteLaboratoryTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLaboratoryTest'>
);

export type MoveLaboratoryTestMutationVariables = Exact<{
  id: Scalars['ID'];
  categoryId?: Maybe<Scalars['ID']>;
  subCategoryId?: Maybe<Scalars['ID']>;
}>;


export type MoveLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { moveLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id'>
    & { subCategory?: Maybe<(
      { __typename?: 'LaboratoryTestSubCategory' }
      & Pick<LaboratoryTestSubCategory, 'id' | 'name'>
    )>, category?: Maybe<(
      { __typename?: 'LaboratoryTest' }
      & Pick<LaboratoryTest, 'id' | 'name'>
    )> }
  ) }
);

export type UpdateLaboratoryTestMutationVariables = Exact<{
  id: Scalars['ID'];
  content: LaboratoryTestContentInput;
}>;


export type UpdateLaboratoryTestMutation = (
  { __typename?: 'Mutation' }
  & { updateLaboratoryTest: (
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id'>
  ) }
);

export type CompleteLaboratoryExaminationMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Array<CompleteLaboratoryExaminationInput> | CompleteLaboratoryExaminationInput;
}>;


export type CompleteLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & { completeLaboratoryExamination: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'paid' | 'completed' | 'new' | 'price' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'phone'>
    ) }
  ) }
);

export type CreateLaboratoryExaminationMutationVariables = Exact<{
  cardId: Scalars['ID'];
  laboratoryTest: Array<LaboratoryTestIdInput> | LaboratoryTestIdInput;
  selectedCategories?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
  selectedSubCategories?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
  price: Scalars['Float'];
}>;


export type CreateLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & { createLaboratoryExamination: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'price'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name'>
    ) }
  ) }
);

export type DeleteLaboratoryExaminationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLaboratoryExamination'>
);

export type MarkLaboratoryExaminationAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkLaboratoryExaminationAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markLaboratoryExaminationAsSeen: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name'>
    ) }
  ) }
);

export type PayForLaboratoryExaminationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PayForLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & { payForLaboratoryExamination: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id'>
  ) }
);

export type SaveLaboratoryExaminationMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Array<CompleteLaboratoryExaminationInput> | CompleteLaboratoryExaminationInput;
}>;


export type SaveLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & { saveLaboratoryExamination: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'paid' | 'completed' | 'new' | 'price' | 'created_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'phone'>
    ) }
  ) }
);

export type CreateLaboratoryTestCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
}>;


export type CreateLaboratoryTestCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createLaboratoryTestCategory: (
    { __typename?: 'LaboratoryTestCategory' }
    & Pick<LaboratoryTestCategory, 'id' | 'name' | 'inStock' | 'trackInStock' | 'created_at' | 'updated_at'>
  ) }
);

export type DeleteLaboratoryTestCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLaboratoryTestCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLaboratoryTestCategory'>
);

export type UpdateLaboratoryTestCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
}>;


export type UpdateLaboratoryTestCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateLaboratoryTestCategory: (
    { __typename?: 'LaboratoryTestCategory' }
    & Pick<LaboratoryTestCategory, 'id' | 'name' | 'inStock' | 'trackInStock' | 'created_at' | 'updated_at'>
  ) }
);

export type CreateLaboratoryTestSubCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
}>;


export type CreateLaboratoryTestSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createLaboratoryTestSubCategory: (
    { __typename?: 'LaboratoryTestSubCategory' }
    & Pick<LaboratoryTestSubCategory, 'id' | 'name' | 'inStock' | 'trackInStock' | 'created_at'>
  ) }
);

export type DeleteLaboratoryTestSubCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLaboratoryTestSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLaboratoryTestSubCategory'>
);

export type UpdateLaboratoryTestSubCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock?: Maybe<Scalars['Float']>;
  trackInStock: Scalars['Boolean'];
}>;


export type UpdateLaboratoryTestSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateLaboratoryTestSubCategory: (
    { __typename?: 'LaboratoryTestSubCategory' }
    & Pick<LaboratoryTestSubCategory, 'id' | 'name' | 'inStock' | 'trackInStock' | 'created_at'>
  ) }
);

export type AddMedicineMutationVariables = Exact<{
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock: Scalars['Float'];
  strength?: Maybe<Scalars['String']>;
  perDay?: Maybe<PerDay>;
  forDays?: Maybe<Scalars['Float']>;
}>;


export type AddMedicineMutation = (
  { __typename?: 'Mutation' }
  & { addMedicine: (
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock' | 'forDays' | 'perDay' | 'strength' | 'created_at' | 'updated_at'>
  ) }
);

export type DeleteMedicineMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMedicineMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMedicine'>
);

export type UpdateMedicineMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  inStock: Scalars['Float'];
  strength?: Maybe<Scalars['String']>;
  perDay?: Maybe<PerDay>;
  forDays?: Maybe<Scalars['Float']>;
}>;


export type UpdateMedicineMutation = (
  { __typename?: 'Mutation' }
  & { updateMedicine: (
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock' | 'forDays' | 'perDay' | 'strength' | 'created_at' | 'updated_at'>
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

export type CreatePrescriptionMutationVariables = Exact<{
  cardId: Scalars['ID'];
  price: Scalars['Float'];
  rx: Scalars['String'];
  medications: Array<CreateMedicationsInput> | CreateMedicationsInput;
}>;


export type CreatePrescriptionMutation = (
  { __typename?: 'Mutation' }
  & { createPrescription: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'price' | 'rx'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name'>
    ), medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & Pick<Medication, 'id' | 'perDay' | 'forDays'>
      & { checkIn: Array<(
        { __typename?: 'CheckIn' }
        & Pick<CheckIn, 'date' | 'price'>
        & { status: Array<(
          { __typename?: 'CheckInStatus' }
          & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
        )> }
      )> }
    )>> }
  ) }
);

export type DeletePrescriptionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePrescriptionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePrescription'>
);

export type MarkPrescriptionAsCompletedMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkPrescriptionAsCompletedMutation = (
  { __typename?: 'Mutation' }
  & { markPrescriptionAsCompleted: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'completed' | 'new' | 'inrolled'>
  ) }
);

export type MarkPrescriptionAsPaidMutationVariables = Exact<{
  id: Scalars['ID'];
  paid: Scalars['Boolean'];
}>;


export type MarkPrescriptionAsPaidMutation = (
  { __typename?: 'Mutation' }
  & { markPrescriptionAsPaid: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'inrolled'>
  ) }
);

export type MarkPrescriptionAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkPrescriptionAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markPrescriptionAsSeen: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'new'>
  ) }
);

export type UpdatePrescriptionCheckInMutationVariables = Exact<{
  id: Scalars['ID'];
  medicationsCheckIn: Array<MedicationsCheckInInput> | MedicationsCheckInInput;
}>;


export type UpdatePrescriptionCheckInMutation = (
  { __typename?: 'Mutation' }
  & { updatePrescriptionCheckIn: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id'>
    & { medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & { checkIn: Array<(
        { __typename?: 'CheckIn' }
        & Pick<CheckIn, 'date' | 'price'>
        & { status: Array<(
          { __typename?: 'CheckInStatus' }
          & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
        )> }
      )> }
    )>> }
  ) }
);

export type CompleteQuickLaboratoryExaminationMutationVariables = Exact<{
  id: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
}>;


export type CompleteQuickLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & { completeQuickLaboratoryExamination: (
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
    & { tests: Array<(
      { __typename?: 'QuickLaboratoryTest' }
      & Pick<QuickLaboratoryTest, 'id' | 'name'>
    )> }
  ) }
);

export type CreateQuickLaboratoryExaminationMutationVariables = Exact<{
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  testIds: Array<Scalars['ID']> | Scalars['ID'];
  result?: Maybe<QuickLaboratoryExaminationResult>;
  other?: Maybe<Scalars['String']>;
}>;


export type CreateQuickLaboratoryExaminationMutation = (
  { __typename?: 'Mutation' }
  & { createQuickLaboratoryExamination: (
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
    & { tests: Array<(
      { __typename?: 'QuickLaboratoryTest' }
      & Pick<QuickLaboratoryTest, 'id' | 'name'>
    )> }
  ) }
);

export type MarkQuickLaboratoryExaminationAsPaidMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickLaboratoryExaminationAsPaidMutation = (
  { __typename?: 'Mutation' }
  & { markQuickLaboratoryExaminationAsPaid: (
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'paid'>
  ) }
);

export type MarkQuickLaboratoryExaminationAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickLaboratoryExaminationAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markQuickLaboratoryExaminationAsSeen: (
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'new'>
  ) }
);

export type CompleteQuickPrescriptionMutationVariables = Exact<{
  id: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
}>;


export type CompleteQuickPrescriptionMutation = (
  { __typename?: 'Mutation' }
  & { completeQuickPrescription: (
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'name' | 'price' | 'other' | 'created_at'>
    & { medicines: Array<(
      { __typename?: 'QuickMedicine' }
      & Pick<QuickMedicine, 'id' | 'name'>
    )> }
  ) }
);

export type CreateQuickPrescriptionMutationVariables = Exact<{
  name: Scalars['String'];
  medicineIds: Array<Scalars['ID']> | Scalars['ID'];
  price?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['String']>;
}>;


export type CreateQuickPrescriptionMutation = (
  { __typename?: 'Mutation' }
  & { createQuickPrescription: (
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'name' | 'price' | 'other' | 'created_at'>
    & { medicines: Array<(
      { __typename?: 'QuickMedicine' }
      & Pick<QuickMedicine, 'id' | 'name'>
    )> }
  ) }
);

export type MarkQuickPrescriptionAsPaidMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickPrescriptionAsPaidMutation = (
  { __typename?: 'Mutation' }
  & { markQuickPrescriptionAsPaid: (
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'paid'>
  ) }
);

export type MarkQuickPrescriptionAsSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkQuickPrescriptionAsSeenMutation = (
  { __typename?: 'Mutation' }
  & { markQuickPrescriptionAsSeen: (
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'new'>
  ) }
);

export type ChangeSettingMutationVariables = Exact<{
  card_price: Scalars['Float'];
  card_expiration_date: Scalars['Float'];
}>;


export type ChangeSettingMutation = (
  { __typename?: 'Mutation' }
  & { changeSetting: (
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'card_price' | 'card_expiration_date'>
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

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
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
  occupation: Occupation;
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
    )>>, prescriptions?: Maybe<Array<(
      { __typename?: 'Prescription' }
      & Pick<Prescription, 'id' | 'paid' | 'inrolled' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
      & { medications?: Maybe<Array<(
        { __typename?: 'Medication' }
        & Pick<Medication, 'id' | 'strength' | 'perDay' | 'forDays' | 'other'>
        & { medicine: (
          { __typename?: 'Medicine' }
          & Pick<Medicine, 'id' | 'name' | 'price'>
        ) }
      )>> }
    )>>, laboratoryExaminations?: Maybe<Array<(
      { __typename?: 'LaboratoryExamination' }
      & Pick<LaboratoryExamination, 'id' | 'cardId' | 'paid' | 'new' | 'completed' | 'price' | 'created_at' | 'updated_at'>
      & { laboratoryTests: Array<(
        { __typename?: 'LaboratoryTest' }
        & Pick<LaboratoryTest, 'id' | 'name' | 'normalValue'>
        & { category?: Maybe<(
          { __typename?: 'LaboratoryTest' }
          & Pick<LaboratoryTest, 'id' | 'name'>
        )>, subCategory?: Maybe<(
          { __typename?: 'LaboratoryTestSubCategory' }
          & Pick<LaboratoryTestSubCategory, 'id' | 'name'>
        )> }
      )>, values?: Maybe<Array<(
        { __typename?: 'LaboratoryExaminationValue' }
        & Pick<LaboratoryExaminationValue, 'id' | 'value'>
      )>> }
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

export type LaboratoryExaminationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LaboratoryExaminationQuery = (
  { __typename?: 'Query' }
  & { laboratoryExamination: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'paid' | 'completed' | 'new' | 'price' | 'cardId' | 'created_at'>
    & { laboratoryTests: Array<(
      { __typename?: 'LaboratoryTest' }
      & Pick<LaboratoryTest, 'id' | 'name' | 'normalValue' | 'commonValues' | 'price' | 'hasPrice' | 'isInfluencedByCategory' | 'inStock' | 'trackInStock'>
      & { category?: Maybe<(
        { __typename?: 'LaboratoryTest' }
        & Pick<LaboratoryTest, 'name'>
      )>, subCategory?: Maybe<(
        { __typename?: 'LaboratoryTestSubCategory' }
        & Pick<LaboratoryTestSubCategory, 'name'>
      )> }
    )>, values?: Maybe<Array<(
      { __typename?: 'LaboratoryExaminationValue' }
      & Pick<LaboratoryExaminationValue, 'id' | 'value'>
    )>>, card: (
      { __typename?: 'Card' }
      & Pick<Card, 'name' | 'phone' | 'age' | 'gender'>
    ) }
  ) }
);

export type LaboratoryExaminationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type LaboratoryExaminationCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'laboratoryExaminationCount'>
);

export type LaboratoryExaminationsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type LaboratoryExaminationsQuery = (
  { __typename?: 'Query' }
  & { laboratoryExaminations: Array<(
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'paid' | 'price' | 'new' | 'completed' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  )> }
);

export type LaboratoryExaminationsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type LaboratoryExaminationsForDashboardQuery = (
  { __typename?: 'Query' }
  & { laboratoryExaminations: Array<(
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'price' | 'paid' | 'updated_at' | 'created_at'>
  )> }
);

export type SearchLaboratoryExaminationQueryVariables = Exact<{
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type SearchLaboratoryExaminationQuery = (
  { __typename?: 'Query' }
  & { searchLaboratoryExamination: Array<(
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'paid' | 'price' | 'new' | 'completed' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  )> }
);

export type LaboratoryTestsForCategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type LaboratoryTestsForCategoryQuery = (
  { __typename?: 'Query' }
  & { laboratoryTestsForCategory: Array<(
    { __typename?: 'LaboratoryTest' }
    & Pick<LaboratoryTest, 'id' | 'name' | 'price' | 'hasPrice' | 'inStock' | 'trackInStock' | 'created_at'>
    & { laboratoryTestExaminations?: Maybe<Array<(
      { __typename?: 'LaboratoryExamination' }
      & Pick<LaboratoryExamination, 'id' | 'paid' | 'completed' | 'new' | 'price' | 'created_at'>
    )>> }
  )> }
);

export type LaboratoryTestCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type LaboratoryTestCategoriesQuery = (
  { __typename?: 'Query' }
  & { laboratoryTestCategories: Array<(
    { __typename?: 'LaboratoryTestCategory' }
    & Pick<LaboratoryTestCategory, 'id' | 'name' | 'price' | 'inStock' | 'trackInStock' | 'created_at' | 'updated_at'>
    & { laboratoryTests: Array<(
      { __typename?: 'LaboratoryTest' }
      & Pick<LaboratoryTest, 'id' | 'name' | 'normalValue' | 'commonValues' | 'price' | 'hasPrice' | 'isInfluencedByCategory' | 'inStock' | 'trackInStock' | 'created_at'>
    )>, subCategories: Array<(
      { __typename?: 'LaboratoryTestSubCategory' }
      & Pick<LaboratoryTestSubCategory, 'id' | 'name' | 'price' | 'inStock' | 'trackInStock' | 'created_at'>
      & { laboratoryTests: Array<(
        { __typename?: 'LaboratoryTest' }
        & Pick<LaboratoryTest, 'id' | 'name' | 'normalValue' | 'commonValues' | 'price' | 'hasPrice' | 'isInfluencedByCategory' | 'inStock' | 'trackInStock' | 'created_at'>
      )> }
    )> }
  )> }
);

export type LaboratoryTestCategoriesForGraphQueryVariables = Exact<{ [key: string]: never; }>;


export type LaboratoryTestCategoriesForGraphQuery = (
  { __typename?: 'Query' }
  & { laboratoryTestCategories: Array<(
    { __typename?: 'LaboratoryTestCategory' }
    & Pick<LaboratoryTestCategory, 'id' | 'name' | 'inStock' | 'created_at'>
    & { laboratoryTests: Array<(
      { __typename?: 'LaboratoryTest' }
      & Pick<LaboratoryTest, 'id' | 'name' | 'normalValue' | 'commonValues' | 'price' | 'hasPrice' | 'isInfluencedByCategory' | 'inStock' | 'trackInStock' | 'created_at'>
      & { laboratoryTestExaminations?: Maybe<Array<(
        { __typename?: 'LaboratoryExamination' }
        & Pick<LaboratoryExamination, 'id' | 'paid' | 'completed' | 'new' | 'price' | 'created_at'>
      )>> }
    )> }
  )> }
);

export type MedicationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MedicationQuery = (
  { __typename?: 'Query' }
  & { medication: (
    { __typename?: 'Medication' }
    & Pick<Medication, 'id' | 'strength' | 'forDays' | 'perDay' | 'other' | 'created_at' | 'updated_at'>
    & { medicine: (
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock'>
    ), checkIn: Array<(
      { __typename?: 'CheckIn' }
      & Pick<CheckIn, 'date' | 'price'>
      & { status: Array<(
        { __typename?: 'CheckInStatus' }
        & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
      )> }
    )> }
  ) }
);

export type MedicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicationsQuery = (
  { __typename?: 'Query' }
  & { medications: Array<(
    { __typename?: 'Medication' }
    & Pick<Medication, 'id' | 'strength' | 'forDays' | 'perDay' | 'other' | 'created_at' | 'updated_at'>
    & { medicine: (
      { __typename?: 'Medicine' }
      & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock'>
    ), checkIn: Array<(
      { __typename?: 'CheckIn' }
      & Pick<CheckIn, 'date' | 'price'>
      & { status: Array<(
        { __typename?: 'CheckInStatus' }
        & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
      )> }
    )> }
  )> }
);

export type MedicineQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MedicineQuery = (
  { __typename?: 'Query' }
  & { medicine: (
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock' | 'forDays' | 'perDay' | 'strength' | 'created_at' | 'updated_at'>
  ) }
);

export type MedicinesQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicinesQuery = (
  { __typename?: 'Query' }
  & { medicines: Array<(
    { __typename?: 'Medicine' }
    & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock' | 'forDays' | 'perDay' | 'strength' | 'created_at' | 'updated_at'>
  )> }
);

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: Array<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'message' | 'for' | 'action' | 'created_at'>
    & { card?: Maybe<(
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    )>, laboratory_test?: Maybe<(
      { __typename?: 'LaboratoryExamination' }
      & Pick<LaboratoryExamination, 'id' | 'created_at'>
      & { card: (
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'name'>
      ) }
    )>, prescription?: Maybe<(
      { __typename?: 'Prescription' }
      & Pick<Prescription, 'id' | 'created_at'>
      & { card: (
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'name'>
      ) }
    )>, quick_laboratory_test?: Maybe<(
      { __typename?: 'QuickLaboratoryExamination' }
      & Pick<QuickLaboratoryExamination, 'id' | 'name'>
    )>, quick_prescription_test?: Maybe<(
      { __typename?: 'QuickPrescription' }
      & Pick<QuickPrescription, 'id' | 'name'>
    )> }
  )> }
);

export type PrescriptionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PrescriptionQuery = (
  { __typename?: 'Query' }
  & { prescription: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'inrolled' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ), medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & Pick<Medication, 'id' | 'strength' | 'perDay' | 'forDays' | 'other'>
      & { medicine: (
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'id' | 'name' | 'price'>
      ) }
    )>> }
  ) }
);

export type PrescriptionCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PrescriptionCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'prescriptionCount'>
);

export type PrescriptionsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type PrescriptionsForDashboardQuery = (
  { __typename?: 'Query' }
  & { prescriptions: Array<(
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'inrolled' | 'price' | 'updated_at'>
    & { medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & { checkIn: Array<(
        { __typename?: 'CheckIn' }
        & Pick<CheckIn, 'date' | 'price'>
        & { status: Array<(
          { __typename?: 'CheckInStatus' }
          & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
        )> }
      )> }
    )>> }
  )> }
);

export type PrescriptionsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type PrescriptionsQuery = (
  { __typename?: 'Query' }
  & { prescriptions: Array<(
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'inrolled' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ), medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & Pick<Medication, 'id' | 'strength' | 'perDay' | 'forDays' | 'other' | 'created_at'>
      & { medicine: (
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock'>
      ), checkIn: Array<(
        { __typename?: 'CheckIn' }
        & Pick<CheckIn, 'date' | 'price'>
        & { status: Array<(
          { __typename?: 'CheckInStatus' }
          & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
        )> }
      )> }
    )>> }
  )> }
);

export type SearchPrescriptionsQueryVariables = Exact<{
  term: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type SearchPrescriptionsQuery = (
  { __typename?: 'Query' }
  & { searchPrescriptions: Array<(
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'inrolled' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ), medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & Pick<Medication, 'id' | 'strength' | 'perDay' | 'forDays' | 'other' | 'created_at'>
      & { medicine: (
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock'>
      ), checkIn: Array<(
        { __typename?: 'CheckIn' }
        & Pick<CheckIn, 'date' | 'price'>
        & { status: Array<(
          { __typename?: 'CheckInStatus' }
          & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
        )> }
      )> }
    )>> }
  )> }
);

export type QuickLaboratoryExaminationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuickLaboratoryExaminationQuery = (
  { __typename?: 'Query' }
  & { quickLaboratoryExamination: (
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'other' | 'created_at' | 'updated_at'>
    & { tests: Array<(
      { __typename?: 'QuickLaboratoryTest' }
      & Pick<QuickLaboratoryTest, 'id' | 'name'>
    )> }
  ) }
);

export type QuickLaboratoryExaminationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type QuickLaboratoryExaminationCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'quickLaboratoryExaminationCount'>
);

export type QuickLaboratoryExaminationsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickLaboratoryExaminationsForDashboardQuery = (
  { __typename?: 'Query' }
  & { quickLaboratoryExaminations: Array<(
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'price' | 'paid' | 'updated_at'>
  )> }
);

export type QuickLaboratoryExaminationsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickLaboratoryExaminationsQuery = (
  { __typename?: 'Query' }
  & { quickLaboratoryExaminations: Array<(
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'other' | 'created_at' | 'updated_at'>
    & { tests: Array<(
      { __typename?: 'QuickLaboratoryTest' }
      & Pick<QuickLaboratoryTest, 'id' | 'name'>
    )> }
  )> }
);

export type QuickLaboratoryTestsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuickLaboratoryTestsQuery = (
  { __typename?: 'Query' }
  & { quickLaboratoryTests: Array<(
    { __typename?: 'QuickLaboratoryTest' }
    & Pick<QuickLaboratoryTest, 'id' | 'name' | 'created_at'>
  )> }
);

export type QuickMedicinesQueryVariables = Exact<{ [key: string]: never; }>;


export type QuickMedicinesQuery = (
  { __typename?: 'Query' }
  & { quickMedicines: Array<(
    { __typename?: 'QuickMedicine' }
    & Pick<QuickMedicine, 'id' | 'name' | 'created_at'>
  )> }
);

export type QuickPrescriptionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuickPrescriptionQuery = (
  { __typename?: 'Query' }
  & { quickPrescription: (
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'other' | 'created_at' | 'updated_at'>
    & { medicines: Array<(
      { __typename?: 'QuickMedicine' }
      & Pick<QuickMedicine, 'id' | 'name'>
    )> }
  ) }
);

export type QuickPrescriptionCountQueryVariables = Exact<{ [key: string]: never; }>;


export type QuickPrescriptionCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'quickPrescriptionCount'>
);

export type QuickPrescriptionsForDashboardQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickPrescriptionsForDashboardQuery = (
  { __typename?: 'Query' }
  & { quickPrescriptions: Array<(
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'price' | 'paid' | 'updated_at'>
  )> }
);

export type QuickPrescriptionsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type QuickPrescriptionsQuery = (
  { __typename?: 'Query' }
  & { quickPrescriptions: Array<(
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'other' | 'created_at' | 'updated_at'>
    & { medicines: Array<(
      { __typename?: 'QuickMedicine' }
      & Pick<QuickMedicine, 'id' | 'name'>
    )> }
  )> }
);

export type SettingQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingQuery = (
  { __typename?: 'Query' }
  & { setting: (
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'card_price' | 'card_expiration_date'>
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

export type NewCreatedLaboratoryExaminationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedLaboratoryExaminationSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedLaboratoryExamination: (
    { __typename?: 'LaboratoryExamination' }
    & Pick<LaboratoryExamination, 'id' | 'paid' | 'price' | 'new' | 'completed' | 'created_at' | 'updated_at'>
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
    & Pick<Notification, 'id' | 'message' | 'for' | 'action' | 'created_at'>
    & { card?: Maybe<(
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    )>, laboratory_test?: Maybe<(
      { __typename?: 'LaboratoryExamination' }
      & Pick<LaboratoryExamination, 'id' | 'created_at'>
      & { card: (
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'name'>
      ) }
    )>, prescription?: Maybe<(
      { __typename?: 'Prescription' }
      & Pick<Prescription, 'id' | 'created_at'>
      & { card: (
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'name'>
      ) }
    )>, quick_laboratory_test?: Maybe<(
      { __typename?: 'QuickLaboratoryExamination' }
      & Pick<QuickLaboratoryExamination, 'id' | 'name'>
    )>, quick_prescription_test?: Maybe<(
      { __typename?: 'QuickPrescription' }
      & Pick<QuickPrescription, 'id' | 'name'>
    )> }
  ) }
);

export type NewCreatedPrescriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedPrescriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedPrescription: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name'>
    ) }
  ) }
);

export type NewMedicationUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMedicationUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { newMedicationUpdate: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'paid' | 'inrolled' | 'price' | 'completed' | 'new' | 'rx' | 'created_at' | 'updated_at'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'age' | 'gender'>
    ), medications?: Maybe<Array<(
      { __typename?: 'Medication' }
      & Pick<Medication, 'id' | 'strength' | 'perDay' | 'forDays' | 'other' | 'created_at'>
      & { medicine: (
        { __typename?: 'Medicine' }
        & Pick<Medicine, 'id' | 'name' | 'price' | 'inStock'>
      ), checkIn: Array<(
        { __typename?: 'CheckIn' }
        & Pick<CheckIn, 'date' | 'price'>
        & { status: Array<(
          { __typename?: 'CheckInStatus' }
          & Pick<CheckInStatus, 'isPaid' | 'paidAt' | 'isCompleted'>
        )> }
      )> }
    )>> }
  ) }
);

export type NewCreatedQuickLaboratoryExaminationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedQuickLaboratoryExaminationSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedQuickLaboratoryExamination: (
    { __typename?: 'QuickLaboratoryExamination' }
    & Pick<QuickLaboratoryExamination, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'result' | 'created_at' | 'updated_at'>
    & { tests: Array<(
      { __typename?: 'QuickLaboratoryTest' }
      & Pick<QuickLaboratoryTest, 'id' | 'name'>
    )> }
  ) }
);

export type NewCreatedQuickPrescriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCreatedQuickPrescriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newCreatedQuickPrescription: (
    { __typename?: 'QuickPrescription' }
    & Pick<QuickPrescription, 'id' | 'name' | 'price' | 'paid' | 'completed' | 'new' | 'created_at' | 'updated_at'>
    & { medicines: Array<(
      { __typename?: 'QuickMedicine' }
      & Pick<QuickMedicine, 'id' | 'name'>
    )> }
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
export const CreateLaboratoryTestDocument = gql`
    mutation CreateLaboratoryTest($categoryId: ID!, $subCategoryId: ID, $content: LaboratoryTestContentInput!) {
  createLaboratoryTest(
    categoryId: $categoryId
    subCategoryId: $subCategoryId
    content: $content
  ) {
    id
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
 *      categoryId: // value for 'categoryId'
 *      subCategoryId: // value for 'subCategoryId'
 *      content: // value for 'content'
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
export const MoveLaboratoryTestDocument = gql`
    mutation MoveLaboratoryTest($id: ID!, $categoryId: ID, $subCategoryId: ID) {
  moveLaboratoryTest(
    id: $id
    categoryId: $categoryId
    subCategoryId: $subCategoryId
  ) {
    id
    subCategory {
      id
      name
    }
    category {
      id
      name
    }
  }
}
    `;
export type MoveLaboratoryTestMutationFn = Apollo.MutationFunction<MoveLaboratoryTestMutation, MoveLaboratoryTestMutationVariables>;

/**
 * __useMoveLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useMoveLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveLaboratoryTestMutation, { data, loading, error }] = useMoveLaboratoryTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      categoryId: // value for 'categoryId'
 *      subCategoryId: // value for 'subCategoryId'
 *   },
 * });
 */
export function useMoveLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<MoveLaboratoryTestMutation, MoveLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveLaboratoryTestMutation, MoveLaboratoryTestMutationVariables>(MoveLaboratoryTestDocument, options);
      }
export type MoveLaboratoryTestMutationHookResult = ReturnType<typeof useMoveLaboratoryTestMutation>;
export type MoveLaboratoryTestMutationResult = Apollo.MutationResult<MoveLaboratoryTestMutation>;
export type MoveLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<MoveLaboratoryTestMutation, MoveLaboratoryTestMutationVariables>;
export const UpdateLaboratoryTestDocument = gql`
    mutation UpdateLaboratoryTest($id: ID!, $content: LaboratoryTestContentInput!) {
  updateLaboratoryTest(id: $id, content: $content) {
    id
  }
}
    `;
export type UpdateLaboratoryTestMutationFn = Apollo.MutationFunction<UpdateLaboratoryTestMutation, UpdateLaboratoryTestMutationVariables>;

/**
 * __useUpdateLaboratoryTestMutation__
 *
 * To run a mutation, you first call `useUpdateLaboratoryTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLaboratoryTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLaboratoryTestMutation, { data, loading, error }] = useUpdateLaboratoryTestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateLaboratoryTestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLaboratoryTestMutation, UpdateLaboratoryTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLaboratoryTestMutation, UpdateLaboratoryTestMutationVariables>(UpdateLaboratoryTestDocument, options);
      }
export type UpdateLaboratoryTestMutationHookResult = ReturnType<typeof useUpdateLaboratoryTestMutation>;
export type UpdateLaboratoryTestMutationResult = Apollo.MutationResult<UpdateLaboratoryTestMutation>;
export type UpdateLaboratoryTestMutationOptions = Apollo.BaseMutationOptions<UpdateLaboratoryTestMutation, UpdateLaboratoryTestMutationVariables>;
export const CompleteLaboratoryExaminationDocument = gql`
    mutation CompleteLaboratoryExamination($id: ID!, $content: [CompleteLaboratoryExaminationInput!]!) {
  completeLaboratoryExamination(content: $content, id: $id) {
    id
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
export type CompleteLaboratoryExaminationMutationFn = Apollo.MutationFunction<CompleteLaboratoryExaminationMutation, CompleteLaboratoryExaminationMutationVariables>;

/**
 * __useCompleteLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `useCompleteLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeLaboratoryExaminationMutation, { data, loading, error }] = useCompleteLaboratoryExaminationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCompleteLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<CompleteLaboratoryExaminationMutation, CompleteLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteLaboratoryExaminationMutation, CompleteLaboratoryExaminationMutationVariables>(CompleteLaboratoryExaminationDocument, options);
      }
export type CompleteLaboratoryExaminationMutationHookResult = ReturnType<typeof useCompleteLaboratoryExaminationMutation>;
export type CompleteLaboratoryExaminationMutationResult = Apollo.MutationResult<CompleteLaboratoryExaminationMutation>;
export type CompleteLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<CompleteLaboratoryExaminationMutation, CompleteLaboratoryExaminationMutationVariables>;
export const CreateLaboratoryExaminationDocument = gql`
    mutation CreateLaboratoryExamination($cardId: ID!, $laboratoryTest: [LaboratoryTestIdInput!]!, $selectedCategories: [ID!], $selectedSubCategories: [ID!], $price: Float!) {
  createLaboratoryExamination(
    cardId: $cardId
    laboratoryTest: $laboratoryTest
    selectedCategories: $selectedCategories
    selectedSubCategories: $selectedSubCategories
    price: $price
  ) {
    id
    card {
      name
    }
    price
  }
}
    `;
export type CreateLaboratoryExaminationMutationFn = Apollo.MutationFunction<CreateLaboratoryExaminationMutation, CreateLaboratoryExaminationMutationVariables>;

/**
 * __useCreateLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `useCreateLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLaboratoryExaminationMutation, { data, loading, error }] = useCreateLaboratoryExaminationMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      laboratoryTest: // value for 'laboratoryTest'
 *      selectedCategories: // value for 'selectedCategories'
 *      selectedSubCategories: // value for 'selectedSubCategories'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useCreateLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLaboratoryExaminationMutation, CreateLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLaboratoryExaminationMutation, CreateLaboratoryExaminationMutationVariables>(CreateLaboratoryExaminationDocument, options);
      }
export type CreateLaboratoryExaminationMutationHookResult = ReturnType<typeof useCreateLaboratoryExaminationMutation>;
export type CreateLaboratoryExaminationMutationResult = Apollo.MutationResult<CreateLaboratoryExaminationMutation>;
export type CreateLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<CreateLaboratoryExaminationMutation, CreateLaboratoryExaminationMutationVariables>;
export const DeleteLaboratoryExaminationDocument = gql`
    mutation DeleteLaboratoryExamination($id: ID!) {
  deleteLaboratoryExamination(id: $id)
}
    `;
export type DeleteLaboratoryExaminationMutationFn = Apollo.MutationFunction<DeleteLaboratoryExaminationMutation, DeleteLaboratoryExaminationMutationVariables>;

/**
 * __useDeleteLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `useDeleteLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLaboratoryExaminationMutation, { data, loading, error }] = useDeleteLaboratoryExaminationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLaboratoryExaminationMutation, DeleteLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLaboratoryExaminationMutation, DeleteLaboratoryExaminationMutationVariables>(DeleteLaboratoryExaminationDocument, options);
      }
export type DeleteLaboratoryExaminationMutationHookResult = ReturnType<typeof useDeleteLaboratoryExaminationMutation>;
export type DeleteLaboratoryExaminationMutationResult = Apollo.MutationResult<DeleteLaboratoryExaminationMutation>;
export type DeleteLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<DeleteLaboratoryExaminationMutation, DeleteLaboratoryExaminationMutationVariables>;
export const MarkLaboratoryExaminationAsSeenDocument = gql`
    mutation MarkLaboratoryExaminationAsSeen($id: ID!) {
  markLaboratoryExaminationAsSeen(id: $id) {
    id
    card {
      name
    }
  }
}
    `;
export type MarkLaboratoryExaminationAsSeenMutationFn = Apollo.MutationFunction<MarkLaboratoryExaminationAsSeenMutation, MarkLaboratoryExaminationAsSeenMutationVariables>;

/**
 * __useMarkLaboratoryExaminationAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkLaboratoryExaminationAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkLaboratoryExaminationAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markLaboratoryExaminationAsSeenMutation, { data, loading, error }] = useMarkLaboratoryExaminationAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkLaboratoryExaminationAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkLaboratoryExaminationAsSeenMutation, MarkLaboratoryExaminationAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkLaboratoryExaminationAsSeenMutation, MarkLaboratoryExaminationAsSeenMutationVariables>(MarkLaboratoryExaminationAsSeenDocument, options);
      }
export type MarkLaboratoryExaminationAsSeenMutationHookResult = ReturnType<typeof useMarkLaboratoryExaminationAsSeenMutation>;
export type MarkLaboratoryExaminationAsSeenMutationResult = Apollo.MutationResult<MarkLaboratoryExaminationAsSeenMutation>;
export type MarkLaboratoryExaminationAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkLaboratoryExaminationAsSeenMutation, MarkLaboratoryExaminationAsSeenMutationVariables>;
export const PayForLaboratoryExaminationDocument = gql`
    mutation PayForLaboratoryExamination($id: ID!) {
  payForLaboratoryExamination(id: $id) {
    id
  }
}
    `;
export type PayForLaboratoryExaminationMutationFn = Apollo.MutationFunction<PayForLaboratoryExaminationMutation, PayForLaboratoryExaminationMutationVariables>;

/**
 * __usePayForLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `usePayForLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayForLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payForLaboratoryExaminationMutation, { data, loading, error }] = usePayForLaboratoryExaminationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePayForLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<PayForLaboratoryExaminationMutation, PayForLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PayForLaboratoryExaminationMutation, PayForLaboratoryExaminationMutationVariables>(PayForLaboratoryExaminationDocument, options);
      }
export type PayForLaboratoryExaminationMutationHookResult = ReturnType<typeof usePayForLaboratoryExaminationMutation>;
export type PayForLaboratoryExaminationMutationResult = Apollo.MutationResult<PayForLaboratoryExaminationMutation>;
export type PayForLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<PayForLaboratoryExaminationMutation, PayForLaboratoryExaminationMutationVariables>;
export const SaveLaboratoryExaminationDocument = gql`
    mutation SaveLaboratoryExamination($id: ID!, $content: [CompleteLaboratoryExaminationInput!]!) {
  saveLaboratoryExamination(content: $content, id: $id) {
    id
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
export type SaveLaboratoryExaminationMutationFn = Apollo.MutationFunction<SaveLaboratoryExaminationMutation, SaveLaboratoryExaminationMutationVariables>;

/**
 * __useSaveLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `useSaveLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveLaboratoryExaminationMutation, { data, loading, error }] = useSaveLaboratoryExaminationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSaveLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<SaveLaboratoryExaminationMutation, SaveLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveLaboratoryExaminationMutation, SaveLaboratoryExaminationMutationVariables>(SaveLaboratoryExaminationDocument, options);
      }
export type SaveLaboratoryExaminationMutationHookResult = ReturnType<typeof useSaveLaboratoryExaminationMutation>;
export type SaveLaboratoryExaminationMutationResult = Apollo.MutationResult<SaveLaboratoryExaminationMutation>;
export type SaveLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<SaveLaboratoryExaminationMutation, SaveLaboratoryExaminationMutationVariables>;
export const CreateLaboratoryTestCategoryDocument = gql`
    mutation CreateLaboratoryTestCategory($name: String!, $price: Float, $inStock: Float, $trackInStock: Boolean!) {
  createLaboratoryTestCategory(
    name: $name
    price: $price
    inStock: $inStock
    trackInStock: $trackInStock
  ) {
    id
    name
    inStock
    trackInStock
    created_at
    updated_at
  }
}
    `;
export type CreateLaboratoryTestCategoryMutationFn = Apollo.MutationFunction<CreateLaboratoryTestCategoryMutation, CreateLaboratoryTestCategoryMutationVariables>;

/**
 * __useCreateLaboratoryTestCategoryMutation__
 *
 * To run a mutation, you first call `useCreateLaboratoryTestCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLaboratoryTestCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLaboratoryTestCategoryMutation, { data, loading, error }] = useCreateLaboratoryTestCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      inStock: // value for 'inStock'
 *      trackInStock: // value for 'trackInStock'
 *   },
 * });
 */
export function useCreateLaboratoryTestCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateLaboratoryTestCategoryMutation, CreateLaboratoryTestCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLaboratoryTestCategoryMutation, CreateLaboratoryTestCategoryMutationVariables>(CreateLaboratoryTestCategoryDocument, options);
      }
export type CreateLaboratoryTestCategoryMutationHookResult = ReturnType<typeof useCreateLaboratoryTestCategoryMutation>;
export type CreateLaboratoryTestCategoryMutationResult = Apollo.MutationResult<CreateLaboratoryTestCategoryMutation>;
export type CreateLaboratoryTestCategoryMutationOptions = Apollo.BaseMutationOptions<CreateLaboratoryTestCategoryMutation, CreateLaboratoryTestCategoryMutationVariables>;
export const DeleteLaboratoryTestCategoryDocument = gql`
    mutation DeleteLaboratoryTestCategory($id: ID!) {
  deleteLaboratoryTestCategory(id: $id)
}
    `;
export type DeleteLaboratoryTestCategoryMutationFn = Apollo.MutationFunction<DeleteLaboratoryTestCategoryMutation, DeleteLaboratoryTestCategoryMutationVariables>;

/**
 * __useDeleteLaboratoryTestCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteLaboratoryTestCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLaboratoryTestCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLaboratoryTestCategoryMutation, { data, loading, error }] = useDeleteLaboratoryTestCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLaboratoryTestCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLaboratoryTestCategoryMutation, DeleteLaboratoryTestCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLaboratoryTestCategoryMutation, DeleteLaboratoryTestCategoryMutationVariables>(DeleteLaboratoryTestCategoryDocument, options);
      }
export type DeleteLaboratoryTestCategoryMutationHookResult = ReturnType<typeof useDeleteLaboratoryTestCategoryMutation>;
export type DeleteLaboratoryTestCategoryMutationResult = Apollo.MutationResult<DeleteLaboratoryTestCategoryMutation>;
export type DeleteLaboratoryTestCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteLaboratoryTestCategoryMutation, DeleteLaboratoryTestCategoryMutationVariables>;
export const UpdateLaboratoryTestCategoryDocument = gql`
    mutation UpdateLaboratoryTestCategory($id: ID!, $name: String!, $price: Float, $inStock: Float, $trackInStock: Boolean!) {
  updateLaboratoryTestCategory(
    id: $id
    name: $name
    price: $price
    inStock: $inStock
    trackInStock: $trackInStock
  ) {
    id
    name
    inStock
    trackInStock
    created_at
    updated_at
  }
}
    `;
export type UpdateLaboratoryTestCategoryMutationFn = Apollo.MutationFunction<UpdateLaboratoryTestCategoryMutation, UpdateLaboratoryTestCategoryMutationVariables>;

/**
 * __useUpdateLaboratoryTestCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateLaboratoryTestCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLaboratoryTestCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLaboratoryTestCategoryMutation, { data, loading, error }] = useUpdateLaboratoryTestCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      inStock: // value for 'inStock'
 *      trackInStock: // value for 'trackInStock'
 *   },
 * });
 */
export function useUpdateLaboratoryTestCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLaboratoryTestCategoryMutation, UpdateLaboratoryTestCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLaboratoryTestCategoryMutation, UpdateLaboratoryTestCategoryMutationVariables>(UpdateLaboratoryTestCategoryDocument, options);
      }
export type UpdateLaboratoryTestCategoryMutationHookResult = ReturnType<typeof useUpdateLaboratoryTestCategoryMutation>;
export type UpdateLaboratoryTestCategoryMutationResult = Apollo.MutationResult<UpdateLaboratoryTestCategoryMutation>;
export type UpdateLaboratoryTestCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateLaboratoryTestCategoryMutation, UpdateLaboratoryTestCategoryMutationVariables>;
export const CreateLaboratoryTestSubCategoryDocument = gql`
    mutation CreateLaboratoryTestSubCategory($id: ID!, $name: String!, $price: Float!, $inStock: Float, $trackInStock: Boolean!) {
  createLaboratoryTestSubCategory(
    id: $id
    name: $name
    price: $price
    inStock: $inStock
    trackInStock: $trackInStock
  ) {
    id
    name
    inStock
    trackInStock
    created_at
  }
}
    `;
export type CreateLaboratoryTestSubCategoryMutationFn = Apollo.MutationFunction<CreateLaboratoryTestSubCategoryMutation, CreateLaboratoryTestSubCategoryMutationVariables>;

/**
 * __useCreateLaboratoryTestSubCategoryMutation__
 *
 * To run a mutation, you first call `useCreateLaboratoryTestSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLaboratoryTestSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLaboratoryTestSubCategoryMutation, { data, loading, error }] = useCreateLaboratoryTestSubCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      inStock: // value for 'inStock'
 *      trackInStock: // value for 'trackInStock'
 *   },
 * });
 */
export function useCreateLaboratoryTestSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateLaboratoryTestSubCategoryMutation, CreateLaboratoryTestSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLaboratoryTestSubCategoryMutation, CreateLaboratoryTestSubCategoryMutationVariables>(CreateLaboratoryTestSubCategoryDocument, options);
      }
export type CreateLaboratoryTestSubCategoryMutationHookResult = ReturnType<typeof useCreateLaboratoryTestSubCategoryMutation>;
export type CreateLaboratoryTestSubCategoryMutationResult = Apollo.MutationResult<CreateLaboratoryTestSubCategoryMutation>;
export type CreateLaboratoryTestSubCategoryMutationOptions = Apollo.BaseMutationOptions<CreateLaboratoryTestSubCategoryMutation, CreateLaboratoryTestSubCategoryMutationVariables>;
export const DeleteLaboratoryTestSubCategoryDocument = gql`
    mutation DeleteLaboratoryTestSubCategory($id: ID!) {
  deleteLaboratoryTestSubCategory(id: $id)
}
    `;
export type DeleteLaboratoryTestSubCategoryMutationFn = Apollo.MutationFunction<DeleteLaboratoryTestSubCategoryMutation, DeleteLaboratoryTestSubCategoryMutationVariables>;

/**
 * __useDeleteLaboratoryTestSubCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteLaboratoryTestSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLaboratoryTestSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLaboratoryTestSubCategoryMutation, { data, loading, error }] = useDeleteLaboratoryTestSubCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLaboratoryTestSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLaboratoryTestSubCategoryMutation, DeleteLaboratoryTestSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLaboratoryTestSubCategoryMutation, DeleteLaboratoryTestSubCategoryMutationVariables>(DeleteLaboratoryTestSubCategoryDocument, options);
      }
export type DeleteLaboratoryTestSubCategoryMutationHookResult = ReturnType<typeof useDeleteLaboratoryTestSubCategoryMutation>;
export type DeleteLaboratoryTestSubCategoryMutationResult = Apollo.MutationResult<DeleteLaboratoryTestSubCategoryMutation>;
export type DeleteLaboratoryTestSubCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteLaboratoryTestSubCategoryMutation, DeleteLaboratoryTestSubCategoryMutationVariables>;
export const UpdateLaboratoryTestSubCategoryDocument = gql`
    mutation UpdateLaboratoryTestSubCategory($id: ID!, $name: String!, $price: Float!, $inStock: Float, $trackInStock: Boolean!) {
  updateLaboratoryTestSubCategory(
    id: $id
    name: $name
    price: $price
    inStock: $inStock
    trackInStock: $trackInStock
  ) {
    id
    name
    inStock
    trackInStock
    created_at
  }
}
    `;
export type UpdateLaboratoryTestSubCategoryMutationFn = Apollo.MutationFunction<UpdateLaboratoryTestSubCategoryMutation, UpdateLaboratoryTestSubCategoryMutationVariables>;

/**
 * __useUpdateLaboratoryTestSubCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateLaboratoryTestSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLaboratoryTestSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLaboratoryTestSubCategoryMutation, { data, loading, error }] = useUpdateLaboratoryTestSubCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      inStock: // value for 'inStock'
 *      trackInStock: // value for 'trackInStock'
 *   },
 * });
 */
export function useUpdateLaboratoryTestSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLaboratoryTestSubCategoryMutation, UpdateLaboratoryTestSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLaboratoryTestSubCategoryMutation, UpdateLaboratoryTestSubCategoryMutationVariables>(UpdateLaboratoryTestSubCategoryDocument, options);
      }
export type UpdateLaboratoryTestSubCategoryMutationHookResult = ReturnType<typeof useUpdateLaboratoryTestSubCategoryMutation>;
export type UpdateLaboratoryTestSubCategoryMutationResult = Apollo.MutationResult<UpdateLaboratoryTestSubCategoryMutation>;
export type UpdateLaboratoryTestSubCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateLaboratoryTestSubCategoryMutation, UpdateLaboratoryTestSubCategoryMutationVariables>;
export const AddMedicineDocument = gql`
    mutation AddMedicine($name: String!, $price: Float!, $inStock: Float!, $strength: String, $perDay: PerDay, $forDays: Float) {
  addMedicine(
    name: $name
    price: $price
    inStock: $inStock
    forDays: $forDays
    perDay: $perDay
    strength: $strength
  ) {
    id
    name
    price
    inStock
    forDays
    perDay
    strength
    created_at
    updated_at
  }
}
    `;
export type AddMedicineMutationFn = Apollo.MutationFunction<AddMedicineMutation, AddMedicineMutationVariables>;

/**
 * __useAddMedicineMutation__
 *
 * To run a mutation, you first call `useAddMedicineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMedicineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMedicineMutation, { data, loading, error }] = useAddMedicineMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      inStock: // value for 'inStock'
 *      strength: // value for 'strength'
 *      perDay: // value for 'perDay'
 *      forDays: // value for 'forDays'
 *   },
 * });
 */
export function useAddMedicineMutation(baseOptions?: Apollo.MutationHookOptions<AddMedicineMutation, AddMedicineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMedicineMutation, AddMedicineMutationVariables>(AddMedicineDocument, options);
      }
export type AddMedicineMutationHookResult = ReturnType<typeof useAddMedicineMutation>;
export type AddMedicineMutationResult = Apollo.MutationResult<AddMedicineMutation>;
export type AddMedicineMutationOptions = Apollo.BaseMutationOptions<AddMedicineMutation, AddMedicineMutationVariables>;
export const DeleteMedicineDocument = gql`
    mutation DeleteMedicine($id: ID!) {
  deleteMedicine(id: $id)
}
    `;
export type DeleteMedicineMutationFn = Apollo.MutationFunction<DeleteMedicineMutation, DeleteMedicineMutationVariables>;

/**
 * __useDeleteMedicineMutation__
 *
 * To run a mutation, you first call `useDeleteMedicineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMedicineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMedicineMutation, { data, loading, error }] = useDeleteMedicineMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMedicineMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMedicineMutation, DeleteMedicineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMedicineMutation, DeleteMedicineMutationVariables>(DeleteMedicineDocument, options);
      }
export type DeleteMedicineMutationHookResult = ReturnType<typeof useDeleteMedicineMutation>;
export type DeleteMedicineMutationResult = Apollo.MutationResult<DeleteMedicineMutation>;
export type DeleteMedicineMutationOptions = Apollo.BaseMutationOptions<DeleteMedicineMutation, DeleteMedicineMutationVariables>;
export const UpdateMedicineDocument = gql`
    mutation UpdateMedicine($id: ID!, $name: String!, $price: Float!, $inStock: Float!, $strength: String, $perDay: PerDay, $forDays: Float) {
  updateMedicine(
    id: $id
    name: $name
    price: $price
    inStock: $inStock
    forDays: $forDays
    perDay: $perDay
    strength: $strength
  ) {
    id
    name
    price
    inStock
    forDays
    perDay
    strength
    created_at
    updated_at
  }
}
    `;
export type UpdateMedicineMutationFn = Apollo.MutationFunction<UpdateMedicineMutation, UpdateMedicineMutationVariables>;

/**
 * __useUpdateMedicineMutation__
 *
 * To run a mutation, you first call `useUpdateMedicineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicineMutation, { data, loading, error }] = useUpdateMedicineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      inStock: // value for 'inStock'
 *      strength: // value for 'strength'
 *      perDay: // value for 'perDay'
 *      forDays: // value for 'forDays'
 *   },
 * });
 */
export function useUpdateMedicineMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicineMutation, UpdateMedicineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicineMutation, UpdateMedicineMutationVariables>(UpdateMedicineDocument, options);
      }
export type UpdateMedicineMutationHookResult = ReturnType<typeof useUpdateMedicineMutation>;
export type UpdateMedicineMutationResult = Apollo.MutationResult<UpdateMedicineMutation>;
export type UpdateMedicineMutationOptions = Apollo.BaseMutationOptions<UpdateMedicineMutation, UpdateMedicineMutationVariables>;
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
export const CreatePrescriptionDocument = gql`
    mutation CreatePrescription($cardId: ID!, $price: Float!, $rx: String!, $medications: [CreateMedicationsInput!]!) {
  createPrescription(
    cardId: $cardId
    price: $price
    rx: $rx
    medications: $medications
  ) {
    id
    card {
      name
    }
    price
    medications {
      id
      perDay
      forDays
      checkIn {
        date
        price
        status {
          isPaid
          paidAt
          isCompleted
        }
      }
    }
    rx
  }
}
    `;
export type CreatePrescriptionMutationFn = Apollo.MutationFunction<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>;

/**
 * __useCreatePrescriptionMutation__
 *
 * To run a mutation, you first call `useCreatePrescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePrescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPrescriptionMutation, { data, loading, error }] = useCreatePrescriptionMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      price: // value for 'price'
 *      rx: // value for 'rx'
 *      medications: // value for 'medications'
 *   },
 * });
 */
export function useCreatePrescriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>(CreatePrescriptionDocument, options);
      }
export type CreatePrescriptionMutationHookResult = ReturnType<typeof useCreatePrescriptionMutation>;
export type CreatePrescriptionMutationResult = Apollo.MutationResult<CreatePrescriptionMutation>;
export type CreatePrescriptionMutationOptions = Apollo.BaseMutationOptions<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>;
export const DeletePrescriptionDocument = gql`
    mutation DeletePrescription($id: ID!) {
  deletePrescription(id: $id)
}
    `;
export type DeletePrescriptionMutationFn = Apollo.MutationFunction<DeletePrescriptionMutation, DeletePrescriptionMutationVariables>;

/**
 * __useDeletePrescriptionMutation__
 *
 * To run a mutation, you first call `useDeletePrescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePrescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePrescriptionMutation, { data, loading, error }] = useDeletePrescriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePrescriptionMutation(baseOptions?: Apollo.MutationHookOptions<DeletePrescriptionMutation, DeletePrescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePrescriptionMutation, DeletePrescriptionMutationVariables>(DeletePrescriptionDocument, options);
      }
export type DeletePrescriptionMutationHookResult = ReturnType<typeof useDeletePrescriptionMutation>;
export type DeletePrescriptionMutationResult = Apollo.MutationResult<DeletePrescriptionMutation>;
export type DeletePrescriptionMutationOptions = Apollo.BaseMutationOptions<DeletePrescriptionMutation, DeletePrescriptionMutationVariables>;
export const MarkPrescriptionAsCompletedDocument = gql`
    mutation MarkPrescriptionAsCompleted($id: ID!) {
  markPrescriptionAsCompleted(id: $id) {
    id
    completed
    new
    inrolled
  }
}
    `;
export type MarkPrescriptionAsCompletedMutationFn = Apollo.MutationFunction<MarkPrescriptionAsCompletedMutation, MarkPrescriptionAsCompletedMutationVariables>;

/**
 * __useMarkPrescriptionAsCompletedMutation__
 *
 * To run a mutation, you first call `useMarkPrescriptionAsCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPrescriptionAsCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPrescriptionAsCompletedMutation, { data, loading, error }] = useMarkPrescriptionAsCompletedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPrescriptionAsCompletedMutation(baseOptions?: Apollo.MutationHookOptions<MarkPrescriptionAsCompletedMutation, MarkPrescriptionAsCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPrescriptionAsCompletedMutation, MarkPrescriptionAsCompletedMutationVariables>(MarkPrescriptionAsCompletedDocument, options);
      }
export type MarkPrescriptionAsCompletedMutationHookResult = ReturnType<typeof useMarkPrescriptionAsCompletedMutation>;
export type MarkPrescriptionAsCompletedMutationResult = Apollo.MutationResult<MarkPrescriptionAsCompletedMutation>;
export type MarkPrescriptionAsCompletedMutationOptions = Apollo.BaseMutationOptions<MarkPrescriptionAsCompletedMutation, MarkPrescriptionAsCompletedMutationVariables>;
export const MarkPrescriptionAsPaidDocument = gql`
    mutation MarkPrescriptionAsPaid($id: ID!, $paid: Boolean!) {
  markPrescriptionAsPaid(id: $id, paid: $paid) {
    id
    paid
    inrolled
  }
}
    `;
export type MarkPrescriptionAsPaidMutationFn = Apollo.MutationFunction<MarkPrescriptionAsPaidMutation, MarkPrescriptionAsPaidMutationVariables>;

/**
 * __useMarkPrescriptionAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkPrescriptionAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPrescriptionAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPrescriptionAsPaidMutation, { data, loading, error }] = useMarkPrescriptionAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *      paid: // value for 'paid'
 *   },
 * });
 */
export function useMarkPrescriptionAsPaidMutation(baseOptions?: Apollo.MutationHookOptions<MarkPrescriptionAsPaidMutation, MarkPrescriptionAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPrescriptionAsPaidMutation, MarkPrescriptionAsPaidMutationVariables>(MarkPrescriptionAsPaidDocument, options);
      }
export type MarkPrescriptionAsPaidMutationHookResult = ReturnType<typeof useMarkPrescriptionAsPaidMutation>;
export type MarkPrescriptionAsPaidMutationResult = Apollo.MutationResult<MarkPrescriptionAsPaidMutation>;
export type MarkPrescriptionAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkPrescriptionAsPaidMutation, MarkPrescriptionAsPaidMutationVariables>;
export const MarkPrescriptionAsSeenDocument = gql`
    mutation MarkPrescriptionAsSeen($id: ID!) {
  markPrescriptionAsSeen(id: $id) {
    id
    new
  }
}
    `;
export type MarkPrescriptionAsSeenMutationFn = Apollo.MutationFunction<MarkPrescriptionAsSeenMutation, MarkPrescriptionAsSeenMutationVariables>;

/**
 * __useMarkPrescriptionAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkPrescriptionAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPrescriptionAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPrescriptionAsSeenMutation, { data, loading, error }] = useMarkPrescriptionAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPrescriptionAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkPrescriptionAsSeenMutation, MarkPrescriptionAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPrescriptionAsSeenMutation, MarkPrescriptionAsSeenMutationVariables>(MarkPrescriptionAsSeenDocument, options);
      }
export type MarkPrescriptionAsSeenMutationHookResult = ReturnType<typeof useMarkPrescriptionAsSeenMutation>;
export type MarkPrescriptionAsSeenMutationResult = Apollo.MutationResult<MarkPrescriptionAsSeenMutation>;
export type MarkPrescriptionAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkPrescriptionAsSeenMutation, MarkPrescriptionAsSeenMutationVariables>;
export const UpdatePrescriptionCheckInDocument = gql`
    mutation UpdatePrescriptionCheckIn($id: ID!, $medicationsCheckIn: [MedicationsCheckInInput!]!) {
  updatePrescriptionCheckIn(id: $id, medicationsCheckIn: $medicationsCheckIn) {
    id
    medications {
      checkIn {
        date
        price
        status {
          isPaid
          paidAt
          isCompleted
        }
      }
    }
  }
}
    `;
export type UpdatePrescriptionCheckInMutationFn = Apollo.MutationFunction<UpdatePrescriptionCheckInMutation, UpdatePrescriptionCheckInMutationVariables>;

/**
 * __useUpdatePrescriptionCheckInMutation__
 *
 * To run a mutation, you first call `useUpdatePrescriptionCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrescriptionCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrescriptionCheckInMutation, { data, loading, error }] = useUpdatePrescriptionCheckInMutation({
 *   variables: {
 *      id: // value for 'id'
 *      medicationsCheckIn: // value for 'medicationsCheckIn'
 *   },
 * });
 */
export function useUpdatePrescriptionCheckInMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePrescriptionCheckInMutation, UpdatePrescriptionCheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePrescriptionCheckInMutation, UpdatePrescriptionCheckInMutationVariables>(UpdatePrescriptionCheckInDocument, options);
      }
export type UpdatePrescriptionCheckInMutationHookResult = ReturnType<typeof useUpdatePrescriptionCheckInMutation>;
export type UpdatePrescriptionCheckInMutationResult = Apollo.MutationResult<UpdatePrescriptionCheckInMutation>;
export type UpdatePrescriptionCheckInMutationOptions = Apollo.BaseMutationOptions<UpdatePrescriptionCheckInMutation, UpdatePrescriptionCheckInMutationVariables>;
export const CompleteQuickLaboratoryExaminationDocument = gql`
    mutation CompleteQuickLaboratoryExamination($id: String!, $price: Float, $other: String) {
  completeQuickLaboratoryExamination(
    id: $id
    input: {price: $price, other: $other}
  ) {
    id
    name
    price
    paid
    completed
    new
    result
    tests {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;
export type CompleteQuickLaboratoryExaminationMutationFn = Apollo.MutationFunction<CompleteQuickLaboratoryExaminationMutation, CompleteQuickLaboratoryExaminationMutationVariables>;

/**
 * __useCompleteQuickLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `useCompleteQuickLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteQuickLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeQuickLaboratoryExaminationMutation, { data, loading, error }] = useCompleteQuickLaboratoryExaminationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCompleteQuickLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<CompleteQuickLaboratoryExaminationMutation, CompleteQuickLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteQuickLaboratoryExaminationMutation, CompleteQuickLaboratoryExaminationMutationVariables>(CompleteQuickLaboratoryExaminationDocument, options);
      }
export type CompleteQuickLaboratoryExaminationMutationHookResult = ReturnType<typeof useCompleteQuickLaboratoryExaminationMutation>;
export type CompleteQuickLaboratoryExaminationMutationResult = Apollo.MutationResult<CompleteQuickLaboratoryExaminationMutation>;
export type CompleteQuickLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<CompleteQuickLaboratoryExaminationMutation, CompleteQuickLaboratoryExaminationMutationVariables>;
export const CreateQuickLaboratoryExaminationDocument = gql`
    mutation CreateQuickLaboratoryExamination($name: String!, $price: Float, $testIds: [ID!]!, $result: QuickLaboratoryExaminationResult, $other: String) {
  createQuickLaboratoryExamination(
    input: {name: $name, price: $price, testIds: $testIds, result: $result, other: $other}
  ) {
    id
    name
    price
    paid
    completed
    new
    result
    tests {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;
export type CreateQuickLaboratoryExaminationMutationFn = Apollo.MutationFunction<CreateQuickLaboratoryExaminationMutation, CreateQuickLaboratoryExaminationMutationVariables>;

/**
 * __useCreateQuickLaboratoryExaminationMutation__
 *
 * To run a mutation, you first call `useCreateQuickLaboratoryExaminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickLaboratoryExaminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickLaboratoryExaminationMutation, { data, loading, error }] = useCreateQuickLaboratoryExaminationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      testIds: // value for 'testIds'
 *      result: // value for 'result'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCreateQuickLaboratoryExaminationMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuickLaboratoryExaminationMutation, CreateQuickLaboratoryExaminationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuickLaboratoryExaminationMutation, CreateQuickLaboratoryExaminationMutationVariables>(CreateQuickLaboratoryExaminationDocument, options);
      }
export type CreateQuickLaboratoryExaminationMutationHookResult = ReturnType<typeof useCreateQuickLaboratoryExaminationMutation>;
export type CreateQuickLaboratoryExaminationMutationResult = Apollo.MutationResult<CreateQuickLaboratoryExaminationMutation>;
export type CreateQuickLaboratoryExaminationMutationOptions = Apollo.BaseMutationOptions<CreateQuickLaboratoryExaminationMutation, CreateQuickLaboratoryExaminationMutationVariables>;
export const MarkQuickLaboratoryExaminationAsPaidDocument = gql`
    mutation MarkQuickLaboratoryExaminationAsPaid($id: ID!) {
  markQuickLaboratoryExaminationAsPaid(id: $id) {
    id
    paid
  }
}
    `;
export type MarkQuickLaboratoryExaminationAsPaidMutationFn = Apollo.MutationFunction<MarkQuickLaboratoryExaminationAsPaidMutation, MarkQuickLaboratoryExaminationAsPaidMutationVariables>;

/**
 * __useMarkQuickLaboratoryExaminationAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkQuickLaboratoryExaminationAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickLaboratoryExaminationAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickLaboratoryExaminationAsPaidMutation, { data, loading, error }] = useMarkQuickLaboratoryExaminationAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickLaboratoryExaminationAsPaidMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickLaboratoryExaminationAsPaidMutation, MarkQuickLaboratoryExaminationAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickLaboratoryExaminationAsPaidMutation, MarkQuickLaboratoryExaminationAsPaidMutationVariables>(MarkQuickLaboratoryExaminationAsPaidDocument, options);
      }
export type MarkQuickLaboratoryExaminationAsPaidMutationHookResult = ReturnType<typeof useMarkQuickLaboratoryExaminationAsPaidMutation>;
export type MarkQuickLaboratoryExaminationAsPaidMutationResult = Apollo.MutationResult<MarkQuickLaboratoryExaminationAsPaidMutation>;
export type MarkQuickLaboratoryExaminationAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkQuickLaboratoryExaminationAsPaidMutation, MarkQuickLaboratoryExaminationAsPaidMutationVariables>;
export const MarkQuickLaboratoryExaminationAsSeenDocument = gql`
    mutation MarkQuickLaboratoryExaminationAsSeen($id: ID!) {
  markQuickLaboratoryExaminationAsSeen(id: $id) {
    id
    new
  }
}
    `;
export type MarkQuickLaboratoryExaminationAsSeenMutationFn = Apollo.MutationFunction<MarkQuickLaboratoryExaminationAsSeenMutation, MarkQuickLaboratoryExaminationAsSeenMutationVariables>;

/**
 * __useMarkQuickLaboratoryExaminationAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkQuickLaboratoryExaminationAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickLaboratoryExaminationAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickLaboratoryExaminationAsSeenMutation, { data, loading, error }] = useMarkQuickLaboratoryExaminationAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickLaboratoryExaminationAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickLaboratoryExaminationAsSeenMutation, MarkQuickLaboratoryExaminationAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickLaboratoryExaminationAsSeenMutation, MarkQuickLaboratoryExaminationAsSeenMutationVariables>(MarkQuickLaboratoryExaminationAsSeenDocument, options);
      }
export type MarkQuickLaboratoryExaminationAsSeenMutationHookResult = ReturnType<typeof useMarkQuickLaboratoryExaminationAsSeenMutation>;
export type MarkQuickLaboratoryExaminationAsSeenMutationResult = Apollo.MutationResult<MarkQuickLaboratoryExaminationAsSeenMutation>;
export type MarkQuickLaboratoryExaminationAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkQuickLaboratoryExaminationAsSeenMutation, MarkQuickLaboratoryExaminationAsSeenMutationVariables>;
export const CompleteQuickPrescriptionDocument = gql`
    mutation CompleteQuickPrescription($id: String!, $price: Float, $other: String) {
  completeQuickPrescription(id: $id, input: {price: $price, other: $other}) {
    id
    name
    price
    medicines {
      id
      name
    }
    other
    created_at
  }
}
    `;
export type CompleteQuickPrescriptionMutationFn = Apollo.MutationFunction<CompleteQuickPrescriptionMutation, CompleteQuickPrescriptionMutationVariables>;

/**
 * __useCompleteQuickPrescriptionMutation__
 *
 * To run a mutation, you first call `useCompleteQuickPrescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteQuickPrescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeQuickPrescriptionMutation, { data, loading, error }] = useCompleteQuickPrescriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCompleteQuickPrescriptionMutation(baseOptions?: Apollo.MutationHookOptions<CompleteQuickPrescriptionMutation, CompleteQuickPrescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteQuickPrescriptionMutation, CompleteQuickPrescriptionMutationVariables>(CompleteQuickPrescriptionDocument, options);
      }
export type CompleteQuickPrescriptionMutationHookResult = ReturnType<typeof useCompleteQuickPrescriptionMutation>;
export type CompleteQuickPrescriptionMutationResult = Apollo.MutationResult<CompleteQuickPrescriptionMutation>;
export type CompleteQuickPrescriptionMutationOptions = Apollo.BaseMutationOptions<CompleteQuickPrescriptionMutation, CompleteQuickPrescriptionMutationVariables>;
export const CreateQuickPrescriptionDocument = gql`
    mutation CreateQuickPrescription($name: String!, $medicineIds: [ID!]!, $price: Float, $other: String) {
  createQuickPrescription(
    input: {name: $name, price: $price, medicineIds: $medicineIds, other: $other}
  ) {
    id
    name
    price
    medicines {
      id
      name
    }
    other
    created_at
  }
}
    `;
export type CreateQuickPrescriptionMutationFn = Apollo.MutationFunction<CreateQuickPrescriptionMutation, CreateQuickPrescriptionMutationVariables>;

/**
 * __useCreateQuickPrescriptionMutation__
 *
 * To run a mutation, you first call `useCreateQuickPrescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickPrescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickPrescriptionMutation, { data, loading, error }] = useCreateQuickPrescriptionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      medicineIds: // value for 'medicineIds'
 *      price: // value for 'price'
 *      other: // value for 'other'
 *   },
 * });
 */
export function useCreateQuickPrescriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuickPrescriptionMutation, CreateQuickPrescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuickPrescriptionMutation, CreateQuickPrescriptionMutationVariables>(CreateQuickPrescriptionDocument, options);
      }
export type CreateQuickPrescriptionMutationHookResult = ReturnType<typeof useCreateQuickPrescriptionMutation>;
export type CreateQuickPrescriptionMutationResult = Apollo.MutationResult<CreateQuickPrescriptionMutation>;
export type CreateQuickPrescriptionMutationOptions = Apollo.BaseMutationOptions<CreateQuickPrescriptionMutation, CreateQuickPrescriptionMutationVariables>;
export const MarkQuickPrescriptionAsPaidDocument = gql`
    mutation MarkQuickPrescriptionAsPaid($id: ID!) {
  markQuickPrescriptionAsPaid(id: $id) {
    id
    paid
  }
}
    `;
export type MarkQuickPrescriptionAsPaidMutationFn = Apollo.MutationFunction<MarkQuickPrescriptionAsPaidMutation, MarkQuickPrescriptionAsPaidMutationVariables>;

/**
 * __useMarkQuickPrescriptionAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkQuickPrescriptionAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickPrescriptionAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickPrescriptionAsPaidMutation, { data, loading, error }] = useMarkQuickPrescriptionAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickPrescriptionAsPaidMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickPrescriptionAsPaidMutation, MarkQuickPrescriptionAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickPrescriptionAsPaidMutation, MarkQuickPrescriptionAsPaidMutationVariables>(MarkQuickPrescriptionAsPaidDocument, options);
      }
export type MarkQuickPrescriptionAsPaidMutationHookResult = ReturnType<typeof useMarkQuickPrescriptionAsPaidMutation>;
export type MarkQuickPrescriptionAsPaidMutationResult = Apollo.MutationResult<MarkQuickPrescriptionAsPaidMutation>;
export type MarkQuickPrescriptionAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkQuickPrescriptionAsPaidMutation, MarkQuickPrescriptionAsPaidMutationVariables>;
export const MarkQuickPrescriptionAsSeenDocument = gql`
    mutation MarkQuickPrescriptionAsSeen($id: ID!) {
  markQuickPrescriptionAsSeen(id: $id) {
    id
    new
  }
}
    `;
export type MarkQuickPrescriptionAsSeenMutationFn = Apollo.MutationFunction<MarkQuickPrescriptionAsSeenMutation, MarkQuickPrescriptionAsSeenMutationVariables>;

/**
 * __useMarkQuickPrescriptionAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkQuickPrescriptionAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuickPrescriptionAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuickPrescriptionAsSeenMutation, { data, loading, error }] = useMarkQuickPrescriptionAsSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkQuickPrescriptionAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkQuickPrescriptionAsSeenMutation, MarkQuickPrescriptionAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkQuickPrescriptionAsSeenMutation, MarkQuickPrescriptionAsSeenMutationVariables>(MarkQuickPrescriptionAsSeenDocument, options);
      }
export type MarkQuickPrescriptionAsSeenMutationHookResult = ReturnType<typeof useMarkQuickPrescriptionAsSeenMutation>;
export type MarkQuickPrescriptionAsSeenMutationResult = Apollo.MutationResult<MarkQuickPrescriptionAsSeenMutation>;
export type MarkQuickPrescriptionAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkQuickPrescriptionAsSeenMutation, MarkQuickPrescriptionAsSeenMutationVariables>;
export const ChangeSettingDocument = gql`
    mutation ChangeSetting($card_price: Float!, $card_expiration_date: Float!) {
  changeSetting(
    setting: {card_price: $card_price, card_expiration_date: $card_expiration_date}
  ) {
    id
    card_price
    card_expiration_date
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
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
    mutation Register($username: String!, $password: String!, $occupation: Occupation!) {
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
    prescriptions {
      id
      medications {
        id
        medicine {
          id
          name
          price
        }
        strength
        perDay
        forDays
        other
      }
      paid
      inrolled
      price
      completed
      new
      rx
      created_at
      updated_at
    }
    laboratoryExaminations {
      id
      cardId
      paid
      new
      laboratoryTests {
        id
        name
        normalValue
        category {
          id
          name
        }
        subCategory {
          id
          name
        }
      }
      values {
        id
        value
      }
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
export const LaboratoryExaminationDocument = gql`
    query LaboratoryExamination($id: ID!) {
  laboratoryExamination(id: $id) {
    id
    paid
    completed
    new
    price
    cardId
    laboratoryTests {
      id
      name
      normalValue
      category {
        name
      }
      subCategory {
        name
      }
      commonValues
      price
      hasPrice
      isInfluencedByCategory
      inStock
      trackInStock
    }
    values {
      id
      value
    }
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
 * __useLaboratoryExaminationQuery__
 *
 * To run a query within a React component, call `useLaboratoryExaminationQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryExaminationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryExaminationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLaboratoryExaminationQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryExaminationQuery, LaboratoryExaminationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryExaminationQuery, LaboratoryExaminationQueryVariables>(LaboratoryExaminationDocument, options);
      }
export function useLaboratoryExaminationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryExaminationQuery, LaboratoryExaminationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryExaminationQuery, LaboratoryExaminationQueryVariables>(LaboratoryExaminationDocument, options);
        }
export type LaboratoryExaminationQueryHookResult = ReturnType<typeof useLaboratoryExaminationQuery>;
export type LaboratoryExaminationLazyQueryHookResult = ReturnType<typeof useLaboratoryExaminationLazyQuery>;
export type LaboratoryExaminationQueryResult = Apollo.QueryResult<LaboratoryExaminationQuery, LaboratoryExaminationQueryVariables>;
export const LaboratoryExaminationCountDocument = gql`
    query LaboratoryExaminationCount {
  laboratoryExaminationCount
}
    `;

/**
 * __useLaboratoryExaminationCountQuery__
 *
 * To run a query within a React component, call `useLaboratoryExaminationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryExaminationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryExaminationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useLaboratoryExaminationCountQuery(baseOptions?: Apollo.QueryHookOptions<LaboratoryExaminationCountQuery, LaboratoryExaminationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryExaminationCountQuery, LaboratoryExaminationCountQueryVariables>(LaboratoryExaminationCountDocument, options);
      }
export function useLaboratoryExaminationCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryExaminationCountQuery, LaboratoryExaminationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryExaminationCountQuery, LaboratoryExaminationCountQueryVariables>(LaboratoryExaminationCountDocument, options);
        }
export type LaboratoryExaminationCountQueryHookResult = ReturnType<typeof useLaboratoryExaminationCountQuery>;
export type LaboratoryExaminationCountLazyQueryHookResult = ReturnType<typeof useLaboratoryExaminationCountLazyQuery>;
export type LaboratoryExaminationCountQueryResult = Apollo.QueryResult<LaboratoryExaminationCountQuery, LaboratoryExaminationCountQueryVariables>;
export const LaboratoryExaminationsDocument = gql`
    query LaboratoryExaminations($skip: Float!, $take: Float!) {
  laboratoryExaminations(skip: $skip, take: $take) {
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
 * __useLaboratoryExaminationsQuery__
 *
 * To run a query within a React component, call `useLaboratoryExaminationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryExaminationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryExaminationsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useLaboratoryExaminationsQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryExaminationsQuery, LaboratoryExaminationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryExaminationsQuery, LaboratoryExaminationsQueryVariables>(LaboratoryExaminationsDocument, options);
      }
export function useLaboratoryExaminationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryExaminationsQuery, LaboratoryExaminationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryExaminationsQuery, LaboratoryExaminationsQueryVariables>(LaboratoryExaminationsDocument, options);
        }
export type LaboratoryExaminationsQueryHookResult = ReturnType<typeof useLaboratoryExaminationsQuery>;
export type LaboratoryExaminationsLazyQueryHookResult = ReturnType<typeof useLaboratoryExaminationsLazyQuery>;
export type LaboratoryExaminationsQueryResult = Apollo.QueryResult<LaboratoryExaminationsQuery, LaboratoryExaminationsQueryVariables>;
export const LaboratoryExaminationsForDashboardDocument = gql`
    query LaboratoryExaminationsForDashboard($skip: Float!, $take: Float!) {
  laboratoryExaminations(skip: $skip, take: $take) {
    id
    price
    paid
    updated_at
    created_at
  }
}
    `;

/**
 * __useLaboratoryExaminationsForDashboardQuery__
 *
 * To run a query within a React component, call `useLaboratoryExaminationsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryExaminationsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryExaminationsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useLaboratoryExaminationsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryExaminationsForDashboardQuery, LaboratoryExaminationsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryExaminationsForDashboardQuery, LaboratoryExaminationsForDashboardQueryVariables>(LaboratoryExaminationsForDashboardDocument, options);
      }
export function useLaboratoryExaminationsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryExaminationsForDashboardQuery, LaboratoryExaminationsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryExaminationsForDashboardQuery, LaboratoryExaminationsForDashboardQueryVariables>(LaboratoryExaminationsForDashboardDocument, options);
        }
export type LaboratoryExaminationsForDashboardQueryHookResult = ReturnType<typeof useLaboratoryExaminationsForDashboardQuery>;
export type LaboratoryExaminationsForDashboardLazyQueryHookResult = ReturnType<typeof useLaboratoryExaminationsForDashboardLazyQuery>;
export type LaboratoryExaminationsForDashboardQueryResult = Apollo.QueryResult<LaboratoryExaminationsForDashboardQuery, LaboratoryExaminationsForDashboardQueryVariables>;
export const SearchLaboratoryExaminationDocument = gql`
    query SearchLaboratoryExamination($term: String!, $skip: Float!, $take: Float!) {
  searchLaboratoryExamination(term: $term, skip: $skip, take: $take) {
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
 * __useSearchLaboratoryExaminationQuery__
 *
 * To run a query within a React component, call `useSearchLaboratoryExaminationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLaboratoryExaminationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLaboratoryExaminationQuery({
 *   variables: {
 *      term: // value for 'term'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchLaboratoryExaminationQuery(baseOptions: Apollo.QueryHookOptions<SearchLaboratoryExaminationQuery, SearchLaboratoryExaminationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchLaboratoryExaminationQuery, SearchLaboratoryExaminationQueryVariables>(SearchLaboratoryExaminationDocument, options);
      }
export function useSearchLaboratoryExaminationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLaboratoryExaminationQuery, SearchLaboratoryExaminationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchLaboratoryExaminationQuery, SearchLaboratoryExaminationQueryVariables>(SearchLaboratoryExaminationDocument, options);
        }
export type SearchLaboratoryExaminationQueryHookResult = ReturnType<typeof useSearchLaboratoryExaminationQuery>;
export type SearchLaboratoryExaminationLazyQueryHookResult = ReturnType<typeof useSearchLaboratoryExaminationLazyQuery>;
export type SearchLaboratoryExaminationQueryResult = Apollo.QueryResult<SearchLaboratoryExaminationQuery, SearchLaboratoryExaminationQueryVariables>;
export const LaboratoryTestsForCategoryDocument = gql`
    query LaboratoryTestsForCategory($categoryId: ID!) {
  laboratoryTestsForCategory(categoryId: $categoryId) {
    id
    name
    price
    hasPrice
    laboratoryTestExaminations {
      id
      paid
      completed
      new
      price
      created_at
    }
    inStock
    trackInStock
    created_at
  }
}
    `;

/**
 * __useLaboratoryTestsForCategoryQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestsForCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestsForCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestsForCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useLaboratoryTestsForCategoryQuery(baseOptions: Apollo.QueryHookOptions<LaboratoryTestsForCategoryQuery, LaboratoryTestsForCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestsForCategoryQuery, LaboratoryTestsForCategoryQueryVariables>(LaboratoryTestsForCategoryDocument, options);
      }
export function useLaboratoryTestsForCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestsForCategoryQuery, LaboratoryTestsForCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestsForCategoryQuery, LaboratoryTestsForCategoryQueryVariables>(LaboratoryTestsForCategoryDocument, options);
        }
export type LaboratoryTestsForCategoryQueryHookResult = ReturnType<typeof useLaboratoryTestsForCategoryQuery>;
export type LaboratoryTestsForCategoryLazyQueryHookResult = ReturnType<typeof useLaboratoryTestsForCategoryLazyQuery>;
export type LaboratoryTestsForCategoryQueryResult = Apollo.QueryResult<LaboratoryTestsForCategoryQuery, LaboratoryTestsForCategoryQueryVariables>;
export const LaboratoryTestCategoriesDocument = gql`
    query LaboratoryTestCategories {
  laboratoryTestCategories {
    id
    name
    price
    laboratoryTests {
      id
      name
      normalValue
      commonValues
      price
      hasPrice
      isInfluencedByCategory
      inStock
      trackInStock
      created_at
    }
    subCategories {
      id
      name
      price
      inStock
      trackInStock
      laboratoryTests {
        id
        name
        normalValue
        commonValues
        price
        hasPrice
        isInfluencedByCategory
        inStock
        trackInStock
        created_at
      }
      created_at
    }
    inStock
    trackInStock
    created_at
    updated_at
  }
}
    `;

/**
 * __useLaboratoryTestCategoriesQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLaboratoryTestCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<LaboratoryTestCategoriesQuery, LaboratoryTestCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestCategoriesQuery, LaboratoryTestCategoriesQueryVariables>(LaboratoryTestCategoriesDocument, options);
      }
export function useLaboratoryTestCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestCategoriesQuery, LaboratoryTestCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestCategoriesQuery, LaboratoryTestCategoriesQueryVariables>(LaboratoryTestCategoriesDocument, options);
        }
export type LaboratoryTestCategoriesQueryHookResult = ReturnType<typeof useLaboratoryTestCategoriesQuery>;
export type LaboratoryTestCategoriesLazyQueryHookResult = ReturnType<typeof useLaboratoryTestCategoriesLazyQuery>;
export type LaboratoryTestCategoriesQueryResult = Apollo.QueryResult<LaboratoryTestCategoriesQuery, LaboratoryTestCategoriesQueryVariables>;
export const LaboratoryTestCategoriesForGraphDocument = gql`
    query LaboratoryTestCategoriesForGraph {
  laboratoryTestCategories {
    id
    name
    laboratoryTests {
      id
      name
      normalValue
      commonValues
      price
      hasPrice
      laboratoryTestExaminations {
        id
        paid
        completed
        new
        price
        created_at
      }
      isInfluencedByCategory
      inStock
      trackInStock
      created_at
    }
    inStock
    created_at
  }
}
    `;

/**
 * __useLaboratoryTestCategoriesForGraphQuery__
 *
 * To run a query within a React component, call `useLaboratoryTestCategoriesForGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useLaboratoryTestCategoriesForGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLaboratoryTestCategoriesForGraphQuery({
 *   variables: {
 *   },
 * });
 */
export function useLaboratoryTestCategoriesForGraphQuery(baseOptions?: Apollo.QueryHookOptions<LaboratoryTestCategoriesForGraphQuery, LaboratoryTestCategoriesForGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LaboratoryTestCategoriesForGraphQuery, LaboratoryTestCategoriesForGraphQueryVariables>(LaboratoryTestCategoriesForGraphDocument, options);
      }
export function useLaboratoryTestCategoriesForGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LaboratoryTestCategoriesForGraphQuery, LaboratoryTestCategoriesForGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LaboratoryTestCategoriesForGraphQuery, LaboratoryTestCategoriesForGraphQueryVariables>(LaboratoryTestCategoriesForGraphDocument, options);
        }
export type LaboratoryTestCategoriesForGraphQueryHookResult = ReturnType<typeof useLaboratoryTestCategoriesForGraphQuery>;
export type LaboratoryTestCategoriesForGraphLazyQueryHookResult = ReturnType<typeof useLaboratoryTestCategoriesForGraphLazyQuery>;
export type LaboratoryTestCategoriesForGraphQueryResult = Apollo.QueryResult<LaboratoryTestCategoriesForGraphQuery, LaboratoryTestCategoriesForGraphQueryVariables>;
export const MedicationDocument = gql`
    query Medication($id: ID!) {
  medication(id: $id) {
    id
    medicine {
      id
      name
      price
      inStock
    }
    strength
    forDays
    checkIn {
      date
      price
      status {
        isPaid
        paidAt
        isCompleted
      }
    }
    perDay
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useMedicationQuery__
 *
 * To run a query within a React component, call `useMedicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMedicationQuery(baseOptions: Apollo.QueryHookOptions<MedicationQuery, MedicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MedicationQuery, MedicationQueryVariables>(MedicationDocument, options);
      }
export function useMedicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicationQuery, MedicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MedicationQuery, MedicationQueryVariables>(MedicationDocument, options);
        }
export type MedicationQueryHookResult = ReturnType<typeof useMedicationQuery>;
export type MedicationLazyQueryHookResult = ReturnType<typeof useMedicationLazyQuery>;
export type MedicationQueryResult = Apollo.QueryResult<MedicationQuery, MedicationQueryVariables>;
export const MedicationsDocument = gql`
    query Medications {
  medications {
    id
    medicine {
      id
      name
      price
      inStock
    }
    strength
    forDays
    checkIn {
      date
      price
      status {
        isPaid
        paidAt
        isCompleted
      }
    }
    perDay
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useMedicationsQuery__
 *
 * To run a query within a React component, call `useMedicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMedicationsQuery(baseOptions?: Apollo.QueryHookOptions<MedicationsQuery, MedicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MedicationsQuery, MedicationsQueryVariables>(MedicationsDocument, options);
      }
export function useMedicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicationsQuery, MedicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MedicationsQuery, MedicationsQueryVariables>(MedicationsDocument, options);
        }
export type MedicationsQueryHookResult = ReturnType<typeof useMedicationsQuery>;
export type MedicationsLazyQueryHookResult = ReturnType<typeof useMedicationsLazyQuery>;
export type MedicationsQueryResult = Apollo.QueryResult<MedicationsQuery, MedicationsQueryVariables>;
export const MedicineDocument = gql`
    query Medicine($id: ID!) {
  medicine(id: $id) {
    id
    name
    price
    inStock
    forDays
    perDay
    strength
    created_at
    updated_at
  }
}
    `;

/**
 * __useMedicineQuery__
 *
 * To run a query within a React component, call `useMedicineQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicineQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMedicineQuery(baseOptions: Apollo.QueryHookOptions<MedicineQuery, MedicineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MedicineQuery, MedicineQueryVariables>(MedicineDocument, options);
      }
export function useMedicineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicineQuery, MedicineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MedicineQuery, MedicineQueryVariables>(MedicineDocument, options);
        }
export type MedicineQueryHookResult = ReturnType<typeof useMedicineQuery>;
export type MedicineLazyQueryHookResult = ReturnType<typeof useMedicineLazyQuery>;
export type MedicineQueryResult = Apollo.QueryResult<MedicineQuery, MedicineQueryVariables>;
export const MedicinesDocument = gql`
    query Medicines {
  medicines {
    id
    name
    price
    inStock
    forDays
    perDay
    strength
    created_at
    updated_at
  }
}
    `;

/**
 * __useMedicinesQuery__
 *
 * To run a query within a React component, call `useMedicinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMedicinesQuery(baseOptions?: Apollo.QueryHookOptions<MedicinesQuery, MedicinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MedicinesQuery, MedicinesQueryVariables>(MedicinesDocument, options);
      }
export function useMedicinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicinesQuery, MedicinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MedicinesQuery, MedicinesQueryVariables>(MedicinesDocument, options);
        }
export type MedicinesQueryHookResult = ReturnType<typeof useMedicinesQuery>;
export type MedicinesLazyQueryHookResult = ReturnType<typeof useMedicinesLazyQuery>;
export type MedicinesQueryResult = Apollo.QueryResult<MedicinesQuery, MedicinesQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    id
    message
    card {
      id
      name
    }
    laboratory_test {
      id
      card {
        id
        name
      }
      created_at
    }
    prescription {
      id
      card {
        id
        name
      }
      created_at
    }
    quick_laboratory_test {
      id
      name
    }
    quick_prescription_test {
      id
      name
    }
    for
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
export const PrescriptionDocument = gql`
    query Prescription($id: ID!) {
  prescription(id: $id) {
    id
    card {
      id
      name
      age
      gender
    }
    medications {
      id
      medicine {
        id
        name
        price
      }
      strength
      perDay
      forDays
      other
    }
    paid
    inrolled
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
 * __usePrescriptionQuery__
 *
 * To run a query within a React component, call `usePrescriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePrescriptionQuery(baseOptions: Apollo.QueryHookOptions<PrescriptionQuery, PrescriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionQuery, PrescriptionQueryVariables>(PrescriptionDocument, options);
      }
export function usePrescriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionQuery, PrescriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionQuery, PrescriptionQueryVariables>(PrescriptionDocument, options);
        }
export type PrescriptionQueryHookResult = ReturnType<typeof usePrescriptionQuery>;
export type PrescriptionLazyQueryHookResult = ReturnType<typeof usePrescriptionLazyQuery>;
export type PrescriptionQueryResult = Apollo.QueryResult<PrescriptionQuery, PrescriptionQueryVariables>;
export const PrescriptionCountDocument = gql`
    query prescriptionCount {
  prescriptionCount
}
    `;

/**
 * __usePrescriptionCountQuery__
 *
 * To run a query within a React component, call `usePrescriptionCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionCountQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrescriptionCountQuery(baseOptions?: Apollo.QueryHookOptions<PrescriptionCountQuery, PrescriptionCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionCountQuery, PrescriptionCountQueryVariables>(PrescriptionCountDocument, options);
      }
export function usePrescriptionCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionCountQuery, PrescriptionCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionCountQuery, PrescriptionCountQueryVariables>(PrescriptionCountDocument, options);
        }
export type PrescriptionCountQueryHookResult = ReturnType<typeof usePrescriptionCountQuery>;
export type PrescriptionCountLazyQueryHookResult = ReturnType<typeof usePrescriptionCountLazyQuery>;
export type PrescriptionCountQueryResult = Apollo.QueryResult<PrescriptionCountQuery, PrescriptionCountQueryVariables>;
export const PrescriptionsForDashboardDocument = gql`
    query prescriptionsForDashboard($skip: Float!, $take: Float!) {
  prescriptions(skip: $skip, take: $take) {
    id
    paid
    inrolled
    medications {
      checkIn {
        date
        price
        status {
          isPaid
          paidAt
          isCompleted
        }
      }
    }
    price
    updated_at
  }
}
    `;

/**
 * __usePrescriptionsForDashboardQuery__
 *
 * To run a query within a React component, call `usePrescriptionsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePrescriptionsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<PrescriptionsForDashboardQuery, PrescriptionsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionsForDashboardQuery, PrescriptionsForDashboardQueryVariables>(PrescriptionsForDashboardDocument, options);
      }
export function usePrescriptionsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionsForDashboardQuery, PrescriptionsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionsForDashboardQuery, PrescriptionsForDashboardQueryVariables>(PrescriptionsForDashboardDocument, options);
        }
export type PrescriptionsForDashboardQueryHookResult = ReturnType<typeof usePrescriptionsForDashboardQuery>;
export type PrescriptionsForDashboardLazyQueryHookResult = ReturnType<typeof usePrescriptionsForDashboardLazyQuery>;
export type PrescriptionsForDashboardQueryResult = Apollo.QueryResult<PrescriptionsForDashboardQuery, PrescriptionsForDashboardQueryVariables>;
export const PrescriptionsDocument = gql`
    query Prescriptions($skip: Float!, $take: Float!) {
  prescriptions(skip: $skip, take: $take) {
    id
    card {
      id
      name
      age
      gender
    }
    medications {
      id
      medicine {
        id
        name
        price
        inStock
      }
      strength
      perDay
      forDays
      checkIn {
        date
        price
        status {
          isPaid
          paidAt
          isCompleted
        }
      }
      other
      created_at
    }
    paid
    inrolled
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
 * __usePrescriptionsQuery__
 *
 * To run a query within a React component, call `usePrescriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrescriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrescriptionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePrescriptionsQuery(baseOptions: Apollo.QueryHookOptions<PrescriptionsQuery, PrescriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrescriptionsQuery, PrescriptionsQueryVariables>(PrescriptionsDocument, options);
      }
export function usePrescriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrescriptionsQuery, PrescriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrescriptionsQuery, PrescriptionsQueryVariables>(PrescriptionsDocument, options);
        }
export type PrescriptionsQueryHookResult = ReturnType<typeof usePrescriptionsQuery>;
export type PrescriptionsLazyQueryHookResult = ReturnType<typeof usePrescriptionsLazyQuery>;
export type PrescriptionsQueryResult = Apollo.QueryResult<PrescriptionsQuery, PrescriptionsQueryVariables>;
export const SearchPrescriptionsDocument = gql`
    query SearchPrescriptions($term: String!, $skip: Float!, $take: Float!) {
  searchPrescriptions(term: $term, skip: $skip, take: $take) {
    id
    card {
      id
      name
      age
      gender
    }
    medications {
      id
      medicine {
        id
        name
        price
        inStock
      }
      strength
      perDay
      forDays
      checkIn {
        date
        price
        status {
          isPaid
          paidAt
          isCompleted
        }
      }
      other
      created_at
    }
    paid
    inrolled
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
 * __useSearchPrescriptionsQuery__
 *
 * To run a query within a React component, call `useSearchPrescriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPrescriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPrescriptionsQuery({
 *   variables: {
 *      term: // value for 'term'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchPrescriptionsQuery(baseOptions: Apollo.QueryHookOptions<SearchPrescriptionsQuery, SearchPrescriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPrescriptionsQuery, SearchPrescriptionsQueryVariables>(SearchPrescriptionsDocument, options);
      }
export function useSearchPrescriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPrescriptionsQuery, SearchPrescriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPrescriptionsQuery, SearchPrescriptionsQueryVariables>(SearchPrescriptionsDocument, options);
        }
export type SearchPrescriptionsQueryHookResult = ReturnType<typeof useSearchPrescriptionsQuery>;
export type SearchPrescriptionsLazyQueryHookResult = ReturnType<typeof useSearchPrescriptionsLazyQuery>;
export type SearchPrescriptionsQueryResult = Apollo.QueryResult<SearchPrescriptionsQuery, SearchPrescriptionsQueryVariables>;
export const QuickLaboratoryExaminationDocument = gql`
    query QuickLaboratoryExamination($id: ID!) {
  quickLaboratoryExamination(id: $id) {
    id
    name
    price
    paid
    completed
    new
    result
    tests {
      id
      name
    }
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useQuickLaboratoryExaminationQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryExaminationQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryExaminationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryExaminationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuickLaboratoryExaminationQuery(baseOptions: Apollo.QueryHookOptions<QuickLaboratoryExaminationQuery, QuickLaboratoryExaminationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryExaminationQuery, QuickLaboratoryExaminationQueryVariables>(QuickLaboratoryExaminationDocument, options);
      }
export function useQuickLaboratoryExaminationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryExaminationQuery, QuickLaboratoryExaminationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryExaminationQuery, QuickLaboratoryExaminationQueryVariables>(QuickLaboratoryExaminationDocument, options);
        }
export type QuickLaboratoryExaminationQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationQuery>;
export type QuickLaboratoryExaminationLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationLazyQuery>;
export type QuickLaboratoryExaminationQueryResult = Apollo.QueryResult<QuickLaboratoryExaminationQuery, QuickLaboratoryExaminationQueryVariables>;
export const QuickLaboratoryExaminationCountDocument = gql`
    query QuickLaboratoryExaminationCount {
  quickLaboratoryExaminationCount
}
    `;

/**
 * __useQuickLaboratoryExaminationCountQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryExaminationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryExaminationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryExaminationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuickLaboratoryExaminationCountQuery(baseOptions?: Apollo.QueryHookOptions<QuickLaboratoryExaminationCountQuery, QuickLaboratoryExaminationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryExaminationCountQuery, QuickLaboratoryExaminationCountQueryVariables>(QuickLaboratoryExaminationCountDocument, options);
      }
export function useQuickLaboratoryExaminationCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryExaminationCountQuery, QuickLaboratoryExaminationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryExaminationCountQuery, QuickLaboratoryExaminationCountQueryVariables>(QuickLaboratoryExaminationCountDocument, options);
        }
export type QuickLaboratoryExaminationCountQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationCountQuery>;
export type QuickLaboratoryExaminationCountLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationCountLazyQuery>;
export type QuickLaboratoryExaminationCountQueryResult = Apollo.QueryResult<QuickLaboratoryExaminationCountQuery, QuickLaboratoryExaminationCountQueryVariables>;
export const QuickLaboratoryExaminationsForDashboardDocument = gql`
    query QuickLaboratoryExaminationsForDashboard($skip: Float!, $take: Float!) {
  quickLaboratoryExaminations(skip: $skip, take: $take) {
    id
    price
    paid
    updated_at
  }
}
    `;

/**
 * __useQuickLaboratoryExaminationsForDashboardQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryExaminationsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryExaminationsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryExaminationsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickLaboratoryExaminationsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<QuickLaboratoryExaminationsForDashboardQuery, QuickLaboratoryExaminationsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryExaminationsForDashboardQuery, QuickLaboratoryExaminationsForDashboardQueryVariables>(QuickLaboratoryExaminationsForDashboardDocument, options);
      }
export function useQuickLaboratoryExaminationsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryExaminationsForDashboardQuery, QuickLaboratoryExaminationsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryExaminationsForDashboardQuery, QuickLaboratoryExaminationsForDashboardQueryVariables>(QuickLaboratoryExaminationsForDashboardDocument, options);
        }
export type QuickLaboratoryExaminationsForDashboardQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationsForDashboardQuery>;
export type QuickLaboratoryExaminationsForDashboardLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationsForDashboardLazyQuery>;
export type QuickLaboratoryExaminationsForDashboardQueryResult = Apollo.QueryResult<QuickLaboratoryExaminationsForDashboardQuery, QuickLaboratoryExaminationsForDashboardQueryVariables>;
export const QuickLaboratoryExaminationsDocument = gql`
    query QuickLaboratoryExaminations($skip: Float!, $take: Float!) {
  quickLaboratoryExaminations(skip: $skip, take: $take) {
    id
    name
    price
    paid
    completed
    new
    result
    tests {
      id
      name
    }
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useQuickLaboratoryExaminationsQuery__
 *
 * To run a query within a React component, call `useQuickLaboratoryExaminationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickLaboratoryExaminationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickLaboratoryExaminationsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickLaboratoryExaminationsQuery(baseOptions: Apollo.QueryHookOptions<QuickLaboratoryExaminationsQuery, QuickLaboratoryExaminationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickLaboratoryExaminationsQuery, QuickLaboratoryExaminationsQueryVariables>(QuickLaboratoryExaminationsDocument, options);
      }
export function useQuickLaboratoryExaminationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickLaboratoryExaminationsQuery, QuickLaboratoryExaminationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickLaboratoryExaminationsQuery, QuickLaboratoryExaminationsQueryVariables>(QuickLaboratoryExaminationsDocument, options);
        }
export type QuickLaboratoryExaminationsQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationsQuery>;
export type QuickLaboratoryExaminationsLazyQueryHookResult = ReturnType<typeof useQuickLaboratoryExaminationsLazyQuery>;
export type QuickLaboratoryExaminationsQueryResult = Apollo.QueryResult<QuickLaboratoryExaminationsQuery, QuickLaboratoryExaminationsQueryVariables>;
export const QuickLaboratoryTestsDocument = gql`
    query QuickLaboratoryTests {
  quickLaboratoryTests {
    id
    name
    created_at
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
 *   },
 * });
 */
export function useQuickLaboratoryTestsQuery(baseOptions?: Apollo.QueryHookOptions<QuickLaboratoryTestsQuery, QuickLaboratoryTestsQueryVariables>) {
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
export const QuickMedicinesDocument = gql`
    query QuickMedicines {
  quickMedicines {
    id
    name
    created_at
  }
}
    `;

/**
 * __useQuickMedicinesQuery__
 *
 * To run a query within a React component, call `useQuickMedicinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickMedicinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickMedicinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuickMedicinesQuery(baseOptions?: Apollo.QueryHookOptions<QuickMedicinesQuery, QuickMedicinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickMedicinesQuery, QuickMedicinesQueryVariables>(QuickMedicinesDocument, options);
      }
export function useQuickMedicinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickMedicinesQuery, QuickMedicinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickMedicinesQuery, QuickMedicinesQueryVariables>(QuickMedicinesDocument, options);
        }
export type QuickMedicinesQueryHookResult = ReturnType<typeof useQuickMedicinesQuery>;
export type QuickMedicinesLazyQueryHookResult = ReturnType<typeof useQuickMedicinesLazyQuery>;
export type QuickMedicinesQueryResult = Apollo.QueryResult<QuickMedicinesQuery, QuickMedicinesQueryVariables>;
export const QuickPrescriptionDocument = gql`
    query QuickPrescription($id: ID!) {
  quickPrescription(id: $id) {
    id
    name
    price
    paid
    completed
    new
    medicines {
      id
      name
    }
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useQuickPrescriptionQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuickPrescriptionQuery(baseOptions: Apollo.QueryHookOptions<QuickPrescriptionQuery, QuickPrescriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionQuery, QuickPrescriptionQueryVariables>(QuickPrescriptionDocument, options);
      }
export function useQuickPrescriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionQuery, QuickPrescriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionQuery, QuickPrescriptionQueryVariables>(QuickPrescriptionDocument, options);
        }
export type QuickPrescriptionQueryHookResult = ReturnType<typeof useQuickPrescriptionQuery>;
export type QuickPrescriptionLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionLazyQuery>;
export type QuickPrescriptionQueryResult = Apollo.QueryResult<QuickPrescriptionQuery, QuickPrescriptionQueryVariables>;
export const QuickPrescriptionCountDocument = gql`
    query QuickPrescriptionCount {
  quickPrescriptionCount
}
    `;

/**
 * __useQuickPrescriptionCountQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuickPrescriptionCountQuery(baseOptions?: Apollo.QueryHookOptions<QuickPrescriptionCountQuery, QuickPrescriptionCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionCountQuery, QuickPrescriptionCountQueryVariables>(QuickPrescriptionCountDocument, options);
      }
export function useQuickPrescriptionCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionCountQuery, QuickPrescriptionCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionCountQuery, QuickPrescriptionCountQueryVariables>(QuickPrescriptionCountDocument, options);
        }
export type QuickPrescriptionCountQueryHookResult = ReturnType<typeof useQuickPrescriptionCountQuery>;
export type QuickPrescriptionCountLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionCountLazyQuery>;
export type QuickPrescriptionCountQueryResult = Apollo.QueryResult<QuickPrescriptionCountQuery, QuickPrescriptionCountQueryVariables>;
export const QuickPrescriptionsForDashboardDocument = gql`
    query QuickPrescriptionsForDashboard($skip: Float!, $take: Float!) {
  quickPrescriptions(skip: $skip, take: $take) {
    id
    price
    paid
    updated_at
  }
}
    `;

/**
 * __useQuickPrescriptionsForDashboardQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionsForDashboardQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickPrescriptionsForDashboardQuery(baseOptions: Apollo.QueryHookOptions<QuickPrescriptionsForDashboardQuery, QuickPrescriptionsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionsForDashboardQuery, QuickPrescriptionsForDashboardQueryVariables>(QuickPrescriptionsForDashboardDocument, options);
      }
export function useQuickPrescriptionsForDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionsForDashboardQuery, QuickPrescriptionsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionsForDashboardQuery, QuickPrescriptionsForDashboardQueryVariables>(QuickPrescriptionsForDashboardDocument, options);
        }
export type QuickPrescriptionsForDashboardQueryHookResult = ReturnType<typeof useQuickPrescriptionsForDashboardQuery>;
export type QuickPrescriptionsForDashboardLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionsForDashboardLazyQuery>;
export type QuickPrescriptionsForDashboardQueryResult = Apollo.QueryResult<QuickPrescriptionsForDashboardQuery, QuickPrescriptionsForDashboardQueryVariables>;
export const QuickPrescriptionsDocument = gql`
    query QuickPrescriptions($skip: Float!, $take: Float!) {
  quickPrescriptions(skip: $skip, take: $take) {
    id
    name
    price
    paid
    completed
    new
    medicines {
      id
      name
    }
    other
    created_at
    updated_at
  }
}
    `;

/**
 * __useQuickPrescriptionsQuery__
 *
 * To run a query within a React component, call `useQuickPrescriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickPrescriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickPrescriptionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useQuickPrescriptionsQuery(baseOptions: Apollo.QueryHookOptions<QuickPrescriptionsQuery, QuickPrescriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuickPrescriptionsQuery, QuickPrescriptionsQueryVariables>(QuickPrescriptionsDocument, options);
      }
export function useQuickPrescriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuickPrescriptionsQuery, QuickPrescriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuickPrescriptionsQuery, QuickPrescriptionsQueryVariables>(QuickPrescriptionsDocument, options);
        }
export type QuickPrescriptionsQueryHookResult = ReturnType<typeof useQuickPrescriptionsQuery>;
export type QuickPrescriptionsLazyQueryHookResult = ReturnType<typeof useQuickPrescriptionsLazyQuery>;
export type QuickPrescriptionsQueryResult = Apollo.QueryResult<QuickPrescriptionsQuery, QuickPrescriptionsQueryVariables>;
export const SettingDocument = gql`
    query Setting {
  setting {
    id
    card_price
    card_expiration_date
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
export const NewCreatedLaboratoryExaminationDocument = gql`
    subscription NewCreatedLaboratoryExamination {
  newCreatedLaboratoryExamination {
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
 * __useNewCreatedLaboratoryExaminationSubscription__
 *
 * To run a query within a React component, call `useNewCreatedLaboratoryExaminationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedLaboratoryExaminationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedLaboratoryExaminationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedLaboratoryExaminationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedLaboratoryExaminationSubscription, NewCreatedLaboratoryExaminationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedLaboratoryExaminationSubscription, NewCreatedLaboratoryExaminationSubscriptionVariables>(NewCreatedLaboratoryExaminationDocument, options);
      }
export type NewCreatedLaboratoryExaminationSubscriptionHookResult = ReturnType<typeof useNewCreatedLaboratoryExaminationSubscription>;
export type NewCreatedLaboratoryExaminationSubscriptionResult = Apollo.SubscriptionResult<NewCreatedLaboratoryExaminationSubscription>;
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
    message
    card {
      id
      name
    }
    laboratory_test {
      id
      card {
        id
        name
      }
      created_at
    }
    prescription {
      id
      card {
        id
        name
      }
      created_at
    }
    quick_laboratory_test {
      id
      name
    }
    quick_prescription_test {
      id
      name
    }
    for
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
export const NewCreatedPrescriptionDocument = gql`
    subscription NewCreatedPrescription {
  newCreatedPrescription {
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
 * __useNewCreatedPrescriptionSubscription__
 *
 * To run a query within a React component, call `useNewCreatedPrescriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedPrescriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedPrescriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedPrescriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedPrescriptionSubscription, NewCreatedPrescriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedPrescriptionSubscription, NewCreatedPrescriptionSubscriptionVariables>(NewCreatedPrescriptionDocument, options);
      }
export type NewCreatedPrescriptionSubscriptionHookResult = ReturnType<typeof useNewCreatedPrescriptionSubscription>;
export type NewCreatedPrescriptionSubscriptionResult = Apollo.SubscriptionResult<NewCreatedPrescriptionSubscription>;
export const NewMedicationUpdateDocument = gql`
    subscription NewMedicationUpdate {
  newMedicationUpdate {
    id
    card {
      id
      name
      age
      gender
    }
    medications {
      id
      medicine {
        id
        name
        price
        inStock
      }
      strength
      perDay
      forDays
      checkIn {
        date
        price
        status {
          isPaid
          paidAt
          isCompleted
        }
      }
      other
      created_at
    }
    paid
    inrolled
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
 * __useNewMedicationUpdateSubscription__
 *
 * To run a query within a React component, call `useNewMedicationUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMedicationUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMedicationUpdateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMedicationUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMedicationUpdateSubscription, NewMedicationUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMedicationUpdateSubscription, NewMedicationUpdateSubscriptionVariables>(NewMedicationUpdateDocument, options);
      }
export type NewMedicationUpdateSubscriptionHookResult = ReturnType<typeof useNewMedicationUpdateSubscription>;
export type NewMedicationUpdateSubscriptionResult = Apollo.SubscriptionResult<NewMedicationUpdateSubscription>;
export const NewCreatedQuickLaboratoryExaminationDocument = gql`
    subscription NewCreatedQuickLaboratoryExamination {
  newCreatedQuickLaboratoryExamination {
    id
    name
    price
    paid
    completed
    new
    result
    tests {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedQuickLaboratoryExaminationSubscription__
 *
 * To run a query within a React component, call `useNewCreatedQuickLaboratoryExaminationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedQuickLaboratoryExaminationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedQuickLaboratoryExaminationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedQuickLaboratoryExaminationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedQuickLaboratoryExaminationSubscription, NewCreatedQuickLaboratoryExaminationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedQuickLaboratoryExaminationSubscription, NewCreatedQuickLaboratoryExaminationSubscriptionVariables>(NewCreatedQuickLaboratoryExaminationDocument, options);
      }
export type NewCreatedQuickLaboratoryExaminationSubscriptionHookResult = ReturnType<typeof useNewCreatedQuickLaboratoryExaminationSubscription>;
export type NewCreatedQuickLaboratoryExaminationSubscriptionResult = Apollo.SubscriptionResult<NewCreatedQuickLaboratoryExaminationSubscription>;
export const NewCreatedQuickPrescriptionDocument = gql`
    subscription NewCreatedQuickPrescription {
  newCreatedQuickPrescription {
    id
    name
    price
    paid
    completed
    new
    medicines {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewCreatedQuickPrescriptionSubscription__
 *
 * To run a query within a React component, call `useNewCreatedQuickPrescriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCreatedQuickPrescriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCreatedQuickPrescriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCreatedQuickPrescriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCreatedQuickPrescriptionSubscription, NewCreatedQuickPrescriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCreatedQuickPrescriptionSubscription, NewCreatedQuickPrescriptionSubscriptionVariables>(NewCreatedQuickPrescriptionDocument, options);
      }
export type NewCreatedQuickPrescriptionSubscriptionHookResult = ReturnType<typeof useNewCreatedQuickPrescriptionSubscription>;
export type NewCreatedQuickPrescriptionSubscriptionResult = Apollo.SubscriptionResult<NewCreatedQuickPrescriptionSubscription>;