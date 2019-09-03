import React from 'react';

import Home from './src/screens/Home';
import { ThemeProvider, darkTheme, lightTheme } from './src/utils/theming';

class App extends React.Component {
  state = {
    isDarkMode: false,
  };

  handleDarkModeToggle = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  render() {
    return (
      <ThemeProvider theme={this.state.isDarkMode ? darkTheme : lightTheme}>
        <Home
          onDarkThemeToggle={this.handleDarkModeToggle}
          isDarkMode={this.state.isDarkMode}
        />
      </ThemeProvider>
    );
  }
}

export default App;
