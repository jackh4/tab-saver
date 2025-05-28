import { ChangeEvent } from 'react';
import './styles/SettingsModal.css';
import { useSettingsContext, useSettingsDispatch } from '../../../contexts/SettingsContext';
import Icon from '../../common/Icon';

type SettingsModalProps = {
  setShowSettings: (showSettings: boolean) => void;
};

const SettingsModal = ({
  setShowSettings,
}: SettingsModalProps) => {
  const settings = useSettingsContext();
  const updateSettings = useSettingsDispatch();

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ theme: e.target.value as 'light' | 'dark' });
  };

  const handleLazyLoadChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ lazyLoad: e.target.checked });
  }; 

  return (
    <div className='settings-modal-container'>
      <div className='settings-modal-content'>
        <div className='settings-modal-header'>
          <div className='settings-modal-title'>
            Settings
          </div>
          <Icon
            materialIconName='close'
            tooltipText='Close settings'
            onClick={() => setShowSettings(false)}
          />
        </div>
        <div className='settings-modal-body'>
          <div className='settings-option'>
            <label htmlFor='theme-select'>Theme:</label>
            <select
              id='theme-select'
              value={settings.theme}
              onChange={handleThemeChange}
            >
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
            </select>
          </div>

          <div className='settings-option'>
            <label htmlFor='lazy-load-checkbox'>
              <input
                id='lazy-load-checkbox'
                type='checkbox'
                checked={settings.lazyLoad}
                onChange={handleLazyLoadChange}
              />
              Enable Lazy Load
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
