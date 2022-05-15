import React, { useState, createContext, useEffect } from 'react';
import { testsPlaceHolder } from '../data/testsPlaceHolder';
import { prescriptionPlaceholder } from '../data/perscriptionPlaceholder';
import { useSettingQuery } from '../generated/graphql';
import {
  defaultLaboratoryTestSeed,
  LaboratoryTestCatagories
} from '../data/testsSeed';

export type LaboratorySettingDataType = {
  name: string;
  price: number;
  category: string;
  normalValue?: string;
};
export type PrescriptionSettingDataType = {
  name: string;
  quantity?: string;
  price: number;
  perDay: 'bid' | 'stat';
  forDays: number;
  other?: string;
};
type ContextType = {
  cardPrice: number;
  cardExpirationDate: number;
  laboratoryTestSettingData: LaboratoryTestCatagories[];
  prescriptionTestSettingData: PrescriptionSettingDataType[];
};
const SettingsContext = createContext<ContextType>({
  cardPrice: 0,
  cardExpirationDate: 0,
  laboratoryTestSettingData: [
    {
      name: '',
      price: 0,
      tests: [
        {
          hasIndividualPrice: false,
          hasNormalValue: false,
          isInfluencedByCategory: false,
          name: '',
          value: ''
        }
      ]
    }
  ],
  prescriptionTestSettingData: [
    { name: '', price: 0, forDays: 1, perDay: 'bid' }
  ]
});

const SettingsProvider: React.FC = ({ children }) => {
  const [cardPrice, setCardPrice] = useState(0);
  const [cardExpirationDate, setCardExpirationDate] = useState(0);
  const [laboratoryTestSettingData, setLaboratoryTestSettingData] = useState<
    LaboratoryTestCatagories[]
  >(defaultLaboratoryTestSeed);
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
    ) as LaboratorySettingDataType[];
    const prescriptionRateData = JSON.parse(
      data.setting.prescription_tests_data
    ) as PrescriptionSettingDataType[];

    // setLaboratoryTestSettingData(testRateData);
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
