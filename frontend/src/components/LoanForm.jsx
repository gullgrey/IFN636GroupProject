import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import FormSelectionFactory from "./FormSelectionFactory";

const LoanForm = ({
  loans,
  books,
  members,
  setLoans,
  editingLoan,
  setEditingLoan,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    book: "",
    loanee: "",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      {
        const response = await axiosInstance.post("/api/loans", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoans([...loans, response.data]);
      }
      setEditingLoan(null);
      // setFormData({ book: "", loanee: "", dueDate: "" });
    } catch (error) {
      alert(`Failed to save loan. Please select all fields`);
    }
  };

  const bookStructure = FormSelectionFactory.getSelectionType("books");
  const memberStructure = FormSelectionFactory.getSelectionType("members");

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded mb-6"
      >
        <h1 className="text-2xl font-bold mb-4">
          {editingLoan ? "Edit Loan" : "Register Loan"}
        </h1>
        <table width="100%">
          {bookStructure.selectionComponent(formData, setFormData, books)}
          {memberStructure.selectionComponent(formData, setFormData, members)}
        </table>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {editingLoan ? "Update Loan" : "Create Loan"}
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
