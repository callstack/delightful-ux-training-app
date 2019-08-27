import React from 'react';

import Home from './src/screens/Home';
import { ThemeProvider } from './src/utils/theming';

const App = () => (
  <ThemeProvider>
    <Home />
  </ThemeProvider>
);

export default App;
