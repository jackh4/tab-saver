import './styles/TabFolderList.css';
import { tabFolderData } from '../../../types';
import TabFolder from './TabFolder';

type TabFolderListProps = {
  tabFolders: tabFolderData[];
}

const TabFolderList = ({ 
  tabFolders,
}: TabFolderListProps) => {
  return (
    <div className='tab-folder-list-container'>
      {tabFolders.length === 0 ? (
        <div className='tab-folder-list-empty'>
          Empty
        </div>
      ) : (
        tabFolders.map((tabFolder) => (
          <TabFolder
            key={tabFolder.tabFolderId}
            tabFolder={tabFolder}
          />
        ))
      )}
    </div>
  );
};

export default TabFolderList;
