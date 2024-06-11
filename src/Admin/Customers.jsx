import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
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

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://seekconnect-backend-1.onrender.com/user?id=${userId}`
      );
      console.log("User deleted:", userId);
      // Assuming success, remove the user from the local state
      setUsers(users.filter(user => user._id !== userId));
      // Show success message
      toast.success("User has been deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error);
    }
  };

  const handleUpdate = (userId) => {
    if (userId) {
      console.log(`Update user with ID: ${userId}`);
    } else {
      console.error("User ID is undefined");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "'Arial', sans-serif",
  };

  const thStyle = {
   
    color: "black",
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
      <h2>Customers</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, index) => (
              <tr key={user._id} style={index % 2 === 0 ? trStyle : null}>
                <td style={tdStyle}>{user.FirstName}</td>
                <td style={tdStyle}>{user.LastName}</td>
                <td style={tdStyle}>{user.Email}</td>
                <td style={tdStyle}>
                  <FontAwesomeIcon
                    className="text-red-600"
                    icon={faTrash}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Customers;
