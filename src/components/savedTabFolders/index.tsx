import { useEffect, useState } from "react";
import { TabFolder } from "../../types";

const SavedTabFolders = () => {
  const [tabFolders, setTabFolders] = useState<TabFolder[]>([]);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get(["tabFolders"], (result) => {
        const folders = Array.isArray(result.tabFolders) ? result.tabFolders : [];
        setTabFolders(folders);
      });
    } else {
      console.log(chrome)
      console.warn("chrome.storage.local is not available");
    }
  }, []);
  
  return (
    <div>
      <h2>Saved Tab Folders</h2>

      {tabFolders.length === 0 ? (
        <p>No tab folders found.</p>
      ) : (
        tabFolders.map((folder) => (
          <div key={folder.id}>
            <h3>{folder.name}</h3>
            <p>{new Date(folder.date).toLocaleString()}</p>
            <ul>
              {folder.tabs.map((tab, index) => (
                <li key={index}>
                  {tab.icon && (
                    <img src={tab.icon} alt="icon" />
                  )}
                  <a href={tab.url} target="_blank" rel="noreferrer">
                    {tab.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedTabFolders;