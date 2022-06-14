import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "../context/SettingsContext";
import ConfirmButton from "./ConfrimButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <>
      <div className="settingsContainer">
        {/* -------------------- work ---------------------------*/}
        <label>Work time: {settingsInfo.workMinutes}:00</label>
        <ReactSlider
          className="slider"
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.workMinutes}
          onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
          min={1}
          max={120}
        />

        {/* -------------------- break ---------------------------*/}

        <label>Break time: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider
          className="slider sliderBreak"
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.breakMinutes}
          onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
          min={1}
          max={120}
        />

        {/* -------------------- confirm button ---------------------------*/}
        <div className="confirmButtonDiv">
        <ConfirmButton onClick={() => settingsInfo.setShowSettings(false)} />
        </div>
      </div>

    </>
  );
}

export default Settings;
