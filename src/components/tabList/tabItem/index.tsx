import { TabData } from '../../../types';
import './index.css';

type TabItemProps = {
  tab: TabData;
  selected: boolean;
  toggleSelect: (tabId: number) => void;
};

const TabItem = ({ tab, selected, toggleSelect }: TabItemProps) => {
  return (
    <li
      onClick={() => toggleSelect(tab.id!)}
      className={`tab-item ${selected ? 'tab-item--selected' : ''}`}
    >
      <input
        type='checkbox'
        checked={selected}
        onChange={() => toggleSelect(tab.id!)}
        className='tab-item-checkbox'
      />
      {tab.favIconUrl && (
        <img
          src={tab.favIconUrl}
          alt='favicon'
          width={16}
          height={16}
          className='tab-item-icon'
        />
      )}
      <span className='tab-item-title' title={tab.title ?? ''}>
        {tab.title}
      </span>
    </li>
  );
};

export default TabItem;
