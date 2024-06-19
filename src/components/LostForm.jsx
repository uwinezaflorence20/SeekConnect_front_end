import React, { useState } from "react";

function Post() {
  const [formData, setFormData] = useState({
    Email: "",
    DocumentType: "",
    NameOnDocument: "",
    PlaceOfIssueOnDocument: "",
    LostDate: "",
    LostPlace: {
      Country: "",
      Province: "",
      District: "",
      Sector: "",
      Cell: "",
      Village: ""
    },
    Comment: "",
    Found: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("LostPlace")) {
      const lostPlaceField = name.split(".")[1];
      setFormData({
        ...formData,
        LostPlace: {
          ...formData.LostPlace,
          [lostPlaceField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://seekconnect-backend-1.onrender.com/lost', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setShowModal(true);
        setMessage("Document successfully posted!");
        setFormData({
          Email: "",
          DocumentType: "",
          NameOnDocument: "",
          PlaceOfIssueOnDocument: "",
          LostDate: "",
          LostPlace: {
            Country: "",
            Province: "",
            District: "",
            Sector: "",
            Cell: "",
            Village: ""
          },
          Comment: "",
          Found: false
        });
        setError("");
      } else {
        const errorText = await response.text();
        setError(`Failed to post lost document: ${response.status} ${errorText}`);
      }
    } catch (error) {
      setError(`Failed to post lost document: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Document Type</label>
          <input
            type="text"
            name="DocumentType"
            value={formData.DocumentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name on Document</label>
          <input
            type="text"
            name="NameOnDocument"
            value={formData.NameOnDocument}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Place of Issue on Document</label>
          <input
            type="text"
            name="PlaceOfIssueOnDocument"
            value={formData.PlaceOfIssueOnDocument}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lost Date</label>
          <input
            type="date"
            name="LostDate"
            value={formData.LostDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Nested LostPlace fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Lost Place - Country</label>
          <input
            type="text"
            name="LostPlace.Country"
            value={formData.LostPlace.Country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lost Place - Province</label>
          <input
            type="text"
            name="LostPlace.Province"
            value={formData.LostPlace.Province}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lost Place - District</label>
          <input
            type="text"
            name="LostPlace.District"
            value={formData.LostPlace.District}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lost Place - Sector</label>
          <input
            type="text"
            name="LostPlace.Sector"
            value={formData.LostPlace.Sector}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lost Place - Cell</label>
          <input
            type="text"
            name="LostPlace.Cell"
            value={formData.LostPlace.Cell}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lost Place - Village</label>
          <input
            type="text"
            name="LostPlace.Village"
            value={formData.LostPlace.Village}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            name="Comment"
            value={formData.Comment}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Found</label>
          <input
            type="checkbox"
            name="Found"
            checked={formData.Found}
            onChange={(e) => setFormData({ ...formData, Found: e.target.checked })}
            className="mr-2 leading-tight"
          />
          <span className="text-sm">Check if the document has been found</span>
        </div> */}
        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded text-white ${isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
}

export default Post;
