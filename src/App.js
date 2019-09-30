import React from 'react';
// import logo from './logo.svg';
import './App.css';

import {PatternManager} from 'sequencer'


function App() {

console.log("->", PatternManager)

  return (
    <div className="App">
      <PatternManager
        handler={(cells) => console.log(cells)}
      />
      <PatternManager
        handler={(cells) => console.log(cells)}
      />
      <PatternManager
        handler={(cells) => console.log(cells)}
      />
    </div>
  );
}

export default App;
