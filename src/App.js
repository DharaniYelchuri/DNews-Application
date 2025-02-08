import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress,setProgress]=useState(0)

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress= {progress}
          />
          <Routes>
            <Route exact  path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='top' category="top" />} />
            <Route exact  path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' category="business" />} />
            <Route exact  path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' category="entertainment" />} />
            <Route exact path="/education" element={<News setProgress={setProgress}  apiKey={apiKey}key='education' category="education" />} />
            <Route exact  path="/health" element={<News setProgress={setProgress}  apiKey={apiKey}key='health' category="health" />} />
            <Route exact  path="/science" element={<News setProgress={setProgress}  apiKey={apiKey}key='science' category="science" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' category="sports" />} />
            <Route exact  path="/technology" element={<News setProgress={setProgress}  apiKey={apiKey}key='technology' category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;