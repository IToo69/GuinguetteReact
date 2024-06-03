import React from 'react';
import './App.css';
import TopConsumers from './components/TopConsumers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Top Pichet Guinguette</h1>
        <TopConsumers />
      </header>
    </div>
  );
}

export default App;