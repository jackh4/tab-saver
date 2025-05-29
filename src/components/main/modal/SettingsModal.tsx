import { ChangeEvent } from 'react';
import './styles/SettingsModal.css';
import { Themes, useSettingsContext, useSettingsDispatch } from '../../../contexts/SettingsContext';
import Icon from '../../common/Icon';
import Switch from '../../common/Switch';

type SettingsModalProps = {
  setShowSettings: (showSettings: boolean) => void;
};

const SettingsModal = ({
  setShowSettings,
}: SettingsModalProps) => {
  const settings = useSettingsContext();
  const updateSettings = useSettingsDispatch();

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ theme: e.target.value as Themes });
  };

  const handleLazyLoadToggle = (checked: boolean) => {
    updateSettings({ lazyLoad: checked });
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
          <div className='settings-option-container'>
            <label className='settings-label'>Theme</label>
            <select
              id='theme-select'
              value={settings.theme}
              onChange={handleThemeChange}
              className='settings-select'
            >
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
              <option value='warm'>Warm</option>
              <option value='cool'>Cool</option>
            </select>
          </div>

          <div className='settings-option-container'>
            <div className='settings-label'>Lazy Load Tabs</div>
            <Switch 
              checked={settings.lazyLoad}
              onChange={handleLazyLoadToggle}
              round={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
