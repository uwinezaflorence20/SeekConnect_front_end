import { useEffect, useState } from 'react';
import axios from 'axios';

const FoundMissingPeopleTable = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [editingPerson, setEditingPerson] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    fetchFoundMissingPeople();
  }, []);

  const fetchFoundMissingPeople = async () => {
    try {
      const response = await fetch('https://seekconnect-backend-1.onrender.com/foundMissingPeople');
      const data = await response.json();
      setFoundPeople(data.missedPeople);
    } catch (error) {
      console.error('Error fetching found missing people:', error);
    }
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
    try {
      const response = await axios.patch(`https://seekconnect-backend-1.onrender.com/foundMissingPerson/${editingPerson._id}`, {
        returnedToOwner: event.target.returnedToOwner.checked
      });
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

  return (
    <div className="container mx-auto bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Found Missing People</h2>
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
            <th className="border border-gray-200 px-4 py-2">Found Date</th>
            <th className="border border-gray-200 px-4 py-2">Comment</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foundPeople.map(person => (
            <tr key={person._id} className="border border-gray-200">
              <td className="border border-gray-200 px-4 py-2"><img src={person.Photo.url} alt="Photo" className="w-20 h-20 object-cover" /></td>
              <td className="border border-gray-200 px-4 py-2">{person.Email}</td>
              <td className="border border-gray-200 px-4 py-2">{person.FirstName}</td>
              <td className="border border-gray-200 px-4 py-2">{person.LastName}</td>
              <td className="border border-gray-200 px-4 py-2">{person.Race}</td>
              <td className="border border-gray-200 px-4 py-2">{person.CountryOfOrigin}</td>
              <td className="border border-gray-200 px-4 py-2">{person.Age}</td>
              <td className="border border-gray-200 px-4 py-2">{person.FoundDate}</td>
              <td className="border border-gray-200 px-4 py-2">{person.Comment || '-'}</td>
              <td className="border border-gray-200 px-4 py-2 flex space-x-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(person._id)}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v11a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm3 6a1 1 0 112 0v6a1 1 0 11-2 0V8zM9 3v1h2V3H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleUpdateClick(person)}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.293 12.293a1 1 0 011.414 0L10 18.586V13a1 1 0 112 0v5.586l6.293-6.293a1 1 0 111.414 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 010-1.414z" />
                    <path d="M12 9a1 1 0 110 2H8a1 1 0 110-2h4z" />
                  </svg>
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
                Returned to Owner
              </label>
              <input
                type="checkbox"
                name="returnedToOwner"
                defaultChecked={editingPerson.returnedToOwner}
                className="leading-tight"
              />
            </div>
            <div className="flex space-x-2">
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
    </div>
  );
};

export default FoundMissingPeopleTable;
