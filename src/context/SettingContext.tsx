import React, { useState, createContext, useEffect } from 'react';
import { prescriptionPlaceholder } from '../data/perscriptionPlaceholder';
import { useSettingQuery } from '../generated/graphql';
import {
  defaultLaboratoryTestSeed,
  LaboratoryTestCatagories
} from '../data/testsSeed';
export type PrescriptionPerDay = 'bid' | 'stat';
export type PrescriptionCheckIn = {
  perDay: PrescriptionPerDay;
  day: string;
  price: number;
  isPaid: boolean;
  completed: boolean;
};
export type LaboratorySettingDataType = {
  name: string;
  price: number;
  category: string;
  normalValue?: string;
};
export type PrescriptionSettingDataType = {
  name: string;
  strength?: string;
  inStock: number;
  price: number;
  perDay: PrescriptionPerDay;
  forDays: number;
  checkIn: PrescriptionCheckIn[];
  other?: string;
};

type ContextType = {
  cardPrice?: number;
  cardExpirationDate?: number;
  laboratoryTestSettingData?: LaboratoryTestCatagories[];
  prescriptionTestSettingData?: PrescriptionSettingDataType[];
};
const SettingsContext = createContext<ContextType>({});

const SettingsProvider: React.FC = ({ children }) => {
  const [cardPrice, setCardPrice] = useState<number>();
  const [cardExpirationDate, setCardExpirationDate] = useState<number>();
  const [laboratoryTestSettingData, setLaboratoryTestSettingData] = useState<
    LaboratoryTestCatagories[]
  >();
  const [
    prescriptionTestSettingData,
    setPrescriptionTestSettingData
  ] = useState<PrescriptionSettingDataType[]>(prescriptionPlaceholder);

  const { data, loading } = useSettingQuery({
    onError: err => console.error(err)
  });
  useEffect(() => {
    if (!data) return;
    setCardPrice(data.setting.card_price);
    setCardExpirationDate(data.setting.card_expiration_date);
    const testRateData = JSON.parse(
      data.setting.laboratory_tests_data
    ) as LaboratoryTestCatagories[];
    console.log(data.setting, testRateData[0].name, 'Hi');
    const prescriptionRateData = JSON.parse(
      data.setting.prescription_tests_data
    ) as PrescriptionSettingDataType[];

    setLaboratoryTestSettingData(testRateData);
    setPrescriptionTestSettingData(prescriptionRateData);
  }, [data, loading]);

  return (
    <SettingsContext.Provider
      value={{
        cardPrice,
        cardExpirationDate,
        laboratoryTestSettingData,
        prescriptionTestSettingData
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
