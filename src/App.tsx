import React, { useEffect, useRef } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { globalStyles } from './theme';
import { useLocation } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SnackbarProvider } from 'notistack';
import { SettingsProvider } from './context/SettingContext';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const App = () => {
  globalStyles();
  const location = useLocation();

  const urlLength = location.pathname.split('/').length;
  const ref = useRef<number>(location.pathname.split('/').length);
  const notistackRef = useRef<SnackbarProvider>(null);

  useEffect(() => {
    ref.current = location.pathname.split('/').length;
  }, [location.pathname]);

  return (
    <AuthProvider>
      <SettingsProvider>
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={3}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          action={key => (
            <IconButton
              onClick={() => notistackRef.current?.closeSnackbar(key)}
              size="large"
            >
              <Close />
            </IconButton>
          )}
        >
          <NotificationProvider>
            {urlLength > 2 ? <DashboardLayout /> : <MainLayout />}
          </NotificationProvider>
        </SnackbarProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
