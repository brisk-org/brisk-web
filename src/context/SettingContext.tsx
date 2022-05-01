import React, { useState, createContext, useEffect } from 'react';
import { testsPlaceHolder } from '../data/testsPlaceHolder';
import { prescriptionPlaceholder } from '../data/perscriptionPlaceholder';
import { useSettingQuery } from '../generated/graphql';

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
  laboratoryTestSettingData: LaboratorySettingDataType[];
  prescriptionTestSettingData: PrescriptionSettingDataType[];
};
const SettingsContext = createContext<ContextType>({
  cardPrice: 0,
  cardExpirationDate: 0,
  laboratoryTestSettingData: [
    {
      name: '',
      category: '',
      price: 0
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
    LaboratorySettingDataType[]
  >(
    testsPlaceHolder.map(({ name, price, category, normalValue }) => ({
      name,
      category,
      price,
      normalValue
    }))
  );
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

    setLaboratoryTestSettingData(testRateData);
    setPrescriptionTestSettingData(prescriptionRateData);
  }, [data, loading]);

  const handleChange = () => {};

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
