import React, { useEffect, useState } from "react";
import axios from "axios";

const MissingPeopleList = () => {
  const [missingPeople, setMissingPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchMissingPeople();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-full w-full mb-40 p-4 rounded-md bg-white shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          List of Missing People
        </h2>
        {missingPeople.length === 0 ? (
          <p className="text-center">No missing people found.</p>
        ) : (
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-green-600 ">
              <tr>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Name</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">User ID</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Race</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Country of Origin</th>
                <th className="py-1 px-2 text-left font-medium text-white placeholder:uppercase tracking-wider">Age</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Lost Date</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Lost Place</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Comment</th>
                <th className="py-1 px-2 text-left font-medium text-white uppercase tracking-wider">Found</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {missingPeople.map((person) => {
                const lostPlace = person.LostPlace || {};
                return (
                  <tr key={person.id}>
                    <td className="border px-2 py-1">{person.FirstName} {person.LastName}</td>
                    <td className="border px-2 py-1">{person.UserId}</td>
                    <td className="border px-2 py-1">{person.Race}</td>
                    <td className="border px-2 py-1">{person.CountryOfOrigin}</td>
                    <td className="border px-2 py-1">{person.Age}</td>
                    <td className="border px-2 py-1">{person.LostDate}</td>
                    <td className="border px-2 py-1">
                      {`${lostPlace.Country || "N/A"}, ${lostPlace.Province || "N/A"}, ${lostPlace.District || "N/A"}, ${lostPlace.Sector || "N/A"}, ${lostPlace.Cell || "N/A"}, ${lostPlace.Village || "N/A"}`}
                    </td>
                    <td className="border px-2 py-1">{person.Comment}</td>
                    <td className="border px-2 py-1">{person.Found ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MissingPeopleList;
