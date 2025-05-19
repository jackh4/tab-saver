import { tabFolderData } from '../../../types';

type TabFolderProps = {
  tabFolder: tabFolderData;
}

const TabFolder = ({
  tabFolder,
}: TabFolderProps) => {

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

  return (
    <div>
      {tabFolder.title}
      <p>Created on {tabFolder.date}</p>
      {tabFolder.windows.map((window) => (
        <div key={window.windowId}>
          <strong>{window.title}</strong>
          <ul>
            {window.tabs.map((tab) => (
              <li key={tab.tabId}>
                <a href={tab.url} target='_blank' rel='noopener noreferrer'>{tab.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TabFolder;
