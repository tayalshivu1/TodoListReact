import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-2 bg-indigo-500 text-white">
      <div>Home</div>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </div>
    </nav>
  );
};
