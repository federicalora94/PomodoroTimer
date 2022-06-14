import React from 'react';
import './App.css';
import { useState } from "react";
import SettingsContext from './context/SettingsContext';
import Settings from './components/Settings';
import Timer from './components/Timer';


function App() {

  // --------- State variables ---------
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  return (
    <main>
      {/*----- using context -----*/}
      <SettingsContext.Provider value={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        showSettings,
        setShowSettings,
        longBreakMinutes,
        setLongBreakMinutes
      }} >

        {/* Settings & Timer components */}
        {/* if showSettings is true show the Settings, otherwise, show Timer */}
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
