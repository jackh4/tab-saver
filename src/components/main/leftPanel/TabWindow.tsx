import './styles/TabWindow.css';
import { windowTabData } from '../../../types';
import useCollapse from '../../../hooks/useCollapse';
import DraggableItem from '../../common/DraggableItem';

type TabWindowProps = {
  windowTabData: windowTabData;
  selectedTabIds: string[];
  toggleTab: (tabId: string) => void;
  toggleWindow: (tabIds: string[]) => void;
};

const TabWindow = ({
  windowTabData,
  selectedTabIds,
  toggleTab,
  toggleWindow
}: TabWindowProps) => {
  const { isCollapsed, toggleCollapse } = useCollapse({ initialState: false });

  const tabIds = windowTabData.tabs.map(tab => tab.tabId);
  const isWindowSelected = tabIds.every(id => selectedTabIds.includes(id)) && tabIds.length > 0;

  const onWindowToggle = () => toggleWindow(tabIds);

  const isTabSelected = (tabId: string) => selectedTabIds.includes(tabId);

  return (
    <div className='tab-window-container'>
      <DraggableItem item={windowTabData}>
        <div
          title='Select window'
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

          <div className='tab-window-title'>{windowTabData.title}</div>
        </div>
      </DraggableItem>

      {!isCollapsed && (
        <ul className='tab-window-list'>
          {windowTabData.tabs.map((tab) => (
            <DraggableItem key={tab.tabId} item={tab}>
              <li 
                key={tab.tabId}
                title='Select tab'
                onClick={() => toggleTab(tab.tabId)}
                className={`
                  tab-window-list-item 
                  ${isTabSelected(tab.tabId) ? 'tab-window-list-item--selected' : ''}
                `}
              >
                <img className='tab-window-list-item-icon' src={tab.favIcon} alt='' />
                <div className='tab-window-list-item-title'>{tab.title}</div>
              </li>
            </DraggableItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TabWindow;
