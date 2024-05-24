import React, { useEffect, useState } from "react";
import axios from "axios";

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

      // Log the response data to understand its structure
      console.log("API response:", response.data);

      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        // If the data is wrapped inside another object, adjust accordingly
        setUsers(response.data.users);
      } else {
        // Handle the case where the response is not an array
        throw new Error("API response is not an array");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>User Data</h2>
      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            
            {/* You can add more table headers for other fields if needed */}
          </tr>
        </thead>
        <tbody>
          {/* Check if users is an array before mapping */}
          {Array.isArray(users) &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                
                {/* You can add more table cells for other fields if needed */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
