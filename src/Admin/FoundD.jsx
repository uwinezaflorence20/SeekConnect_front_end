import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import the delete and edit icons from react-icons
import Swal from "sweetalert2"; // Import SweetAlert2 for pop-up messages

const FoundD = () => {
  const [foundDocuments, setFoundDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDocument, setEditDocument] = useState(null);

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
      Swal.fire("Deleted!", "The document has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting the document.", "error");
    }
  };

  const updateDocument = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await axios.patch(
        `https://seekconnect-backend-1.onrender.com/foundDocument?id=${editDocument._id}`,
        formData
      );
      setFoundDocuments(foundDocuments.map(doc => doc._id === editDocument._id ? { ...doc, ...Object.fromEntries(formData) } : doc));
      setEditDocument(null);
      Swal.fire("Updated!", "The document has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error updating the document.", "error");
    }
  };

  const handleEditClick = (document) => {
    setEditDocument(document);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditDocument({
      ...editDocument,
      [name]: type === "checkbox" ? checked : value,
    });
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
                <th className="px-4 py-2 border text-gray-400">Document Type</th>
                <th className="px-4 py-2 border text-gray-400">Name on Document</th>
                <th className="px-4 py-2 border text-gray-400">Place of Issue</th>
                <th className="px-4 py-2 border text-gray-400">Found Date</th>
                <th className="px-4 py-2 border text-gray-400">Returned to Owner</th>
                <th className="px-4 py-2 border text-gray-400">Image</th>
                <th className="px-4 py-2 border text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foundDocuments.map((document) => (
                <tr key={document._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{document.DocumentType}</td>
                  <td className="border px-4 py-2">{document.NameOnDocument}</td>
                  <td className="border px-4 py-2">{document.PlaceOfIssueOnDocument}</td>
                  <td className="border px-4 py-2">{document.FoundDate}</td>
                  <td className="border px-4 py-2">{document.returnedToOwner ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">
                    {document.Photo && document.Photo.url ? (
                      <img src={document.Photo.url} alt="Document" className="h-12 w-auto" />
                    ) : (
                      <span>No photo available</span>
                    )}
                  </td>

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
            

            <div className="mb-4">
              <label htmlFor="returnedToOwner" className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  id="returnedToOwner"
                  name="returnedToOwner"
                  checked={editDocument.returnedToOwner}
                  onChange={handleChange}
                  className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                Document Returned to Owner
              </label>
            </div>
           
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
    </div>
  );
};

export default FoundD;
