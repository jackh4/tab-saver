import { useState } from 'react';
import './styles/TabFolderDetails.css';
import { windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
// import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import DropZone from '../../common/DropZone';

type TabFolderDetailsProps = {
  tabFolderId: string;
  tabWindowData: windowTabData;
}

const TabFolderDetails = ({
  // tabFolderId,
  tabWindowData,
}: TabFolderDetailsProps) => {
  const {  title, tabs } = tabWindowData;
  // const dispatch = useTabFolderDispatch();

  // const [newTitle, setNewTitle] = useState(tabWindowData.title);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  /*
  OPEN LOGIC:
  - Open window
  - Open tab

  FROM THIS COMPONENT STATE LOGIC:
  Edit
  - Edit window title
  Delete
  - Delete window
  - Delete tab
  Add
  - Add tab to window
  */

  // const handleEditWindowTitle = () => {
  //   dispatch({ 
  //     type: 'UPDATE_WINDOW_TITLE', 
  //     payload: { folderId: tabFolderId, windowId: windowId, newTitle: newTitle } 
  //   });
  // };

  // const handleDeleteWindow = () => {
  //   dispatch({
  //     type: 'DELETE_WINDOW',
  //     payload: { folderId: tabFolderId, windowId: windowId }
  //   });
  // };

  // const handleDeleteTab = (tabId: string) => {
  //   dispatch({
  //     type: 'DELETE_TAB_FROM_WINDOW',
  //     payload: { folderId: tabFolderId, windowId: windowId, tabId: tabId }
  //   });
  // }

  // const handleAddTab = (tab: tabData) => {
  //   dispatch({
  //     type: 'ADD_TAB_TO_WINDOW',
  //     payload: { folderId: tabFolderId, windowId: windowId, tab: tab }
  //   });
  // }

  // const handleTabClick = () => {

  // }

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
