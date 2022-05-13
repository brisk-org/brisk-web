import { Palette } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions) = {
  h1: {
    fontWeight: 500,
    fontSize: '3.5rem',
    letterSpacing: '-0.24px'
  },
  h2: {
    fontWeight: 500,
    fontSize: '2.8rem',
    letterSpacing: '-0.24px'
  },
  h3: {
    fontWeight: 500,
    fontSize: '2.5rem',
    letterSpacing: '-0.06px'
  },
  h4: {
    fontWeight: 500,
    fontSize: '2.0rem',
    letterSpacing: '-0.06px'
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.5rem',
    letterSpacing: '-0.05px'
  },
  h6: {
    fontWeight: 500,
    fontSize: '1.3rem',
    letterSpacing: '-0.05px'
  },
  overline: {
    fontWeight: 500
  }
};
export default typography;
