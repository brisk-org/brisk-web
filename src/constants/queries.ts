import { CardQuery, UpdateCardMutationVariables } from '../generated/graphql';

const joinQueryies = function(props: any) {
  return Object.entries(props)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const editCardQuery = (props: UpdateCardMutationVariables) => {
  const allPropsJoined = Object.entries(props)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `/app/form/card?${allPropsJoined}`;
};
export const createHistoryQuery = (
  id: string,
  props: {
    name: string;
    gender: string;
    age: string;
  }
) => `/app/form/card?id=${id}&history=true&${joinQueryies(props)}`;

interface UpdateId {
  historyId: string;
}
type HistoryFromCard = NonNullable<CardQuery['card']['history']>[0];
interface EditHistoryQueryType extends HistoryFromCard, UpdateId {}

export const editHistoryQuery = (props: EditHistoryQueryType) => {
  return `/app/form/card?history=true&${joinQueryies(props)}`;
};
type CardQueryType = {
  id: string;
  testId?: string;
  prescriptionId?: string;
};
export const cardQuery = (props: CardQueryType) =>
  `/app/data/card/history?${joinQueryies(props)}`;

export const requestTestQuery = (props: { id: string; name: string }) =>
  `/app/form/laboratory-test/request?${joinQueryies(props)}`;

export const completeTestQuery = (id: string) =>
  `/app/form/laboratory-test/complete?id=${id}`;

export const prescribeQuery = (props: {
  id: string;
  name: string;
  gender: string;
  age: string;
}) => `/app/form/prescription-test?${joinQueryies(props)}`;
export const medicalCertificateQuery = (
  id: string,
  name: string,
  gender: string,
  age: string
) =>
  `/app/form/medical/certificate?id=${id}&name=${name}&gender=${gender}&age=${age}`;

export const quickPrescribeQuery = (props: {
  id: string;
  name: string;
  bp: boolean;
  dressing: boolean;
  injection: boolean;
  tat: boolean;
  depo: boolean;
}) => `/app/form/quick-prescription-test?${joinQueryies(props)}`;

export const quickLabTest = (props: {
  id: string;
  name: string;
  fbs: boolean;
  hcg: boolean;
  rbs: boolean;
}) => `/app/form/quick-laboratory-test?${joinQueryies(props)}`;
