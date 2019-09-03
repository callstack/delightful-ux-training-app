import React from 'react';

import Home from './src/screens/Home';

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
      <Home
        onDarkThemeToggle={this.handleDarkModeToggle}
        isDarkMode={this.state.isDarkMode}
      />
    );
  }
}

export default App;
