import './App.css';
import {BrowserRouter as Router ,Routes,Route,Navigate} from "react-router-dom";

import React from 'react'
import TextEditor from './components/TextEditor';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/document/:id' exact element={<TextEditor/>} />
        <Route path='/' element={<Navigate to={`/document/${uuidv4()}`} replace/>} >
          
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
