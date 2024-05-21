import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Table = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Doe",
      category: "Machine",
      sex: "Male",
      date: "2024-05-01",
      place: "New York",
    },
  ]);

  const [newRow, setNewRow] = useState({
    name: "",
    category: "Machine",
    sex: "Male",
    date: "",
    place: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editRowId, setEditRowId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow({
      ...newRow,
      [name]: value,
    });
  };

  const handleAddRow = () => {
    if (isEditing) {
      setRows(
        rows.map((row) =>
          row.id === editRowId ? { ...newRow, id: editRowId } : row
        )
      );
      setIsEditing(false);
      setEditRowId(null);
    } else {
      setRows([...rows, { ...newRow, id: rows.length + 1 }]);
    }
    setNewRow({
      name: "",
      category: "Machine",
      sex: "Male",
      date: "",
      place: "",
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEditRow = (row) => {
    setNewRow(row);
    setIsEditing(true);
    setEditRowId(row.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Items List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Sex</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Place</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-4 border">{row.id}</td>
              <td className="py-2 px-4 border">{row.name}</td>
              <td className="py-2 px-4 border">{row.category}</td>
              <td className="py-2 px-4 border">{row.sex}</td>
              <td className="py-2 px-4 border">{row.date}</td>
              <td className="py-2 px-4 border">{row.place}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEditRow(row)}
                  className="text-blue-500 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteRow(row.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h3>
        <div className="grid grid-cols-6 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newRow.name}
            onChange={handleChange}
            className="col-span-1 p-2 border rounded"
          />
          <select
            name="category"
            value={newRow.category}
            onChange={handleChange}
            className="col-span-1 p-2 border rounded"
          >
            <option value="Machine">Machine</option>
            <option value="Telephone">Telephone</option>
            <option value="Passport">Passport</option>
            <option value="Person Missing">Person Missing</option>
          </select>
          <select
            name="sex"
            value={newRow.sex}
            onChange={handleChange}
            className="col-span-1 p-2 border rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="date"
            value={newRow.date}
            onChange={handleChange}
            className="col-span-1 p-2 border rounded"
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={newRow.place}
            onChange={handleChange}
            className="col-span-1 p-2 border rounded"
          />
          <button
            onClick={handleAddRow}
            className="col-span-1 p-2 bg-blue-500 text-white rounded"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
