import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?._id) {
        try {
          const res = await axios.get(`/auth/users/${user._id}/notifications`);
          setNotifications(res.data || []);
        } catch (err) {
          console.error('Failed to load notifications:', err);
        }
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      <Link to="/" className="text-2xl font-bold">Library Management System</Link>
      <div className="flex items-center space-x-4">
        {user && (
          <div className="relative">
            <button className="relative bg-yellow-400 text-black px-3 py-1 rounded">
              Notifications
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            {notifications.length > 0 && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                {notifications.map((note, idx) => (
                  <div key={idx} className="px-4 py-2 border-b text-sm">
                    {note.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {user ? (
          <>
            <Link to="/loans">Loans</Link>
            <Link to="/books">Books</Link>
            <Link to="/members">Members</Link>
            <Link to="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
