import React, {useState} from 'react';
import styled from 'styled-components'
// import logo from './logo.svg';
import './App.css';

import MusicUI from 'sequencer'
import Khord from 'chord-generator'

const { chordGenerator, patternMaker } = Khord

const {
  playWorkbench,
  stopWorkbench,
} = patternMaker

const {
  getRandomProgression,
  getAllChords,
  chordNotes
} = chordGenerator;

const {
  ProgressionChordOptions,
  ProgressionWorkbench,
  ProgressionPatternOptions,
  GenerateButton,
} = MusicUI

const Workbench = styled.div`
  /* border: solid; */
  width: 100%;
`
const Options = styled.div`
  /* border: 1px solid red; */
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

const Wrapper = styled.div`
  width: 40%;
  /* border: solid; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const AppWrapper = styled.div`
  /* border: solid; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

function App() {

  const [chords, setChords] = useState([])
  const [key, setKey] = useState('D')
  const [mode, setMode] = useState('mixolydian')
  const [tempo, setTempo] = useState(120)
  const [chordPattern, setChordPattern] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  const generateChords = () => {
    setChords(getRandomProgression(
      { key, mode, tempo, theme: null }
    ))
  }

  return (
    <AppWrapper>
      <Wrapper>


        <Options>

          <ProgressionChordOptions
            keyVal={key}
            modeVal={mode}
            tempoVal={tempo}
            onKeyChange={ value => setKey(value) }
            onModeChange={ value => setMode(value)}
            onTempoChange={ value => setTempo(parseInt(value))}
          />

          <ProgressionPatternOptions
            onChange={(pattern) => {setChordPattern(pattern)}}
          />

          <GenerateButton onSubmit={generateChords}/>
        </Options>

        <Workbench>
          <ProgressionWorkbench
            getKeyChords={() => getAllChords({mode, key})}
            changeChord={({name, notes, index}) => {
              const newChords = {...chords}
              const newNotes = chordNotes(name)
              newChords.chordNames[index] = name
              newChords.chordNotes[index] = newNotes
              setChords(newChords)
            }}
            addChord={
              ({name, notes, index}) => {
                const newChords = {...chords}
                const newNotes = chordNotes(name)
                newChords.chordNames.splice(index+1,0,name)
                newChords.chordNotes.splice(index+1,0,newNotes)
                setChords(newChords)
              }
            }
            removeChord={(index) => {
              const newChords = {...chords}
              newChords.chordNames.splice(index,1)
              newChords.chordNotes.splice(index,1)
              setChords(newChords)
            }}
            chords={chords.chordNames}
            play={() => playWorkbench({
              sections: [chords],
              stateUpdater: (i) => {setActiveIndex(i)},
              params: { pattern: chordPattern, tempo }
            })}
            activeIndex={activeIndex}
            stop={stopWorkbench}
          />
        </Workbench>


      </Wrapper>



    </AppWrapper>
  );
}

export default App;
