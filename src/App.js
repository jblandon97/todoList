import React from 'react'
import './sass/app.scss';
import Header from './containers/Header';
import { ThemeProvider } from './context/context';
import Main from './containers/Main';

function App() {
  
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
