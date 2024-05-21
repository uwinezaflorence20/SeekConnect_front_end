import React, { useState } from "react";

const Table = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2024-05-01",
      sex: "Male",
      lostItems: 3,
      foundItems: 2,
      pendingLostItems: 1,
      completedFoundItems: 2,
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2024-05-05",
      sex: "Female",
      lostItems: 1,
      foundItems: 3,
      pendingLostItems: 0,
      completedFoundItems: 3,
    },
    // Add more users here
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Sex</th>
            <th className="py-2 px-4 border">Lost Items</th>
            <th className="py-2 px-4 border">Found Items</th>
            <th className="py-2 px-4 border">Pending Lost Items</th>
            <th className="py-2 px-4 border">Completed Found Items</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(user)}
              className="cursor-pointer"
            >
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.date}</td>
              <td className="py-2 px-4 border">{user.sex}</td>
              <td className="py-2 px-4 border">{user.lostItems}</td>
              <td className="py-2 px-4 border">{user.foundItems}</td>
              <td className="py-2 px-4 border">{user.pendingLostItems}</td>
              <td className="py-2 px-4 border">{user.completedFoundItems}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-xl font-bold mb-2">User Details</h3>
          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Date:</strong> {selectedUser.date}
          </p>
          <p>
            <strong>Sex:</strong> {selectedUser.sex}
          </p>
          <p>
            <strong>Lost Items:</strong> {selectedUser.lostItems}
          </p>
          <p>
            <strong>Found Items:</strong> {selectedUser.foundItems}
          </p>
          <p>
            <strong>Pending Lost Items:</strong> {selectedUser.pendingLostItems}
          </p>
          <p>
            <strong>Completed Found Items:</strong>{" "}
            {selectedUser.completedFoundItems}
          </p>
          <button
            onClick={() => setSelectedUser(null)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
