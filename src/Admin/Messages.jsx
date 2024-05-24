// // /src/components/Messages.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         "https://seekconnect-backend-1.onrender.com/contactUs"
//       ); // Adjust the URL to your API endpoint
//       if (Array.isArray(response.data)) {
//         setMessages(response.data);
//       } else {
//         throw new Error("API response is not an array");
//       }
//       setLoading(false);
//     } catch (error) {
//       setError("Error loading messages: " + error.message); // Set error message string
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>; // Display error message as a string

//   return (
//     <div>
//       <h2>Messages from SeekConnect</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Tel</th>
//             <th>Message</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((message) => (
//             <tr key={message.id}>
//               <td>{message.Name}</td>
//               <td>{message.Email}</td>
//               <td>{message.Tel}</td>
//               <td>{message.Message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Messages;

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

  return (
    <div>
      <h2>Messages from SeekConnect</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td>{message.Name}</td>
              <td>{message.Email}</td>
              <td>{message.Tel}</td>
              <td>{message.Message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;