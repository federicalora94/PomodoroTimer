import React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from '../context/SettingsContext';


//----- CircularProgressbar ----- 
//documentation: https://www.npmjs.com/package/react-circular-progressbar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//----- Button components -----
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButtton';



function Timer() {

    const settingsInfo = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work / break / null
    const [secondsLeft, setSecondsLeft] = useState(0);
    var [count, setCount] = useState(0);

    // Why do I use refs? To not have the values re-rendered when they change.
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
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
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
                count = count+1;
                return switchMode() & setCount(count);
            }
            tick();
        }, 100);

    }, [settingsInfo]);

    //--------------- timer mechanism -----------
    
    // PERCENTAGE
    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);
    
    // MINUTES
    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div >
            <div className='modeSets' style={{textAlign:'left'}}>
            <h1>Time to:{mode}</h1>
            <h2> you have done:{count} </h2>

          
            </div>

            {/* ---- Progressbar ---- */}

            <CircularProgressbar
                

                value={percentage}

                text={minutes + ':' + seconds}

                styles={buildStyles({
                    textColor: "lightblue",
                    pathColor: mode === 'work' ? "lightBlue" : 'lightGreen',
                    trailColor: "lightgray"

                })} />

            {/* ---- Pay-Pause button component ---- */}
            <div style={{ marginTop: '20px' }}>
                {isPaused
                    ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false }} />
                    : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true }} />}

            </div>


            {/* ---- Settings button component ---- */}
            <div style={{ marginTop: '20px' }}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>


        </div>
    );
}

export default Timer;
