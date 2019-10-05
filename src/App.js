import React from 'react';
// import logo from './logo.svg';
import './App.css';

import textExploder from 'text-exploder-two'

const { Modal, dummyData } = textExploder


function App() {
  return (
    <div className="App">
      <Modal data={dummyData} />
    </div>
  );
}

export default App;
