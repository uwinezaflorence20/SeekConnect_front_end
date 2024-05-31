import React, { useEffect, useState } from "react";
import axios from "axios";
import Transactions from "./Transactions";
import LostPeople from "./LostPeople";

const Lostitem = ({ onClose }) => {
  const [lostDocuments, setLostDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [documentType, setDocumentType] = useState("All");

  useEffect(() => {
    const fetchLostDocuments = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/lost"
        );
        console.log("API response:", response.data);

        if (Array.isArray(response.data.documents)) {
          setLostDocuments(response.data.documents);
          setFilteredDocuments(response.data.documents);
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

  useEffect(() => {
    filterDocuments();
  }, [documentType]);

  const filterDocuments = () => {
    const filtered =
      documentType === "All"
        ? lostDocuments
        : lostDocuments.filter((doc) => doc.DocumentType === documentType);
    setFilteredDocuments(filtered);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDocumentTypeClick = (type) => {
    setDocumentType(type);
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
      {filteredDocuments.length === 0 ? (
        <p className="text-center">No lost documents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filteredDocuments.map((doc, index) => (
            <div key={index} className="bg-white p-4 shadow-md mb-4">
              <div className="flex flex-col items-center space-y-4">
                <div>
                  <img src="/OIP.jpg" alt="" className="w-40 h-40" />
                </div>
                <div>
               
                  <p className="font-bold text-3xl mb text-[#8a9de9]">
                    {doc.NameOnDocument}
                  </p>
                  <p className="text-gray-500 font-thin italic">
                    Lost on: {new Date(doc.LostDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Document Type:{" "}
                    <span
                      className=" "
                      onClick={() => handleDocumentTypeClick(doc.DocumentType)}
                    >
                      {doc.DocumentType}
                    </span>
                  </p>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-blue-500 underline"
                  >
                    {expandedIndex === index ? "See less" : "See more"}
                  </button>
                  {expandedIndex === index && (
                    <div>
                       <p className="text-gray-500">
                    {doc.Email}
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
                    
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <LostPeople/>
    </div>
  );
};

export default Lostitem;
