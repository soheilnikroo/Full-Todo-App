import { createContext, useCallback, useState } from 'react';

export const IsTaskDraggingContext = createContext({
  isDrag: false,
  dragIndex: -1,
  setIsDragTrue: () => {},
  setIsDragFalse: () => {},
  handleDragIndex: (index: number) => {},
});

const IsTaskDraggingProvider: React.FC = ({ children }) => {
  const [isDrag, setIsDrag] = useState(false);
  const [dragIndex, setDragIndex] = useState<number>(-1);

  const setIsDragTrue = useCallback(() => {
    setIsDrag(true);
  }, []);

  const setIsDragFalse = useCallback(() => {
    setIsDrag(false);
  }, []);

  const handleDragIndex = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  return (
    <IsTaskDraggingContext.Provider
      value={{
        dragIndex,
        isDrag,
        setIsDragTrue,
        setIsDragFalse,
        handleDragIndex,
      }}
    >
      {children}
    </IsTaskDraggingContext.Provider>
  );
};

export default IsTaskDraggingProvider;
