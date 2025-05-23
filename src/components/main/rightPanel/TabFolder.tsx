import { useState } from 'react';
import './styles/TabFolder.css';
import { tabFolderData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import TabFolderDetails from './TabFolderDetails';
import DropZone from '../../common/DropZone';

type TabFolderProps = {
  tabFolder: tabFolderData;
}

const TabFolder = ({
  tabFolder,
}: TabFolderProps) => {
  // const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  /*
  Display feature
  - Display metadata
    - Tab folder title
    - Date folder created (or edited)
    - Optional: Display window count and total tab count
  - Display data as folder structure
  - Make tab folder dropdown and window dropdown

  Open tabs feature
  - Open from tab folder (opens all windows in folder)
  - Open from tab window (open window (includes all tabs))
  - Open individual tab 
  Delete feature
  - Delete whole tab folder
  - Delete window (including all tabs within)
  - Delete individual tab
  Edit Feature
  - Edit tab folder title (From TabFolderList)
  - Edit window title
  */

  const canDrop = (item: DragItem) => {
      return !!item && item.type === 'window';
    };
  
  const onDrop = (item: DragItem) => {
    if (item && item.type === 'window') {
      console.log(`Dropped window "${item.title}" (ID: ${item.windowId}) into folder "${tabFolder.tabFolderId}"`);
    }
  };

  const getPrettyDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <DropZone onDrop={onDrop} canDrop={canDrop}>
      <div className='tab-folder-container'>
        <div className='tab-folder-metadata-header'>
          <div 
            className='tab-folder-title'
          >
            {tabFolder.title}
          </div>
          <div className='tab-folder-date'>{getPrettyDate(tabFolder.date)}</div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
            className='tab-folder-dropdown-icon'
          >
            <span className='material-symbols-outlined'>
              {isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
            </span>
          </div>
        </div>

        {/* 
        Display
        - Tab folder title
        - Created at date + time

        Funtionality
        - Dropdown button, 
        - Edit tab folder title button or title clickable
        - Delete tab folder button 
        - Open all windows button
        */}
        {!isCollapsed && tabFolder.windows.map((window) => (
          <TabFolderDetails key={window.windowId} tabWindowData={window}/>
        ))}
      </div>
    </DropZone>
  );
};

export default TabFolder;
