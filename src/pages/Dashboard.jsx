import { ItemsList } from '../components/ItemsList';
import { Navbar } from '../components/Navbar';
import { useState } from 'react';

export const Dashboard = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'First item', isEditing: false },
    { id: 2, text: 'second item', isEditing: false },
  ]);
  const [newItem, setNewItem] = useState({ text: '', isEditing: false });
  const [hasError, setHasError] = useState(false);

  const newItemHandler = (e) => {
    const value = e.target.value;
    const id = items.length + 1;
    if (!value.length) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    setNewItem((prev) => ({ ...prev, text: value, id }));
  };

  const addToListHandler = () => {
    const newItems = [...items, newItem];
    setNewItem({ text: '' });
    setItems(newItems);
  };

  const deleteItemHandler = (item) => {
    const newItems = items.filter((it) => it.id !== item.id);
    setItems(newItems);
  };

  const setIsEditing = (item) => {
    const newList = items.map((it) =>
      it.id === item.id ? { ...it, isEditing: true } : it
    );
    setItems(newList);
  };

  const editItemHandler = (item, newText) => {
    const newItem = { id: item.id, isEditing: false, text: newText };
    const updatedList = items.map((eachItem) => {
      if (eachItem.id === item.id) {
        return newItem;
      }
      return eachItem;
    });
    setItems(updatedList);
  };

  const isDisabled = hasError || !newItem.text;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-3">
        <p className="text-xl font-bold text-black">Todo List</p>
        <ItemsList
          items={items}
          deleteItemHandler={deleteItemHandler}
          editItemHandler={editItemHandler}
          setIsEditing={setIsEditing}
        />
      </div>

      <div className="mt-5 flex flex-row gap-3 justify-center m-2">
        <div className="flex flex-col items-start">
          <input
            type="text"
            className="border-1 p-2"
            value={newItem.text}
            onChange={newItemHandler}
          />
          {hasError && <p className="text-red-700">Please enter something</p>}
        </div>
        <button
          className={`${
            isDisabled
              ? 'bg-indigo-200'
              : 'bg-indigo-500 hover:cursor-pointer hover:bg-indigo-400'
          } p-2 w-15 h-10 rounded text-white`}
          onClick={addToListHandler}
          disabled={isDisabled}
        >
          Add
        </button>
      </div>
    </div>
  );
};
