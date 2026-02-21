import { createContext } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const setIsEditing = (items, id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isEditing: true } : item
    );

    return updatedItems;
  };

  return (
    <ItemsContext.Provider value={{ setIsEditing }}>
      {children}
    </ItemsContext.Provider>
  );
};
