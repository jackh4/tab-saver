import { useState, ChangeEvent } from 'react';

type UseEditTitleProps = {
  initialTitle: string,
  initialEditState: boolean,
}

const useEditTitle = ({
  initialTitle,
  initialEditState,
}: UseEditTitleProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(initialEditState);

  // for onChange event
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleIsEditing = () => setIsEditing(prev => !prev);

  return { title, isEditing, setIsEditing, handleTitleChange, toggleIsEditing };
};

export default useEditTitle;
