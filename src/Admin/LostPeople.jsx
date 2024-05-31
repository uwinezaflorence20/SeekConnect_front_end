import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2 for pop-up messages

const LostPeople = () => {
  const [missingPeople, setMissingPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleSeeMoreClick = (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col   py-8">
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold ">
          List of Missing People
        </h2>
        {missingPeople.length === 0 ? (
          <p className="">No missing people found.</p>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {missingPeople.map((person) => {
              return (
                <div key={person._id} className="bg-white p-6  rounded-lg shadow-md">
                  <div className=" mb-4">
                    {person.Photo && person.Photo.url ? (
                      <img
                        src={person.Photo.url}
                        alt={`${person.FirstName} ${person.LastName}`}
                        className="h-48 w-48 object-cover"
                      />
                    ) : (
                      <div className="h-48 w-48 flex  bg-gray-200 ">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <h3 className="text-2xl font-semibold text-gray-800">{person.FirstName} {person.LastName}</h3>
                    <p className="text-sm text-gray-600"><span className="font-light italic">Lost Date:</span> {person.LostDate}</p>
                    <button
                      onClick={() => handleSeeMoreClick(person)}
                      className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      See More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && selectedPerson && (
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
                      {selectedPerson.FirstName} {selectedPerson.LastName}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Email:</span> {selectedPerson.Email}</p>
                      <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Race:</span> {selectedPerson.Race}</p>
                      <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Country of Origin:</span> {selectedPerson.CountryOfOrigin}</p>
                      <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Age:</span> {selectedPerson.Age}</p>
                      <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Lost Place:</span> {`${selectedPerson.LostPlace.Country || "N/A"}, ${selectedPerson.LostPlace.Province || "N/A"}, ${selectedPerson.LostPlace.District || "N/A"}, ${selectedPerson.LostPlace.Sector || "N/A"}, ${selectedPerson.LostPlace.Cell || "N/A"}, ${selectedPerson.LostPlace.Village || "N/A"}`}</p>
                      <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Comment:</span> {selectedPerson.Comment}</p>
                      <p className="text-sm text-gray-600"><span className="font-bold">Found:</span> {selectedPerson.Found ? "Yes" : "No"}</p>
                      
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

export default LostPeople;
