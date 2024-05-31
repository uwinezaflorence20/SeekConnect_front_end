import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const ProductAdmin = ({ onClose }) => {
  const [lostDocuments, setLostDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLostDocuments = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/lost"
        );
        console.log("API response:", response.data);

        // Assuming the response contains an array of lost documents
        setLostDocuments(response.data.documents);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchLostDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://seekconnect-backend-1.onrender.com/lost?id=${id}`);
      setLostDocuments(lostDocuments.filter(doc => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
      setError("Error deleting document");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Lost Documents:</h3>
      {lostDocuments.length === 0 ? (
        <p className="text-center">No lost documents found.</p>
      ) : (
        <table className="min-w-full bg-white mt-4">
          <thead className="">
            <tr>
              <th className="py-2">UserEmail</th>
              <th className="py-2">Document Type</th>
              <th className="py-2">Name on Document</th>
              <th className="py-2">Place of Issue</th>
              <th className="py-2">Date Lost</th>
              <th className="py-2">Lost Place</th>
              <th className="py-2">Comment</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lostDocuments.map((doc, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{doc.Email}</td>
                <td className="border px-4 py-2">{doc.DocumentType}</td>
                <td className="border px-4 py-2">{doc.NameOnDocument}</td>
                <td className="border px-4 py-2">{doc.PlaceOfIssueOnDocument}</td>
                <td className="border px-4 py-2">
                  {new Date(doc.LostDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {`${doc.LostPlace.Country}, ${doc.LostPlace.Province}, ${doc.LostPlace.District}, ${doc.LostPlace.Sector}, ${doc.LostPlace.Cell}, ${doc.LostPlace.Village}`}
                </td>
                <td className="border px-4 py-2">{doc.Comment}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductAdmin;
