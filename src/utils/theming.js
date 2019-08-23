import { createTheming } from '@callstack/react-theme-provider';

const darkTheme = {
  name: 'dark',
  backgroundColor: '#131313',
  secondaryBackgroundColor: '#0c0c0c',
  primaryTextColor: '#FFF',
  secondaryTextColor: '#757575',
  accentColor: '#F8F32B',
};

const lightTheme = {
  name: 'light',
  backgroundColor: '#FFF',
  secondaryBackgroundColor: '#f5f9ff',
  primaryTextColor: '#131313',
  secondaryTextColor: '#333',
  accentColor: '#3903fc',
};

const { ThemeProvider, withTheme } = createTheming(lightTheme);

export { ThemeProvider, withTheme };
