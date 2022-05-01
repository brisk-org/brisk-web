type agesProps = { age: string; created_at: string }[];
export const ageFilter = function(
  ages: agesProps,
  unixFromSelectedDays: number | undefined
) {
  const filteredAges = ages.filter(age =>
    unixFromSelectedDays ? unixFromSelectedDays < Number(age.created_at) : age
  );
  const below10 = filteredAges.filter(({ age }) => Number(age) < 10).length;
  const bn1025 = filteredAges.filter(
    ({ age }) => Number(age) < 25 && Number(age) > 10
  ).length;
  const bn2540 = filteredAges.filter(
    ({ age }) => Number(age) < 40 && Number(age) > 25
  ).length;
  const bn4065 = filteredAges.filter(
    ({ age }) => Number(age) < 60 && Number(age) > 40
  ).length;
  const above65 = filteredAges.filter(({ age }) => Number(age) > 65).length;
  return { below10, bn1025, bn2540, bn4065, above65 };
};
