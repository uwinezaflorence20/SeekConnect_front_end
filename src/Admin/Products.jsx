import React, { useEffect, useState } from "react";
import axios from "axios";

const LostForm = ({ onClose }) => {
  const [lostDocuments, setLostDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    Village: "",
  });
  const [comment, setComment] = useState("");
  const [found, setFound] = useState(false);
  const [formError, setFormError] = useState("");
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchLostDocuments = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/lost"
        );
        console.log("API response:", response.data); // Log the response to check its format

        // Assuming the response contains an object with 'documents' property
        if (Array.isArray(response.data.documents)) {
          setLostDocuments(response.data.documents);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchLostDocuments();
  }, []);

  const isValid = () => {
    if (
      !userId ||
      !nameOnDocument ||
      !placeOfIssueOnDocument ||
      !lostDate ||
      !lostPlace.Country ||
      !lostPlace.Province ||
      !lostPlace.District ||
      !lostPlace.Sector ||
      !lostPlace.Cell ||
      !lostPlace.Village ||
      !comment
    ) {
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
          Found: found,
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
            <thead className="bg-green-500">
              <tr>
                <th className="py-2">User ID</th>
                <th className="py-2">Document Type</th>
                <th className="py-2">Name on Document</th>
                <th className="py-2">Place of Issue</th>
                <th className="py-2">Date Lost</th>
                <th className="py-2">Lost Place</th>
                <th className="py-2">Comment</th>
                <th className="py-2">Found</th>
              </tr>
            </thead>
            <tbody>
              {lostDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className="border px-4 py-2">{doc.UserId}</td>
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
                  <td className="border px-4 py-2">{doc.Found ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

  );
};

export default LostForm;
