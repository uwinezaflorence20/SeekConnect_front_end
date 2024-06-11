import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2 for pop-up messages

const Lostitem = () => {
  const [lostDocuments, setLostDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLostDocuments = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/lost"
        );
        console.log("API response:", response.data);

        if (Array.isArray(response.data.documents)) {
          setLostDocuments(response.data.documents);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchLostDocuments();
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
      <h3 className="text-2xl font-bold">Lost Documents:</h3>
      {lostDocuments.length === 0 ? (
        <p className="text-center">No lost documents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {lostDocuments.map((document) => (
            <div key={document._id} className="border border-gray-200 text-center p-4 rounded-lg shadow-md">
             <div className="flex items-center justify-center">
                  <img src="/OIP.jpg" alt="" className="w-40 h-40" />
                </div>
              <h3 className="text-lg font-bold mb-2">{document.DocumentType}</h3>
              <p className="text-md font-extralight italic text-gray-600 mb-2">Name: {document.NameOnDocument}</p>
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
                      <p className="text-sm text-gray-600 mb-2">Name on Document: {selectedDocument.NameOnDocument}</p>
                      <p className="text-sm text-gray-600 mb-2">Lost Date: {new Date(selectedDocument.LostDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600 mb-2">Place of Issue: {selectedDocument.PlaceOfIssueOnDocument}</p>
                      <p className="text-sm text-gray-600 mb-2">Lost Place: {`${selectedDocument.LostPlace.Country}, ${selectedDocument.LostPlace.Province}, ${selectedDocument.LostPlace.District}, ${selectedDocument.LostPlace.Sector}, ${selectedDocument.LostPlace.Cell}, ${selectedDocument.LostPlace.Village}`}</p>
                      <p className="text-sm text-gray-600 mb-2">Comment: {selectedDocument.Comment}</p>
                      {selectedDocument.Photo && selectedDocument.Photo.url && (
                        <img src={selectedDocument.Photo.url} alt="Document" className="mt-2 h-32 w-auto" />
                      )}
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

export default Lostitem;
