import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://seekconnect-backend-1.onrender.com/contactUs"
      ); // Adjust the URL to your API endpoint
      if (response.data && Array.isArray(response.data.message)) {
        setMessages(response.data.message);
      } else {
        throw new Error("API response is not an array");
      }
      setLoading(false);
    } catch (error) {
      setError("Error loading messages: " + error.message);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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

  const trHoverStyle = {
    backgroundColor: "#ddd",
  };

  return (
    <div>
      <h2>Messages from SeekConnect</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Tel</th>
            <th style={thStyle}>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id} style={trStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor = trStyle.backgroundColor}>
              <td style={tdStyle}>{message.Name}</td>
              <td style={tdStyle}>{message.Email}</td>
              <td style={tdStyle}>{message.Tel}</td>
              <td style={tdStyle}>{message.Message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
