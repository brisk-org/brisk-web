import { createTheme, colors, adaptV4Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import typography from './typography';

export const globalStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        backgroundColor: '#f4f6f8',
        height: '100%',
        width: '100%'
      },
      a: {
        textDecoration: 'none'
      },
      '#root': {
        height: '100%',
        width: '100%'
      }
    }
  })
);

// const theme = createTheme(adaptV4Theme({
//   palette: {
//     background: {
//       default: '#f5f7fb',
//       paper: '#ffffff'
//     },
//     primary: {
//       main: '#4f67ec'
//     },
//     secondary: {
//       main: '#e35f62'
//     },
//     text: {
//       primary: '#293241',
//       secondary: '#3D5A80'
//     },
//     warning: {
//       main: colors.red[200]
//     },
//     success: {
//       main: '#08ad6c'
//     }
//   },
//   typography
// }));

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f7fb',
      paper: '#ffffff'
    },
    primary: {
      main: '#4ECDC4',
      dark: '#1A535C',
      light: '#DFF6F5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e35f62'
    },
    text: {
      primary: '#293241',
      secondary: '#3D5A80'
    },
    warning: {
      main: colors.red[200]
    },
    success: {
      main: '#08ad6c'
    }
  },
  typography
});

export default theme;
