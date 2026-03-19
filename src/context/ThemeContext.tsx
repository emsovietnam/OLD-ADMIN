import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

export const ColorModeContext = React.createContext({
  toggleColorMode: (themeSetting: string) => {}
});

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          divider: '#ced0d4',
          background: {
            default: '#f1f2f5',
            hover: '#fcfcfc',
            primary: '#fff',
            secondary: '#f0f2f5',
            input: '#f0f2f5',
            custom: '#e7f3ff',
            modalBackdrop: 'rgba(255,255,255,0.6)'
          },
          text: {
            primary: '#050505',
            secondary: '#666666',
            custom: '#1877F2'
          },
          button: {
            default: { background: '#fff', hover: '#ebebeb' },
            primary: { background: '#eaeaea', hover: '#d4d6dc' },
            secondary: { background: '#eef0f5', hover: '#d0d2d7' },
            custom: {
              background: '#e7f3ff',
              hover: '#e5f0f4',
              color: '#1877f2',
              hoverSolid: '#0c6ff0'
            },
            inherit: {
              background: '#eaeaea',
              hover: '#d4d6dc'
            }
          },
          scrollY: { color: '#bdbdbd', background: '#f1f1f1' },
          border: {
            solid: '1px solid #494949',
            light: '1px solid #d2d2d2'
          },
          boxShadow: {
            primary: '0 1px 2px rgba(0, 0, 0, 0.2)'
          }
        }
      : {
          // palette values for dark mode
          divider: '#3e4042',
          background: {
            default: '#121212',
            hover: '#515354',
            primary: '#242526',
            secondary: '#3a3b3c',
            input: '#3a3b3c',
            custom: '#3c4044',
            modalBackdrop: 'rgba(40,40,40,0.4)'
          },
          text: {
            primary: '#e4e6eb',
            secondary: '#b8b8b8',
            custom: '#516f98'
          },
          button: {
            default: { background: '#242526', hover: '#454545' },
            primary: { background: '#2a2a2a', hover: '#575758' },
            secondary: { background: '#3a3b3c', hover: '#d0d2d7' },
            custom: {
              background: '#2a2c2f',
              hover: '#424648',
              color: '#cedbeb',
              hoverSolid: '#e1e5eb'
            },
            inherit: {
              background: '#7a7a7a',
              hover: '#808080'
            }
          },
          scrollY: { color: '#555555', background: '#2d2d2d' },
          border: {
            solid: '1px solid #5f5f5f',
            light: '1px solid #4b4b4b'
          },
          boxShadow: {
            primary: '0 1px 2px rgba(255, 255, 255, 0.348)'
          }
        })
  },
  typography: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }
        // same for other variants
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }
      }
    }
  }
});

const ThemeContextProvider = ({ children }) => {
  let themeLocal = localStorage.getItem('darkThemeUser');
  const themeDisplay = useSelector(
    (state: any) => state.meReducer?.info?.theme
  );

  const [mode, setMode] = React.useState<any>(
    themeLocal === 'undefined' ? 'light' : themeLocal
  );
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (themeSetting: string) => {
        setMode(
          themeSetting === 'system'
            ? prefersDarkMode
              ? 'dark'
              : 'light'
            : themeSetting
        );
      }
    }),
    [prefersDarkMode, themeLocal, themeDisplay]
  );

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode === 'system' ? 'light' : mode)),
    [mode]
  );
  return (
    <ColorModeContext.Provider
      value={{
        toggleColorMode: (themeSetting: string) => {
          setMode(
            themeSetting === 'system'
              ? prefersDarkMode
                ? 'dark'
                : 'light'
              : themeSetting
          );
        }
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
