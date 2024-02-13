import React, { createContext, useState } from 'react';

// Create the SettingsContext
export const SettingsContext = createContext();

// Create the SettingsProvider component
export const SettingsProvider = ({ children }) => {
  // Define the state variables for settings
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  // Define the functions to update the settings
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Create the settings object to be passed to consumers
  const settings = {
    theme,
    language,
    updateTheme,
    updateLanguage,
  };

  // Render the provider with the settings object
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
