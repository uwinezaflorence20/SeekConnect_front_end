import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const FoundMissingPeopleTable = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [editingPerson, setEditingPerson] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchFoundMissingPeople();
  }, []);

  const fetchFoundMissingPeople = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://seekconnect-backend-1.onrender.com/foundMissingPeople');
      const data = await response.json();
      setFoundPeople(data.missedPeople);
    } catch (error) {
      console.error('Error fetching found missing people:', error);
    }
    setLoading(false); // Stop loading
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://seekconnect-backend-1.onrender.com/foundMissingPerson?id=${id}`);
      setMessage("Found person has been deleted successfully!");
      setIsSuccess(true);
      setShowModal(true);
      fetchFoundMissingPeople();
    } catch (error) {
      console.error("There was an error deleting the found person:", error);
      setMessage("An error occurred while deleting the found person.");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleUpdateClick = (person) => {
    setEditingPerson(person);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const url = `https://seekconnect-backend-1.onrender.com/foundMissingPerson/${editingPerson._id}`;
    const payload = {
      returnedToOwner: event.target.returnedToOwner.checked,
      // Add other fields you are updating
    };
  
    console.log('Updating person with URL:', url);
    console.log('Payload:', payload);
  
    try {
      const response = await axios.patch(url, payload);
      setMessage("Person updated successfully!");
      setIsSuccess(true);
      setShowModal(true);
      fetchFoundMissingPeople();
      setEditingPerson(null);
      setShowUpdateForm(false);
    } catch (error) {
      console.error("There was an error updating the found person:", error);
      setMessage("An error occurred while updating the found person.");
      setIsSuccess(false);
      setShowModal(true);
    }
  };
  
  

  const closeModal = () => {
    setShowModal(false);
  };

  const closeUpdateForm = () => {
    setEditingPerson(null);
    setShowUpdateForm(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Found Missing People</h2>
      
      
        <>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Photo</th>
                <th className="border border-gray-200 px-4 py-2">Email</th>
                <th className="border border-gray-200 px-4 py-2">First Name</th>
                <th className="border border-gray-200 px-4 py-2">Last Name</th>
                <th className="border border-gray-200 px-4 py-2">Race</th>
                <th className="border border-gray-200 px-4 py-2">Country Of Origin</th>
                <th className="border border-gray-200 px-4 py-2">Age</th>
                <th className="border border-gray-200 px-4 py-2">Comment</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foundPeople.map(person => (
                <tr key={person._id} className="border border-gray-200">
                  <td className="border border-gray-200 px-4 py-2">
                    {person.Photo && person.Photo.url ? (
                      <img src={person.Photo.url} alt="Photo" className="w-20 h-20 object-cover" />
                    ) : (
                      <span>No photo available</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{person.Email}</td>
                  <td className="border border-gray-200 px-4 py-2">{person.FirstName}</td>
                  <td className="border border-gray-200 px-4 py-2">{person.LastName}</td>
                  <td className="border border-gray-200 px-4 py-2">{person.Race}</td>
                  <td className="border border-gray-200 px-4 py-2">{person.CountryOfOrigin}</td>
                  <td className="border border-gray-200 px-4 py-2">{person.Age}</td>
                  <td className="border border-gray-200 px-4 py-2">{person.Comment || '-'}</td>
                  <td className="border-gray-200 px-4 py-2 flex ">
                    <button
                      className="text-red-500 mt-8 hover:text-red-700"
                      onClick={() => handleDelete(person._id)}
                    >
                      <MdDelete className="text-2xl text-center" />
                    </button>
                    <button
                      className="text-blue-500 mt-8 hover:text-blue-700"
                      onClick={() => handleUpdateClick(person)}
                    >
                      <FaRegEdit className="text-xl flex items-center justify-center" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showUpdateForm && editingPerson && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Update Return Status</h3>
              <form onSubmit={handleUpdateSubmit} className="bg-gray-100 p-4 rounded shadow-md">
               
                <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Photo
              </label>
              <input
                type="file"
                name="photo"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={editingPerson.Email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={editingPerson.FirstName}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={editingPerson.LastName}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Race
                  </label>
                  <input
                    type="text"
                    name="race"
                    defaultValue={editingPerson.Race}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country Of Origin
                  </label>
                  <input
                    type="text"
                    name="countryOfOrigin"
                    defaultValue={editingPerson.CountryOfOrigin}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
               
                <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                defaultValue={editingPerson.Age}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Date
              </label>
              <input
                type="text"
                name="foundDate"
                defaultValue={editingPerson.FoundDate}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Place - Country
              </label>
              <input
                type="text"
                name="foundPlaceCountry"
                defaultValue={editingPerson.FoundPlace?.Country}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Place - Province
              </label>
              <input
                type="text"
                name="foundPlaceProvince"
                defaultValue={editingPerson.FoundPlace?.Province}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Place - District
              </label>
              <input
                type="text"
                name="foundPlaceDistrict"
                defaultValue={editingPerson.FoundPlace?.District}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Place - Sector
              </label>
              <input
                type="text"
                name="foundPlaceSector"
                defaultValue={editingPerson.FoundPlace?.Sector}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Place - Cell
              </label>
              <input
                type="text"
                name="foundPlaceCell"
                defaultValue={editingPerson.FoundPlace?.Cell}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Found Place - Village
              </label>
              <input
                type="text"
                name="foundPlaceVillage"
                defaultValue={editingPerson.FoundPlace?.Village}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    defaultValue={editingPerson.Comment}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Returned to Owner
                  </label>
                  <input
                    type="checkbox"
                    name="returnedToOwner"
                    defaultChecked={editingPerson.returnedToOwner}
                    className="leading-tight"
                  />
                </div>
                <div className="flex  space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={closeUpdateForm}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}

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
                      <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'} sm:mx-0 sm:h-10 sm:w-10`}>
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
        </>
    
    </div>
  );
};

export default FoundMissingPeopleTable;
