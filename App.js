import React from 'react';

import Home from './src/Home';
import { ThemeProvider } from './src/theming';

const App = () => (
  <ThemeProvider>
    <Home />
  </ThemeProvider>
);

export default App;
