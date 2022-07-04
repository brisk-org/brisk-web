import React, { useState, createContext, useEffect } from 'react';

import {
  LaboratoryTestCategoriesQuery,
  useLaboratoryTestCategoriesQuery,
  useSettingQuery
} from '../generated/graphql';

type ContextType = {
  cardPrice?: number;
  cardExpirationDate?: number;
  categories?: LaboratoryTestCategoriesQuery['laboratoryTestCategories'];
};
const SettingsContext = createContext<ContextType>({});

const SettingsProvider: React.FC = ({ children }) => {
  const [cardPrice, setCardPrice] = useState<number>();
  const [cardExpirationDate, setCardExpirationDate] = useState<number>();
  const [categories, setCategories] = useState<
    LaboratoryTestCategoriesQuery['laboratoryTestCategories']
  >();

  const { data, loading } = useSettingQuery({
    onError: err => console.error(err)
  });
  const {
    data: laboratoryCategoriesData,
    loading: laboraotryCategoryLoading
  } = useLaboratoryTestCategoriesQuery();
  useEffect(() => {
    if (!data) return;
    setCardPrice(data.setting.card_price);
    setCardExpirationDate(data.setting.card_expiration_date);
  }, [data, loading]);
  useEffect(() => {
    if (!laboratoryCategoriesData) return;

    setCategories(laboratoryCategoriesData.laboratoryTestCategories);
  }, [laboratoryCategoriesData, laboraotryCategoryLoading]);

  return (
    <SettingsContext.Provider
      value={{
        cardPrice,
        cardExpirationDate,
        categories
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
