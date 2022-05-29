import { Occupation } from '../generated/graphql';

export const redirectLink = function(occupation: Occupation) {
  switch (occupation) {
    case Occupation.Admin:
      return '/app/dashboard';
    case Occupation.Doctor:
      return '/app/data/card';
    case Occupation.Reception:
      return '/app/form/card';
    case Occupation.Laboratory:
      return 'app/data/laboratory-test';
    case Occupation.Nurse:
      return 'app/data/prescription-test';
    default:
      return '/login';
  }
};
