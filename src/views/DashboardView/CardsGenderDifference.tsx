import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import GenderAmountCard from './GenderAmountCard';

export type Stats = {
  amount: number;
  percentage: number;
  greater: boolean;
};

interface CardsGenderDifferenceProps {
  cards: { gender: string; created_at: string }[] | undefined;
}
const CardsGenderDifference: React.FC<CardsGenderDifferenceProps> = ({
  cards
}) => {
  const [maleStats, setMaleStats] = useState<Stats>({
    amount: 0,
    percentage: 0,
    greater: false
  });
  const [femaleStats, setFemaleStats] = useState<Stats>({
    amount: 0,
    percentage: 0,
    greater: false
  });

  useEffect(() => {
    if (!cards) return;
    const totalAmount = cards.length;
    const maleCardAmount = cards.filter(card => card.gender === 'male').length;
    const femaleCardAmount = cards.filter(card => card.gender === 'female')
      .length;

    setMaleStats({
      amount: maleCardAmount,
      percentage: (maleCardAmount / totalAmount) * 100,
      greater: maleCardAmount > femaleCardAmount
    });
    setFemaleStats({
      amount: femaleCardAmount,
      percentage: (femaleCardAmount / totalAmount) * 100,
      greater: femaleCardAmount > maleCardAmount
    });
  }, [cards]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <GenderAmountCard header="Male Patients" stats={maleStats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <GenderAmountCard header="Female Patients" stats={femaleStats} />
      </Grid>
    </>
  );
};

export default CardsGenderDifference;
