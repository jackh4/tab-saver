import useSelectedTabs from '../../hooks/useSelectedTabs';
import { TabFolder } from '../../types';
import TabFolderItem from './tabFolderItem';

type TabFoldersProps = {
  tabFolders: TabFolder[];
  setTabFolders: (tabfolders: TabFolder[]) => void;
}

const TabFolders = ({ 
  tabFolders,
  setTabFolders,
}: TabFoldersProps) => {  
  const { selectedIds, toggleSelect, selectAll, clearSelection } = useSelectedTabs();

  const deleteSelectedTabs = () => {
    const updatedFolders: TabFolder[] = tabFolders.map((folder) => {
      const filteredTabs = folder.tabs.filter(tab => !selectedIds.includes(tab.id!));
      return { ...folder, tabs: filteredTabs };
    });

    chrome.storage.local.set({ tabFolders: updatedFolders }, () => {
      setTabFolders(updatedFolders);
      clearSelection();
    });
  };

  return (
    <div>
      <h2>Saved Tab Folders</h2>
      <button onClick={deleteSelectedTabs}>
        Delete
      </button>

      {tabFolders.length === 0 ? (
        <p>No tab folders found.</p>
      ) : (
        tabFolders.map((folder) => (
          <div key={folder.id}>
            <h3>{folder.name}</h3>
            <p>{new Date(folder.date).toLocaleString()}</p>
            <TabFolderItem 
              key={folder.id} 
              folder={folder} 
              selectedIds={selectedIds}
              toggleSelect={toggleSelect}
              selectAll={selectAll}
              clearSelection={clearSelection}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TabFolders;
