import { CardHistoryStateType } from '../constants/initialCardFormState';

export const convertPlaneHistoryResultToJSON = function(
  history: CardHistoryStateType
) {
  return JSON.stringify({
    bp: history.bp,
    plus: history.plus,
    temp: history.temp,
    spo2: history.spo2,
    rr: history.rr,
    weight: history.weight,
    heent: history.heent,
    chest: history.chest,
    cvs: history.cvs,
    abd: history.abd,
    ga: history.ga,
    asst: history.asst,
    cc: history.cc,
    rx: history.rx,
    hpi: history.hpi,
    other: history.other
  });
};

export const convertJSONToPlaneHistoryResult = function(result: string) {
  return JSON.parse(result) as CardHistoryStateType;
};
