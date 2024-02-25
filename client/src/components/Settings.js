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
    <div className="content-profile-page">
      <div className="profile-user-page card">
        <div className="img-user-profile">
          <img className="profile-bgHome" src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg" alt="background" />
          <img className="avatar" src="https://avatars.githubusercontent.com/u/144029137?v=4" alt="jim" />
        </div>
        <button>Follow</button>
        <div className="user-profile-data">
          <h1>Jim</h1>
          <p>Front-end Developer of agrisoko</p>
        </div>
        <div className="description-profile">Front-end | Mwizi mkora | CSS Warrior | <a href="https://github.com/jimotieno475" title="git"><strong>@jimotieno475</strong></a> | I love to create small things for the internet!</div>
        <ul className="data-user">
          <li><a><strong>3390</strong><span>Posts</span></a></li>
          <li><a><strong>718</strong><span>Followers</span></a></li>
          <li><a><strong>239</strong><span>Following</span></a></li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Settings;
