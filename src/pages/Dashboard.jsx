import { ItemsList } from "../components/ItemsList";
import { Navbar } from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://todolistapi-1oi8.onrender.com/api/notes";
const AUTH_API_URL = "https://todolistapi-1oi8.onrender.com/api/auth";

export const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ text: "", isEditing: false });
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const authContext = useContext(AuthContext);

  const token = authContext.getAuthToken();
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const d = data.map((da) => ({
        id: da._id,
        text: da.title,
        isEditing: false,
      }));
      setItems(d);
      setLoading(false);
    };

    const fetchUserData = async () => {
      const response = await fetch(`${AUTH_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserData({ name: data.name, email: data.email });
    };
    fetchNotes();
    fetchUserData();
  }, []);

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

  const addItemToDB = async (data) => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };

  const removeFromDB = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const editToDB = async (id, item) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
  };

  const addToListHandler = () => {
    const newItems = [...items, newItem];
    addItemToDB({ title: newItem.text, content: newItem.text });
    setNewItem({ text: "" });
    setItems(newItems);
  };

  const deleteItemHandler = (item) => {
    const newItems = items.filter((it) => it.id !== item.id);
    removeFromDB(item.id);
    setItems(newItems);
  };

  const setIsEditing = (item) => {
    const newList = items.map((it) =>
      it.id === item.id ? { ...it, isEditing: true } : it,
    );
    setItems(newList);
  };

  const editItemHandler = async (item, newText) => {
    const newItem = { id: item.id, isEditing: false, text: newText };
    const updatedList = items.map((eachItem) => {
      if (eachItem.id === item.id) {
        return newItem;
      }
      return eachItem;
    });
    await editToDB(item.id, { title: newText, content: newText });
    setItems(updatedList);
  };

  const isDisabled = hasError || !newItem.text;

  return (
    <div>
      <Navbar />
      <div className="text-xl mt-4">Hi {userData.name}!</div>
      <div className="flex flex-col mt-3">
        <p className="text-xl font-bold text-black">
          You can manage your todos here
        </p>
        {loading && (
          <div className="flex flex-col gap-3">
            <ClipLoader className="m-auto mt-10 w-50 h-50" />
            <span>Loading...</span>
          </div>
        )}
        {!loading && (
          <ItemsList
            items={items}
            deleteItemHandler={deleteItemHandler}
            editItemHandler={editItemHandler}
            setIsEditing={setIsEditing}
          />
        )}
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
              ? "bg-indigo-200"
              : "bg-indigo-500 hover:cursor-pointer hover:bg-indigo-400"
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
