import React, { useState } from "react";
import axios from "axios";

const FoundDocumentForm = () => {
  const [formData, setFormData] = useState({
    Email: "",
    DocumentType: "",
    NameOnDocument: "",
    PlaceOfIssueOnDocument: "",
    FoundDate: "2024-01-02",
    "FoundPlace.Country": "",
    "FoundPlace.Province": "",
    "FoundPlace.District": "",
    "FoundPlace.Sector": "",
    "FoundPlace.Cell": "",
    "FoundPlace.Village": "",
    Comment: "",
    returnedToOwner: false,
    file: null,
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when the form is being submitted
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/foundDocument",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Document posted successfully");
      setShowModal(true); // Show the modal on success
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error posting document:", error);
      setMessage("Failed to post document");
      setShowModal(true); // Show the modal on failure
    } finally {
      setIsSubmitting(false); // Reset isSubmitting once the submission is complete
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Post Found Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 font-medium">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="DocumentType" className="block text-gray-700 font-medium">
              Document Type
            </label>
            <input
              type="text"
              id="DocumentType"
              name="DocumentType"
              value={formData.DocumentType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="NameOnDocument" className="block text-gray-700 font-medium">
              Name on Document
            </label>
            <input
              type="text"
              id="NameOnDocument"
              name="NameOnDocument"
              value={formData.NameOnDocument}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="PlaceOfIssueOnDocument" className="block text-gray-700 font-medium">
              Place of Issue on Document
            </label>
            <input
              type="text"
              id="PlaceOfIssueOnDocument"
              name="PlaceOfIssueOnDocument"
              value={formData.PlaceOfIssueOnDocument}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundDate" className="block text-gray-700 font-medium">
              Found Date
            </label>
            <input
              type="date"
              id="FoundDate"
              name="FoundDate"
              value={formData.FoundDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundPlace.Country" className="block text-gray-700 font-medium">
              Country
            </label>
            <input
              type="text"
              id="FoundPlace.Country"
              name="FoundPlace.Country"
              value={formData["FoundPlace.Country"]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundPlace.Province" className="block text-gray-700 font-medium">
              Province
            </label>
            <input
              type="text"
              id="FoundPlace.Province"
              name="FoundPlace.Province"
              value={formData["FoundPlace.Province"]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundPlace.District" className="block text-gray-700 font-medium">
              District
            </label>
            <input
              type="text"
              id="FoundPlace.District"
              name="FoundPlace.District"
              value={formData["FoundPlace.District"]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundPlace.Sector" className="block text-gray-700 font-medium">
              Sector
            </label>
            <input
              type="text"
              id="FoundPlace.Sector"
              name="FoundPlace.Sector"
              value={formData["FoundPlace.Sector"]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundPlace.Cell" className="block text-gray-700 font-medium">
              Cell
            </label>
            <input
              type="text"
              id="FoundPlace.Cell"
              name="FoundPlace.Cell"
              value={formData["FoundPlace.Cell"]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="FoundPlace.Village" className="block text-gray-700 font-medium">
              Village
            </label>
            <input
              type="text"
              id="FoundPlace.Village"
              name="FoundPlace.Village"
              value={formData["FoundPlace.Village"]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Comment" className="block text-gray-700 font-medium">
              Comment
            </label>
            <textarea
              id="Comment"
              name="Comment"
              value={formData.Comment}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? "Posting..." : "Submit"}
          </button>
        </form>

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Success</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
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
    </div>
  );
};

export default FoundDocumentForm;
