import { useState } from 'react';
import './styles/TabFolderDetails.css';
import { windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import DropZone from '../../common/DropZone';

type TabFolderDetailsProps = {
  tabWindowData: windowTabData;
}

const TabFolderDetails = ({
  tabWindowData,
}: TabFolderDetailsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  const { title, tabs } = tabWindowData;

  const canDrop = (item: DragItem) => {
    return !!item && item.type === 'tab';
  };

  const onDrop = (item: DragItem) => {
    if (item && item.type === 'tab') {
      console.log(`Dropped tab "${item.title}" (ID: ${item.tabId}) into window "${tabWindowData.windowId}"`);
    }
  };

  return (
    <DropZone onDrop={onDrop} canDrop={canDrop}>
      <div className='tab-folder-details-container'>
        <div className='tab-folder-details-header'>
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
            className='tab-folder-window-dropdown-icon'
          >
            <span className='material-symbols-outlined'>
              {isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
            </span>
          </div>

          <div className='tab-folder-window-title'>Window: {title}</div>
        </div>

        {!isCollapsed && (
          <ul className='tab-window-list'>
            {tabs.map(({ tabId, favIcon, title }) => (
              <li 
                key={tabId}
                className='tab-window-list-item'>
                <img className='tab-window-list-item-icon' src={favIcon} alt='' />
                <div className='tab-window-list-item-title'>{title}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DropZone>
  );
};

export default TabFolderDetails;
