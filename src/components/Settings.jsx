import React, { useState, useEffect } from 'react';
import { updateAndroidStatusBarColor } from '../utils/themeUtils';
import { getPersonalizedGreeting } from '../utils/randomTitles.js';

function Settings() {
  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({});

  const [themeMode, setThemeMode] = useState('auto');
  const [colorTheme, setColorTheme] = useState('rose');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [tempUserName, setTempUserName] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Effects
  useEffect(() => {
    console.log('Settings component mounting...');
    
    const savedThemeMode = localStorage.getItem('react-theme-mode');
    let initialThemeMode = 'auto';
    
    if (savedThemeMode && ['light', 'dark', 'auto'].includes(savedThemeMode)) {
      initialThemeMode = savedThemeMode;
    } else {
      const savedTheme = localStorage.getItem('react-theme');
      if (savedTheme === 'dark') {
        initialThemeMode = 'dark';
      } else if (savedTheme === 'light') {
        initialThemeMode = 'light';
      }
    }
    
    const savedColorTheme = localStorage.getItem('react-color-theme');
    let initialColorTheme = 'rose';
    
    if (savedColorTheme && ['rose', 'forest'].includes(savedColorTheme)) {
      initialColorTheme = savedColorTheme;
    }
    
    setThemeMode(initialThemeMode);
    setColorTheme(initialColorTheme);
    applyTheme(initialThemeMode, initialColorTheme);
    
    const savedAnimationsEnabled = localStorage.getItem('react-animations-enabled');
    let initialAnimationsEnabled = true;
    
    if (savedAnimationsEnabled !== null) {
      initialAnimationsEnabled = savedAnimationsEnabled === 'true';
    }
    
    setAnimationsEnabled(initialAnimationsEnabled);
    
    if (initialAnimationsEnabled) {
      document.documentElement.removeAttribute('data-reduce-motion');
    } else {
      document.documentElement.setAttribute('data-reduce-motion', 'true');
    }
    
    const savedUserName = localStorage.getItem('react-user-name') || '';
    setUserName(savedUserName);
    setTempUserName(savedUserName);
    
    setIsInitialized(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      if (themeMode === 'auto') {
        applyTheme('auto', colorTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeMode]);

  // Event Handlers
  const applyTheme = (mode, color = colorTheme) => {
    console.log('Applying theme - mode:', mode, 'color:', color);
    let shouldBeDark = false;
    
    if (mode === 'dark') {
      shouldBeDark = true;
    } else if (mode === 'light') {
      shouldBeDark = false;
    } else if (mode === 'auto') {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    if (shouldBeDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    if (color === 'rose') {
      document.documentElement.removeAttribute('data-color-theme');
    } else {
      document.documentElement.setAttribute('data-color-theme', color);
    }
    
    // Update Android status bar color
    setTimeout(updateAndroidStatusBarColor, 50);
    
    console.log('Theme applied - data-theme:', document.documentElement.getAttribute('data-theme'), 'data-color-theme:', document.documentElement.getAttribute('data-color-theme'));
  };

  const handleThemeChange = (mode) => {
    console.log('handleThemeChange called:', mode);
    setThemeMode(mode);
    applyTheme(mode, colorTheme);
    
    localStorage.setItem('react-theme-mode', mode);
    
    localStorage.setItem('react-theme', mode === 'auto' ? 'auto' : mode);
  };

  const handleColorThemeChange = (color) => {
    console.log('handleColorThemeChange called:', color);
    setColorTheme(color);
    applyTheme(themeMode, color);
    
    localStorage.setItem('react-color-theme', color);
  };

  const handleAnimationToggle = (enabled) => {
    console.log('handleAnimationToggle called:', enabled);
    setAnimationsEnabled(enabled);
    
    if (enabled) {
      document.documentElement.removeAttribute('data-reduce-motion');
    } else {
      document.documentElement.setAttribute('data-reduce-motion', 'true');
    }
    
    localStorage.setItem('react-animations-enabled', enabled.toString());
  };

  const handleNameChange = () => {
    const newName = tempUserName.trim();
    setUserName(newName);
    localStorage.setItem('react-user-name', newName);
  };

  const handleNameReset = () => {
    setTempUserName(userName);
  };

  // Render
  if (isLoading) {
    return (
      <div className="settings-container">
        <div className="settings-loading">
          <div className="spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-cards-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">
              <i className="fas fa-palette"></i>
              Theme & Appearance
            </h3>
            <p className="settings-card-description">Customize how your app looks and feels</p>
          </div>
          <div className="settings-card-content">
            <div className="setting-group">
              <h4 className="setting-group-title">
                <i className="fas fa-adjust"></i>
                Brightness
              </h4>
              <div className="theme-mode-selector">
                <label className="theme-mode-option">
                  <input
                    type="radio"
                    name="themeMode"
                    value="light"
                    checked={themeMode === 'light'}
                    onChange={(e) => handleThemeChange('light')}
                  />
                  <div className="theme-mode-card">
                    <i className="fas fa-sun"></i>
                    <span>Light</span>
                  </div>
                </label>

                <label className="theme-mode-option">
                  <input
                    type="radio"
                    name="themeMode"
                    value="dark"
                    checked={themeMode === 'dark'}
                    onChange={(e) => handleThemeChange('dark')}
                  />
                  <div className="theme-mode-card">
                    <i className="fas fa-moon"></i>
                    <span>Dark</span>
                  </div>
                </label>

                <label className="theme-mode-option">
                  <input
                    type="radio"
                    name="themeMode"
                    value="auto"
                    checked={themeMode === 'auto'}
                    onChange={(e) => handleThemeChange('auto')}
                  />
                  <div className="theme-mode-card">
                    <i className="fas fa-magic"></i>
                    <span>Auto</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="setting-group">
              <h4 className="setting-group-title">
                <i className="fas fa-palette"></i>
                Color Theme
              </h4>
              <div className="theme-mode-selector">
                <label className="theme-mode-option">
                  <input
                    type="radio"
                    name="colorTheme"
                    value="rose"
                    checked={colorTheme === 'rose'}
                    onChange={(e) => handleColorThemeChange('rose')}
                  />
                  <div className="theme-mode-card">
                    <div className="color-preview" style={{backgroundColor: '#FF9494'}}></div>
                    <span>Rose</span>
                  </div>
                </label>

                <label className="theme-mode-option">
                  <input
                    type="radio"
                    name="colorTheme"
                    value="forest"
                    checked={colorTheme === 'forest'}
                    onChange={(e) => handleColorThemeChange('forest')}
                  />
                  <div className="theme-mode-card">
                    <div className="color-preview" style={{backgroundColor: '#BDD2B6'}}></div>
                    <span>Forest</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="setting-group">
              <h4 className="setting-group-title">
                <i className="fas fa-play-circle"></i>
                Animations
              </h4>
              <label className="settings-toggle-option">
                <input
                  type="checkbox"
                  checked={animationsEnabled}
                  onChange={(e) => handleAnimationToggle(e.target.checked)}
                />
                <div className="toggle-slider"></div>
                <div className="toggle-content">
                  <div className="toggle-title">Enable animations</div>
                  <div className="toggle-description">Show wavy line animations and transitions</div>
                </div>
              </label>
            </div>
          </div>
        </div>





        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">
              <i className="fas fa-user"></i>
              Personal Settings
            </h3>
            <p className="settings-card-description">Personalize your experience</p>
          </div>
          <div className="settings-card-content">
            <div className="name-section">
              <div className="name-section-header">
                <div className="name-section-title">Your Name</div>
                <div className="name-section-description">Personalize your greetings in multiple languages</div>
              </div>
              <div className="name-input-container">
                <input
                  type="text"
                  value={tempUserName}
                  onChange={(e) => setTempUserName(e.target.value)}
                  placeholder="Enter your name..."
                  className="name-input-field"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNameChange();
                    } else if (e.key === 'Escape') {
                      handleNameReset();
                    }
                  }}
                />
                <div className="name-action-buttons">
                  <button 
                    className="name-save-btn"
                    onClick={handleNameChange}
                    disabled={tempUserName.trim() === userName}
                    title="Save name"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button 
                    className="name-reset-btn"
                    onClick={handleNameReset}
                    disabled={tempUserName === userName}
                    title="Reset to current name"
                  >
                    <i className="fas fa-undo"></i>
                  </button>
                </div>
              </div>
              {userName && (
                <div className="greeting-preview">
                  <div className="preview-text">{getPersonalizedGreeting(userName)}</div>
                </div>
              )}
            </div>
          </div>
        </div>




      </div>
    </div>
  );
}

export default Settings; 