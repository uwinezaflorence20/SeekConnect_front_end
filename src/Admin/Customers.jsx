import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://seekconnect-backend-1.onrender.com/users"
      );

      console.log("API response:", response.data);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        throw new Error("API response is not an array");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId) => {
    // Implement the delete logic here
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleUpdate = (userId) => {
    // Implement the update logic here
    console.log(`Update user with ID: ${userId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "'Arial', sans-serif",
  };

  const thStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  const trStyle = {
    backgroundColor: "#f2f2f2",
  };

  return (
    <div>
      <h2>Customers Message</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>FirstName</th>
            <th style={thStyle}>LastName</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, index) => (
              <tr key={index} style={index % 2 === 0 ? trStyle : null}>
                <td style={tdStyle}>{user.FirstName}</td>
                <td style={tdStyle}>{user.LastName}</td>
                <td style={tdStyle}>{user.Email}</td>
                <td style={tdStyle}>
                  <FontAwesomeIcon className="text-blue-500"
                    icon={faEdit}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => handleUpdate(user.id)}
                  />
                  <FontAwesomeIcon className="text-red-600"
                    icon={faTrash}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(user.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;

