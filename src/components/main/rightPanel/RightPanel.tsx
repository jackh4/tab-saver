import './styles/RightPanel.css';
import RightHeader from './RightHeader';
import TabFolderList from './TabFolderList';
import { useTabFolderContext } from '../../../contexts/TabFolderContext';
import { useMemo, useState } from 'react';
import { tabFolderData, windowTabData } from '../../../types';

const RightPanel = () => {
  const tabFolders = useTabFolderContext();
  const [searchText, setSearchText] = useState('');

  const filterTabFolders = useMemo(() => {
    console.log(tabFolders);

    if (!searchText.trim()) {
      return tabFolders;
    }

    const lowerSearch = searchText.toLowerCase();

    return tabFolders.reduce((filterFolders: tabFolderData[], folder) => {
      if (folder.title.toLowerCase().includes(lowerSearch)) {
        filterFolders.push(folder);
      } else {
        const matchedWindows = folder.windows.reduce(
          (filterWindows: windowTabData[], window) => {
            if (window.title.toLowerCase().includes(lowerSearch)) {
              filterWindows.push(window);
            } else {
              const filterTabs = window.tabs.filter((tab) => {
                console.log(tab.url);
                return (
                  tab.title.toLowerCase().includes(lowerSearch) ||
                  (tab.url && tab.url.toLowerCase().includes(lowerSearch))
                );
              });

              if (filterTabs.length) {
                filterWindows.push({
                  ...window,
                  tabs: filterTabs,
                  title: filterTabs[0].title,
                });
              }
            }

            return filterWindows;
          }, []);

        if (matchedWindows.length) {
          filterFolders.push({
            ...folder,
            windows: matchedWindows,
          });
        }
      }

      return filterFolders;
    }, []);
  }, [tabFolders, searchText]);

  return (
    <div className='right-panel'>
      <RightHeader 
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <TabFolderList 
        tabFolders={filterTabFolders}
      />
    </div>
  );
};

export default RightPanel;
