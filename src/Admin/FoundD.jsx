import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import the delete and edit icons from react-icons

const FoundD = () => {
  const [foundDocuments, setFoundDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDocument, setEditDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [modalMessage, setModalMessage] = useState(""); // State for managing modal message

  useEffect(() => {
    const fetchFoundDocuments = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/foundDocuments"
        );
        console.log("API response:", response.data); // Log the response to check its format

        // Assuming the response contains an object with 'foundDocuments' property
        if (Array.isArray(response.data.foundDocuments)) {
          setFoundDocuments(response.data.foundDocuments);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchFoundDocuments();
  }, []);

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`https://seekconnect-backend-1.onrender.com/foundDocument?id=${id}`);
      setFoundDocuments(foundDocuments.filter(doc => doc._id !== id));
      setModalMessage("The document has been deleted."); // Set modal message for deletion
    } catch (error) {
      setModalMessage("There was an error deleting the document."); // Set modal message for error
    }
  };

  const updateDocument = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Append photo if it was changed
    if (photo) {
      formData.append('file', photo);
    }

    try {
      await axios.patch(
        `https://seekconnect-backend-1.onrender.com/foundDocument?id=${editDocument._id}`,
        formData
      );
      setFoundDocuments(foundDocuments.map(doc => doc._id === editDocument._id ? { ...doc, ...Object.fromEntries(formData.entries()) } : doc));
      setEditDocument(null);
      setPhoto(null);
      setModalMessage("The document has been updated."); 
    } catch (error) {
      setModalMessage("There was an error updating the document."); 
    }
  };

  const handleEditClick = (document) => {
    setEditDocument(document);
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "file") {
      setPhoto(files[0]);
    } else {
      setEditDocument({
        ...editDocument,
        [name]: type === "checkbox" ? checked : value,
      });
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
      <h3 className="text-lg font-medium">Found Documents:</h3>
      {foundDocuments.length === 0 ? (
        <p className="text-center">No found documents found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white mt-4 border rounded-lg">
            <thead className="">
              <tr>
                <th className="px-4 py-2 border text-gray-400">Image</th>
                <th className="px-4 py-2 border text-gray-400">Document Type</th>
                <th className="px-4 py-2 border text-gray-400">Name on Document</th>
                <th className="px-4 py-2 border text-gray-400">Place of Issue</th>
                <th className="px-4 py-2 border text-gray-400">Found Date</th>
                <th className="px-4 py-2 border text-gray-400">Returned to Owner</th>
                <th className="px-4 py-2 border text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foundDocuments.map((document) => (
                <tr key={document._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    {document.Photo && document.Photo.url ? (
                      <img src={document.Photo.url} alt="Document" className="h-12 w-auto" />
                    ) : (
                      <span>No photo available</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">{document.DocumentType}</td>
                  <td className="border px-4 py-2">{document.NameOnDocument}</td>
                  <td className="border px-4 py-2">{document.PlaceOfIssueOnDocument}</td>
                  <td className="border px-4 py-2">{document.FoundDate}</td>
                  <td className="border px-4 py-2">{document.returnedToOwner ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleEditClick(document)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteDocument(document._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editDocument && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Edit Document:</h3>
          <form onSubmit={updateDocument} className="bg-white p-6 rounded-lg shadow-lg">
            {Object.keys(editDocument).map((key) => {
              if (key === "_id" || key === "__v") return null; // Skip these fields
              if (key === "returnedToOwner") {
                return (
                  <div key={key} className="mb-4">
                    <label htmlFor={key} className="flex items-center text-gray-700 font-medium">
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        checked={editDocument[key]}
                        onChange={handleChange}
                        className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      Document Returned to Owner
                    </label>
                  </div>
                );
              }
              if (key === "Photo") {
                return (
                  <div key={key} className="mb-4">
                    <label htmlFor={key} className="block text-gray-700 font-medium">
                      {key}
                    </label>
                    <input
                      type="file"
                      id={key}
                      name={key}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                  </div>
                );
              }
              return (
                <div key={key} className="mb-4">
                  <label htmlFor={key} className="block text-gray-700 font-medium">
                    {key}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={editDocument[key]}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                </div>
              );
            })}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                onClick={() => setEditDocument(null)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {modalMessage && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Notification
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModalMessage("")}
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

export default FoundD;
