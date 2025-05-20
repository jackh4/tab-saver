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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { title, tabs } = tabWindowData;
  const tabIds = tabs.map(tab => tab.tabId);
  const isWindowSelected = tabIds.every(id => selectedTabIds.includes(id)) && tabIds.length > 0;

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  const onWindowToggle = () => toggleWindow(tabIds);

  const isTabSelected = (tabId: string) => selectedTabIds.includes(tabId);

  return (
    <div className='tab-window-container'>
      <div
        className={`tab-window-header ${isWindowSelected ? 'tab-window-header--selected' : ''}`}
        onClick={onWindowToggle}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleCollapse();
          }}
          className='tab-window-dropdown-icon'
        >
          <span className='material-symbols-outlined'>
            {isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
          </span>
        </div>

        <div className='tab-window-title'>Window: {title}</div>
      </div>

      {!isCollapsed && (
        <ul className='tab-window-list'>
          {tabs.map(({ tabId, favIcon, title }) => (
            <li 
              key={tabId}
              className={`
                tab-window-list-item 
                ${isTabSelected(tabId) ? 'tab-window-list-item--selected' : ''}
              `}
              onClick={() => toggleTab(tabId, isTabSelected(tabId))}
            >
              <img className='tab-window-list-item-icon' src={favIcon} alt='' />
              <div className='tab-window-list-item-title'>{title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TabWindow;
