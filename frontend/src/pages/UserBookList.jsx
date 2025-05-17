import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import NotificationDisplay from "../components/NotificationDisplay";

const UserBooklist = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/api/books", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBooks(response.data);
      } catch (error) {
        alert("Failed to fetch books.");
      }
    };

    fetchBooks();
  }, [user]);

  const [notifications, setNotifications] = useState(null);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsError, setNotificationsError] = useState(null);

  //Fetch and toggle logDisplay
  const handleToggleNotificationDisplay = async () => {
    if (showNotifications) {
      setShowNotifications(false);
      return;
    }
    setShowNotifications(true);
    setLoadingNotifications(true);
    setNotificationsError(null);

    try {
      const response = await axiosInstance.get("/api/notifications", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch book notifications:", error);
      setNotificationsError(
        error.response?.data?.message || "Could not load book notifications."
      );
      setNotifications(null);
    } finally {
      setLoadingNotifications(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {"All Books Available For Loan"}
      </h1>
      <div className="container mx-auto p-6">
        <button
          onClick={handleToggleNotificationDisplay}
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loadingNotifications}
        >
          {loadingNotifications
            ? "Loading Book Notifications..."
            : showNotifications
            ? "Hide recent changes to books in the library."
            : "Check recent changes to books in the library."}
        </button>

        {showNotifications && (
          <NotificationDisplay
            notifications={notifications}
            isLoading={loadingNotifications}
            error={notificationsError}
          />
        )}
      </div>

      {books.map((book) => (
        <div key={book._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.genre}</p>
          <p>{book.isbn}</p>
          <p className="text-sm text-gray-500">
            Date of Publication:{" "}
            {new Date(book.dateOfPublication).toLocaleDateString()}
          </p>
          <p className="font-bold">Copies: {book.copies}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBooklist;
