import { useState } from 'react';

type UseCollapseProps = {
  initialState: boolean,
}

const useCollapse = ({
  initialState,
}: UseCollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState(initialState);

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  return { isCollapsed, toggleCollapse };
};

export default useCollapse;
