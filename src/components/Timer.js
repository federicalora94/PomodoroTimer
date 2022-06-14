import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "../context/SettingsContext";

//----- Icons -----
import laptop from '../assests/laptop.svg';
import mug from '../assests/mug.svg';

//----- CircularProgressbar -----
//documentation: https://www.npmjs.com/package/react-circular-progressbar
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//----- Button components ------------------
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButtton";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work / break / null
  const [secondsLeft, setSecondsLeft] = useState(0);
  var [count, setCount] = useState(0);

  // Why do I use refs? 
  //To not have the values re-rendered when they change.
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    // function to change modes
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return; //nothing
      }
      if (secondsLeftRef.current === 0) {
        // when timer goes to 0, change mode calling the switchMode function & update count variable
        count = count + 1;
        return switchMode() & setCount(count);
      }
      tick();
      return interval;
    }, 100);
  }, [settingsInfo]);

  //--------------- timer mechanism ----------------

  // PERCENTAGE
  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  // MINUTES
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="timerContainer">

      {/* ---- Settings button component ---- */}
      <header>
        {mode === 'work'
          ? (<h1 id="modeTitleWork">Time to {mode}</h1>)
          : (<h1 id="modeTitleBreak">Take a {mode}</h1>)
        }
        <h2 className="countString">Completed work sessions: {count}</h2>
      </header>

      {/* ---- Progressbar -------------- */}
      <div className="progressBarContainer">
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={1}
          styles={buildStyles({
            pathColor: "white",
            trailColor: " rgba(255, 255, 255, 0.2)",
          })}>

          {/* ---- Icons -------------- */}
          {mode === 'work'
            ? (<img className="clockIcon" src={laptop} />)
            : (<img className="clockIcon" src={mug} />)
          }

          {/* ----- countdown -------------- */}
          <h3>{minutes + ":" + seconds}</h3>

        </CircularProgressbarWithChildren>
      </div>


      {/* ---- Play-Pause button components ---- */}
      <div className="buttonsContainer">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />

        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}

      </div>
    </div>
  );
}

export default Timer;


