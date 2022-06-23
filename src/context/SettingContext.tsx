import React, { useState, createContext, useEffect } from 'react';
import { prescriptionPlaceholder } from '../data/perscriptionPlaceholder';
import { useSettingQuery } from '../generated/graphql';
import {
  defaultLaboratoryTestSeed,
  LaboratoryTestCatagories
} from '../data/testsSeed';
export type PrescriptionPerDay = 'BID' | 'STAT';
export type PrescriptionCheckIn = {
  perDay: PrescriptionPerDay;
  date: string;
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
};
const SettingsContext = createContext<ContextType>({});

const SettingsProvider: React.FC = ({ children }) => {
  const [cardPrice, setCardPrice] = useState<number>();
  const [cardExpirationDate, setCardExpirationDate] = useState<number>();

  const { data, loading } = useSettingQuery({
    onError: err => console.error(err)
  });
  useEffect(() => {
    if (!data) return;
    setCardPrice(data.setting.card_price);
    setCardExpirationDate(data.setting.card_expiration_date);
  }, [data, loading]);

  return (
    <SettingsContext.Provider
      value={{
        cardPrice,
        cardExpirationDate
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
