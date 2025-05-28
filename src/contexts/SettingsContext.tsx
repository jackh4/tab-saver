import { createContext, useContext, useEffect, useState } from 'react';

export type UserSettings = {
  theme: 'light' | 'dark';
  lazyLoad: boolean;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  lazyLoad: false,
};

const SettingsContext = createContext<UserSettings>(defaultSettings);
const SettingsDispatchContext = createContext<((newSettings: Partial<UserSettings>) => void) | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    chrome.storage.local.get(['userSettings'], (result) => {
      if (chrome.runtime.lastError) {
        console.warn('Error fetching user settings:', chrome.runtime.lastError.message);
      }
      setSettings(result.userSettings ? result.userSettings : defaultSettings);
    });
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    chrome.storage.local.set({ userSettings: updated }, () => {
      if (chrome.runtime.lastError) {
        console.warn('Error updating user settings:', chrome.runtime.lastError.message);
      }
    });
  };

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={updateSettings}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};

export const useSettingsDispatch = () => {
  const context = useContext(SettingsDispatchContext);
  if (!context) {
    throw new Error('useSettingsDispatch must be used within a SettingsProvider');
  }
  return context;
};
