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
      setLostDocuments(lostDocuments.filter(doc => doc._id !== id));
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

      setLostDocuments(lostDocuments.map(doc =>
        doc._id === selectedDocument._id ? response.data.document : doc
      ));
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
    setSelectedDocument({
      ...selectedDocument,
      [name]: value,
    });
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
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
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
              <input
                type="text"
                name="Comment"
                value={selectedDocument.Comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Found:</label>
              <input
                type="checkbox"
                name="Found"
                checked={selectedDocument.Found}
                onChange={(e) =>
                  setSelectedDocument({
                    ...selectedDocument,
                    Found: e.target.checked,
                  })
                }
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update Document
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Success</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
