import React from 'react';
import './App.css';
import SummaryBoard from './summary/SummaryBoard';
import LoadingIndicator from './loading/LoadingIndicator';

function App() {
  return (
    <div className="App">
      <nav>
        <SummaryBoard />
        <LoadingIndicator />
      </nav>
    </div>
  );
}

export default App;
