import { CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { clientId } from 'src/constants/common';
import Routes from 'src/routes/routes';
import '../assets/scss/myScss/app.scss';
import './App.css';
export default function App() {
  return (
    <div className="app">
      <SnackbarProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <CssBaseline />
          <Routes />
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </div>
  );
}
