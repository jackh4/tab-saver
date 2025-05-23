import { useState } from 'react';

export default function useSelectedTabs() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (tabId: number) => {
    setSelectedIds((prev) =>
      prev.includes(tabId) ? prev.filter(id => id !== tabId) : [...prev, tabId]
    );
  };

  const selectAll = (tabIds: number[]) => setSelectedIds(tabIds);

  const clearSelection = () => setSelectedIds([]);

  return { selectedIds, toggleSelect, selectAll, clearSelection };
}

// import { useState } from 'react'

// export default function useSelection<T>() {
//     const [selectedItems, setSelectedItems] = useState<T[]>([]);

//     const toggleSelect = (item: T) => {
//       setSelectedItems((prev) =>
//         prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
//       );
//     };

//     const selectAll = (items: T[]) => setSelectedItems(items);

//     const clearSelection = () => setSelectedItems([])

//   return { selectedItems, toggleSelect, selectAll, clearSelection }
// }
