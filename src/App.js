/**
 * @component App
 * @description Main application component that handles routing and layout
 * 
 * @state {number} progress - Controls the progress bar state (0-100)
 * @constant {string} apiKey - News API key from environment variables
 * 
 * @returns {JSX.Element} Root application component with router and news sections
 */
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Router>
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Navbar title="News App" aboutText="About" />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" country="us" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" country="us" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" country="us" category="health" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" country="in" category="sports" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" country="us" category="science" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;