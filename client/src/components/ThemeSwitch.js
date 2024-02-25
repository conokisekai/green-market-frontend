import React from 'react';
import './themeswitch.css';

class Page extends React.Component {
  render() {
    return (
      <div className="page">
        {/* Theme switch */}
        <input type="checkbox" id="themeSwitch" name="theme-switch" className="theme-switch__input" />
        <label htmlFor="themeSwitch" className="theme-switch__label">
          <span>Switch theme</span>
        </label>
        <main>
          <div className="wrapper">
          </div>
        </main>
      </div>
    );
  }
}

export default Page;
