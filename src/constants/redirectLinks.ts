import { Occupation } from '../context/AuthContext';

export const redirectLink = function(occupation: Occupation) {
  return occupation === 'ADMIN'
    ? '/app/dashboard'
    : occupation === 'DOCTOR'
    ? '/app/data/card'
    : occupation === 'RECEPTION'
    ? '/app/form/card'
    : occupation === 'LABORATORIAN'
    ? '/app/data/laboratory-test'
    : occupation === 'NURSE'
    ? '/app/data/prescription-test'
    : '/login';
};
