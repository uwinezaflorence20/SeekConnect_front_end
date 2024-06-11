import { useEffect, useState } from "react";
import axios from "axios";

const Gridperson = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchFoundMissingPeople();
  }, []);

  const fetchFoundMissingPeople = async () => {
    try {
      const response = await axios.get("https://seekconnect-backend-1.onrender.com/foundMissingPeople");
      setFoundPeople(response.data.missedPeople);
    } catch (error) {
      console.error("Error fetching found missing people:", error);
    }
  };

  const handleSeeMore = (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  return (
    <div className="container mx-auto bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Found Missing People</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foundPeople.map((person) => (
          <div key={person._id} className="border border-gray-200 p-4 rounded-lg shadow-md">
            {person.Photo && person.Photo.url ? (
              <img src={person.Photo.url} alt="Photo" className="w-full h-32 object-cover mb-4 rounded" />
            ) : (
              <div className="w-full h-32 bg-gray-200 mb-4 rounded flex items-center justify-center">
                <span className="text-gray-500">No Photo Available</span>
              </div>
            )}
            <h3 className="text-lg font-bold">
              {person.FirstName} {person.LastName}
            </h3>
            <p className="text-sm text-gray-600">{person.Email}</p>
            <p className="text-sm text-gray-600">Age: {person.Age}</p>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSeeMore(person)}
            >
              See More
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedPerson && (
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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
                      <p className="text-sm text-gray-500">
                        Email: {selectedPerson.Email}
                      </p>
                      <p className="text-sm text-gray-500">
                        Race: {selectedPerson.Race}
                      </p>
                      <p className="text-sm text-gray-500">
                        Country Of Origin: {selectedPerson.CountryOfOrigin}
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: {selectedPerson.Age}
                      </p>
                      <p className="text-sm text-gray-500">
                        Found Date: {selectedPerson.FoundDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        Comment: {selectedPerson.Comment || "-"}
                      </p>
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

export default Gridperson;
