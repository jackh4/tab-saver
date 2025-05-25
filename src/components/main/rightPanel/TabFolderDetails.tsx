import { useState } from 'react';
import './styles/TabFolderDetails.css';
import { tabData, windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import DropZone from '../../common/DropZone';
import Icon from '../../common/Icon';

type TabFolderDetailsProps = {
  tabFolderId: string;
  tabWindowData: windowTabData;
}

const TabFolderDetails = ({
  tabFolderId,
  tabWindowData,
}: TabFolderDetailsProps) => {
  const { windowId, title, tabs } = tabWindowData;
  const dispatch = useTabFolderDispatch();

  // const [newTitle, setNewTitle] = useState(tabWindowData.title);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  // const handleEditWindowTitle = () => {
  //   dispatch({ 
  //     type: 'UPDATE_WINDOW_TITLE', 
  //     payload: { folderId: tabFolderId, windowId: windowId, newTitle: newTitle } 
  //   });
  // };

  const handleDeleteWindow = () => {
    dispatch({
      type: 'DELETE_WINDOW',
      payload: { folderId: tabFolderId, windowId: windowId }
    });
  };

  const handleDeleteTab = (tabId: string) => {
    dispatch({
      type: 'DELETE_TAB_FROM_WINDOW',
      payload: { folderId: tabFolderId, windowId: windowId, tabId: tabId }
    });
  };

  const handleAddTab = (tab: tabData) => {
    dispatch({
      type: 'ADD_TAB_TO_WINDOW',
      payload: { folderId: tabFolderId, windowId: windowId, tab: tab }
    });
  };

  const canDrop = (item: DragItem) => {
    return !!item && item.type === 'tab';
  };

  const onDrop = (item: DragItem) => {
    if (item && item.type === 'tab') {
      console.log(`Dropped tab "${item.title}" (ID: ${item.tabId}) into window "${tabWindowData.windowId}"`);
      handleAddTab(item);
    }
  };

  const handleTabClick = (url: string) => {
    try {
      chrome.tabs.create({ url: url }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Chrome API error opening ${url}: `, chrome.runtime.lastError.message);
        }
      });
    } catch (err) {
      console.error(`Exception while opening ${url}: `, err);
    }
  };

  const handleWindowClick = (tabs: tabData[]) => {
    const urls = tabs.map(tab => tab.url);

    try {
      chrome.windows.create({ url: urls }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Chrome API error opening ${urls}: `, chrome.runtime.lastError.message);
        }
      });
    } catch (err) {
      console.error(`Exception while opening ${urls}: `, err);
    }
  };

  return (
    <DropZone onDrop={onDrop} canDrop={canDrop}>
      <div className='tab-folder-details-container'>
        <div 
          onClick={() => handleWindowClick(tabWindowData.tabs)}
          className='tab-folder-details-header'
        >
          <Icon
            materialIconName={isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
            tooltipText={isCollapsed ? 'Expand' : 'Collapse'}
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
          />
          <div className='tab-folder-window-title'>Window: {title}</div>

          {/* ADD EDIT WINDOW TITLE ICON */}
          
          <div className='delete-window-button'>
            <Icon
              materialIconName='close'
              tooltipText='Delete tab'
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteWindow();
              }}
              varHoverColor='--delete-icon-hover-color'
            />
          </div>
        </div>

        {!isCollapsed && (
          <ul className='tab-window-list'>
            {tabs.map(({ tabId, favIcon, title, url }, index) => (
              <li 
                key={index} 
                onClick={() => handleTabClick(url)}
                className='tab-window-list-item'
              >
                <img className='tab-window-list-item-icon' src={favIcon} alt=''/>
                <div className='tab-window-list-item-title'>{title}</div>
                <div className='delete-tab-button'>
                  <Icon
                    materialIconName='close'
                    tooltipText='Delete tab'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTab(tabId);
                    }}
                    varHoverColor='--delete-icon-hover-color'
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DropZone>
  );
};

export default TabFolderDetails;
