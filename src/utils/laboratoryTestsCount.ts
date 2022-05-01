import { CategoryOptions } from '../data/testsPlaceHolder';

type testProps = { result: string; created_at: string }[];

export const laboratoryTestsCount = function(
  tests: testProps,
  unixFromSelectedDays: number | undefined,
  category?: CategoryOptions
) {
  const categoryCount: Record<CategoryOptions, number> = {
    Hematology: 0,
    'STOOL TEST': 0,
    Urinalysis: 0,
    Microscopy: 0,
    Serology: 0,
    Bacteriology: 0,
    'Hormone Test': 0,
    'Clinical Chemistry': 0
  };
  const testsCount: Record<string, number> = {};
  const filteredTests = tests.filter(test =>
    unixFromSelectedDays ? unixFromSelectedDays < Number(test.created_at) : test
  );

  filteredTests.map(test => {
    return (JSON.parse(test.result) as {
      category: CategoryOptions;
      name: string;
    }[]).forEach(json => {
      if (json.category === category) {
        typeof testsCount[json.name] === 'number'
          ? testsCount[json.name]++
          : (testsCount[json.name] = 0);
        return;
      }
      categoryCount[json.category]++;
    });
  });

  return { categoryCount, testsCount };
};
