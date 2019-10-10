import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import uuid from 'uuid'

import textExploder from 'text-exploder-two'

const { Documents, dummyDocumentStore, Document, dummyDocumentList } = textExploder


function App() {

  const [currDocID, setCurrDocID] = useState(false)
  const [list, setList] = useState(dummyDocumentList)
  const [store, setStore] = useState(dummyDocumentStore)

  const addDocument = (name) => {

  const id = uuid()
  const newDoc ={
    name,
    id,
    paragraphs: []
  }

  setStore({...store, [id]: newDoc })
  setList([...list, newDoc])
}

  const removeDocument = (docID) => {
    setList(list.filter(({id}) => id !== docID))
    const newStore = {...store }
    delete newStore[docID]
    setStore(newStore)
  }

  return (
    <div className="App">
      {
        currDocID ?
          <Document
            data={store[currDocID]}
            back={() => setCurrDocID(false)} /> :
          <Documents
            data={list}
            addDocument={addDocument}
            removeDocument={removeDocument}
            onSelect={(id) => {setCurrDocID(id)}}/>
      }
    </div>
  );
}

export default App;
