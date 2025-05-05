type TabItemProps = {
  tab: chrome.tabs.Tab;
  selected: boolean;
  toggleSelect: (tabId: number) => void;
};

const TabItem = ({ tab, selected, toggleSelect }: TabItemProps) => {
  return (
    <li
      onClick={() => toggleSelect(tab.id!)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
        cursor: 'pointer',
        backgroundColor: selected ? '#e0f7fa' : 'transparent',
      }}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => toggleSelect(tab.id!)}
        style={{ marginRight: '10px' }}
      />
      {tab.favIconUrl && (
        <img
          src={tab.favIconUrl}
          alt="favicon"
          width={16}
          height={16}
          style={{ marginRight: '8px' }}
        />
      )}
      <span
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
        }}
        title={tab.title ?? ''}
      >
        {tab.title}
      </span>
    </li>
  );
};

export default TabItem;
