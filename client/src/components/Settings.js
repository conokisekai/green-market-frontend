import React from 'react';
import './settings.css';

function Settings ({toggleDarkMode}) {
  return (
    <div>
        <input
        type="checkbox"
        id="themeSwitch"
        name="theme-switch"
        className="theme-switch__input"
        onChange={toggleDarkMode}
      />
      <label htmlFor="themeSwitch" className="theme-switch__label">
        <span>Switch theme</span>
      </label>

    </div>
  );
}

export default Settings;
