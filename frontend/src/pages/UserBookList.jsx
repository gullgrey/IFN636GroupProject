// const Unauthorized = () => {

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
//       <p className="w-full font-bold mb-4 p-2">You do not have permission to view this page.</p>
//     </div>
//   );
// };

// export default Unauthorized;

import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {"All Books Available For Loan"}
      </h1>
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
