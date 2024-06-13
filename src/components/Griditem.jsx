import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2 for pop-up messages

const Griditem = () => {
  const [foundDocuments, setFoundDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleSeeMoreClick = (document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="m-6">
      <h3 className="text-lg font-medium">Found Documents:</h3>
      {foundDocuments.length === 0 ? (
        <p className="text-center">No found documents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {foundDocuments.map((document) => (
            <div key={document._id} className="border border-gray-200 p-4 rounded-lg shadow-md">
              {document.Photo && document.Photo.url ? (
                <img src={document.Photo.url} alt="Document" className="h-32 w-auto mb-2" />
              ) : (
                <span className="text-sm text-gray-600">No photo available</span>
              )}
              <h3 className="text-lg font-bold mb-2">{document.DocumentType}</h3>
              <p className="text-sm text-gray-600 mb-2">Name: {document.NameOnDocument}</p>
              <button
                onClick={() => handleSeeMoreClick(document)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                See More
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedDocument && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedDocument.DocumentType}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">Name: {selectedDocument.NameOnDocument}</p>
                      <p className="text-sm text-gray-600 mb-2">Place of Issue: {selectedDocument.PlaceOfIssueOnDocument}</p>
                      <p className="text-sm text-gray-600 mb-2">Found Date: {selectedDocument.FoundDate}</p>
                      <p className="text-sm text-gray-500">Returned to Owner: {selectedDocument.returnedToOwner ? "Yes" : "No"}</p>
                      {/* {selectedDocument.Photo && selectedDocument.Photo.url && (
                        <img src={selectedDocument.Photo.url} alt="Document" className="mt-2 h-32 w-auto" />
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default Griditem;
