import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";
import { useAuth } from "../context/AuthContext";

const Loans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axiosInstance.get("/api/loans", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoans(response.data);
      } catch (error) {
        alert("Failed to fetch loans.");
      }
    };

    fetchLoans();

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

    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get("/api/members", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMembers(response.data);
      } catch (error) {
        alert("Failed to fetch members.");
      }
    };

    fetchMembers();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <LoanForm
        loans={loans}
        books={books}
        members={members}
        setLoans={setLoans}
        editingLoan={editingLoan}
        setEditingLoan={setEditingLoan}
      />
      <LoanList
        loans={loans}
        setLoans={setLoans}
        setEditingLoan={setEditingLoan}
      />
    </div>
  );
};

export default Loans;
