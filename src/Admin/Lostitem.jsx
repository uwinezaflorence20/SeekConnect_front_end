import React, { useEffect, useState } from "react";
import axios from "axios";

const Lostitem = ({ onClose }) => {
  const [lostDocuments, setLostDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchLostDocuments();
  }, []);

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
        <div className="grid grid-cols-1 gap-4 mt-4">
          {lostDocuments.map((doc, index) => (
            <div key={index} className="bg-white p-4 shadow-md mb-4">
              <div className="flex items-center w-full min-w-96 space-x-4">
                <div>
                  <img src="/OIP.jpg" alt="" className="w-48 h-48" />
                </div>
                <div className="mb-20">
                  <p className="font-bold text-3xl mb text-[#8a9de9]">
                    {doc.NameOnDocument}
                  </p>
                  <p className="text-gray-500 font-thin italic">
                    Lost on: {new Date(doc.LostDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500">
                    Document Type:{" "}
                    <span className="text-black font-extrabold">
                      {doc.DocumentType}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    Place of Issue:{" "}
                    <span className="text-black font-extrabold">
                      {doc.PlaceOfIssueOnDocument}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    Lost Place:{" "}
                    <span className="text-black font-extrabold">{`${doc.LostPlace.Country}, ${doc.LostPlace.Province}, ${doc.LostPlace.District}, ${doc.LostPlace.Sector}, ${doc.LostPlace.Cell}, ${doc.LostPlace.Village}`}</span>
                  </p>
                  <p className="text-gray-500">
                    Comment:{" "}
                    <span className="text-black font-extrabold">
                      {doc.Comment}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    Found:{" "}
                    <span className="text-black font-extrabold">
                      {doc.Found ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lostitem;
