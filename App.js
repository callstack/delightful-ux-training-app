import React from 'react';

import Login from './src/screens/Login';
import { ThemeProvider } from './src/utils/theming';

const App = () => (
  <ThemeProvider>
    <Login />
  </ThemeProvider>
);

export default App;
