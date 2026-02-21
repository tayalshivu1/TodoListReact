import { Item } from './Item';

export const ItemsList = ({
  items,
  deleteItemHandler,
  editItemHandler,
  setIsEditing,
}) => {
  return (
    <>
      <div>
        {items.length !== 0 && (
          <div className="border-1 m-2 rounded-md p-2">
            {items.map((item) => {
              return (
                <Item
                  key={item.id}
                  item={item}
                  deleteItemHandler={deleteItemHandler}
                  editItemHandler={editItemHandler}
                  setIsEditing={setIsEditing}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-5">
        {items.length === 0 && (
          <p className="text-indigo-500 text-xl font-bold">
            Wohoo! No Todos to work on.
          </p>
        )}
      </div>{' '}
    </>
  );
};
