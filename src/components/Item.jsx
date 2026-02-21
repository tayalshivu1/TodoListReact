import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const Item = ({
  item,
  deleteItemHandler,
  editItemHandler,
  setIsEditing,
}) => {
  const [text, setText] = useState(item.text);
  const [hasError, setHasError] = useState(false);

  const deleteHandler = () => {
    deleteItemHandler(item);
  };

  const editHandler = () => {
    editItemHandler(item, text);
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    if (!value.length) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    setText(e.target.value);
  };

  const isEditingHandler = () => {
    setIsEditing(item);
  };

  return (
    <div>
      {!item.isEditing && (
        <div className="flex justify-between p-2 border-b-1 m-2">
          <div>{item.text}</div>
          <div className="flex gap-2">
            <button onClick={isEditingHandler} className="hover:cursor-pointer">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button className="hover:cursor-pointer" onClick={deleteHandler}>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      {item.isEditing && (
        <div className="flex">
          <div className="flex flex-col items-start">
            <input
              className="focus:outline-none border-b-2 p-2 flex m-2 focus"
              type="text"
              value={text}
              onChange={changeHandler}
            />
            {hasError && (
              <p className="text-red-700 pl-2">Please enter something</p>
            )}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              className="border-1 border-indigo-500 p-1 w-15 rounded hover:cursor-pointer hover:bg-indigo-500 hover:text-white"
              onClick={editHandler}
              disabled={hasError}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
