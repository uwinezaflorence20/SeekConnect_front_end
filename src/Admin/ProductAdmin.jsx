import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const ProductAdmin = ({ onClose }) => {
  const [lostDocuments, setLostDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      setLostDocuments(lostDocuments.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
      setError("Error deleting document");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://seekconnect-backend-1.onrender.com/lost?id=${selectedDocument._id}`,
        selectedDocument
      );
      console.log("Update response:", response.data);

      setLostDocuments(
        lostDocuments.map((doc) =>
          doc._id === selectedDocument._id ? response.data.document : doc
        )
      );
      setModalMessage("Document updated successfully!");
      setShowModal(true);
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating document:", error);
      setError("Error updating document");
    }
  };

  const handleEditClick = (document) => {
    setSelectedDocument(document);
    setShowUpdateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("LostPlace.")) {
      const field = name.split(".")[1];
      setSelectedDocument((prevDoc) => ({
        ...prevDoc,
        LostPlace: {
          ...prevDoc.LostPlace,
          [field]: value,
        },
      }));
    } else {
      setSelectedDocument((prevDoc) => ({
        ...prevDoc,
        [name]: value,
      }));
    }
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
    setSelectedDocument(null);
  };

  const closeModal = () => {
    setShowModal(false);
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
              <th className="py-2">User Email</th>
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
                    className="text-red-600 hover:text-red-800 mr-2"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => handleEditClick(doc)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showUpdateForm && selectedDocument && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md fixed bottom-0 left-0 right-0 mb-4 mx-4 md:mx-auto md:max-w-lg">
          <h3 className="text-lg font-medium mb-4">Update Document</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="Email"
                value={selectedDocument.Email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Document Type:</label>
              <input
                type="text"
                name="DocumentType"
                value={selectedDocument.DocumentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name on Document:</label>
              <input
                type="text"
                name="NameOnDocument"
                value={selectedDocument.NameOnDocument}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Place of Issue:</label>
              <input
                type="text"
                name="PlaceOfIssueOnDocument"
                value={selectedDocument.PlaceOfIssueOnDocument}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date Lost:</label>
              <input
                type="date"
                name="LostDate"
                value={selectedDocument.LostDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Lost Place:</label>
              <input
                type="text"
                name="LostPlace.Country"
                placeholder="Country"
                value={selectedDocument.LostPlace.Country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="LostPlace.Province"
                placeholder="Province"
                value={selectedDocument.LostPlace.Province}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
              <input
                type="text"
                name="LostPlace.District"
                placeholder="District"
                value={selectedDocument.LostPlace.District}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
              <input
                type="text"
                name="LostPlace.Sector"
                placeholder="Sector"
                value={selectedDocument.LostPlace.Sector}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
              <input
                type="text"
                name="LostPlace.Cell"
                placeholder="Cell"
                value={selectedDocument.LostPlace.Cell}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
              <input
                type="text"
                name="LostPlace.Village"
                placeholder="Village"
                value={selectedDocument.LostPlace.Village}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Comment:</label>
              <textarea
                name="Comment"
                value={selectedDocument.Comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseForm}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default ProductAdmin;
