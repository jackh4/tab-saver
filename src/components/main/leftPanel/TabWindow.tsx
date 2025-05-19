import { useState } from 'react';
import './styles/TabWindow.css';
import { windowTabData } from '../../../types';

type TabWindowProps = {
  tabWindowData: windowTabData;
  selectedTabIds: string[];
  toggleTab: (tabId: string, isSelected: boolean) => void;
  toggleWindow: (tabIds: string[]) => void;
};

const TabWindow = ({
  tabWindowData,
  selectedTabIds,
  toggleTab,
  toggleWindow
}: TabWindowProps) => {
  const { title, tabs } = tabWindowData;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // const [isHoveredTabIndex, setIsHoveredTabIndex] = useState<number | null>(null);

  const tabIds = tabs.map(tab => tab.tabId);
  const isWindowSelected = tabIds.every(id => selectedTabIds.includes(id)) && tabIds.length > 0;

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  const onWindowToggle = () => toggleWindow(tabIds);

  const isTabSelected = (tabId: string) => selectedTabIds.includes(tabId);

  return (
    <div className='tab-window-container'>
      <div className='tab-window-header'>
        <label className='tab-window-title-wrapper'>
          <input
            type='checkbox'
            checked={isWindowSelected}
            onChange={onWindowToggle}
            className='tab-window-checkbox'
          />
          <div className='tab-window-title'>Window: {title}</div>
        </label>

        <button
          onClick={toggleCollapse}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={isHovered 
            ? 'tab-window-dropdown-icon' 
            : 'tab-window-dropdown-icon tab-window-dropdown-icon--hovered'}
        >
          <span className='material-symbols-outlined'>
            {isCollapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <ul className='tab-window-list'>
          {tabs.map(({ tabId, favIcon, title }) => (
            <li key={tabId}>
              <label className='tab-window-list-item'>
                <input
                  type='checkbox'
                  checked={isTabSelected(tabId)}
                  onChange={e => toggleTab(tabId, e.target.checked)}
                  style={{ marginRight: 8 }}
                />
                <img src={favIcon} alt='' className='tab-window-list-item-icon' />
                <div className='tab-window-list-item-title'>{title}</div>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TabWindow;
