import './styles/TabFolderDetails.css';
import { tabData, windowTabData } from '../../../types';
import { useSettingsContext } from '../../../contexts/SettingsContext';
import { DragItem } from '../../../contexts/DragContext';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import { useToastContext } from '../../../contexts/ToastContext';
import useCollapse from '../../../hooks/useCollapse';
import useEditTitle from '../../../hooks/useEditTitle';
import { createLazyURL } from '../../../utils/functions';
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
  const settings = useSettingsContext();
  const { addToast } = useToastContext();

  const dispatch = useTabFolderDispatch();

  const { isCollapsed, toggleCollapse } = useCollapse({ initialState: false });
  const { 
    title, 
    isEditing, 
    setIsEditing,
    handleTitleChange, 
    toggleIsEditing 
  } = useEditTitle({
    initialTitle: tabWindowData.title,
    initialEditState: false,
  });

  const handleToastNotif = (
    message: string, 
    success: boolean,
    duration: number = 3000
  ) => {
    if (success) {
      addToast(message, 'success', duration);
    } else {
      addToast(message, 'error', duration);
    }
  };

  const handleEditWindowTitle = (windowTitle: string) => {
    dispatch({ 
      type: 'UPDATE_WINDOW_TITLE', 
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId, newTitle: windowTitle } 
    });
  };

  const handleDeleteWindow = () => {
    dispatch({
      type: 'DELETE_WINDOW',
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId }
    });
  };

  const handleDeleteTab = (tabId: string) => {
    dispatch({
      type: 'DELETE_TAB_FROM_WINDOW',
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId, tabId: tabId }
    });
  };

  const handleAddTab = async (tab: tabData) => {
    const success = await dispatch({
      type: 'ADD_TAB_TO_WINDOW',
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId, tab: tab }
    });
    handleToastNotif('Successfully added tab', success);
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

  const handleBlur = () => {
    setIsEditing(false);
    if (tabWindowData.title !== title) {
      handleEditWindowTitle(title);
    }
  };

  const handleKeyDownOnTitle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleTabClick = (url: string) => {
    chrome.tabs.create({ url: url }, () => {
      if (chrome.runtime.lastError) {
        console.warn(`Chrome API error opening ${url}: `, chrome.runtime.lastError.message);
      }
    });
  };

  const handleWindowClick = (tabs: tabData[]) => {
    const urls = tabs.map(tab => {
      if (settings.lazyLoad) {
        return createLazyURL(tab.title, tab.favIcon, tab.url);
      } else {
        return tab.url;
      }
    });

    chrome.windows.create({ url: urls }, () => {
      if (chrome.runtime.lastError) {
        console.warn(`Chrome API error opening ${urls}: `, chrome.runtime.lastError.message);
      }
    });
  };

  return (
    <DropZone onDrop={onDrop} canDrop={canDrop}>
      <div className='tab-folder-details-container'>
        <div 
          title='Open window'
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

          {!isEditing ? (
            <div className='tab-folder-window-title-container'>
              <div className='tab-folder-window-title'>{title}</div>
              <div className='window-action-buttons'>
                <Icon
                  materialIconName='edit'
                  tooltipText='Rename window'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleIsEditing();
                  }}
                />
                <Icon
                  materialIconName='close'
                  tooltipText='Delete window'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteWindow();
                  }}
                  varHoverColor='--delete-icon-hover-color'
                />
              </div>
            </div>
          ) : (
            <input
              value={title}
              onBlur={handleBlur}
              onChange={handleTitleChange}
              onKeyDown={(e) => handleKeyDownOnTitle(e)}
              autoFocus
              className='tab-folder-window-title-edit'
            />
          )}
        </div>

        {!isCollapsed && (
          <ul className='tab-folder-window-list'>
            {tabWindowData.tabs.map(({ tabId, favIcon, title, url }, index) => (
              <li 
                key={index} 
                title='Open tab'
                onClick={() => handleTabClick(url)}
                className='tab-folder-window-list-item'
              >
                <div className='tab-folder-window-tab-data-container'>
                  <img className='tab-folder-window-list-item-icon' src={favIcon} alt=''/>
                  <div className='tab-folder-window-list-item-title'>{title}</div>
                </div>
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
