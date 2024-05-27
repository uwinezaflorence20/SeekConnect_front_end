import axios from "axios";
import React, { useState } from "react";

const LostForm = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [documentType, setDocumentType] = useState("Drivers License");
  const [nameOnDocument, setNameOnDocument] = useState("");
  const [placeOfIssueOnDocument, setPlaceOfIssueOnDocument] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [lostPlace, setLostPlace] = useState({
    Country: "",
    Province: "",
    District: "",
    Sector: "",
    Cell: "",
    Village: ""
  });
  const [comment, setComment] = useState("");
  const [found, setFound] = useState(false);
  const [formError, setFormError] = useState("");
  const [responseData, setResponseData] = useState(null);

  const isValid = () => {
    if (!userId || !nameOnDocument || !placeOfIssueOnDocument || !lostDate ||
      !lostPlace.Country || !lostPlace.Province || !lostPlace.District ||
      !lostPlace.Sector || !lostPlace.Cell || !lostPlace.Village || !comment) {
      setFormError("All fields are required");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      const response = await axios.post(
        "https://seekconnect-backend-1.onrender.com/lost",
        {
          UserId: userId,
          DocumentType: documentType,
          NameOnDocument: nameOnDocument,
          PlaceOfIssueOnDocument: placeOfIssueOnDocument,
          LostDate: lostDate,
          LostPlace: lostPlace,
          Comment: comment,
          Found: found
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      setResponseData(response.data);
      alert("Lost document report submitted successfully!");
    } catch (error) {
      setFormError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  const handleLostPlaceChange = (e) => {
    const { name, value } = e.target;
    setLostPlace({ ...lostPlace, [name]: value });
  };

  return (
    <div className="relative bg-white p-6 rounded-md shadow-md">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Report Lost Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 font-medium">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="documentType" className="block text-gray-700 font-medium">Document Type</label>
          <input
            type="text"
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nameOnDocument" className="block text-gray-700 font-medium">Name on Document</label>
          <input
            type="text"
            id="nameOnDocument"
            value={nameOnDocument}
            onChange={(e) => setNameOnDocument(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="placeOfIssueOnDocument" className="block text-gray-700 font-medium">Place of Issue</label>
          <input
            type="text"
            id="placeOfIssueOnDocument"
            value={placeOfIssueOnDocument}
            onChange={(e) => setPlaceOfIssueOnDocument(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lostDate" className="block text-gray-700 font-medium">Date Lost</label>
          <input
            type="date"
            id="lostDate"
            value={lostDate}
            onChange={(e) => setLostDate(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Lost Place</label>
          <input
            type="text"
            name="Country"
            placeholder="Country"
            value={lostPlace.Country}
            onChange={handleLostPlaceChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="Province"
            placeholder="Province"
            value={lostPlace.Province}
            onChange={handleLostPlaceChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="District"
            placeholder="District"
            value={lostPlace.District}
            onChange={handleLostPlaceChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="Sector"
            placeholder="Sector"
            value={lostPlace.Sector}
            onChange={handleLostPlaceChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="Cell"
            placeholder="Cell"
            value={lostPlace.Cell}
            onChange={handleLostPlaceChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="Village"
            placeholder="Village"
            value={lostPlace.Village}
            onChange={handleLostPlaceChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-medium">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            <input
              type="checkbox"
              checked={found}
              onChange={() => setFound(!found)}
              className="mr-2"
            />
            Found
          </label>
        </div>
        {formError && <p className="text-red-500 text-center text-sm mb-4">{formError}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md"
        >
          Submit
        </button>
      </form>
      
    </div>
  );
};

export default LostForm;
