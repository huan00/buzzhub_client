import { typography } from '@mui/system'

export const colorTokens = {
  grey: {
    0: '#f8f9fa',
    10: '#e9ecef',
    50: '#dee2e6',
    100: '#1e2d24',
    200: '#ced4da',
    300: '#6f5c3c',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '',
    900: '',
    1000: '#212529'
  },
  primary: {
    50: '#004666',
    100: '#00628f',
    200: '#007db8',
    300: '#0099e0',
    400: '#00afff',
    500: '#47c5ff',
    600: '#c2ecff',
    700: '#e0f6ff'
  }
}

export const themeSetting = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50]
            },
            neutral: {
              dark: colorTokens.grey[0],
              main: colorTokens.grey[100],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[600],
              light: colorTokens.grey[1000]
            },
            background: {
              default: colorTokens.grey[600],
              alt: colorTokens.grey[600]
            }
          }
        : {
            primary: {
              dark: colorTokens.primary[50],
              main: colorTokens.primary[500],
              light: colorTokens.primary[700]
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[600],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[100],
              light: colorTokens.grey[0]
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0]
            }
          })
    }
  }
}
