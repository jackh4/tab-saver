import './index.css';
import CurrentTabsPanel from '../currentTabsPanel';
import SavedTabsPanel from '../savedTabsPanel';

const Layout = () => (
  <div className='flex-container'>
    <div className='left-tab-list-main'>
      <CurrentTabsPanel/>
    </div>
    <div className='right-tab-folders-main'>
      <SavedTabsPanel/>
    </div>
  </div>
);

export default Layout;
