class BookSelection {
  static selectionComponent = (formData, setFormData, inputData) => {
    return (
      <tr>
        <td width="6%">
          <h3 className="text font-bold mb-4" float="left">
            {"Book:"}
          </h3>
        </td>
        <td>
          <select
            float="right"
            value={formData.book}
            onInput={(e) => setFormData({ ...formData, book: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Unassigned</option>
            {inputData.map((book) => (
              <option>{book.title}</option>
            ))}
          </select>
        </td>
      </tr>
    );
  };
}

class MemberSelection {
  static selectionComponent = (formData, setFormData, inputData) => {
    return (
      <tr>
        <td width="6%">
          <h3 className="text font-bold mb-4" float="left">
            {"Loanee:"}
          </h3>
        </td>
        <td>
          <select
            float="right"
            value={formData.loanee}
            onInput={(e) =>
              setFormData({ ...formData, loanee: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Unassigned</option>
            {inputData.map((member) => (
              <option>{member.name}</option>
            ))}
          </select>
        </td>
      </tr>
    );
  };
}

class FormSelectionFactory {
  static getSelectionType = (type) => {
    if (type === "books") {
      return BookSelection;
    } else if (type === "members") {
      return MemberSelection;
    }
  };
}

export default FormSelectionFactory;
