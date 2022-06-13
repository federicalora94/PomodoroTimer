import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";
import "../slider.css";
import ConfirmButton from "./ConfrimButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div className="settingsContainer">
      {/* -------------------- work */}
      <label>Work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className="slider"
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />

      {/* -------------------- break */}

      <label>Break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className="slider"
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />

      {/* -------------------- Long break */}

      {/* <label>Long Break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className="slider"
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.longBreakMinutes}
        onChange={(newValue) => settingsInfo.setLongBreakMinutes(newValue)}
        min={1}
        max={120}
      /> */}

      {/* ---------confirm or go back----- */}

      <ConfirmButton onClick={() => settingsInfo.setShowSettings(false)} />
    </div>
  );
}

export default Settings;
