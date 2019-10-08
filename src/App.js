import React from 'react';
// import logo from './logo.svg';
import './App.css';

import textExploder from 'text-exploder-two'

const { Document, dummyData } = textExploder


function App() {
  return (
    <div className="App">
      <Document data={dummyData} />
    </div>
  );
}

export default App;
