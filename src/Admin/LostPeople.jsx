import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LostPeople = () => {
  const [missingPeople, setMissingPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchMissingPeople = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/missingPeople"
        );
        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.people)) {
          setMissingPeople(response.data.people);
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

    fetchMissingPeople();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center ">
      <div className="max-w-7xl w-full  p-4 rounded-md ">
        <h2 className="text-xl font-bold  mb-4">
          List of Missing People
        </h2>
        {missingPeople.length === 0 ? (
          <p className="text-center">No missing people found.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {missingPeople.map((person, index) => {
                const lostPlace = person.LostPlace || {};
                return (
                  <div key={person._id} className=" p-4  shadow-md">
                    <div className="flex justify-center">
                      {person.Photo && person.Photo.url ? (
                        <img
                          src={person.Photo.url}
                          alt={`${person.FirstName} ${person.LastName}`}
                          className="h-32 w-48 object-cover mb-4"
                        />
                      ) : (
                        <div className="h-32 w-32 flex items-center justify-center  ">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="">
                      <h3 className="text-2xl  text-[#8a9de9] font-semibold">{person.FirstName} {person.LastName}</h3>
                      <p className="text-sm"><span className="font-light italic">Lost Date:</span> {person.LostDate}</p>
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-blue-500 underline mt-2"
                      >
                        {expandedIndex === index ? "See less" : "See more"}
                      </button>
                      {expandedIndex === index && (
                        <div className="mt-2">
                          <p className="text-sm"><span className="font-bold">Race:</span> {person.Email}</p>
                          <p className="text-sm"><span className="font-bold">Race:</span> {person.Race}</p>
                          <p className="text-sm"><span className="font-bold">Country of Origin:</span> {person.CountryOfOrigin}</p>
                          <p className="text-sm font-light"><span className="font-bold">Age:</span> {person.Age}</p>
                          <p className="text-sm font-light"><span className="font-bold">Lost Place:</span> {`${lostPlace.Country || "N/A"}, ${lostPlace.Province || "N/A"}, ${lostPlace.District || "N/A"}, ${lostPlace.Sector || "N/A"}, ${lostPlace.Cell || "N/A"}, ${lostPlace.Village || "N/A"}`}</p>
                          <p className="text-sm"><span className="font-bold">Comment:</span> {person.Comment}</p>
                          <p className="text-sm"><span className="font-bold">Found:</span> {person.Found ? "Yes" : "No"}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPeople;
